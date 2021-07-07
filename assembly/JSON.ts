import { Buffer } from "./util";
import { JSONDecoder, JSONHandler } from './decoder';

class Handler extends JSONHandler {
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

// @ts-ignore
@lazy const NULL: Null = new Null();

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
    return NULL;
  }
  static Array(): Arr {
    return new Arr();
  }
  static Object(): Obj {
    return new Obj();
  }

  get isString(): boolean {
    return this instanceof Str;
  }

  get isNum(): boolean {
    return this instanceof Num;
  }

  get isFloat(): boolean {
    return this instanceof Float;
  }

  get isInteger(): boolean {
    return this instanceof Integer;
  }

  get isBool(): boolean {
    return this instanceof Bool;
  }

  get isNull(): boolean {
    return this instanceof Null;
  }

  get isArr(): boolean {
    return this instanceof Arr;
  }

  get isObj(): boolean {
    return this instanceof Obj;
  }

  /**
   * @returns A valid JSON string of the value
   */
  abstract stringify(): string;

  /**
   * 
   * @returns A AS string corresponding to the value. 
   */
  toString(): string {
    return this.stringify();
  }
}

export class Str extends Value {
  constructor(public _str: string) {
    super();
  }

  stringify(): string {
    let escaped: i32[] = [];
    for (let i = 0; i < this._str.length; i++) {
      const charCode = this._str.charCodeAt(i);
      if (
        charCode == 0x22 || // "    quotation mark  U+0022
        charCode == 0x5C || // \    reverse solidus U+005C
        charCode < 0x20 // control characters
      ) {
        escaped.push(0x5c); // add a reverse solidus (backslash) to escape reserved chars 
      }
      escaped.push(charCode);
    }
    return "\"" + String.fromCharCodes(escaped) + "\"";
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

  stringify(): string {
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

  stringify(): string {
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

  stringify(): string {
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

  stringify(): string {
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

    stringify(): string {
      return (
        "[" +
        this._arr
          .map<string>((val: Value, i: i32, _arr: Value[]): string =>
            val.stringify()
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

    constructor() {
      super();
      this._obj = new Map();
    }

    get keys(): string[] {
      return this._obj.keys();
    }

    stringify(): string {
      const keys = this._obj.keys();
      const objs: string[] = new Array<string>(keys.length);
      for (let i: i32 = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this._obj.get(key);
        // Currently must get the string value before interpolation 
        // see: https://github.com/AssemblyScript/assemblyscript/issues/1944
        const valStr = value.stringify();
        objs[i] = `"${key}":${valStr}`;
      }

      return `{${objs.join(",")}}`;
    }

    valueOf(): Map<string, Value> {
      return this._obj;
    }

    set<T>(key: string, value: T): void {
      if (isReference<T>(value)) {
        if (value instanceof Value) {
          this._obj.set(key, <Value>value);
          return;
        }
      }
      this._obj.set(key, from<T>(value));
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
        return <Str>jsonValue;
      }
      return null;
    }

    getNum(key: string): Num | null {
      let jsonValue = this.get(key);
      if (jsonValue != null && jsonValue.isNum) {
        return <Num>jsonValue;
      }
      return null;
    }

    getFloat(key: string): Float | null {
      let jsonValue = this.get(key);
      if (jsonValue != null && jsonValue.isFloat) {
        return <Float>jsonValue;
      }
      return null;
    }

    getInteger(key: string): Integer | null {
      let jsonValue = this.get(key);
      if (jsonValue != null && jsonValue.isInteger) {
        return <Integer>jsonValue;
      }
      return null;
    }

    getBool(key: string): Bool | null {
      let jsonValue = this.get(key);
      if (jsonValue != null && jsonValue.isBool) {
        return <Bool>jsonValue;
      }
      return null;
    }

    getArr(key: string): Arr | null {
      let jsonValue = this.get(key);
      if (jsonValue != null && jsonValue.isArr) {
        return <Arr>jsonValue;
      }
      return null;
    }

    getObj(key: string): Obj | null {
      let jsonValue = this.get(key);
      if (jsonValue != null && jsonValue.isObj) {
        return <Obj>jsonValue;
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
