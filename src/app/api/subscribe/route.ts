import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

interface SubscriberData {
  email: string;
  firstName?: string;
  lastName?: string;
  subscribedAt: Date;
}

interface NewsletterResponse {
  success: boolean;
  message: string;
}

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

/**
 * Subscribe a user to the newsletter by adding them to Firebase
 */

interface SubscribeParams {
  email: string;
  firstName?: string;
  lastName?: string;
}

async function subscribeToNewsletter({ email, firstName, lastName }: SubscribeParams): Promise<NewsletterResponse> {
  try {
    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        success: false,
        message: 'Please provide a valid email address'
      };
    }
    
    // Use a document ID based on the email to avoid duplicates
    const cleanEmail = email.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const subscriberRef = db.collection('newsletter_subscribers').doc(cleanEmail);

    // Add new subscriber
    const newSubscriber: SubscriberData = {
      email: email.toLowerCase(),
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      subscribedAt: new Date()
    };

    await subscriberRef.set(newSubscriber);

    return {
      success: true,
      message: 'Successfully subscribed to the newsletter! Thanks!'
    };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return {
      success: false,
      message: 'An error occurred while subscribing. Please try again later.'
    };
  }
}

/**
 * API route handler for newsletter subscriptions using Firebase
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email, firstName, lastName } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Subscribe the user to Firebase
    const result = await subscribeToNewsletter({ email, firstName, lastName });

    return NextResponse.json(result, { 
      status: result.success ? 200 : 400 
    });
  } catch (error) {
    console.error('Error in subscribe API route:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
