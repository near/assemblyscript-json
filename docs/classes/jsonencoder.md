[assemblyscript-json](../README.md) / JSONEncoder

# Class: JSONEncoder

## Hierarchy

* **JSONEncoder**

## Table of contents

### Constructors

- [constructor](jsonencoder.md#constructor)

### Properties

- [\_isFirstKey](jsonencoder.md#_isfirstkey)
- [result](jsonencoder.md#result)

### Accessors

- [isFirstKey](jsonencoder.md#isfirstkey)

### Methods

- [popArray](jsonencoder.md#poparray)
- [popObject](jsonencoder.md#popobject)
- [pushArray](jsonencoder.md#pusharray)
- [pushObject](jsonencoder.md#pushobject)
- [serialize](jsonencoder.md#serialize)
- [setBoolean](jsonencoder.md#setboolean)
- [setFloat](jsonencoder.md#setfloat)
- [setInteger](jsonencoder.md#setinteger)
- [setNull](jsonencoder.md#setnull)
- [setString](jsonencoder.md#setstring)
- [toString](jsonencoder.md#tostring)
- [write](jsonencoder.md#write)
- [writeBoolean](jsonencoder.md#writeboolean)
- [writeFloat](jsonencoder.md#writefloat)
- [writeInteger](jsonencoder.md#writeinteger)
- [writeKey](jsonencoder.md#writekey)
- [writeString](jsonencoder.md#writestring)

## Constructors

### constructor

\+ **new JSONEncoder**(): [*JSONEncoder*](jsonencoder.md)

**Returns:** [*JSONEncoder*](jsonencoder.md)

Defined in: [encoder.ts:5](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L5)

## Properties

### \_isFirstKey

• `Private` **\_isFirstKey**: *number*[]

Defined in: [encoder.ts:4](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L4)

___

### result

• `Private` **result**: *string*[]

Defined in: [encoder.ts:5](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L5)

## Accessors

### isFirstKey

• **isFirstKey**(): bool

**Returns:** bool

Defined in: [encoder.ts:13](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L13)

## Methods

### popArray

▸ **popArray**(): *void*

**Returns:** *void*

Defined in: [encoder.ts:58](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L58)

___

### popObject

▸ **popObject**(): *void*

**Returns:** *void*

Defined in: [encoder.ts:70](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L70)

___

### pushArray

▸ **pushArray**(`name`: *null* \| *string*): bool

#### Parameters:

Name | Type |
------ | ------ |
`name` | *null* \| *string* |

**Returns:** bool

Defined in: [encoder.ts:51](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L51)

___

### pushObject

▸ **pushObject**(`name`: *null* \| *string*): bool

#### Parameters:

Name | Type |
------ | ------ |
`name` | *null* \| *string* |

**Returns:** bool

Defined in: [encoder.ts:63](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L63)

___

### serialize

▸ **serialize**(): *Uint8Array*

**Returns:** *Uint8Array*

Defined in: [encoder.ts:17](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L17)

___

### setBoolean

▸ **setBoolean**(`name`: *null* \| *string*, `value`: bool): *void*

#### Parameters:

Name | Type |
------ | ------ |
`name` | *null* \| *string* |
`value` | bool |

**Returns:** *void*

Defined in: [encoder.ts:31](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L31)

___

### setFloat

▸ **setFloat**(`name`: *null* \| *string*, `value`: *number*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`name` | *null* \| *string* |
`value` | *number* |

**Returns:** *void*

Defined in: [encoder.ts:46](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L46)

___

### setInteger

▸ **setInteger**(`name`: *null* \| *string*, `value`: *number*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`name` | *null* \| *string* |
`value` | *number* |

**Returns:** *void*

Defined in: [encoder.ts:41](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L41)

___

### setNull

▸ **setNull**(`name`: *null* \| *string*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`name` | *null* \| *string* |

**Returns:** *void*

Defined in: [encoder.ts:36](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L36)

___

### setString

▸ **setString**(`name`: *null* \| *string*, `value`: *string*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`name` | *null* \| *string* |
`value` | *string* |

**Returns:** *void*

Defined in: [encoder.ts:26](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L26)

___

### toString

▸ **toString**(): *string*

**Returns:** *string*

Defined in: [encoder.ts:22](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L22)

___

### write

▸ `Private`**write**(`str`: *string*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`str` | *string* |

**Returns:** *void*

Defined in: [encoder.ts:135](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L135)

___

### writeBoolean

▸ `Private`**writeBoolean**(`value`: bool): *void*

#### Parameters:

Name | Type |
------ | ------ |
`value` | bool |

**Returns:** *void*

Defined in: [encoder.ts:123](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L123)

___

### writeFloat

▸ `Private`**writeFloat**(`value`: *number*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

Defined in: [encoder.ts:131](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L131)

___

### writeInteger

▸ `Private`**writeInteger**(`value`: *number*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`value` | *number* |

**Returns:** *void*

Defined in: [encoder.ts:127](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L127)

___

### writeKey

▸ `Private`**writeKey**(`str`: *null* \| *string*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`str` | *null* \| *string* |

**Returns:** *void*

Defined in: [encoder.ts:75](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L75)

___

### writeString

▸ `Private`**writeString**(`str`: *string*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`str` | *string* |

**Returns:** *void*

Defined in: [encoder.ts:87](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/encoder.ts#L87)
