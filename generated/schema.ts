// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal,
} from "@graphprotocol/graph-ts";

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Token entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Token must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Token", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Token | null {
    return changetype<Token | null>(store.get_in_block("Token", id));
  }

  static load(id: string): Token | null {
    return changetype<Token | null>(store.get("Token", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get decimals(): i32 {
    let value = this.get("decimals");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set decimals(value: i32) {
    this.set("decimals", Value.fromI32(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }

  get circulatingSupply(): BigInt {
    let value = this.get("circulatingSupply");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set circulatingSupply(value: BigInt) {
    this.set("circulatingSupply", Value.fromBigInt(value));
  }

  get balances(): TokenBalanceLoader {
    return new TokenBalanceLoader(
      "Token",
      this.get("id")!.toString(),
      "balances",
    );
  }

  get approvals(): TokenApprovalLoader {
    return new TokenApprovalLoader(
      "Token",
      this.get("id")!.toString(),
      "approvals",
    );
  }

  get burns(): TokenBurnLoader {
    return new TokenBurnLoader("Token", this.get("id")!.toString(), "burns");
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Account must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Account", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Account | null {
    return changetype<Account | null>(store.get_in_block("Account", id));
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get balances(): TokenBalanceLoader {
    return new TokenBalanceLoader(
      "Account",
      this.get("id")!.toString(),
      "balances",
    );
  }

  get incomingApprovals(): TokenApprovalLoader {
    return new TokenApprovalLoader(
      "Account",
      this.get("id")!.toString(),
      "incomingApprovals",
    );
  }

  get outgoingApprovals(): TokenApprovalLoader {
    return new TokenApprovalLoader(
      "Account",
      this.get("id")!.toString(),
      "outgoingApprovals",
    );
  }

  get swaps(): TokenSwapLoader {
    return new TokenSwapLoader("Account", this.get("id")!.toString(), "swaps");
  }
}

export class TokenBalance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TokenBalance entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenBalance must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("TokenBalance", id.toString(), this);
    }
  }

  static loadInBlock(id: string): TokenBalance | null {
    return changetype<TokenBalance | null>(
      store.get_in_block("TokenBalance", id),
    );
  }

  static load(id: string): TokenBalance | null {
    return changetype<TokenBalance | null>(store.get("TokenBalance", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get account(): string {
    let value = this.get("account");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }
}

export class TokenApproval extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TokenApproval entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenApproval must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("TokenApproval", id.toString(), this);
    }
  }

  static loadInBlock(id: string): TokenApproval | null {
    return changetype<TokenApproval | null>(
      store.get_in_block("TokenApproval", id),
    );
  }

  static load(id: string): TokenApproval | null {
    return changetype<TokenApproval | null>(store.get("TokenApproval", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get ownerAccount(): string {
    let value = this.get("ownerAccount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set ownerAccount(value: string) {
    this.set("ownerAccount", Value.fromString(value));
  }

  get spenderAccount(): string {
    let value = this.get("spenderAccount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set spenderAccount(value: string) {
    this.set("spenderAccount", Value.fromString(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }
}

export class TokenBurn extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TokenBurn entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenBurn must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("TokenBurn", id.toString(), this);
    }
  }

  static loadInBlock(id: string): TokenBurn | null {
    return changetype<TokenBurn | null>(store.get_in_block("TokenBurn", id));
  }

  static load(id: string): TokenBurn | null {
    return changetype<TokenBurn | null>(store.get("TokenBurn", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get account(): string {
    let value = this.get("account");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }
}

export class TokenLocker extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TokenLocker entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenLocker must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("TokenLocker", id.toString(), this);
    }
  }

  static loadInBlock(id: string): TokenLocker | null {
    return changetype<TokenLocker | null>(
      store.get_in_block("TokenLocker", id),
    );
  }

  static load(id: string): TokenLocker | null {
    return changetype<TokenLocker | null>(store.get("TokenLocker", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): string {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set address(value: string) {
    this.set("address", Value.fromString(value));
  }
}

export class DEX extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DEX entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DEX must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("DEX", id.toString(), this);
    }
  }

  static loadInBlock(id: string): DEX | null {
    return changetype<DEX | null>(store.get_in_block("DEX", id));
  }

  static load(id: string): DEX | null {
    return changetype<DEX | null>(store.get("DEX", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get swapRouters(): Array<string> {
    let value = this.get("swapRouters");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toStringArray();
    }
  }

  set swapRouters(value: Array<string>) {
    this.set("swapRouters", Value.fromStringArray(value));
  }

  get pairs(): TokenPairLoader {
    return new TokenPairLoader("DEX", this.get("id")!.toString(), "pairs");
  }
}

export class TokenPair extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TokenPair entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenPair must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("TokenPair", id.toString(), this);
    }
  }

  static loadInBlock(id: string): TokenPair | null {
    return changetype<TokenPair | null>(store.get_in_block("TokenPair", id));
  }

  static load(id: string): TokenPair | null {
    return changetype<TokenPair | null>(store.get("TokenPair", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get token0(): string {
    let value = this.get("token0");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set token0(value: string) {
    this.set("token0", Value.fromString(value));
  }

  get token1(): string {
    let value = this.get("token1");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set token1(value: string) {
    this.set("token1", Value.fromString(value));
  }

  get exchange(): string {
    let value = this.get("exchange");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set exchange(value: string) {
    this.set("exchange", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }
}

export class TokenSwap extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TokenSwap entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenSwap must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("TokenSwap", id.toString(), this);
    }
  }

  static loadInBlock(id: string): TokenSwap | null {
    return changetype<TokenSwap | null>(store.get_in_block("TokenSwap", id));
  }

  static load(id: string): TokenSwap | null {
    return changetype<TokenSwap | null>(store.get("TokenSwap", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pair(): string {
    let value = this.get("pair");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set pair(value: string) {
    this.set("pair", Value.fromString(value));
  }

  get tokenIn(): string {
    let value = this.get("tokenIn");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set tokenIn(value: string) {
    this.set("tokenIn", Value.fromString(value));
  }

  get tokenOut(): string {
    let value = this.get("tokenOut");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set tokenOut(value: string) {
    this.set("tokenOut", Value.fromString(value));
  }

  get swapIn(): BigInt {
    let value = this.get("swapIn");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set swapIn(value: BigInt) {
    this.set("swapIn", Value.fromBigInt(value));
  }

  get swapOut(): BigInt {
    let value = this.get("swapOut");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set swapOut(value: BigInt) {
    this.set("swapOut", Value.fromBigInt(value));
  }

  get swapInExact(): boolean {
    let value = this.get("swapInExact");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set swapInExact(value: boolean) {
    this.set("swapInExact", Value.fromBoolean(value));
  }

  get account(): string {
    let value = this.get("account");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get exchange(): string {
    let value = this.get("exchange");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set exchange(value: string) {
    this.set("exchange", Value.fromString(value));
  }
}

export class TokenAddLiquidity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TokenAddLiquidity entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenAddLiquidity must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("TokenAddLiquidity", id.toString(), this);
    }
  }

  static loadInBlock(id: string): TokenAddLiquidity | null {
    return changetype<TokenAddLiquidity | null>(
      store.get_in_block("TokenAddLiquidity", id),
    );
  }

  static load(id: string): TokenAddLiquidity | null {
    return changetype<TokenAddLiquidity | null>(
      store.get("TokenAddLiquidity", id),
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pair(): string {
    let value = this.get("pair");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set pair(value: string) {
    this.set("pair", Value.fromString(value));
  }

  get token0Amount(): BigInt {
    let value = this.get("token0Amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set token0Amount(value: BigInt) {
    this.set("token0Amount", Value.fromBigInt(value));
  }

  get token1Amount(): BigInt {
    let value = this.get("token1Amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set token1Amount(value: BigInt) {
    this.set("token1Amount", Value.fromBigInt(value));
  }

  get tickLower(): i32 {
    let value = this.get("tickLower");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set tickLower(value: i32) {
    this.set("tickLower", Value.fromI32(value));
  }

  get tickUpper(): i32 {
    let value = this.get("tickUpper");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set tickUpper(value: i32) {
    this.set("tickUpper", Value.fromI32(value));
  }

  get account(): string {
    let value = this.get("account");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }
}

export class TokenRemoveLiquidity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TokenRemoveLiquidity entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenRemoveLiquidity must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("TokenRemoveLiquidity", id.toString(), this);
    }
  }

  static loadInBlock(id: string): TokenRemoveLiquidity | null {
    return changetype<TokenRemoveLiquidity | null>(
      store.get_in_block("TokenRemoveLiquidity", id),
    );
  }

  static load(id: string): TokenRemoveLiquidity | null {
    return changetype<TokenRemoveLiquidity | null>(
      store.get("TokenRemoveLiquidity", id),
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pair(): string {
    let value = this.get("pair");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set pair(value: string) {
    this.set("pair", Value.fromString(value));
  }

  get token0Amount(): BigInt {
    let value = this.get("token0Amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set token0Amount(value: BigInt) {
    this.set("token0Amount", Value.fromBigInt(value));
  }

  get token1Amount(): BigInt {
    let value = this.get("token1Amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set token1Amount(value: BigInt) {
    this.set("token1Amount", Value.fromBigInt(value));
  }

  get tickLower(): i32 {
    let value = this.get("tickLower");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set tickLower(value: i32) {
    this.set("tickLower", Value.fromI32(value));
  }

  get tickUpper(): i32 {
    let value = this.get("tickUpper");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set tickUpper(value: i32) {
    this.set("tickUpper", Value.fromI32(value));
  }

  get account(): string {
    let value = this.get("account");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }
}

export class TokenBalanceLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): TokenBalance[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<TokenBalance[]>(value);
  }
}

export class TokenApprovalLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): TokenApproval[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<TokenApproval[]>(value);
  }
}

export class TokenBurnLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): TokenBurn[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<TokenBurn[]>(value);
  }
}

export class TokenSwapLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): TokenSwap[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<TokenSwap[]>(value);
  }
}

export class TokenPairLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): TokenPair[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<TokenPair[]>(value);
  }
}
