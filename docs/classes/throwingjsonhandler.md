[assemblyscript-json](../README.md) / ThrowingJSONHandler

# Class: ThrowingJSONHandler

Extend from this class to handle events from parser.
This implementation crashes on every unimplemented set/push method
to allow easier validation of input.

## Hierarchy

* [*JSONHandler*](jsonhandler.md)

  ↳ **ThrowingJSONHandler**

## Table of contents

### Constructors

- [constructor](throwingjsonhandler.md#constructor)

### Methods

- [popArray](throwingjsonhandler.md#poparray)
- [popObject](throwingjsonhandler.md#popobject)
- [pushArray](throwingjsonhandler.md#pusharray)
- [pushObject](throwingjsonhandler.md#pushobject)
- [setBoolean](throwingjsonhandler.md#setboolean)
- [setFloat](throwingjsonhandler.md#setfloat)
- [setInteger](throwingjsonhandler.md#setinteger)
- [setNull](throwingjsonhandler.md#setnull)
- [setString](throwingjsonhandler.md#setstring)

## Constructors

### constructor

\+ **new ThrowingJSONHandler**(): [*ThrowingJSONHandler*](throwingjsonhandler.md)

**Returns:** [*ThrowingJSONHandler*](throwingjsonhandler.md)

Inherited from: [JSONHandler](jsonhandler.md)

## Methods

### popArray

▸ **popArray**(): *void*

**Returns:** *void*

Inherited from: [JSONHandler](jsonhandler.md)

Defined in: [decoder.ts:22](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L22)

___

### popObject

▸ **popObject**(): *void*

**Returns:** *void*

Inherited from: [JSONHandler](jsonhandler.md)

Defined in: [decoder.ts:28](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L28)

___

### pushArray

▸ **pushArray**(`name`: *string*): bool

#### Parameters:

Name | Type |
------ | ------ |
`name` | *string* |

**Returns:** bool

Overrides: [JSONHandler](jsonhandler.md)

Defined in: [decoder.ts:68](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L68)

___

### pushObject

▸ **pushObject**(`name`: *string*): bool

#### Parameters:

Name | Type |
------ | ------ |
`name` | *string* |

**Returns:** bool

Overrides: [JSONHandler](jsonhandler.md)

Defined in: [decoder.ts:73](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L73)

___

### setBoolean

▸ **setBoolean**(`name`: *string*, `value`: bool): *void*

#### Parameters:

Name | Type |
------ | ------ |
`name` | *string* |
`value` | bool |

**Returns:** *void*

Overrides: [JSONHandler](jsonhandler.md)

Defined in: [decoder.ts:41](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L41)

___

### setFloat

▸ **setFloat**(`name`: *string*, `value`: *number*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`name` | *string* |
`value` | *number* |

**Returns:** *void*

Overrides: [JSONHandler](jsonhandler.md)

Defined in: [decoder.ts:60](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L60)

___

### setInteger

▸ **setInteger**(`name`: *string*, `value`: *number*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`name` | *string* |
`value` | *number* |

**Returns:** *void*

Overrides: [JSONHandler](jsonhandler.md)

Defined in: [decoder.ts:52](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L52)

___

### setNull

▸ **setNull**(`name`: *string*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`name` | *string* |

**Returns:** *void*

Overrides: [JSONHandler](jsonhandler.md)

Defined in: [decoder.ts:48](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L48)

___

### setString

▸ **setString**(`name`: *string*, `value`: *string*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`name` | *string* |
`value` | *string* |

**Returns:** *void*

Overrides: [JSONHandler](jsonhandler.md)

Defined in: [decoder.ts:37](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L37)
