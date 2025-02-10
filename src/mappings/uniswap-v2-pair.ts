import { BigInt, log } from "@graphprotocol/graph-ts";

import {
  TokenAddLiquidity,
  TokenBalance,
  TokenPair,
  TokenPairEvent,
  TokenRemoveLiquidity,
} from "../../generated/schema";
import { Mint, Burn, Swap } from "../../generated/UniswapV2Pair/UniswapV2Pair";
import {
  loadOrCreateAccount,
  WHITELISTED_DEX_ADDRESSES_MAPPING,
} from "../utils";

export function handlePositionMint(event: Mint): void {
  const tokenPairId = event.address.toHex();

  let tokenPair = TokenPair.load(tokenPairId);
  if (!tokenPair) {
    log.debug("TokenPair not found for ID: {}", [tokenPairId]);
    return;
  }

  if (WHITELISTED_DEX_ADDRESSES_MAPPING.has(tokenPair.exchange)) {
    log.debug("DEX not whitelisted: {}", [tokenPair.exchange]);
    return;
  }

  const account = loadOrCreateAccount(event.params.sender);

  const addLiquidityId =
    event.transaction.hash.toHex() + "-" + event.transactionLogIndex.toString();
  const addLiquidity = new TokenAddLiquidity(addLiquidityId);
  addLiquidity.pair = tokenPair.id;
  addLiquidity.token0Amount = event.params.amount0;
  addLiquidity.token1Amount = event.params.amount1;
  addLiquidity.account = account.id;
  addLiquidity.save();

  const tokenPairEvent = new TokenPairEvent(
    `${event.transaction.hash.toHex()}-${event.transactionLogIndex}-${event.logIndex}`
  );
  tokenPairEvent.block = event.block.hash.toHex();
  tokenPairEvent.txnId = event.transaction.hash.toHex();
  tokenPairEvent.txnIndex = event.transactionLogIndex.toI32();
  tokenPairEvent.eventIndex = event.logIndex.toI32();
  tokenPairEvent.account = account.id;
  tokenPairEvent.pair = tokenPair.id;
  tokenPairEvent.eventType = "join";
  tokenPairEvent.amount0 = event.params.amount0;
  tokenPairEvent.amount1 = event.params.amount1;
  // TODO: make sure Transfer events are all processed BEFORE accounting for balances of each pair, so we can get the
  // post-event balances (e.g. reserve of asset0 of a pair AFTER adding liquidity)
  const pairToken0 = TokenBalance.load(tokenPair.token0 + "-" + tokenPairId);
  const pairToken1 = TokenBalance.load(tokenPair.token1 + "-" + tokenPairId);
  tokenPairEvent.reserve0 = pairToken0 ? pairToken0.amount : BigInt.zero();
  tokenPairEvent.reserve1 = pairToken1 ? pairToken1.amount : BigInt.zero();
  tokenPairEvent.save();
}

export function handlePositionBurn(event: Burn): void {
  const tokenPairId = event.address.toHex();

  let tokenPair = TokenPair.load(tokenPairId);
  if (!tokenPair) {
    log.debug("TokenPair not found for ID: {}", [tokenPairId]);
    return;
  }

  if (WHITELISTED_DEX_ADDRESSES_MAPPING.has(tokenPair.exchange)) {
    log.debug("DEX not whitelisted: {}", [tokenPair.exchange]);
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

  const tokenPairEvent = new TokenPairEvent(
    `${event.transaction.hash.toHex()}-${event.transactionLogIndex}-${event.logIndex}`
  );
  tokenPairEvent.block = event.block.hash.toHex();
  tokenPairEvent.txnId = event.transaction.hash.toHex();
  tokenPairEvent.txnIndex = event.transactionLogIndex.toI32();
  tokenPairEvent.eventIndex = event.logIndex.toI32();
  tokenPairEvent.account = account.id;
  tokenPairEvent.pair = tokenPair.id;
  tokenPairEvent.eventType = "exit";
  tokenPairEvent.amount0 = event.params.amount0;
  tokenPairEvent.amount1 = event.params.amount1;
  // TODO: make sure Transfer events are all processed BEFORE accounting for balances of each pair, so we can get the
  // post-event balances (e.g. reserve of asset0 of a pair AFTER adding liquidity)
  const pairToken0 = TokenBalance.load(tokenPair.token0 + "-" + tokenPairId);
  const pairToken1 = TokenBalance.load(tokenPair.token1 + "-" + tokenPairId);
  tokenPairEvent.reserve0 = pairToken0 ? pairToken0.amount : BigInt.zero();
  tokenPairEvent.reserve1 = pairToken1 ? pairToken1.amount : BigInt.zero();
  tokenPairEvent.save();
}

export function handleTokenSwap(event: Swap): void {
  const tokenPairId = event.address.toHex();

  let tokenPair = TokenPair.load(tokenPairId);
  if (!tokenPair) {
    log.debug("TokenPair not found for ID: {}", [tokenPairId]);
    return;
  }

  if (WHITELISTED_DEX_ADDRESSES_MAPPING.has(tokenPair.exchange)) {
    log.debug("DEX not whitelisted: {}", [tokenPair.exchange]);
    return;
  }

  const account = loadOrCreateAccount(event.params.sender);

  const tokenPairEvent = new TokenPairEvent(
    `${event.transaction.hash.toHex()}-${event.transactionLogIndex}-${event.logIndex}`
  );
  tokenPairEvent.block = event.block.hash.toHex();
  tokenPairEvent.txnId = event.transaction.hash.toHex();
  tokenPairEvent.txnIndex = event.transactionLogIndex.toI32();
  tokenPairEvent.eventIndex = event.logIndex.toI32();
  tokenPairEvent.account = account.id;
  tokenPairEvent.pair = tokenPair.id;
  tokenPairEvent.eventType = "swap";
  tokenPairEvent.amount0In = event.params.amount0In;
  tokenPairEvent.amount1Out = event.params.amount1Out;
  tokenPairEvent.amount0Out = event.params.amount0Out;
  tokenPairEvent.amount1In = event.params.amount1In;
  // TODO: make sure Transfer events are all processed BEFORE accounting for balances of each pair, so we can get the
  // post-event balances (e.g. reserve of asset0 of a pair AFTER adding liquidity)
  const pairToken0 = TokenBalance.load(tokenPair.token0 + "-" + tokenPairId);
  const pairToken1 = TokenBalance.load(tokenPair.token1 + "-" + tokenPairId);
  tokenPairEvent.reserve0 = pairToken0 ? pairToken0.amount : BigInt.zero();
  tokenPairEvent.reserve1 = pairToken1 ? pairToken1.amount : BigInt.zero();
  tokenPairEvent.save();
}
