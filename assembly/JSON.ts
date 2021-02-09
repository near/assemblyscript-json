import { Buffer } from "./util";
import { JSONDecoder } from "./decoder";

class Handler {
  stack: Value[] = new Array<Value>();

  reset(): void {
    while (this.stack.length > 0) {
      this.stack.pop();
    }
  }

  get peek(): Value {
    return this.stack[this.stack.length - 1];
  }

  setString(name: string, value: string): void {
    const obj: Value = Value.String(value);
    this.addValue(name, obj);
  }

  setBoolean(name: string, value: bool): void {
    const obj = Value.Bool(value);
    this.addValue(name, obj);
  }

  setNull(name: string): void {
    const obj = Value.Null();
    this.addValue(name, obj);
  }

  setInteger(name: string, value: i64): void {
    const obj = Value.Integer(value);
    this.addValue(name, obj);
  }

  setFloat(name: string, value: f64): void {
    const obj = Value.Float(value);
    this.addValue(name, obj);
  }

  pushArray(name: string): bool {
    const obj: Value = Value.Array();
    if (this.stack.length == 0) {
      this.stack.push(obj);
    } else {
      this.addValue(name, obj);
      this.stack.push(obj);
    }
    return true;
  }

  popArray(): void {
    if (this.stack.length > 1) {
      this.stack.pop();
    }
  }

  pushObject(name: string): bool {
    const obj: Value = Value.Object();
    this.addValue(name, obj);
    this.stack.push(obj);
    return true;
  }

  popObject(): void {
    if (this.stack.length > 1) {
      this.stack.pop();
    }
  }

  addValue(name: string, obj: Value): void {
    if (name.length == 0 && this.stack.length == 0) {
      this.stack.push(obj);
      return;
    }
    if (this.peek instanceof Obj) {
      (this.peek as Obj).set(name, obj);
    } else if (this.peek instanceof Arr) {
      (<Arr>this.peek).push(obj);
    }
  }
}

namespace _JSON {
  // @ts-ignore decorator is valid
  @lazy
  export const handler: Handler = new Handler();
  // @ts-ignore decorator is valid
  @lazy
  export const decoder: JSONDecoder<Handler> = new JSONDecoder<Handler>(
    _JSON.handler
  );

  /** Parses a string or Uint8Array and returns a Json Value. */
  export function parse<T = Uint8Array>(str: T): Value {
    var arr: Uint8Array;
    if (isString<T>(str)) {
      arr = Buffer.fromString(<string>str);
    } else {
      arr = changetype<Uint8Array>(str);
    }
    _JSON.decoder.deserialize(arr);
    const res = _JSON.decoder.handler.peek;
    _JSON.decoder.handler.reset();
    return res;
  }
}

export abstract class Value {
  static String(str: string): Str {
    return new Str(str);
  }
  static Number(num: f64): Num {
    return new Num(num);
  }
  static Float(num: f64): Float {
    return new Float(num);
  }
  static Integer(num: i64): Integer {
    return new Integer(num);
  }
  static Bool(b: bool): Bool {
    return new Bool(b);
  }
  static Null(): Null {
    return new Null();
  }
  static Array(): Arr {
    return new Arr();
  }
  static Object(): Obj {
    return new Obj();
  }

  get isString(): boolean {
    if (this instanceof Str) {
      return true;
    }
    return false;
  }

  get isNum(): boolean {
    if (this instanceof Num) {
      return true;
    }
    return false;
  }

  get isFloat(): boolean {
    if (this instanceof Float) {
      return true;
    }
    return false;
  }

  get isInteger(): boolean {
    if (this instanceof Integer) {
      return true;
    }
    return false;
  }

  get isBool(): boolean {
    if (this instanceof Bool) {
      return true;
    }
    return false;
  }

  get isNull(): boolean {
    if (this instanceof Null) {
      return true;
    }
    return false;
  }

  get isArr(): boolean {
    if (this instanceof Arr) {
      return true;
    }
    return false;
  }

  get isObj(): boolean {
    if (this instanceof Obj) {
      return true;
    }
    return false;
  }

  toString(): string {
    throw new Error("Values must be casted to their JSON type for .toString()");
    return "";
  }
}

export class Str extends Value {
  constructor(public _str: string) {
    super();
  }

  toString(): string {
    return this._str;
  }

  valueOf(): string {
    return this._str;
  }
}

export class Num extends Value {
  constructor(public _num: f64) {
    super();
  }

  toString(): string {
    return this._num.toString();
  }

  valueOf(): f64 {
    return this._num;
  }
}

export class Float extends Num {
}

export class Integer extends Value {
  constructor(public _num: i64) {
    super();
  }

  toString(): string {
    return this._num.toString();
  }

  valueOf(): i64 {
    return this._num;
  }
}

export class Null extends Value {
  constructor() {
    super();
  }

  toString(): string {
    return "null";
  }

  valueOf(): null {
    return null;
  }
}

export class Bool extends Value {
  constructor(public _bool: bool) {
    super();
  }

  toString(): string {
    return this._bool.toString();
  }

  valueOf(): bool {
    return this._bool;
  }
}

export class Arr extends Value {
    _arr: Array<Value>;
    constructor() {
      super();
      this._arr = new Array<Value>();
    }

    push(obj: Value): void {
      this._arr.push(obj);
    }

    toString(): string {
      return (
        "[" +
        this._arr
          .map<string>((val: Value, i: i32, _arr: Value[]): string =>
            val.toString()
          )
          .join(",") +
        "]"
      );
    }

    valueOf(): Array<Value> {
      return this._arr;
    }
}

export class Obj extends Value {
    _obj: Map<string, Value>;
    keys: Array<string>;

    constructor() {
      super();
      this._obj = new Map();
      this.keys = new Array();
    }

    toString(): string {
      const objs: string[] = [];
      for (let i: i32 = 0; i < this.keys.length; i++) {
        let keyValueString = '"' + this.keys[i] + '": ';

        // Cast our value into it's appropriate type
        let value: Value | null = this._obj.get(this.keys[i]);
        
        // Check for null values
        if (value == null || value.isNull) {
          objs.push(keyValueString += "null");
          continue;
        }

        // Cast to our proper type
        if (value.isString) {
          let castedValue = changetype<Str>(value);
          keyValueString += '"' + castedValue.toString() + '"';
        } else if (value.isNum) {
          let castedValue = changetype<Num>(value);
          keyValueString += castedValue.toString();
        } else if (value.isFloat) {
          let castedValue = changetype<Float>(value);
          keyValueString += castedValue.toString();
        } else if (value.isInteger) {
          let castedValue = changetype<Integer>(value);
          keyValueString += castedValue.toString();
        } else if (value.isBool) {
          let castedValue = changetype<Bool>(value);
          keyValueString += castedValue.toString();
        } else if (value.isArr) {
          let castedValue = changetype<Arr>(value);
          keyValueString += castedValue.toString();
        } else if (value.isObj) {
          let castedValue = changetype<Obj>(value);
          keyValueString += castedValue.toString();
        }

        // Push the keyValueString
        objs.push(keyValueString);
      }
      return "{" + objs.join(",") + "}";
    }

    valueOf(): Map<string, Value> {
      return this._obj;
    }


    set<T>(key: string, value: T): void {
      if (isReference<T>(value)) {
        if (value instanceof Value) {
          this._set(key, <Value>value);
          return;
        }
      }
      this._set(key, from<T>(value));
    }
    private _set(key: string, value: Value): void {
      if (!this._obj.has(key)) {
        this.keys.push(key);
      }
      this._obj.set(key, value);
    }

    has(key: string): bool {
      return this._obj.has(key);
    }

    get(key: string): Value | null {
      if (!this._obj.has(key)) {
        return null;
      }
      return this._obj.get(key);
    }

    getValue(key: string): Value | null {
      return this.get(key);
    }

    getString(key: string): Str | null {
      let jsonValue = this.get(key);
      if (jsonValue != null && jsonValue.isString) {
        return changetype<Str>(jsonValue);
      }
      return null;
    }

    getNum(key: string): Num | null {
      let jsonValue = this.get(key);
      if (jsonValue != null && jsonValue.isNum) {
        return changetype<Num>(jsonValue);
      }
      return null;
    }

    getFloat(key: string): Float | null {
      let jsonValue = this.get(key);
      if (jsonValue != null && jsonValue.isFloat) {
        return changetype<Float>(jsonValue);
      }
      return null;
    }

    getInteger(key: string): Integer | null {
      let jsonValue = this.get(key);
      if (jsonValue != null && jsonValue.isInteger) {
        return changetype<Integer>(jsonValue);
      }
      return null;
    }

    getBool(key: string): Bool | null {
      let jsonValue = this.get(key);
      if (jsonValue != null && jsonValue.isBool) {
        return changetype<Bool>(jsonValue);
      }
      return null;
    }

    getArr(key: string): Arr | null {
      let jsonValue = this.get(key);
      if (jsonValue != null && jsonValue.isArr) {
        return changetype<Arr>(jsonValue);
      }
      return null;
    }

    getObj(key: string): Obj | null {
      let jsonValue = this.get(key);
      if (jsonValue != null && jsonValue.isObj) {
        return changetype<Obj>(jsonValue);
      }
      return null;
    }
}

export function from<T>(val: T): Value {
  if (isBoolean<T>(val)) {
    return Value.Bool(<bool>val);
  }
  if (isInteger<T>(val)) {
    return Value.Integer(val);
  }
  if (isFloat<T>(val)) {
    return Value.Float(val);
  }
  if (isString<T>(val)) {
    return Value.String(<string>val);
  }
  if (val == null) {
    return Value.Null();
  }
  if (isArrayLike<T>(val)) {
    const arr = Value.Array();
    for (let i: i32 = 0; i < val.length; i++) {
      // @ts-ignore
      arr.push(from<valueof<T>>(val[i]));
    }
    return arr;
  }
  /**
     * TODO: add object support.
     */
  return Value.Object();
}

// @ts-ignore
@inline
/** Parses a string or Uint8Array and returns a Json Value. */
export function parse<T = Uint8Array>(str: T): Value {
  return _JSON.parse(str);
}
