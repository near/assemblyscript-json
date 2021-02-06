[assemblyscript-json](../README.md) / JSONHandler

# Class: JSONHandler

Extend from this class to handle events from parser.
Default implementation traverses whole object tree and does nothing.

## Hierarchy

* **JSONHandler**

  ↳ [*ThrowingJSONHandler*](throwingjsonhandler.md)

## Table of contents

### Constructors

- [constructor](jsonhandler.md#constructor)

### Methods

- [popArray](jsonhandler.md#poparray)
- [popObject](jsonhandler.md#popobject)
- [pushArray](jsonhandler.md#pusharray)
- [pushObject](jsonhandler.md#pushobject)
- [setBoolean](jsonhandler.md#setboolean)
- [setFloat](jsonhandler.md#setfloat)
- [setInteger](jsonhandler.md#setinteger)
- [setNull](jsonhandler.md#setnull)
- [setString](jsonhandler.md#setstring)

## Constructors

### constructor

\+ **new JSONHandler**(): [*JSONHandler*](jsonhandler.md)

**Returns:** [*JSONHandler*](jsonhandler.md)

## Methods

### popArray

▸ **popArray**(): *void*

**Returns:** *void*

Defined in: [decoder.ts:22](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L22)

___

### popObject

▸ **popObject**(): *void*

**Returns:** *void*

Defined in: [decoder.ts:28](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L28)

___

### pushArray

▸ **pushArray**(`name`: *string*): bool

#### Parameters:

Name | Type |
------ | ------ |
`name` | *string* |

**Returns:** bool

Defined in: [decoder.ts:18](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L18)

___

### pushObject

▸ **pushObject**(`name`: *string*): bool

#### Parameters:

Name | Type |
------ | ------ |
`name` | *string* |

**Returns:** bool

Defined in: [decoder.ts:24](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L24)

___

### setBoolean

▸ **setBoolean**(`name`: *string*, `value`: bool): *void*

#### Parameters:

Name | Type |
------ | ------ |
`name` | *string* |
`value` | bool |

**Returns:** *void*

Defined in: [decoder.ts:10](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L10)

___

### setFloat

▸ **setFloat**(`name`: *string*, `value`: *number*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`name` | *string* |
`value` | *number* |

**Returns:** *void*

Defined in: [decoder.ts:16](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L16)

___

### setInteger

▸ **setInteger**(`name`: *string*, `value`: *number*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`name` | *string* |
`value` | *number* |

**Returns:** *void*

Defined in: [decoder.ts:14](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L14)

___

### setNull

▸ **setNull**(`name`: *string*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`name` | *string* |

**Returns:** *void*

Defined in: [decoder.ts:12](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L12)

___

### setString

▸ **setString**(`name`: *string*, `value`: *string*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`name` | *string* |
`value` | *string* |

**Returns:** *void*

Defined in: [decoder.ts:8](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/decoder.ts#L8)
