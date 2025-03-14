/**
 * Store user's newsletter response (subscribed, dismissed, don't ask)
 */
export function storeNewsletterResponse(response: 'subscribed' | 'dismissed' | 'dont_ask'): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('newsletter_response', response);
    localStorage.setItem('newsletter_timestamp', Date.now().toString());
  }
}

/**
 * Check if we should show the newsletter prompt
 */
export function shouldShowNewsletterPrompt(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const response = localStorage.getItem('newsletter_response');
  
  // If the user has chosen not to be asked again, don't show the prompt
  if (response === 'dont_ask' || response === 'subscribed') {
    return false;
  }

  // If the user has dismissed the prompt before, only show it again after 7 days
  if (response === 'dismissed') {
    const timestamp = localStorage.getItem('newsletter_timestamp');
    if (timestamp) {
      const dismissedAt = parseInt(timestamp, 10);
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedAt < sevenDaysInMs) {
        return false;
      }
    }
  }

  return true;
}
