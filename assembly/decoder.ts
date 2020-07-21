import { Buffer } from "./util";

const CHAR_0 = 48; //"0".charCodeAt(0);
const CHAR_9 = 57; //"9".charCodeAt(0);
const CHAR_A = 65; //"A".charCodeAt(0);
const CHAR_A_LOWER = 97; //"a".charCodeAt(0);
const CHAR_B = 98;  // "b".charCodeAt(0);
const CHAR_F = 102; // "f".charCodeAt(0);
const CHAR_N = 110; // "n".charCodeAt(0);
const CHAR_R = 114; // "r".charCodeAt(0);
const CHAR_T = 116; // "t".charCodeAt(0);
const CHAR_U = 117; // "u".charCodeAt(0);

const LSBRACKET = 91;  // "[".charCodeAt(0);
const RSBRACKET = 93;  // "]".charCodeAt(0);
const LCBRACKET = 123; // "{".charCodeAt(0);
const RCBRACKET = 125; // "}".charCodeAt(0);
const DBLQUOTE  = 34;  // '"'.charCodeAt(0);
const COMMA     = 44;  // ",".charCodeAt(0);
const MINUS     = 45;  // "-".charCodeAt(0);
const SLASH     = 47;  // "/".charCodeAt(0);
const COLON     = 58;  // ":".charCodeAt(0);
const BACKSLASH = 92;  // "\\".charCodeAt(0);

/**
 * Extend from this class to handle events from parser.
 * Default implementation traverses whole object tree and does nothing.
 */
export abstract class JSONHandler {
  setString(name: string, value: string): void {}

  setBoolean(name: string, value: bool): void {}

  setNull(name: string): void {}

  setInteger(name: string, value: i64): void {}

  pushArray(name: string): bool {
    return true;
  }

  popArray(): void {}

  pushObject(name: string): bool {
    return true;
  }

  popObject(): void {}
}

/**
 * Extend from this class to handle events from parser.
 * This implementation crashes on every unimplemented set/push method
 * to allow easier validation of input.
 */
export class ThrowingJSONHandler extends JSONHandler {
  setString(name: string, value: string): void {
    assert(false, 'Unexpected string field ' + name + ' : "' + value + '"');
  }

  setBoolean(name: string, value: bool): void {
    assert(false, 'Unexpected bool field ' + name + ' : ' + (value ? 'true' : 'false'));
  }

  setNull(name: string): void {
    assert(false, 'Unexpected null field ' + name);
  }

  setInteger(name: string, value: i64): void {
    //@ts-ignore integer does have toString
    assert(false, 'Unexpected integer field ' + name + ' : ' + value.toString());
  }

  pushArray(name: string): bool {
    assert(false, 'Unexpected array field ' + name);
    return true;
  }

  pushObject(name: string): bool {
    assert(false, 'Unexpected object field ' + name);
    return true;
  }
}

export class DecoderState {
  lastKey: string = "";
  readIndex: i32 = 0;
  constructor(public buffer: Uint8Array){}

  @inline
  get ptr(): usize {
    return Buffer.getDataPtr(this.buffer);
  }

  @inline
  readString(start: usize, end: usize = this.readIndex): string {
    return Buffer.readString(this.buffer, start, end - 1);
  }
}

export class JSONDecoder<JSONHandlerT extends JSONHandler> {
  handler: JSONHandlerT;
  _state: DecoderState | null = null;

  constructor(handler: JSONHandlerT) {
    this.handler = handler;
  }

  @inline
  get state(): DecoderState {
    return <DecoderState>this._state;
  }

  @inline
  set state(state: DecoderState) {
    this._state = state;
  }

  deserialize(buffer: Uint8Array, decoderState: DecoderState | null = null): void {
    if (decoderState != null) {
      this.state = decoderState;
    } else {
      this.state = new DecoderState(buffer);
    }
    assert(this.parseValue(), "Cannot parse JSON");
    // TODO: Error if input left
  }

  @inline
  private peekChar(): i32 {
    let state = this.state;
    let buffer = state.buffer;
    let index = state.readIndex;
    if (index >= buffer.length) {
      return -1;
    }
    return unchecked(buffer[index]);
  }

  private readChar(): i32 {
    let state = this.state;
    let buffer = state.buffer;
    assert(state.readIndex < buffer.length, "Unexpected input end");
    return unchecked(buffer[this.state.readIndex++]);
  }

  private parseValue(): bool {
    this.skipWhitespace();
    let result = this.parseObject()
        || this.parseArray()
        || this.parseString()
        || this.parseBoolean()
        || this.parseNumber()
        || this.parseNull()
    this.skipWhitespace();
    return result;
  }

  private parseObject(): bool {
    if (this.peekChar() != LCBRACKET) {
      return false;
    }
    let state = this.state;
    let key = state.lastKey;
    //@ts-ignore can be null
    state.lastKey = "";
    if (this.handler.pushObject(key)) {
      this.readChar();
      this.skipWhitespace();

      let firstItem = true;
      while (this.peekChar() != RCBRACKET) {
        if (!firstItem) {
          assert(this.readChar() == COMMA, "Expected ','");
        } else {
          firstItem = false;
        }
        this.parseKey();
        this.parseValue();
      }
      assert(this.readChar() == RCBRACKET, "Unexpected end of object");
    }
    this.handler.popObject();
    return true;
  }

  private parseKey(): void {
    this.skipWhitespace();
    this.state.lastKey = this.readString();
    this.skipWhitespace();
    assert(this.readChar() == COLON, "Expected ':'");
  }

  private parseArray(): bool {
    if (this.peekChar() != LSBRACKET) {
      return false;
    }
    let key = this.state.lastKey;
    //@ts-ignore can be null
    this.state.lastKey = "";
    if (this.handler.pushArray(key)) {
      this.readChar();
      this.skipWhitespace();

      let firstItem = true;
      while (this.peekChar() != RSBRACKET) {
        if (!firstItem) {
          assert(this.readChar() == COMMA, "Expected ','");
        } else {
          firstItem = false;
        }
        this.parseValue();
      }
      assert(this.readChar() == RSBRACKET, "Unexpected end of array");
    }
    this.handler.popArray();
    return true;
  }

  private parseString(): bool {
    if (this.peekChar() != DBLQUOTE) {
      return false;
    }
    this.handler.setString(this.state.lastKey, this.readString());
    return true;
  }

  private readString(): string {
    assert(this.readChar() == DBLQUOTE, "Expected double-quoted string");
    let state = this.state;
    let savedIndex = state.readIndex;
    //@ts-ignore can be null
    let stringParts = new Array<string>();
    for (;;) {
      let byte = this.readChar();
      assert(byte >= 0x20, "Unexpected control character");
      if (byte == DBLQUOTE) {
        let s = state.readString(savedIndex);
        if (stringParts.length == 0) {
          return s;
        }
        stringParts.push(s);
        return stringParts.join("");
      } else if (byte == BACKSLASH) {
        if (state.readIndex > savedIndex + 1) {
          stringParts.push(state.readString(savedIndex));
        }
        stringParts.push(this.readEscapedChar());
        savedIndex = state.readIndex;
      }
    }
    assert(false);
    return "";
  }

  private readEscapedChar(): string {
    let byte = this.readChar();
    // TODO: Use lookup table for anything except \u
    switch (byte) {
      case DBLQUOTE:  return '"';
      case BACKSLASH: return "\\";
      case SLASH:     return "/";
      case CHAR_B:    return "\b";
      case CHAR_N:    return "\n";
      case CHAR_R:    return "\r";
      case CHAR_T:    return "\t";
      case CHAR_U: {
        let d1 = this.readHexDigit();
        let d2 = this.readHexDigit();
        let d3 = this.readHexDigit();
        let d4 = this.readHexDigit();
        let cp = (d1 << 12) | (d2 << 8) | (d3 << 4) | d4;
        return String.fromCodePoint(cp);
      }
    }
    assert(false, "Unexpected escaped character: " + String.fromCharCode(byte));
    return "";
  }

  private readHexDigit(): i32 {
    let byte = this.readChar();
    let digit = byte - CHAR_0;
    if (digit > 9) {
      digit = byte - CHAR_A + 10;
      if (digit < 10 || digit > 15) {
        digit = byte - CHAR_A_LOWER + 10;
      }
    }
    assert(digit >= 0 && digit < 16, "Unexpected \\u digit");
    return digit;
  }

  private parseNumber(): bool {
    // TODO: Parse floats
    let number: i64 = 0;
    let sign: i64 = 1;
    if (this.peekChar() == MINUS) {
      sign = -1;
      this.readChar();
    }
    let state = this.state;
    let digits = 0;
    let byte = 0;
    while (CHAR_0 <= (byte = this.peekChar()) && byte <= CHAR_9 ) {
      assert(byte != -1, "Unexpected input end");
      state.readIndex++;
      number *= 10;
      number += byte - CHAR_0;
      digits++;
    }
    if (digits > 0) {
      this.handler.setInteger(state.lastKey, number * sign);
      return true;
    }
    return false;
  }

  private parseBoolean(): bool {
    if (this.peekChar() == CHAR_F) {
      this.readAndAssert("false");
      this.handler.setBoolean(this.state.lastKey, false);
      return true;
    }
    if (this.peekChar() == CHAR_T) {
      this.readAndAssert("true");
      this.handler.setBoolean(this.state.lastKey, true);
      return true;
    }
    return false;
  }

  private parseNull(): bool {
    if (this.peekChar() == CHAR_N) {
      this.readAndAssert("null");
      this.handler.setNull(this.state.lastKey);
      return true;
    }
    return false;
  }

  private readAndAssert(str: string): void {
    for (let i = 0, len = str.length; i < len; i++) {
      assert(str.charCodeAt(i) == this.readChar(), "Expected '" + str + "'");
    }
  }

  private skipWhitespace(): void {
    while (this.isWhitespace(this.peekChar())) {
      this.readChar();
    }
  }

  @inline
  private isWhitespace(charCode: i32): bool {
    return charCode == 0x9 || charCode == 0xa || charCode == 0xd || charCode == 0x20;
  }
}
