// Helper to get the correct asset path with basePath prefix
export function getAssetPath(path) {
  const basePath = process.env.NODE_ENV === 'production' ? '/vscode-portfolio' : '';
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
