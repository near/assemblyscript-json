[assemblyscript-json](../README.md) / [JSON](../modules/json.md) / Obj

# Class: Obj

[JSON](../modules/json.md).Obj

## Hierarchy

* [*Value*](json.value.md)

  ↳ **Obj**

## Table of contents

### Constructors

- [constructor](json.obj.md#constructor)

### Properties

- [\_obj](json.obj.md#_obj)
- [keys](json.obj.md#keys)

### Accessors

- [isArr](json.obj.md#isarr)
- [isBool](json.obj.md#isbool)
- [isFloat](json.obj.md#isfloat)
- [isInteger](json.obj.md#isinteger)
- [isNull](json.obj.md#isnull)
- [isNum](json.obj.md#isnum)
- [isObj](json.obj.md#isobj)
- [isString](json.obj.md#isstring)

### Methods

- [\_set](json.obj.md#_set)
- [get](json.obj.md#get)
- [getArr](json.obj.md#getarr)
- [getBool](json.obj.md#getbool)
- [getFloat](json.obj.md#getfloat)
- [getInteger](json.obj.md#getinteger)
- [getNum](json.obj.md#getnum)
- [getString](json.obj.md#getstring)
- [getValue](json.obj.md#getvalue)
- [has](json.obj.md#has)
- [set](json.obj.md#set)
- [toString](json.obj.md#tostring)
- [valueOf](json.obj.md#valueof)
- [Array](json.obj.md#array)
- [Bool](json.obj.md#bool)
- [Float](json.obj.md#float)
- [Integer](json.obj.md#integer)
- [Null](json.obj.md#null)
- [Number](json.obj.md#number)
- [Object](json.obj.md#object)
- [String](json.obj.md#string)

## Constructors

### constructor

\+ **new Obj**(): [*Obj*](json.obj.md)

**Returns:** [*Obj*](json.obj.md)

Inherited from: [Value](json.value.md)

Defined in: [JSON.ts:301](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L301)

## Properties

### \_obj

• **\_obj**: *Map*<*string*, [*Value*](json.value.md)\>

Defined in: [JSON.ts:300](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L300)

___

### keys

• **keys**: *string*[]

Defined in: [JSON.ts:301](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L301)

## Accessors

### isArr

• **isArr**(): *boolean*

**Returns:** *boolean*

Defined in: [JSON.ts:178](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L178)

___

### isBool

• **isBool**(): *boolean*

**Returns:** *boolean*

Defined in: [JSON.ts:164](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L164)

___

### isFloat

• **isFloat**(): *boolean*

**Returns:** *boolean*

Defined in: [JSON.ts:150](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L150)

___

### isInteger

• **isInteger**(): *boolean*

**Returns:** *boolean*

Defined in: [JSON.ts:157](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L157)

___

### isNull

• **isNull**(): *boolean*

**Returns:** *boolean*

Defined in: [JSON.ts:171](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L171)

___

### isNum

• **isNum**(): *boolean*

**Returns:** *boolean*

Defined in: [JSON.ts:143](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L143)

___

### isObj

• **isObj**(): *boolean*

**Returns:** *boolean*

Defined in: [JSON.ts:185](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L185)

___

### isString

• **isString**(): *boolean*

**Returns:** *boolean*

Defined in: [JSON.ts:136](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L136)

## Methods

### \_set

▸ `Private`**_set**(`key`: *string*, `value`: [*Value*](json.value.md)): *void*

#### Parameters:

Name | Type |
------ | ------ |
`key` | *string* |
`value` | [*Value*](json.value.md) |

**Returns:** *void*

Defined in: [JSON.ts:333](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L333)

___

### get

▸ **get**(`key`: *string*): *null* \| [*Value*](json.value.md)

#### Parameters:

Name | Type |
------ | ------ |
`key` | *string* |

**Returns:** *null* \| [*Value*](json.value.md)

Defined in: [JSON.ts:344](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L344)

___

### getArr

▸ **getArr**(`key`: *string*): *null* \| [*Arr*](json.arr.md)

#### Parameters:

Name | Type |
------ | ------ |
`key` | *string* |

**Returns:** *null* \| [*Arr*](json.arr.md)

Defined in: [JSON.ts:395](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L395)

___

### getBool

▸ **getBool**(`key`: *string*): *null* \| [*Bool*](json.bool.md)

#### Parameters:

Name | Type |
------ | ------ |
`key` | *string* |

**Returns:** *null* \| [*Bool*](json.bool.md)

Defined in: [JSON.ts:387](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L387)

___

### getFloat

▸ **getFloat**(`key`: *string*): *null* \| [*Float*](json.float.md)

#### Parameters:

Name | Type |
------ | ------ |
`key` | *string* |

**Returns:** *null* \| [*Float*](json.float.md)

Defined in: [JSON.ts:371](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L371)

___

### getInteger

▸ **getInteger**(`key`: *string*): *null* \| [*Integer*](json.integer.md)

#### Parameters:

Name | Type |
------ | ------ |
`key` | *string* |

**Returns:** *null* \| [*Integer*](json.integer.md)

Defined in: [JSON.ts:379](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L379)

___

### getNum

▸ **getNum**(`key`: *string*): *null* \| [*Num*](json.num.md)

#### Parameters:

Name | Type |
------ | ------ |
`key` | *string* |

**Returns:** *null* \| [*Num*](json.num.md)

Defined in: [JSON.ts:363](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L363)

___

### getString

▸ **getString**(`key`: *string*): *null* \| [*Str*](json.str.md)

#### Parameters:

Name | Type |
------ | ------ |
`key` | *string* |

**Returns:** *null* \| [*Str*](json.str.md)

Defined in: [JSON.ts:355](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L355)

___

### getValue

▸ **getValue**(`key`: *string*): *null* \| [*Value*](json.value.md)

#### Parameters:

Name | Type |
------ | ------ |
`key` | *string* |

**Returns:** *null* \| [*Value*](json.value.md)

Defined in: [JSON.ts:351](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L351)

___

### has

▸ **has**(`key`: *string*): bool

#### Parameters:

Name | Type |
------ | ------ |
`key` | *string* |

**Returns:** bool

Defined in: [JSON.ts:340](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L340)

___

### set

▸ **set**<T\>(`key`: *string*, `value`: T): *void*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`key` | *string* |
`value` | T |

**Returns:** *void*

Defined in: [JSON.ts:324](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L324)

___

### toString

▸ **toString**(): *string*

**Returns:** *string*

Overrides: [Value](json.value.md)

Defined in: [JSON.ts:309](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L309)

___

### valueOf

▸ **valueOf**(): *Map*<*string*, [*Value*](json.value.md)\>

**Returns:** *Map*<*string*, [*Value*](json.value.md)\>

Defined in: [JSON.ts:319](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L319)

___

### Array

▸ `Static`**Array**(): [*Arr*](json.arr.md)

**Returns:** [*Arr*](json.arr.md)

Inherited from: [Value](json.value.md)

Defined in: [JSON.ts:129](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L129)

___

### Bool

▸ `Static`**Bool**(`b`: bool): [*Bool*](json.bool.md)

#### Parameters:

Name | Type |
------ | ------ |
`b` | bool |

**Returns:** [*Bool*](json.bool.md)

Inherited from: [Value](json.value.md)

Defined in: [JSON.ts:123](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L123)

___

### Float

▸ `Static`**Float**(`num`: *number*): [*Float*](json.float.md)

#### Parameters:

Name | Type |
------ | ------ |
`num` | *number* |

**Returns:** [*Float*](json.float.md)

Inherited from: [Value](json.value.md)

Defined in: [JSON.ts:117](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L117)

___

### Integer

▸ `Static`**Integer**(`num`: *number*): [*Integer*](json.integer.md)

#### Parameters:

Name | Type |
------ | ------ |
`num` | *number* |

**Returns:** [*Integer*](json.integer.md)

Inherited from: [Value](json.value.md)

Defined in: [JSON.ts:120](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L120)

___

### Null

▸ `Static`**Null**(): [*Null*](json.null.md)

**Returns:** [*Null*](json.null.md)

Inherited from: [Value](json.value.md)

Defined in: [JSON.ts:126](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L126)

___

### Number

▸ `Static`**Number**(`num`: *number*): [*Num*](json.num.md)

#### Parameters:

Name | Type |
------ | ------ |
`num` | *number* |

**Returns:** [*Num*](json.num.md)

Inherited from: [Value](json.value.md)

Defined in: [JSON.ts:114](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L114)

___

### Object

▸ `Static`**Object**(): [*Obj*](json.obj.md)

**Returns:** [*Obj*](json.obj.md)

Inherited from: [Value](json.value.md)

Defined in: [JSON.ts:132](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L132)

___

### String

▸ `Static`**String**(`str`: *string*): [*Str*](json.str.md)

#### Parameters:

Name | Type |
------ | ------ |
`str` | *string* |

**Returns:** [*Str*](json.str.md)

Inherited from: [Value](json.value.md)

Defined in: [JSON.ts:111](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L111)
