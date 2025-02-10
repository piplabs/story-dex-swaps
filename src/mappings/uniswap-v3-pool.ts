import { Address, BigInt, log } from "@graphprotocol/graph-ts";

import {
  Token,
  TokenAddLiquidity,
  TokenBalance,
  TokenPair,
  TokenPairEvent,
  TokenPrice,
  TokenRemoveLiquidity,
  TokenSwap,
} from "../../generated/schema";
import { Mint, Burn, Swap } from "../../generated/UniswapV3Pool/UniswapV3Pool";
import {
  IP_ADDRESS,
  loadOrCreateAccount,
  loadOrCreateDEX,
  PRICE_PRECISION,
  USDC_ADDRESS,
  WHITELISTED_DEX_ADDRESSES_MAPPING,
} from "../utils";

export function handlePositionMint(event: Mint): void {
  const tokenPairId = event.address.toHex();

  let tokenPair = TokenPair.load(tokenPairId);
  if (!tokenPair) {
    log.debug("TokenPair not found for ID: {}", [tokenPairId]);
    return;
  }

  if (!WHITELISTED_DEX_ADDRESSES_MAPPING.has(tokenPair.exchange)) {
    log.debug("DEX not whitelisted: {}", [tokenPair.exchange]);
    return;
  }

  log.debug("Handling Mint event for pair: {}", [tokenPairId]);
  log.debug("Found TokenPair. Token0: {}, Token1: {}", [
    tokenPair.token0,
    tokenPair.token1,
  ]);

  const account = loadOrCreateAccount(event.params.owner);

  const addLiquidityId =
    event.transaction.hash.toHex() + "-" + event.transactionLogIndex.toString();
  const addLiquidity = new TokenAddLiquidity(addLiquidityId);
  addLiquidity.pair = tokenPair.id;
  addLiquidity.token0Amount = event.params.amount0;
  addLiquidity.token1Amount = event.params.amount1;
  addLiquidity.tickLower = event.params.tickLower;
  addLiquidity.tickUpper = event.params.tickUpper;
  addLiquidity.account = account.id;
  addLiquidity.save();

  const token0 = Token.load(tokenPair.token0)!;
  const token1 = Token.load(tokenPair.token1)!;

  const dex = loadOrCreateDEX(Address.fromString(tokenPair.exchange));
  if (!dex) {
    log.debug("DEX not found for pair: {}", [tokenPairId]);
    return;
  }

  // First subtract current pair TVL from DEX TVL
  dex.tvlUSD = dex.tvlUSD
    .minus(token0.tvl.times(token0.latestPriceUSD).div(PRICE_PRECISION))
    .minus(token1.tvl.times(token1.latestPriceUSD).div(PRICE_PRECISION));
  dex.tvlNative = dex.tvlNative
    .minus(token0.tvl.times(token0.latestPriceNative).div(PRICE_PRECISION))
    .minus(token1.tvl.times(token1.latestPriceNative).div(PRICE_PRECISION));

  // Update token TVL
  token0.tvl = token0.tvl.plus(event.params.amount0);
  token1.tvl = token1.tvl.plus(event.params.amount1);
  token0.save();
  token1.save();
  // Update pair TVL
  tokenPair.tvl0 = tokenPair.tvl0.plus(event.params.amount0);
  tokenPair.tvl1 = tokenPair.tvl1.plus(event.params.amount1);
  tokenPair.save();

  // Add updated pair TVL back to DEX TVL
  dex.tvlUSD = dex.tvlUSD
    .plus(token0.tvl.times(token0.latestPriceUSD).div(PRICE_PRECISION))
    .plus(token1.tvl.times(token1.latestPriceUSD).div(PRICE_PRECISION));
  dex.tvlNative = dex.tvlNative
    .plus(token0.tvl.times(token0.latestPriceNative).div(PRICE_PRECISION))
    .plus(token1.tvl.times(token1.latestPriceNative).div(PRICE_PRECISION));
  dex.save();

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

  log.debug("Handling Burn event for pair: {}", [tokenPairId]);

  const account = loadOrCreateAccount(event.params.owner);

  const removeLiquidityId =
    event.transaction.hash.toHex() + "-" + event.transactionLogIndex.toString();
  const removeLiquidity = new TokenRemoveLiquidity(removeLiquidityId);
  removeLiquidity.pair = tokenPair.id;
  removeLiquidity.token0Amount = event.params.amount0;
  removeLiquidity.token1Amount = event.params.amount1;
  removeLiquidity.tickLower = event.params.tickLower;
  removeLiquidity.tickUpper = event.params.tickUpper;
  removeLiquidity.account = account.id;
  removeLiquidity.save();

  const token0 = Token.load(tokenPair.token0)!;
  const token1 = Token.load(tokenPair.token1)!;

  const dex = loadOrCreateDEX(Address.fromString(tokenPair.exchange));
  if (!dex) {
    log.debug("DEX not found for pair: {}", [tokenPairId]);
    return;
  }

  // First subtract current pair TVL from DEX TVL
  dex.tvlUSD = dex.tvlUSD
    .minus(token0.tvl.times(token0.latestPriceUSD).div(PRICE_PRECISION))
    .minus(token1.tvl.times(token1.latestPriceUSD).div(PRICE_PRECISION));
  dex.tvlNative = dex.tvlNative
    .minus(token0.tvl.times(token0.latestPriceNative).div(PRICE_PRECISION))
    .minus(token1.tvl.times(token1.latestPriceNative).div(PRICE_PRECISION));

  // Update token TVL
  token0.tvl = token0.tvl.minus(event.params.amount0);
  token1.tvl = token1.tvl.minus(event.params.amount1);
  token0.save();
  token1.save();
  // Update pair TVL
  tokenPair.tvl0 = tokenPair.tvl0.minus(event.params.amount0);
  tokenPair.tvl1 = tokenPair.tvl1.minus(event.params.amount1);
  tokenPair.save();

  // Add updated pair TVL back to DEX TVL
  dex.tvlUSD = dex.tvlUSD
    .plus(token0.tvl.times(token0.latestPriceUSD).div(PRICE_PRECISION))
    .plus(token1.tvl.times(token1.latestPriceUSD).div(PRICE_PRECISION));
  dex.tvlNative = dex.tvlNative
    .plus(token0.tvl.times(token0.latestPriceNative).div(PRICE_PRECISION))
    .plus(token1.tvl.times(token1.latestPriceNative).div(PRICE_PRECISION));
  dex.save();

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

  log.debug("Handling Swap event for pair: {}", [tokenPairId]);
  log.debug("Swap amounts - Amount0 delta: {}, Amount1 delta: {}", [
    event.params.amount0.toString(),
    event.params.amount1.toString(),
  ]);

  const account = loadOrCreateAccount(event.params.sender);

  const swapId =
    event.transaction.hash.toHex() + "-" + event.transactionLogIndex.toString();

  const token0Amount = event.params.amount0.abs();
  const token1Amount = event.params.amount1.abs();
  const zeroForOne = event.params.amount1.lt(BigInt.zero());
  const swap = new TokenSwap(swapId);

  swap.pair = tokenPair.id;
  swap.token0Amount = token0Amount;
  swap.token1Amount = token1Amount;
  swap.zeroForOne = zeroForOne;
  swap.account = account.id;
  swap.exchange = tokenPair.exchange;

  const token0 = Token.load(tokenPair.token0)!;
  const token1 = Token.load(tokenPair.token1)!;

  const dex = loadOrCreateDEX(Address.fromString(tokenPair.exchange));
  if (!dex) {
    log.debug("DEX not found for pair: {}", [tokenPairId]);
    return;
  }

  // Update DEX TVL before price impact
  dex.tvlUSD = dex.tvlUSD
    .minus(token0.tvl.times(token0.latestPriceUSD).div(PRICE_PRECISION))
    .minus(token1.tvl.times(token1.latestPriceUSD).div(PRICE_PRECISION));
  dex.tvlNative = dex.tvlNative
    .minus(token0.tvl.times(token0.latestPriceNative).div(PRICE_PRECISION))
    .minus(token1.tvl.times(token1.latestPriceNative).div(PRICE_PRECISION));

  // update token TVL - Fix: Use the actual signed amounts
  token0.tvl = token0.tvl.plus(event.params.amount0);
  token1.tvl = token1.tvl.plus(event.params.amount1);

  // Update pair TVL as well
  tokenPair.tvl0 = tokenPair.tvl0.plus(event.params.amount0);
  tokenPair.tvl1 = tokenPair.tvl1.plus(event.params.amount1);
  tokenPair.save();

  // Calculate price impact

  // Update token prices
  log.debug("Token0: {}, Token1: {}", [token0.id, token1.id]);
  log.debug("Token0Amount: {}, Token1Amount: {}", [
    token0Amount.toString(),
    token1Amount.toString(),
  ]);
  log.debug("Token0LatestPriceUSD: {}, Token1LatestPriceUSD: {}", [
    token0.latestPriceUSD.toString(),
    token1.latestPriceUSD.toString(),
  ]);
  log.debug("Token0LatestPriceNative: {}, Token1LatestPriceNative: {}", [
    token0.latestPriceNative.toString(),
    token1.latestPriceNative.toString(),
  ]);
  log.debug("USDCToNativePrice: {}", [getUSDCToNativePrice().toString()]);
  log.debug("USDC: {}, IP: {}", [USDC_ADDRESS, IP_ADDRESS]);

  if (token0.id == USDC_ADDRESS) {
    const price = token0Amount.times(PRICE_PRECISION).div(token1Amount);
    log.debug("Token0 is USDC, updating token1 price: {}", [price.toString()]);
    token1.latestPriceUSD = price;
    if (token1.id == IP_ADDRESS) {
      token1.latestPriceNative = PRICE_PRECISION;
    } else {
      token1.latestPriceNative = price
        .times(getUSDCToNativePrice())
        .div(PRICE_PRECISION);
    }
    // token1.save()
  } else if (token0.id == IP_ADDRESS) {
    const priceNative = token0Amount.times(PRICE_PRECISION).div(token1Amount);
    log.debug("Token0 is IP, updating token1 price: {}", [
      priceNative.toString(),
    ]);
    const ipToken = Token.load(IP_ADDRESS)!;
    token1.latestPriceNative = priceNative;
    if (token1.id == USDC_ADDRESS) {
      token1.latestPriceUSD = PRICE_PRECISION;
    } else {
      token1.latestPriceUSD = priceNative
        .times(ipToken.latestPriceUSD)
        .div(PRICE_PRECISION);
    }
    // token1.save()
  }

  if (token1.id == USDC_ADDRESS) {
    const price = token1Amount.times(PRICE_PRECISION).div(token0Amount);
    log.debug("Token1 is USDC, updating token0 price: {}", [price.toString()]);
    token0.latestPriceUSD = price;
    if (token0.id == IP_ADDRESS) {
      token0.latestPriceNative = PRICE_PRECISION;
    } else {
      token0.latestPriceNative = price
        .times(getUSDCToNativePrice())
        .div(PRICE_PRECISION);
    }
    // token0.save()
  } else if (token1.id == IP_ADDRESS) {
    const priceNative = token1Amount.times(PRICE_PRECISION).div(token0Amount);
    log.debug("Token1 is IP, updating token0 price: {}", [
      priceNative.toString(),
    ]);
    const ipToken = Token.load(IP_ADDRESS)!;
    token0.latestPriceNative = priceNative;
    if (token0.id == USDC_ADDRESS) {
      token0.latestPriceUSD = PRICE_PRECISION;
    } else {
      token0.latestPriceUSD = priceNative
        .times(ipToken.latestPriceUSD)
        .div(PRICE_PRECISION);
    }
    // token0.save()
  }

  token0.save();
  token1.save();
  // Still create TokenPrice entries for historical data
  const token0Price = new TokenPrice(swapId);
  const token1Price = new TokenPrice(swapId);
  token0Price.token = token0.id;
  token0Price.priceUSD = token0.latestPriceUSD;
  token0Price.priceNative = token0.latestPriceNative;
  token1Price.token = token1.id;
  token1Price.priceUSD = token1.latestPriceUSD;
  token1Price.priceNative = token1.latestPriceNative;
  token0Price.save();
  token1Price.save();

  // Update volume
  let volumeUSD: BigInt;
  if (token0.id == USDC_ADDRESS) {
    volumeUSD = token0Amount;
  } else if (token1.id == USDC_ADDRESS) {
    volumeUSD = token1Amount;
  } else {
    volumeUSD = token0Amount.times(token0.latestPriceUSD).div(PRICE_PRECISION);
  }

  const volumeNative = volumeUSD
    .times(getUSDCToNativePrice())
    .div(PRICE_PRECISION);

  swap.amountUSD = volumeUSD;
  swap.amountNative = volumeNative;
  swap.save();

  // Update account trading volume
  account.tradingVolumeUSD = account.tradingVolumeUSD.plus(volumeUSD);
  account.tradingVolumeNative = account.tradingVolumeNative.plus(volumeNative);
  account.save();

  // update DEX TVL after price impact
  dex.tvlUSD = dex.tvlUSD
    .plus(token0.tvl.times(token0.latestPriceUSD).div(PRICE_PRECISION))
    .plus(token1.tvl.times(token1.latestPriceUSD).div(PRICE_PRECISION));
  dex.tvlNative = dex.tvlNative
    .plus(token0.tvl.times(token0.latestPriceNative).div(PRICE_PRECISION))
    .plus(token1.tvl.times(token1.latestPriceNative).div(PRICE_PRECISION));

  // Update DEX total volume
  dex.totalVolumeUSD = dex.totalVolumeUSD.plus(volumeUSD);
  dex.totalVolumeNative = dex.totalVolumeNative.plus(volumeNative);
  dex.save();
  swap.save();

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
  tokenPairEvent.amount0In = zeroForOne ? event.params.amount0 : BigInt.zero();
  tokenPairEvent.amount1Out = zeroForOne ? event.params.amount1 : BigInt.zero();
  tokenPairEvent.amount0Out = zeroForOne ? BigInt.zero() : event.params.amount0;
  tokenPairEvent.amount1In = zeroForOne ? event.params.amount1 : BigInt.zero();
  // TODO: make sure Transfer events are all processed BEFORE accounting for balances of each pair, so we can get the
  // post-event balances (e.g. reserve of asset0 of a pair AFTER adding liquidity)
  const pairToken0 = TokenBalance.load(tokenPair.token0 + "-" + tokenPairId);
  const pairToken1 = TokenBalance.load(tokenPair.token1 + "-" + tokenPairId);
  tokenPairEvent.reserve0 = pairToken0 ? pairToken0.amount : BigInt.zero();
  tokenPairEvent.reserve1 = pairToken1 ? pairToken1.amount : BigInt.zero();
  tokenPairEvent.save();
}

// Helper functions
function getUSDCToNativePrice(): BigInt {
  const usdc = Token.load(USDC_ADDRESS);
  if (!usdc) {
    return PRICE_PRECISION;
  }
  return usdc.latestPriceNative;
}
