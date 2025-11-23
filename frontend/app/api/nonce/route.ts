/**
 * API Route: Generate SIWE Nonce
 * Creates a secure nonce for MiniKit wallet authentication
 */

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Generate a secure nonce (at least 8 alphanumeric characters)
  const nonce = crypto.randomUUID().replace(/-/g, '');

  // Store nonce in a secure, non-tamperable location
  // Optionally HMAC the nonce with a secret key stored in environment
  cookies().set('siwe-nonce', nonce, { 
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 5, // 5 minutes
  });

  return NextResponse.json({ nonce });
}

