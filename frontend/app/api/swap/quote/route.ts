/**
 * Swap Quote API
 * Uses 1inch API to get best swap routes
 * For 1inch $1K "Utilize 1inch APIs" Prize
 */

import { NextRequest, NextResponse } from 'next/server';
import { get1inchSwapQuote, format1inchAmount, get1inchRouteDescription } from '@/lib/oneinch';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const chainId = searchParams.get('chainId');
    const fromToken = searchParams.get('fromToken');
    const toToken = searchParams.get('toToken');
    const amount = searchParams.get('amount');

    // Validate params
    if (!chainId || !fromToken || !toToken || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Get quote from 1inch
    const quote = await get1inchSwapQuote(
      parseInt(chainId),
      fromToken,
      toToken,
      amount
    );

    if (!quote) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch quote from 1inch' },
        { status: 500 }
      );
    }

    // Format response
    const formattedQuote = {
      success: true,
      quote: {
        fromToken: quote.fromToken,
        toToken: quote.toToken,
        fromAmount: format1inchAmount(quote.fromAmount, quote.fromToken.decimals),
        toAmount: format1inchAmount(quote.toAmount, quote.toToken.decimals),
        route: get1inchRouteDescription(quote.protocols),
        protocols: quote.protocols.map(p => p.name),
        estimatedGas: quote.estimatedGas,
      },
      source: '1inch Aggregation Protocol',
      timestamp: Date.now(),
    };

    return NextResponse.json(formattedQuote);
  } catch (error: any) {
    console.error('Error in swap quote API:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

