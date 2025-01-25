import { BigInt } from "@graphprotocol/graph-ts";

import { Approval, Transfer } from "../../generated/ERC20/ERC20";
import { TokenApproval, TokenBalance, TokenBurn } from "../../generated/schema";

import {
  loadOrCreateAccount,
  loadOrCreateToken,
  zeroAddress,
  burnAddresses,
} from "../utils";

export function handleApproval(event: Approval): void {
  let token = loadOrCreateToken(event.address);
  if (!token) {
    return;
  }

  let owner = event.params.owner;
  let spender = event.params.spender;
  let value = event.params.value;

  let ownerAccount = loadOrCreateAccount(owner);
  let spenderAccount = loadOrCreateAccount(spender);

  let tokenApproval = TokenApproval.load(
    token.id + "-" + ownerAccount.id + "-" + spenderAccount.id
  );
  if (!tokenApproval) {
    tokenApproval = new TokenApproval(
      token.id + "-" + ownerAccount.id + "-" + spenderAccount.id
    );
    tokenApproval.token = token.id;
    tokenApproval.ownerAccount = ownerAccount.id;
    tokenApproval.spenderAccount = spenderAccount.id;
  }
  tokenApproval.value = value;
  tokenApproval.save();
}

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

  // if not minting from zero address
  if (fromAccount.id != zeroAddress) {
    let fromTokenBalance = TokenBalance.load(token.id + "-" + fromAccount.id);
    if (!fromTokenBalance) {
      fromTokenBalance = new TokenBalance(token.id + "-" + fromAccount.id);
      fromTokenBalance.token = token.id;
      fromTokenBalance.account = fromAccount.id;
      fromTokenBalance.value = BigInt.fromString("0");
    }
    fromTokenBalance.value = fromTokenBalance.value.minus(value);
    fromTokenBalance.save();
  }

  // if not burning to known burn addresses
  if (burnAddresses.indexOf(toAccount.id) == -1) {
    let toTokenBalance = TokenBalance.load(token.id + "-" + toAccount.id);
    if (!toTokenBalance) {
      toTokenBalance = new TokenBalance(token.id + "-" + toAccount.id);
      toTokenBalance.token = token.id;
      toTokenBalance.account = toAccount.id;
      toTokenBalance.value = BigInt.fromString("0");
    }
    toTokenBalance.value = toTokenBalance.value.plus(value);
    toTokenBalance.save();
  } else {
    // burning to known burn addresses
    let tokenBurn = TokenBurn.load(token.id + "-" + toAccount.id);
    if (!tokenBurn) {
      tokenBurn = new TokenBurn(token.id + "-" + toAccount.id);
      tokenBurn.token = token.id;
      tokenBurn.account = toAccount.id;
      tokenBurn.value = BigInt.fromString("0");
    }
    tokenBurn.value = tokenBurn.value.plus(value);
    tokenBurn.save();
  }
}
