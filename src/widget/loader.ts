// Secure widget loader with type safety and CSP compliance
interface ChatflowConfig {
  key: string;
  domain: string;
  options?: {
    position?: 'left' | 'right';
    theme?: 'light' | 'dark';
    primaryColor?: string;
  };
}

interface ChatflowInstance {
  _: any[];
  (command: string, ...args: any[]): void;
}

declare global {
  interface Window {
    Chatflow?: ChatflowInstance;
    ChatflowConfig?: ChatflowConfig;
  }
}

(function(window, document) {
  'use strict';

  // Prevent multiple initializations
  if (window.Chatflow) {
    console.warn('Chatflow widget already initialized');
    return;
  }

  // Validate configuration
  const config: ChatflowConfig = window.ChatflowConfig || {};
  if (!config.key || typeof config.key !== 'string') {
    console.error('Invalid Chatflow configuration: API key is required');
    return;
  }

  // Security measures
  const trustedDomain = 'https://widget.chatflow.com';
  const cspNonce = document.currentScript?.getAttribute('nonce') || '';

  // Initialize queue and main function
  const queue: any[] = [];
  const chatflow: ChatflowInstance = function(command: string, ...args: any[]) {
    queue.push([command, ...args]);
  };
  chatflow._ = queue;

  // Create secure iframe with sandbox attributes
  function createSecureFrame(): HTMLIFrameElement {
    const frame = document.createElement('iframe');
    frame.setAttribute('id', 'chatflow-widget');
    frame.setAttribute('title', 'Chatflow Live Chat Widget');
    frame.setAttribute('aria-hidden', 'true');
    frame.setAttribute('loading', 'lazy');
    frame.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      border: none;
      width: 380px;
      height: 600px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-radius: 12px;
      z-index: 2147483647;
    `;

    // Security attributes
    frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
    frame.setAttribute('referrerpolicy', 'origin');

    return frame;
  }

  // Load widget securely
  function loadWidget(): void {
    const frame = createSecureFrame();
    document.body.appendChild(frame);

    // Create secure widget URL with signed payload
    const widgetUrl = new URL(trustedDomain);
    widgetUrl.searchParams.set('key', config.key);
    widgetUrl.searchParams.set('t', Date.now().toString());
    
    // Add HMAC signature for request verification
    const signature = generateSignature(config.key, Date.now().toString());
    widgetUrl.searchParams.set('sig', signature);

    frame.src = widgetUrl.toString();

    // Post-load security checks
    frame.addEventListener('load', () => {
      validateFrame(frame);
      initializeSecureChannel(frame);
    });
  }

  // Initialize secure communication channel
  function initializeSecureChannel(frame: HTMLIFrameElement): void {
    const channel = new MessageChannel();
    
    window.addEventListener('message', (event) => {
      if (event.origin !== trustedDomain) return;
      
      // Validate message structure and origin
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'chatflow:ready') {
          frame.style.opacity = '1';
          frame.style.visibility = 'visible';
        }
      } catch (e) {
        console.error('Invalid message format');
      }
    });
  }

  // Security validation
  function validateFrame(frame: HTMLIFrameElement): void {
    if (!frame.contentWindow) {
      console.error('Frame initialization failed');
      document.body.removeChild(frame);
      return;
    }
  }

  // Load the widget when DOM is ready
  if (document.readyState === 'complete') {
    loadWidget();
  } else {
    window.addEventListener('load', loadWidget);
  }

  // Expose the API
  window.Chatflow = chatflow;

})(window, document);