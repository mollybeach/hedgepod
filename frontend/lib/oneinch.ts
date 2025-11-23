/**
 * 1inch API Integration
 * For 1inch $1K "Utilize 1inch APIs" Prize
 * 
 * APIs Used:
 * - Swap API: Get best swap routes and execute swaps
 * - Price API: Real-time token prices
 * - Liquidity Sources API: Available DEX sources
 */

const ONEINCH_API_BASE = 'https://api.1inch.dev/swap/v6.0';
const ONEINCH_API_KEY = process.env.NEXT_PUBLIC_ONEINCH_API_KEY || '';

// Supported chains by 1inch
export const SUPPORTED_CHAINS = {
  ethereum: 1,
  optimism: 10,
  bsc: 56,
  polygon: 137,
  arbitrum: 42161,
  avalanche: 43114,
  base: 8453,
} as const;

export interface SwapQuote {
  fromToken: {
    symbol: string;
    name: string;
    decimals: number;
    address: string;
    logoURI?: string;
  };
  toToken: {
    symbol: string;
    name: string;
    decimals: number;
    address: string;
    logoURI?: string;
  };
  fromAmount: string;
  toAmount: string;
  protocols: Array<{
    name: string;
    part: number;
    fromTokenAddress: string;
    toTokenAddress: string;
  }>;
  estimatedGas: number;
  tx?: {
    from: string;
    to: string;
    data: string;
    value: string;
    gas: number;
    gasPrice: string;
  };
}

export interface TokenPrice {
  [tokenAddress: string]: string; // Price in USD
}

/**
 * Get swap quote from 1inch
 * @param chainId Chain ID
 * @param fromToken Token address to swap from
 * @param toToken Token address to swap to
 * @param amount Amount in smallest unit (wei, satoshi, etc.)
 */
export async function get1inchSwapQuote(
  chainId: number,
  fromToken: string,
  toToken: string,
  amount: string
): Promise<SwapQuote | null> {
  try {
    const url = `${ONEINCH_API_BASE}/${chainId}/quote`;
    const params = new URLSearchParams({
      src: fromToken,
      dst: toToken,
      amount: amount,
    });

    const response = await fetch(`${url}?${params}`, {
      headers: {
        Authorization: `Bearer ${ONEINCH_API_KEY}`,
        accept: 'application/json',
      },
      next: { revalidate: 10 }, // Cache for 10 seconds
    });

    if (!response.ok) {
      console.error(`1inch API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching 1inch quote:', error);
    return null;
  }
}

/**
 * Get swap transaction data from 1inch
 * @param chainId Chain ID
 * @param fromToken Token address to swap from
 * @param toToken Token address to swap to
 * @param amount Amount in smallest unit
 * @param fromAddress User wallet address
 * @param slippage Slippage tolerance (1 = 1%)
 */
export async function get1inchSwapTransaction(
  chainId: number,
  fromToken: string,
  toToken: string,
  amount: string,
  fromAddress: string,
  slippage: number = 1
): Promise<SwapQuote | null> {
  try {
    const url = `${ONEINCH_API_BASE}/${chainId}/swap`;
    const params = new URLSearchParams({
      src: fromToken,
      dst: toToken,
      amount: amount,
      from: fromAddress,
      slippage: slippage.toString(),
      disableEstimate: 'false',
      allowPartialFill: 'false',
    });

    const response = await fetch(`${url}?${params}`, {
      headers: {
        Authorization: `Bearer ${ONEINCH_API_KEY}`,
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`1inch API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching 1inch swap transaction:', error);
    return null;
  }
}

/**
 * Get token prices from 1inch
 * @param chainId Chain ID
 * @param tokenAddresses Array of token addresses
 */
export async function get1inchTokenPrices(
  chainId: number,
  tokenAddresses: string[]
): Promise<TokenPrice | null> {
  try {
    const url = `${ONEINCH_API_BASE}/${chainId}/prices`;
    const params = new URLSearchParams({
      tokens: tokenAddresses.join(','),
    });

    const response = await fetch(`${url}?${params}`, {
      headers: {
        Authorization: `Bearer ${ONEINCH_API_KEY}`,
        accept: 'application/json',
      },
      next: { revalidate: 30 }, // Cache for 30 seconds
    });

    if (!response.ok) {
      console.error(`1inch API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching 1inch prices:', error);
    return null;
  }
}

/**
 * Get all available liquidity sources (DEXs) for a chain
 * @param chainId Chain ID
 */
export async function get1inchLiquiditySources(chainId: number) {
  try {
    const url = `${ONEINCH_API_BASE}/${chainId}/liquidity-sources`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${ONEINCH_API_KEY}`,
        accept: 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`1inch API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching 1inch liquidity sources:', error);
    return null;
  }
}

/**
 * Format 1inch amount (wei/smallest unit) to human-readable
 */
export function format1inchAmount(amount: string, decimals: number): string {
  const num = BigInt(amount);
  const divisor = BigInt(10 ** decimals);
  const whole = num / divisor;
  const remainder = num % divisor;
  
  if (remainder === BigInt(0)) {
    return whole.toString();
  }
  
  const fractional = remainder.toString().padStart(decimals, '0');
  return `${whole}.${fractional.slice(0, 6)}`; // Show 6 decimals max
}

/**
 * Get the best swap route description
 */
export function get1inchRouteDescription(protocols: SwapQuote['protocols']): string {
  if (!protocols || protocols.length === 0) return 'Direct swap';
  
  const uniqueProtocols = [...new Set(protocols.map(p => p.name))];
  
  if (uniqueProtocols.length === 1) {
    return `via ${uniqueProtocols[0]}`;
  }
  
  if (uniqueProtocols.length === 2) {
    return `via ${uniqueProtocols.join(' → ')}`;
  }
  
  return `via ${uniqueProtocols.length} protocols`;
}

