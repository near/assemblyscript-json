import { JSONDecoder, JSONHandler } from './decoder';
import { JSONEncoder } from './encoder';
import { Buffer } from './util';
/// <reference types="../node_modules/assemblyscript/std/assembly/rt/index.d.ts" />

export namespace JSON {
  export const enum Val_Type {
    STRING = 0,
    NUMBER = 1,
    BOOL = 2,
    NULL = 3,
    ARRAY = 4,
    OBJECT = 5
  }
  
  export abstract class Value {
    data: i64

    get str(): string {
      return load<string>(changetype<usize>(this));
    }

    get arr(): Array<Value> {
      return load<Array<Value>>(changetype<usize>(this));
    }

    get bool(): bool {
      return load<bool>(changetype<usize>(this));
    }

    get num(): i64 {
        return this.data
    }

    get obj(): Map<string, Value> {
      return load<Map<string, Value>>(changetype<usize>(this));
    }

    get keys(): Array<string> {
      return load<Array<string>>(changetype<usize>(this), sizeof<usize>());
    }

    // // "null" is a reserved keyword.
    get nul(): bool {
        return true;
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
    constructor(_str: string) {
      super();
      store<usize>(changetype<usize>(this), __retain(changetype<usize>(_str)));
    }
  }

  export class Number extends Value {
    constructor(_num: i64) {
      super();
      this.data = _num;
    }
  }

  export class Null extends Value {
    constructor() {
      super();
    }
  }

  export class Bool extends Value {
    constructor(_bool: bool) {
      super();
      store<bool>(changetype<usize>(this), _bool);
    }
  }

  export class Arr extends Value {
    constructor() {
      super();
      store<usize>(changetype<usize>(this), __retain(changetype<usize>(new Array<Value>())));
    }
  }

  export class Obj extends Value {
    // _obj: Map<string, Value>;
    // keys: Array<string>;

    constructor() {
      super();
      store<usize>(changetype<usize>(this), __retain(changetype<usize>(new Map<string, Value>())));
      store<usize>(changetype<usize>(this), __retain(changetype<usize>(new Array<string>())), sizeof<usize>());
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
      if (name == null && obj instanceof Obj) {
        this.stack.push(obj);
        return;
      }
      if (this.peek instanceof Obj) {
        (this.peek as Obj).set(name, obj)
      }
      else if (this.peek instanceof Arr) {
        // __retain(changetype<usize>(obj));
        this.peek.arr.push(obj);
      }
    }
  }

  export function parse(str: string): Obj {
    let buffer: Uint8Array = Buffer.fromString(str);
    __retain(changetype<usize>(buffer));
    let handler = new Handler();
    __retain(changetype<usize>(handler));
    let decoder = new JSONDecoder<Handler>(handler);
    // __retain(changetype<usize>(decoder));
    decoder.deserialize(buffer);
    let res = changetype<Obj>(__retain(changetype<usize>(handler.peek)))
    // __release(changetype<usize>(buffer));
    // __release(changetype<usize>(handler));
    // __release(changetype<usize>(decoder));

    return res;
  }
}



export { JSONDecoder, JSONEncoder };
