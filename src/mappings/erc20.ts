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

  let tokenBalanceFrom = TokenBalance.load(token.id + "-" + fromAccount.id);
  if (!tokenBalanceFrom) {
    tokenBalanceFrom = new TokenBalance(token.id + "-" + fromAccount.id);
    tokenBalanceFrom.token = token.id;
    tokenBalanceFrom.account = fromAccount.id;
    tokenBalanceFrom.amount = BigInt.zero();
  }

  let tokenBalanceTo = TokenBalance.load(token.id + "-" + toAccount.id);
  if (!tokenBalanceTo) {
    tokenBalanceTo = new TokenBalance(token.id + "-" + toAccount.id);
    tokenBalanceTo.token = token.id;
    tokenBalanceTo.account = toAccount.id;
    tokenBalanceTo.amount = BigInt.zero();
  }

  tokenBalanceFrom.amount = tokenBalanceFrom.amount.minus(value);
  tokenBalanceTo.amount = tokenBalanceTo.amount.plus(value);

  tokenBalanceFrom.save();
  tokenBalanceTo.save();
}