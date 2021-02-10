[assemblyscript-json](../README.md) / [JSON](../modules/json.md) / Num

# Class: Num

[JSON](../modules/json.md).Num

## Hierarchy

* [*Value*](json.value.md)

  ↳ **Num**

  ↳↳ [*Float*](json.float.md)

## Table of contents

### Constructors

- [constructor](json.num.md#constructor)

### Properties

- [\_num](json.num.md#_num)

### Accessors

- [isArr](json.num.md#isarr)
- [isBool](json.num.md#isbool)
- [isFloat](json.num.md#isfloat)
- [isInteger](json.num.md#isinteger)
- [isNull](json.num.md#isnull)
- [isNum](json.num.md#isnum)
- [isObj](json.num.md#isobj)
- [isString](json.num.md#isstring)

### Methods

- [toString](json.num.md#tostring)
- [valueOf](json.num.md#valueof)
- [Array](json.num.md#array)
- [Bool](json.num.md#bool)
- [Float](json.num.md#float)
- [Integer](json.num.md#integer)
- [Null](json.num.md#null)
- [Number](json.num.md#number)
- [Object](json.num.md#object)
- [String](json.num.md#string)

## Constructors

### constructor

\+ **new Num**(`_num`: *number*): [*Num*](json.num.md)

#### Parameters:

Name | Type |
------ | ------ |
`_num` | *number* |

**Returns:** [*Num*](json.num.md)

Inherited from: [Value](json.value.md)

Defined in: [JSON.ts:212](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L212)

## Properties

### \_num

• **\_num**: *number*

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

### toString

▸ **toString**(): *string*

**Returns:** *string*

Overrides: [Value](json.value.md)

Defined in: [JSON.ts:217](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L217)

___

### valueOf

▸ **valueOf**(): *number*

**Returns:** *number*

Defined in: [JSON.ts:221](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L221)

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
