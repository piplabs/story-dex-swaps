import { BigInt } from "@graphprotocol/graph-ts";

import {
  TokenAddLiquidity,
  TokenPair,
  TokenRemoveLiquidity,
  TokenSwap,
} from "../../generated/schema";
import { Mint, Burn, Swap } from "../../generated/UniswapV2Pair/UniswapV2Pair";
import { loadOrCreateAccount } from "../utils";

export function handlePositionMint(event: Mint): void {
  const tokenPairId = event.address.toHex();
  let tokenPair = TokenPair.load(tokenPairId);
  if (!tokenPair) {
    return;
  }

  const account = loadOrCreateAccount(event.params.sender);

  const addLiquidityId =
    event.transaction.hash.toHex() + "-" + event.transactionLogIndex.toString();
  const addLiquidity = new TokenAddLiquidity(addLiquidityId);
  addLiquidity.pair = tokenPair.id;
  addLiquidity.token0Amount = event.params.amount0;
  addLiquidity.token1Amount = event.params.amount1;
  // liquidity = sqrt(amount0 * amount1)
  // addLiquidity.liquidity = event.params.amount0.times(event.params.amount1).sqrt();
  addLiquidity.account = account.id;
  addLiquidity.save();
}

export function handlePositionBurn(event: Burn): void {
  const tokenPairId = event.address.toHex();
  let tokenPair = TokenPair.load(tokenPairId);
  if (!tokenPair) {
    return;
  }

  const account = loadOrCreateAccount(event.params.sender);

  const removeLiquidityId =
    event.transaction.hash.toHex() + "-" + event.transactionLogIndex.toString();
  const removeLiquidity = new TokenRemoveLiquidity(removeLiquidityId);
  removeLiquidity.pair = tokenPair.id;
  removeLiquidity.token0Amount = event.params.amount0;
  removeLiquidity.token1Amount = event.params.amount1;
  removeLiquidity.account = account.id;
  removeLiquidity.save();
}

export function handleTokenSwap(event: Swap): void {
  const tokenPairId = event.address.toHex();
  let tokenPair = TokenPair.load(tokenPairId);
  if (!tokenPair) {
    return;
  }

  const account = loadOrCreateAccount(event.params.sender);

  const swapId =
    event.transaction.hash.toHex() + "-" + event.transactionLogIndex.toString();
  const swap = new TokenSwap(swapId);
  swap.pair = tokenPair.id;
  swap.tokenIn = tokenPair.token0;
  swap.tokenOut = tokenPair.token1;

  const token0In = event.params.amount0In > BigInt.fromString("0");

  swap.swapIn = token0In ? event.params.amount0In : event.params.amount1In;
  swap.swapOut = token0In ? event.params.amount1Out : event.params.amount0Out;
  swap.swapInExact = token0In ? event.params.amount0In.gt(BigInt.fromString("0")) : event.params.amount1In.gt(BigInt.fromString("0"));
  swap.account = account.id;
  swap.exchange = tokenPair.exchange;

  swap.price = swap.swapOut.div(swap.swapIn);
  swap.volume = swap.swapOut; // TODO: use the quote token as the volume
  swap.save();
}
