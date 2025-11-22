/**
 * Uniswap v4 Integration Service
 * 
 * Handles swap routing and liquidity management through Uniswap v4 pools
 * with dynamic fee adjustment via VolatilityFeeHook
 */

import { ethers } from "ethers";

/**
 * Uniswap v4 Pool Key structure
 */
export interface PoolKey {
  currency0: string;
  currency1: string;
  fee: number;
  tickSpacing: number;
  hooks: string;
}

/**
 * Swap parameters
 */
export interface SwapParams {
  poolId: string;
  zeroForOne: boolean;
  amountIn: string;
  minAmountOut: string;
  sqrtPriceLimitX96?: string;
}

/**
 * Liquidity parameters
 */
export interface LiquidityParams {
  poolId: string;
  tickLower: number;
  tickUpper: number;
  liquidityDelta: string;
}

/**
 * Pool state information
 */
export interface PoolState {
  sqrtPriceX96: string;
  tick: number;
  liquidity: string;
  feeProtocol: number;
}

export class UniswapService {
  private provider: ethers.Provider;
  private signer: ethers.Signer;
  private vaultAddress: string;
  private vaultContract: ethers.Contract | null = null;

  constructor(
    provider: ethers.Provider,
    signer: ethers.Signer,
    vaultAddress: string
  ) {
    this.provider = provider;
    this.signer = signer;
    this.vaultAddress = vaultAddress;
  }

  /**
   * Initialize the vault contract interface
   */
  async initialize(vaultAbi: any[]): Promise<void> {
    this.vaultContract = new ethers.Contract(
      this.vaultAddress,
      vaultAbi,
      this.signer
    );
    console.log("[Uniswap] Service initialized for vault:", this.vaultAddress);
  }

  /**
   * Execute a swap through Uniswap v4 pool with dynamic fees
   */
  async executeSwap(params: SwapParams): Promise<string> {
    if (!this.vaultContract) {
      throw new Error("Vault contract not initialized");
    }

    const { poolId, zeroForOne, amountIn, sqrtPriceLimitX96 } = params;

    // Default sqrt price limit (max/min)
    const priceLimitDefault = zeroForOne
      ? "4295128739" // MIN_SQRT_RATIO + 1
      : "1461446703485210103287273052203988822378723970342"; // MAX_SQRT_RATIO - 1

    const priceLimit = sqrtPriceLimitX96 || priceLimitDefault;

    console.log(`[Uniswap] Executing swap:`, {
      poolId,
      zeroForOne,
      amountIn,
      priceLimit,
    });

    try {
      // Call swapThroughUniswap on the vault
      const tx = await this.vaultContract.swapThroughUniswap(
        poolId,
        zeroForOne,
        ethers.parseUnits(amountIn, 6), // Assuming 6 decimals for USDC
        priceLimit
      );

      console.log("[Uniswap] Swap transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("[Uniswap] Swap confirmed in block:", receipt.blockNumber);

      return tx.hash;
    } catch (error: any) {
      console.error("[Uniswap] Swap failed:", error.message);
      throw error;
    }
  }

  /**
   * Add liquidity to a Uniswap v4 pool
   */
  async addLiquidity(params: LiquidityParams): Promise<string> {
    if (!this.vaultContract) {
      throw new Error("Vault contract not initialized");
    }

    const { poolId, tickLower, tickUpper, liquidityDelta } = params;

    console.log(`[Uniswap] Adding liquidity:`, {
      poolId,
      tickLower,
      tickUpper,
      liquidityDelta,
    });

    try {
      const tx = await this.vaultContract.addLiquidity(
        poolId,
        tickLower,
        tickUpper,
        liquidityDelta
      );

      console.log("[Uniswap] Add liquidity transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log(
        "[Uniswap] Liquidity added in block:",
        receipt.blockNumber
      );

      return tx.hash;
    } catch (error: any) {
      console.error("[Uniswap] Add liquidity failed:", error.message);
      throw error;
    }
  }

  /**
   * Remove liquidity from a Uniswap v4 pool
   */
  async removeLiquidity(params: LiquidityParams): Promise<string> {
    if (!this.vaultContract) {
      throw new Error("Vault contract not initialized");
    }

    const { poolId, tickLower, tickUpper, liquidityDelta } = params;

    console.log(`[Uniswap] Removing liquidity:`, {
      poolId,
      tickLower,
      tickUpper,
      liquidityDelta,
    });

    try {
      // Make liquidityDelta negative for removal
      const negativeDelta = `-${liquidityDelta}`;

      const tx = await this.vaultContract.removeLiquidity(
        poolId,
        tickLower,
        tickUpper,
        negativeDelta
      );

      console.log("[Uniswap] Remove liquidity transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log(
        "[Uniswap] Liquidity removed in block:",
        receipt.blockNumber
      );

      return tx.hash;
    } catch (error: any) {
      console.error("[Uniswap] Remove liquidity failed:", error.message);
      throw error;
    }
  }

  /**
   * Get pool information
   */
  async getPoolInfo(poolId: string): Promise<{
    key: PoolKey;
    liquidity: string;
  }> {
    if (!this.vaultContract) {
      throw new Error("Vault contract not initialized");
    }

    try {
      const [key, liquidity] = await this.vaultContract.getPoolInfo(poolId);
      return {
        key: {
          currency0: key.currency0,
          currency1: key.currency1,
          fee: key.fee,
          tickSpacing: key.tickSpacing,
          hooks: key.hooks,
        },
        liquidity: liquidity.toString(),
      };
    } catch (error: any) {
      console.error("[Uniswap] Failed to get pool info:", error.message);
      throw error;
    }
  }

  /**
   * Get all active pool IDs
   */
  async getActivePools(): Promise<string[]> {
    if (!this.vaultContract) {
      throw new Error("Vault contract not initialized");
    }

    try {
      const poolIds = await this.vaultContract.getActivePools();
      return poolIds;
    } catch (error: any) {
      console.error("[Uniswap] Failed to get active pools:", error.message);
      throw error;
    }
  }

  /**
   * Calculate optimal swap route based on pool liquidity and fees
   */
  async findBestPool(
    tokenIn: string,
    tokenOut: string
  ): Promise<string | null> {
    try {
      const activePools = await this.getActivePools();

      if (activePools.length === 0) {
        console.log("[Uniswap] No active pools available");
        return null;
      }

      // Find pools that match the token pair
      for (const poolId of activePools) {
        const { key } = await this.getPoolInfo(poolId);
        
        const matchesPair =
          (key.currency0.toLowerCase() === tokenIn.toLowerCase() &&
            key.currency1.toLowerCase() === tokenOut.toLowerCase()) ||
          (key.currency1.toLowerCase() === tokenIn.toLowerCase() &&
            key.currency0.toLowerCase() === tokenOut.toLowerCase());

        if (matchesPair) {
          console.log(`[Uniswap] Found matching pool:`, poolId);
          return poolId;
        }
      }

      console.log("[Uniswap] No matching pool found for pair:", {
        tokenIn,
        tokenOut,
      });
      return null;
    } catch (error: any) {
      console.error("[Uniswap] Error finding best pool:", error.message);
      return null;
    }
  }

  /**
   * Check if Uniswap provides better rates than 1inch for a given swap
   */
  async compareWithOneinch(
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    oneinchQuote: string
  ): Promise<{
    useUniswap: boolean;
    poolId: string | null;
    estimatedOutput: string;
  }> {
    try {
      const poolId = await this.findBestPool(tokenIn, tokenOut);

      if (!poolId) {
        return {
          useUniswap: false,
          poolId: null,
          estimatedOutput: "0",
        };
      }

      // For simplicity, assume 1:1 swap in mock
      // Real implementation would calculate based on pool state
      const estimatedOutput = amountIn;

      // Compare with 1inch quote (assuming quote is in same units)
      const useUniswap = parseFloat(estimatedOutput) > parseFloat(oneinchQuote);

      console.log(`[Uniswap] Comparison result:`, {
        useUniswap,
        uniswapOutput: estimatedOutput,
        oneinchOutput: oneinchQuote,
      });

      return {
        useUniswap,
        poolId,
        estimatedOutput,
      };
    } catch (error: any) {
      console.error("[Uniswap] Comparison failed:", error.message);
      return {
        useUniswap: false,
        poolId: null,
        estimatedOutput: "0",
      };
    }
  }
}

