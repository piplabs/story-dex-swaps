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

  get tradingVolumeUSD(): BigInt {
    let value = this.get("tradingVolumeUSD");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set tradingVolumeUSD(value: BigInt) {
    this.set("tradingVolumeUSD", Value.fromBigInt(value));
  }

  get tradingVolumeNative(): BigInt {
    let value = this.get("tradingVolumeNative");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set tradingVolumeNative(value: BigInt) {
    this.set("tradingVolumeNative", Value.fromBigInt(value));
  }

  get tvlUSD(): BigInt {
    let value = this.get("tvlUSD");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set tvlUSD(value: BigInt) {
    this.set("tvlUSD", Value.fromBigInt(value));
  }

  get tvlNative(): BigInt {
    let value = this.get("tvlNative");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set tvlNative(value: BigInt) {
    this.set("tvlNative", Value.fromBigInt(value));
  }

  get balances(): TokenBalanceLoader {
    return new TokenBalanceLoader(
      "Account",
      this.get("id")!.toString(),
      "balances",
    );
  }

  get swaps(): TokenSwapLoader {
    return new TokenSwapLoader("Account", this.get("id")!.toString(), "swaps");
  }
}

export class Block extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Block entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Block must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Block", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Block | null {
    return changetype<Block | null>(store.get_in_block("Block", id));
  }

  static load(id: string): Block | null {
    return changetype<Block | null>(store.get("Block", id));
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

  get height(): i32 {
    let value = this.get("height");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set height(value: i32) {
    this.set("height", Value.fromI32(value));
  }

  get timestamp(): i64 {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toTimestamp();
    }
  }

  set timestamp(value: i64) {
    this.set("timestamp", Value.fromTimestamp(value));
  }
}

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

  get latestPriceUSD(): BigInt {
    let value = this.get("latestPriceUSD");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set latestPriceUSD(value: BigInt) {
    this.set("latestPriceUSD", Value.fromBigInt(value));
  }

  get latestPriceNative(): BigInt {
    let value = this.get("latestPriceNative");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set latestPriceNative(value: BigInt) {
    this.set("latestPriceNative", Value.fromBigInt(value));
  }

  get tvl(): BigInt {
    let value = this.get("tvl");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set tvl(value: BigInt) {
    this.set("tvl", Value.fromBigInt(value));
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

  get amount(): BigInt {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}

export class TokenPrice extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TokenPrice entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenPrice must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("TokenPrice", id.toString(), this);
    }
  }

  static loadInBlock(id: string): TokenPrice | null {
    return changetype<TokenPrice | null>(store.get_in_block("TokenPrice", id));
  }

  static load(id: string): TokenPrice | null {
    return changetype<TokenPrice | null>(store.get("TokenPrice", id));
  }

  get id(): i64 {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI64();
    }
  }

  set id(value: i64) {
    this.set("id", Value.fromI64(value));
  }

  get timestamp(): i64 {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toTimestamp();
    }
  }

  set timestamp(value: i64) {
    this.set("timestamp", Value.fromTimestamp(value));
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

  get priceUSD(): BigInt {
    let value = this.get("priceUSD");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set priceUSD(value: BigInt) {
    this.set("priceUSD", Value.fromBigInt(value));
  }

  get priceNative(): BigInt {
    let value = this.get("priceNative");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set priceNative(value: BigInt) {
    this.set("priceNative", Value.fromBigInt(value));
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

  get totalVolumeUSD(): BigInt {
    let value = this.get("totalVolumeUSD");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalVolumeUSD(value: BigInt) {
    this.set("totalVolumeUSD", Value.fromBigInt(value));
  }

  get totalVolumeNative(): BigInt {
    let value = this.get("totalVolumeNative");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set totalVolumeNative(value: BigInt) {
    this.set("totalVolumeNative", Value.fromBigInt(value));
  }

  get tvlUSD(): BigInt {
    let value = this.get("tvlUSD");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set tvlUSD(value: BigInt) {
    this.set("tvlUSD", Value.fromBigInt(value));
  }

  get tvlNative(): BigInt {
    let value = this.get("tvlNative");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set tvlNative(value: BigInt) {
    this.set("tvlNative", Value.fromBigInt(value));
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

  get fee(): BigInt | null {
    let value = this.get("fee");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set fee(value: BigInt | null) {
    if (!value) {
      this.unset("fee");
    } else {
      this.set("fee", Value.fromBigInt(<BigInt>value));
    }
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

  get tvl0(): BigInt {
    let value = this.get("tvl0");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set tvl0(value: BigInt) {
    this.set("tvl0", Value.fromBigInt(value));
  }

  get tvl1(): BigInt {
    let value = this.get("tvl1");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set tvl1(value: BigInt) {
    this.set("tvl1", Value.fromBigInt(value));
  }

  get block(): string {
    let value = this.get("block");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set block(value: string) {
    this.set("block", Value.fromString(value));
  }

  get createdAtTxnId(): string {
    let value = this.get("createdAtTxnId");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set createdAtTxnId(value: string) {
    this.set("createdAtTxnId", Value.fromString(value));
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

  get id(): i64 {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI64();
    }
  }

  set id(value: i64) {
    this.set("id", Value.fromI64(value));
  }

  get timestamp(): i64 {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toTimestamp();
    }
  }

  set timestamp(value: i64) {
    this.set("timestamp", Value.fromTimestamp(value));
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

  get zeroForOne(): boolean {
    let value = this.get("zeroForOne");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set zeroForOne(value: boolean) {
    this.set("zeroForOne", Value.fromBoolean(value));
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

  get amountUSD(): BigInt {
    let value = this.get("amountUSD");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set amountUSD(value: BigInt) {
    this.set("amountUSD", Value.fromBigInt(value));
  }

  get amountNative(): BigInt {
    let value = this.get("amountNative");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set amountNative(value: BigInt) {
    this.set("amountNative", Value.fromBigInt(value));
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

export class TokenPairEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TokenPairEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenPairEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("TokenPairEvent", id.toString(), this);
    }
  }

  static loadInBlock(id: string): TokenPairEvent | null {
    return changetype<TokenPairEvent | null>(
      store.get_in_block("TokenPairEvent", id),
    );
  }

  static load(id: string): TokenPairEvent | null {
    return changetype<TokenPairEvent | null>(store.get("TokenPairEvent", id));
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

  get block(): string {
    let value = this.get("block");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set block(value: string) {
    this.set("block", Value.fromString(value));
  }

  get txnId(): string {
    let value = this.get("txnId");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set txnId(value: string) {
    this.set("txnId", Value.fromString(value));
  }

  get txnIndex(): i32 {
    let value = this.get("txnIndex");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set txnIndex(value: i32) {
    this.set("txnIndex", Value.fromI32(value));
  }

  get eventIndex(): i32 {
    let value = this.get("eventIndex");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set eventIndex(value: i32) {
    this.set("eventIndex", Value.fromI32(value));
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

  get eventType(): string {
    let value = this.get("eventType");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set eventType(value: string) {
    this.set("eventType", Value.fromString(value));
  }

  get amount0(): BigInt | null {
    let value = this.get("amount0");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount0(value: BigInt | null) {
    if (!value) {
      this.unset("amount0");
    } else {
      this.set("amount0", Value.fromBigInt(<BigInt>value));
    }
  }

  get amount1(): BigInt | null {
    let value = this.get("amount1");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount1(value: BigInt | null) {
    if (!value) {
      this.unset("amount1");
    } else {
      this.set("amount1", Value.fromBigInt(<BigInt>value));
    }
  }

  get amount0In(): BigInt | null {
    let value = this.get("amount0In");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount0In(value: BigInt | null) {
    if (!value) {
      this.unset("amount0In");
    } else {
      this.set("amount0In", Value.fromBigInt(<BigInt>value));
    }
  }

  get amount1Out(): BigInt | null {
    let value = this.get("amount1Out");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount1Out(value: BigInt | null) {
    if (!value) {
      this.unset("amount1Out");
    } else {
      this.set("amount1Out", Value.fromBigInt(<BigInt>value));
    }
  }

  get amount0Out(): BigInt | null {
    let value = this.get("amount0Out");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount0Out(value: BigInt | null) {
    if (!value) {
      this.unset("amount0Out");
    } else {
      this.set("amount0Out", Value.fromBigInt(<BigInt>value));
    }
  }

  get amount1In(): BigInt | null {
    let value = this.get("amount1In");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount1In(value: BigInt | null) {
    if (!value) {
      this.unset("amount1In");
    } else {
      this.set("amount1In", Value.fromBigInt(<BigInt>value));
    }
  }

  get reserve0(): BigInt | null {
    let value = this.get("reserve0");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set reserve0(value: BigInt | null) {
    if (!value) {
      this.unset("reserve0");
    } else {
      this.set("reserve0", Value.fromBigInt(<BigInt>value));
    }
  }

  get reserve1(): BigInt | null {
    let value = this.get("reserve1");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set reserve1(value: BigInt | null) {
    if (!value) {
      this.unset("reserve1");
    } else {
      this.set("reserve1", Value.fromBigInt(<BigInt>value));
    }
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
