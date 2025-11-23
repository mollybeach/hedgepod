/**
 * Test The Graph Integration
 * Debug endpoint to see raw Graph data
 */

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const query = `
      query GetTopPools {
        pools(
          first: 3,
          orderBy: totalValueLockedUSD,
          orderDirection: desc,
          where: {
            totalValueLockedUSD_gt: "100000"
          }
        ) {
          id
          token0 {
            symbol
            name
          }
          token1 {
            symbol
            name
          }
          feeTier
          liquidity
          volumeUSD
          totalValueLockedUSD
          token0Price
          token1Price
          poolDayData(first: 1, orderBy: date, orderDirection: desc) {
            date
            volumeUSD
            tvlUSD
          }
        }
      }
    `;

    const endpoint = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      endpoint,
      rawData: data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

