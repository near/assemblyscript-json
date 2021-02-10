[assemblyscript-json](../README.md) / JSONDecoder

# Class: JSONDecoder<JSONHandlerT\>

## Type parameters

Name | Type |
------ | ------ |
`JSONHandlerT` | [*JSONHandler*](jsonhandler.md) |

## Hierarchy

* **JSONDecoder**

## Table of contents

### Constructors

- [constructor](jsondecoder.md#constructor)

### Properties

- [\_state](jsondecoder.md#_state)
- [handler](jsondecoder.md#handler)

### Accessors

- [state](jsondecoder.md#state)

### Methods

- [deserialize](jsondecoder.md#deserialize)
- [isWhitespace](jsondecoder.md#iswhitespace)
- [parseArray](jsondecoder.md#parsearray)
- [parseBoolean](jsondecoder.md#parseboolean)
- [parseKey](jsondecoder.md#parsekey)
- [parseNull](jsondecoder.md#parsenull)
- [parseNumber](jsondecoder.md#parsenumber)
- [parseObject](jsondecoder.md#parseobject)
- [parseString](jsondecoder.md#parsestring)
- [parseValue](jsondecoder.md#parsevalue)
- [peekChar](jsondecoder.md#peekchar)
- [readAndAssert](jsondecoder.md#readandassert)
- [readChar](jsondecoder.md#readchar)
- [readEscapedChar](jsondecoder.md#readescapedchar)
- [readHexDigit](jsondecoder.md#readhexdigit)
- [readString](jsondecoder.md#readstring)
- [skipWhitespace](jsondecoder.md#skipwhitespace)

## Constructors

### constructor

\+ **new JSONDecoder**<JSONHandlerT\>(`handler`: JSONHandlerT): [*JSONDecoder*](jsondecoder.md)<JSONHandlerT\>

#### Type parameters:

Name | Type |
------ | ------ |
`JSONHandlerT` | [*JSONHandler*](jsonhandler.md)<JSONHandlerT\> |

#### Parameters:

Name | Type |
------ | ------ |
`handler` | JSONHandlerT |

**Returns:** [*JSONDecoder*](jsondecoder.md)<JSONHandlerT\>

Defined in: [decoder.ts:120](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L120)

## Properties

### \_state

• **\_state**: *null* \| [*DecoderState*](decoderstate.md)= null

Defined in: [decoder.ts:120](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L120)

___

### handler

• **handler**: JSONHandlerT

Defined in: [decoder.ts:119](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L119)

## Accessors

### state

• **state**(): [*DecoderState*](decoderstate.md)

**Returns:** [*DecoderState*](decoderstate.md)

Defined in: [decoder.ts:126](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L126)

• **state**(`state`: [*DecoderState*](decoderstate.md)): *void*

#### Parameters:

Name | Type |
------ | ------ |
`state` | [*DecoderState*](decoderstate.md) |

**Returns:** *void*

Defined in: [decoder.ts:130](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L130)

## Methods

### deserialize

▸ **deserialize**(`buffer`: *Uint8Array*, `decoderState?`: *null* \| [*DecoderState*](decoderstate.md)): *void*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`buffer` | *Uint8Array* | - |
`decoderState` | *null* \| [*DecoderState*](decoderstate.md) | null |

**Returns:** *void*

Defined in: [decoder.ts:134](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L134)

___

### isWhitespace

▸ `Private`**isWhitespace**(`charCode`: *number*): bool

#### Parameters:

Name | Type |
------ | ------ |
`charCode` | *number* |

**Returns:** bool

Defined in: [decoder.ts:406](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L406)

___

### parseArray

▸ `Private`**parseArray**(): bool

**Returns:** bool

Defined in: [decoder.ts:210](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L210)

___

### parseBoolean

▸ `Private`**parseBoolean**(): bool

**Returns:** bool

Defined in: [decoder.ts:370](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L370)

___

### parseKey

▸ `Private`**parseKey**(): *void*

**Returns:** *void*

Defined in: [decoder.ts:203](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L203)

___

### parseNull

▸ `Private`**parseNull**(): bool

**Returns:** bool

Defined in: [decoder.ts:385](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L385)

___

### parseNumber

▸ `Private`**parseNumber**(): bool

**Returns:** bool

Defined in: [decoder.ts:323](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L323)

___

### parseObject

▸ `Private`**parseObject**(): bool

**Returns:** bool

Defined in: [decoder.ts:176](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L176)

___

### parseString

▸ `Private`**parseString**(): bool

**Returns:** bool

Defined in: [decoder.ts:236](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L236)

___

### parseValue

▸ `Private`**parseValue**(): bool

**Returns:** bool

Defined in: [decoder.ts:163](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L163)

___

### peekChar

▸ `Private`**peekChar**(): *number*

**Returns:** *number*

Defined in: [decoder.ts:148](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L148)

___

### readAndAssert

▸ `Private`**readAndAssert**(`str`: *string*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`str` | *string* |

**Returns:** *void*

Defined in: [decoder.ts:394](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L394)

___

### readChar

▸ `Private`**readChar**(): *number*

**Returns:** *number*

Defined in: [decoder.ts:155](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L155)

___

### readEscapedChar

▸ `Private`**readEscapedChar**(): *string*

**Returns:** *string*

Defined in: [decoder.ts:274](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L274)

___

### readHexDigit

▸ `Private`**readHexDigit**(): *number*

**Returns:** *number*

Defined in: [decoder.ts:310](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L310)

___

### readString

▸ `Private`**readString**(): *string*

**Returns:** *string*

Defined in: [decoder.ts:244](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L244)

___

### skipWhitespace

▸ `Private`**skipWhitespace**(): *void*

**Returns:** *void*

Defined in: [decoder.ts:400](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L400)
