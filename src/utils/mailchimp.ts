/**
 * Mailchimp API utility functions for newsletter subscriptions
 */

// Define the subscriber interface
export interface Subscriber {
  email: string;
  firstName?: string;
  lastName?: string;
}

// Configuration options for Mailchimp
export interface MailchimpConfig {
  apiKey: string;
  audienceId: string;
  serverPrefix: string; // The server prefix (us1, us2, etc.)
}

/**
 * Subscribe a user to the Mailchimp newsletter
 * @param subscriber - The subscriber information
 * @returns Promise with the response data or error
 */
export async function subscribeToNewsletter(subscriber: Subscriber): Promise<{ success: boolean; message: string }> {
  // This would typically use environment variables in production
  // Use .env.local for development and proper environment variables in production
  const config: MailchimpConfig = {
    apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY || '',
    audienceId: process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID || '',
    serverPrefix: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX || '',
  };

  if (!config.apiKey || !config.audienceId || !config.serverPrefix) {
    console.error('Mailchimp configuration is incomplete');
    return { success: false, message: 'Newsletter configuration error. Please try again later.' };
  }

  const { email, firstName, lastName } = subscriber;
  
  // API endpoint for Mailchimp
  const apiUrl = `https://${config.serverPrefix}.api.mailchimp.com/3.0/lists/${config.audienceId}/members`;
  
  // Prepare the data to be sent to Mailchimp
  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: firstName || '',
      LNAME: lastName || '',
    },
  };

  try {
    // In a browser environment, we need to use a proxy API route
    // to avoid exposing API keys and to handle CORS issues
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Check if the error is because the email is already subscribed
      if (responseData.title === 'Member Exists') {
        return { success: true, message: 'You\'re already subscribed to the newsletter!' };
      }
      return { success: false, message: responseData.detail || 'Failed to subscribe. Please try again.' };
    }

    return { success: true, message: 'Successfully subscribed to the newsletter!' };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { success: false, message: 'An error occurred while subscribing. Please try again later.' };
  }
}

/**
 * Store the user's response to the newsletter prompt in localStorage
 * @param response - The user's response ('subscribed', 'dismissed', 'dont_ask')
 */
export function storeNewsletterResponse(response: 'subscribed' | 'dismissed' | 'dont_ask'): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('newsletter_response', response);
    localStorage.setItem('newsletter_response_date', new Date().toISOString());
  }
}

/**
 * Check if the newsletter prompt should be shown to the user
 * @returns Boolean indicating whether to show the prompt
 */
export function shouldShowNewsletterPrompt(): boolean {
  if (typeof window === 'undefined') {
    return false; // Don't show on server-side
  }

  const response = localStorage.getItem('newsletter_response');
  
  // If the user has already responded, don't show again
  if (response === 'subscribed' || response === 'dont_ask') {
    return false;
  }
  
  // If the user dismissed it recently, don't show again for a while (e.g., 30 days)
  if (response === 'dismissed') {
    const responseDate = localStorage.getItem('newsletter_response_date');
    if (responseDate) {
      const lastShown = new Date(responseDate);
      const daysSinceLastShown = (new Date().getTime() - lastShown.getTime()) / (1000 * 3600 * 24);
      if (daysSinceLastShown < 30) {
        return false;
      }
    }
  }
  
  return true;
}
