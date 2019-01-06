/// <reference path="../types/webassembly/index.d.ts" />

import * as fs   from 'fs';
import * as path from 'path';
import * as util from 'util';

import { demangle } from 'assemblyscript/lib/loader';

const DIGITALS_REGEXP     = /([0-9]{1,})/g;
const UPPER_ALPHAS_REGEXP = /([A-Z]{1,})/g;

export type ImportEntries   = { [key: string]: object };
export type ExportedEntry   = { [key: string]: Function };
export type ExportedEntries = { [key: string]: ExportedEntry };

const readFile = util.promisify(fs.readFile);

const F64 = new Float64Array(1);
const U64 = new Uint32Array(F64.buffer);

export function decamelize(str: string): string {
  const t = str
    .replace(DIGITALS_REGEXP, ' $1')
    .replace(UPPER_ALPHAS_REGEXP, m => ' ' + (m.length === 1 ? m.toLowerCase() : m));
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export async function setup(testFileName: string): Promise<ExportedEntries> {
  const pathName = path.resolve(__dirname, `../build/${ testFileName }.wasm`);
  const file     = await readFile(pathName, null);
  if (!WebAssembly.validate(file)) {
    throw new Error(`WebAssembly binary "${ pathName }" file not valid!`);
  }
  const imports = buildImports(`${ testFileName }.spec.as`, new WebAssembly.Memory({ initial: 2 }));
  const result  = await WebAssembly.instantiate(file, imports);
  return demangle<ExportedEntries>(result.instance.exports);
}

function unpackToString64(value: number): string {
  F64[0] = value;
  return U64[1].toString(16) + U64[0].toString(16);
}

function unpackToString128(lo: number, hi: number): string {
  return `0x${ (unpackToString64(hi) + unpackToString64(lo)).padStart(32, '0') }`;
}

function getString(ptr: number, buffer: ArrayBuffer): string {
  var U16 = new Uint16Array(buffer);
  var U32 = new Uint32Array(buffer);
  var dataLength = U32[ptr >>> 2];
  var dataOffset = (ptr + 4) >>> 1;
  var dataRemain = dataLength;
  var parts = [];
  const chunkSize = 1024;
  while (dataRemain > chunkSize) {
    let last = U16[dataOffset + chunkSize - 1];
    let size = last >= 0xD800 && last < 0xDC00 ? chunkSize - 1 : chunkSize;
    let part = U16.subarray(dataOffset, dataOffset += size);
    parts.push(String.fromCharCode.apply(String, part));
    dataRemain -= size;
  }
  return parts.join('') + String.fromCharCode.apply(String, U16.subarray(dataOffset, dataOffset + dataRemain));
}

function buildImports(name: string, memory: WebAssembly.Memory): ImportEntries {
  const buffer = memory.buffer;
  return {
    env: {
      memory,
      abort(msgPtr: number, filePtr: number, line: number, column: number) {
        if (msgPtr) {
          throw new Error(
            `Abort called by reason "${ getString(msgPtr, buffer) }" at ${ getString(filePtr, buffer) } [${ line }:${ column }]`
          );
        } else {
          throw new Error(`Abort called at ${ getString(filePtr, buffer) } [${ line }:${ column }]`);
        }
      },
    },
    // TODO: Don't hardcode support for encoder/decoder
    decoder: {
      logStr(msgPtr: number) {
        if (msgPtr) console.log(`[str]: ${ getString(msgPtr, buffer) }`);
      },
      logF64(value: number) {
        console.log(`[f64]: ${ value }`);
      },
    },
    encoder: {
      logStr(msgPtr: number) {
        if (msgPtr) console.log(`[str]: ${ getString(msgPtr, buffer) }`);
      },
      logF64(value: number) {
        console.log(`[f64]: ${ value }`);
      },
    },
    [name]: {
      logF64(value: number) {
        console.log(`[f64]: ${ value }`);
      },
      logStr(msgPtr: number) {
        if (msgPtr) console.log(`[str]: ${ getString(msgPtr, buffer) }`);
      },
      logU128Packed(msgPtr: number, lo: number, hi: number) {
        if (msgPtr) {
          console.log(`[u128] ${ getString(msgPtr, buffer) }: ${ unpackToString128(lo, hi) }`);
        } else {
          console.log(`[u128]: ${ unpackToString128(lo, hi) }`);
        }
      }
    }
  };
}
