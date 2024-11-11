// Embed code generator with security features
export function generateEmbedCode(apiKey: string, options = {}): string {
  const nonce = generateNonce();
  
  return `
<!-- Chatflow Widget -->
<script nonce="${nonce}">
window.ChatflowConfig = {
  key: '${apiKey}',
  options: ${JSON.stringify(options)}
};
</script>
<script 
  nonce="${nonce}"
  src="https://widget.chatflow.com/loader.js" 
  integrity="sha384-${generateIntegrity()}"
  crossorigin="anonymous"
  async
></script>
`;
}

// Security utilities
function generateNonce(): string {
  return crypto.getRandomValues(new Uint8Array(16))
    .reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
}

function generateIntegrity(): string {
  // Implementation for SRI hash generation
  // This would be generated during build process
  return 'HASH-PLACEHOLDER';
}