import { JSONDecoder, JSONHandler } from './decoder';
import { Buffer } from './util';

/// <reference types="../node_modules/assemblyscript/std/assembly/rt/index.d.ts" />

export namespace JSON {
  
  export abstract class Value {

    private load<T>(): T {
      return load<T>(changetype<usize>(this));
    }

    get str(): string {
      return this.load<string>();
    }

    get arr(): Array<Value> {
      return this.load<Array<Value>>();
    }

    get bool(): bool {
      return this.load<bool>();
    }

    get num(): i64 {
      return this.load<i64>()
    }

    get obj(): Map<string, Value> {
      return this.load<Map<string, Value>>();
    }

    // // "null" is a reserved keyword.
    get nul(): bool {
      return this instanceof Null;
    }

    static String(str: string): Value {
      return new Str(str)
    }
    static Number(num: i64): Value {
      return new Number(num)
    }
    static Bool(b: bool): Value {
      return new Bool(b)
    }
    static Null(): Value {
      return new Null();
    }
    static Array(): Value {
      return new Arr();
    }
    static Object(): Value {
      return new Obj();
    }
  }

  export class Str extends Value {
    constructor(public _str: string) {
      super();
    }
  }

  export class Number extends Value {
    constructor(public _num: i64) {
      super();
    }
  }

  export class Null extends Value {
    constructor() {
      super();
    }
  }

  export class Bool extends Value {
    constructor(public _bool: bool) {
      super();
    }
  }

  export class Arr extends Value {
    _arr: Array<Value>;
    constructor() {
      super();
      this._arr = new Array<Value>();
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

    set(key: string, value: Value): void {
      if (!this.obj.has(key)) {
        this.keys.push(key);
      }
      this.obj.set(key, value);
    }

    get(key: string): Obj {
      let ptr = changetype<Obj>(this.obj.get(key));
      return ptr;
    }
  }

  export class Handler extends JSONHandler {
    map: Map<string, Value>;
    stack: Value[];
    constructor() {
      super();
      this.stack = new Array<Value>();
      this.map = new Map<string, Value>();
    }

    get peek(): Value {
      return this.stack[this.stack.length - 1];
    }

    setString(name: string, value: string): void {
      let obj: Value = Value.String(value);
      this.addValue(name, obj);
    }

    setBoolean(name: string, value: bool): void {
      let obj = Value.Bool(value);
      this.addValue(name, obj);
    }

    setNull(name: string): void {
      let obj = Value.Null();
      this.addValue(name, obj);
    }

    setInteger(name: string, value: i64): void {
      let obj = Value.Number(value);
      this.addValue(name, obj);
    }

    pushArray(name: string): bool {
      let obj: Value = Value.Array();
      this.addValue(name, obj);
      this.stack.push(obj);
      return true;
    }

    popArray(): void {
      if (this.stack.length > 1) {
        this.stack.pop();
      }
    }

    pushObject(name: string): bool {
      let obj: Value = Value.Object();
      this.addValue(name, obj);
      this.stack.push(obj)
      return true;
    }

    popObject(): void {
      if (this.stack.length > 1) {
        this.stack.pop();
      }
    }

    addValue(name: string, obj: Value): void {
      if (name.length == 0 && obj instanceof Obj) {
        this.stack.push(obj);
        return;
      }
      if (this.peek instanceof Obj) {
        (this.peek as Obj).set(name, obj)
      }
      else if (this.peek instanceof Arr) {
        this.peek.arr.push(obj);
      }
    }
  }

  export function parse(str: string): Obj {
    let buffer: Uint8Array = Buffer.fromString(str);
    let handler = new Handler();
    let decoder = new JSONDecoder<Handler>(handler);
    decoder.deserialize(buffer);
    let res = handler.peek as Obj
    return res;
  }
}



export * from "./decoder";
export * from "./encoder";