[assemblyscript-json](../README.md) / DecoderState

# Class: DecoderState

## Hierarchy

* **DecoderState**

## Table of contents

### Constructors

- [constructor](decoderstate.md#constructor)

### Properties

- [buffer](decoderstate.md#buffer)
- [lastKey](decoderstate.md#lastkey)
- [readIndex](decoderstate.md#readindex)

### Accessors

- [ptr](decoderstate.md#ptr)

### Methods

- [readString](decoderstate.md#readstring)

## Constructors

### constructor

\+ **new DecoderState**(`buffer`: *Uint8Array*): [*DecoderState*](decoderstate.md)

#### Parameters:

Name | Type |
------ | ------ |
`buffer` | *Uint8Array* |

**Returns:** [*DecoderState*](decoderstate.md)

Defined in: [decoder.ts:106](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L106)

## Properties

### buffer

• **buffer**: *Uint8Array*

___

### lastKey

• **lastKey**: *string*= ""

Defined in: [decoder.ts:105](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L105)

___

### readIndex

• **readIndex**: *number*= 0

Defined in: [decoder.ts:106](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L106)

## Accessors

### ptr

• **ptr**(): *number*

**Returns:** *number*

Defined in: [decoder.ts:109](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L109)

## Methods

### readString

▸ **readString**(`start`: *number*, `end?`: *number*): *string*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`start` | *number* | - |
`end` | *number* | ... |

**Returns:** *string*

Defined in: [decoder.ts:113](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L113)
