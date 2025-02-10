import { BigInt } from "@graphprotocol/graph-ts";

import { Transfer } from "../../generated/ERC20/ERC20";
import { TokenBalance, TokenPair } from "../../generated/schema";

import {
  loadOrCreateAccount,
  loadOrCreateToken,
  zeroAddress,
  burnAddresses,
} from "../utils";

export function handleTransfer(event: Transfer): void {
  let token = loadOrCreateToken(event.address);
  if (!token) {
    return;
  }

  let from = event.params.from;
  let to = event.params.to;
  let value = event.params.value;

  let fromAccount = loadOrCreateAccount(from);
  let toAccount = loadOrCreateAccount(to);

  const isMinting = fromAccount.id == zeroAddress;
  const isBurning = burnAddresses.indexOf(toAccount.id) > -1;

  if (isMinting && isBurning) { // edge case where from and to are both burn addresses
    return;
  }

  if (isMinting) {
    token.circulatingSupply = token.circulatingSupply.plus(value);
    token.save();
  } else if (isBurning) {
    token.circulatingSupply = token.circulatingSupply.minus(value);
    token.save();
  }

  // Track balances for registered v2 and v3 pairs
  const isFromKnownPair = TokenPair.load(from.toHex())
  const isToKnownPair = TokenPair.load(to.toHex())

  if (isFromKnownPair || isToKnownPair) {
    let tokenBalance = TokenBalance.load(token.id + "-" + fromAccount.id);
    if (!tokenBalance) {
      tokenBalance = new TokenBalance(token.id + "-" + fromAccount.id);
      tokenBalance.token = token.id;
      tokenBalance.account = fromAccount.id;
      tokenBalance.amount = BigInt.zero();
    }

    // sending from a pair to an address
    if (isFromKnownPair) {
      tokenBalance.amount = tokenBalance.amount.minus(value);
    }

    // sending from an address to a pair
    if (isToKnownPair) {
      tokenBalance.amount = tokenBalance.amount.plus(value);
    }

    tokenBalance.save();
  }
}