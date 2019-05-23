import { JSONDecoder, JSONHandler } from './decoder';
import { JSONEncoder } from './encoder';

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
    constructor(public type: Val_Type) { }

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

    get isString(): bool {
      return this.type == Val_Type.STRING;
    }

    get isObject(): bool {
      return this.type == Val_Type.OBJECT;
    }

    get isArray(): bool {
      return this.type == Val_Type.ARRAY;
    }

    get isNumber(): bool {
      return this.type == Val_Type.NUMBER;
    }

    get isBool(): bool {
      return this.type == Val_Type.BOOL;
    }

    get isNull(): bool {
      return this.type == Val_Type.NULL;
    }

    get str(): string {
      return changetype<Str>(this)._str
    }

    get arr(): Array<Value> {
      let arr = changetype<Arr>(this);
      return arr.array;
    }

    get bool(): bool {
        return changetype<Bool>(this)._bool;
    }

    get num(): i64 {
        return changetype<Number>(this)._num;
    }

    // "null" is a reserved keyword.
    get nul(): bool {
        return this.isNull;
    }
  }

  export class Str extends Value {
    constructor(public _str: string) {
      super(Val_Type.STRING);
    }
  }

  export class Number extends Value {
    constructor(public _num: i64) {
      super(Val_Type.NUMBER);
    }
  }

  export class Null extends Value {
    constructor() {
      super(Val_Type.NULL);
    }
  }

  export class Bool extends Value {
    constructor(public _bool: bool) {
      super(Val_Type.BOOL);
    }
  }

  export class Arr extends Value {
    array: Array<Value> = new Array<Value>();
    constructor() {
      super(Val_Type.ARRAY);
    }
  }

  export class Obj extends Value {
    _obj: Map<string, Value> = new Map<string, Value>();
    keys: Array<string> = new Array<string>();

    constructor() {
      super(Val_Type.OBJECT);
    }

    set(key: string, value: Value): void {
      if (!this._obj.has(key)) {
        this.keys.push(key);
      }
      this._obj.set(key, value);
    }

    get(key: string): Obj {
      return changetype<Obj>(this._obj.get(key));
    }
  }

  export class Handler extends JSONHandler {
    map: Map<string, Value> = new Map<string, Value>();
    stack: Value[];
    constructor() {
      super();
      this.stack = new Array<Value>();
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
      if (name == null && obj.type == Val_Type.OBJECT) {
        this.stack.push(obj);
        return;
      }
      if (this.peek.type == Val_Type.OBJECT) {
        (this.peek as Obj).set(name, obj)
      }
      else if (this.peek.type == Val_Type.ARRAY) {
        (this.peek as Arr).array.push(obj);
      }
    }
  }

  export function parse(str: string): Obj {
    let buffer: Uint8Array = new Uint8Array(str.lengthUTF8);
    memory.copy(buffer.buffer.data, str.toUTF8(), buffer.byteLength);
    let handler = new Handler();
    let decoder = new JSONDecoder<Handler>(handler);
    decoder.deserialize(buffer);
    return handler.peek as Obj;
  }
}



export { JSONDecoder, JSONEncoder };
