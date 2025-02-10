import { BigInt, log } from "@graphprotocol/graph-ts";

import { PoolCreated } from "../../generated/UniswapV3Factory/UniswapV3Factory";
import { TokenPair, TokenPairEvent } from "../../generated/schema";

import {
  loadOrCreateDEX,
  loadOrCreateToken,
  WHITELISTED_DEX_ADDRESSES_MAPPING,
} from "../utils";

export function handlePoolCreated(event: PoolCreated): void {
  if (!WHITELISTED_DEX_ADDRESSES_MAPPING.has(event.address.toHexString())) {
    log.debug("DEX not whitelisted: {}", [event.address.toHexString()]);
    return;
  }

  log.debug("Handling V3 pool created event at block {}", [
    event.block.number.toString(),
  ]);

  let token0 = loadOrCreateToken(event.params.token0);
  if (!token0) {
    log.warning("Failed to load token0: {}", [
      event.params.token0.toHexString(),
    ]);
    return;
  }

  let token1 = loadOrCreateToken(event.params.token1);
  if (!token1) {
    log.warning("Failed to load token1: {}", [
      event.params.token1.toHexString(),
    ]);
    return;
  }

  const dex = loadOrCreateDEX(event.address);
  if (!dex) {
    log.debug("DEX not found for pair: {}", [event.params.pool.toHexString()]);
    return;
  }

  log.debug("V3 Pool created: {} (token0: {}, token1: {})", [
    event.params.pool.toHex(),
    token0.id,
    token1.id,
  ]);

  let tokenPair = new TokenPair(event.params.pool.toHex());
  tokenPair.token0 = token0.id;
  tokenPair.token1 = token1.id;
  tokenPair.exchange = dex.id;
  tokenPair.fee = BigInt.fromI32(event.params.fee);
  tokenPair.pool = event.params.pool.toHex();
  tokenPair.block = event.block.hash.toHex();
  tokenPair.createdAtTxnId = event.transaction.hash.toHex();
  tokenPair.save();

  const tokenPairEvent = new TokenPairEvent(
    `${event.transaction.hash.toHex()}-${event.transactionLogIndex}-${event.logIndex}`
  );
  tokenPairEvent.block = event.block.hash.toHex();
  tokenPairEvent.txnId = event.transaction.hash.toHex();
  tokenPairEvent.txnIndex = event.transactionLogIndex.toI32();
  tokenPairEvent.eventIndex = event.logIndex.toI32();
  tokenPairEvent.account = event.transaction.from.toHex();
  tokenPairEvent.pair = tokenPair.id;
  tokenPairEvent.eventType = "creation";
  tokenPairEvent.save();
}
