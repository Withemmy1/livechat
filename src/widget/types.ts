// Type definitions for widget configuration and events
export interface ChatflowConfig {
  key: string;
  domain?: string;
  options?: ChatflowOptions;
}

export interface ChatflowOptions {
  position?: 'left' | 'right';
  theme?: 'light' | 'dark';
  primaryColor?: string;
  greeting?: string;
  companyName?: string;
  agentName?: string;
  agentAvatar?: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface ChatSession {
  id: string;
  visitor: VisitorInfo;
  messages: ChatMessage[];
  startedAt: number;
  endedAt?: number;
}

export interface VisitorInfo {
  id: string;
  fingerprint: string;
  userAgent: string;
  referrer?: string;
  location?: {
    country?: string;
    city?: string;
  };
}