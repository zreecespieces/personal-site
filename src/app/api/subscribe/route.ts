import { NextRequest, NextResponse } from 'next/server';

/**
 * API route handler for Mailchimp newsletter subscriptions
 * This keeps API keys secure on the server-side
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email_address, status, merge_fields } = body;

    // Validation
    if (!email_address) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Get environment variables
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

    if (!apiKey || !audienceId || !serverPrefix) {
      console.error('Mailchimp configuration is missing');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create an MD5 hash of the lowercase email address for Mailchimp's API
    const emailHash = await createMd5Hash(email_address.toLowerCase());

    // Prepare the API URL
    // Using PUT instead of POST to handle both new subscriptions and updates
    const apiUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${emailHash}`;

    // Make the API request to Mailchimp
    const response = await fetch(apiUrl, {
      method: 'PUT', // PUT will create or update
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      },
      body: JSON.stringify({
        email_address,
        status: status || 'subscribed',
        merge_fields: merge_fields || {},
      }),
    });

    const data = await response.json();

    // Handle the response
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Creates an MD5 hash of the given string
 * Mailchimp uses MD5 hashes of email addresses as IDs
 */
async function createMd5Hash(str: string): Promise<string> {
  // Using the Web Crypto API for creating the hash
  const msgUint8 = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('MD5', msgUint8);
  
  // Convert the hash to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
