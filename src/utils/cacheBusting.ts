// Utility to add timestamp to the URL of the JS file to avoid cache
export function addCacheBusting(filename: string): string {
  const timestamp = Date.now();
  return `${filename}?v=${timestamp}`;
}

// Create the URL for the JS file in public/js with cache busting
export function getJSFileWithCacheBusting(filename: string): string {
  return `/js/${addCacheBusting(filename)}`;
}
