[assemblyscript-json](../README.md) / [JSON](../modules/json.md) / Arr

# Class: Arr

[JSON](../modules/json.md).Arr

## Hierarchy

* [*Value*](json.value.md)

  ↳ **Arr**

## Table of contents

### Constructors

- [constructor](json.arr.md#constructor)

### Properties

- [\_arr](json.arr.md#_arr)

### Accessors

- [isArr](json.arr.md#isarr)
- [isBool](json.arr.md#isbool)
- [isFloat](json.arr.md#isfloat)
- [isInteger](json.arr.md#isinteger)
- [isNull](json.arr.md#isnull)
- [isNum](json.arr.md#isnum)
- [isObj](json.arr.md#isobj)
- [isString](json.arr.md#isstring)

### Methods

- [push](json.arr.md#push)
- [toString](json.arr.md#tostring)
- [valueOf](json.arr.md#valueof)
- [Array](json.arr.md#array)
- [Bool](json.arr.md#bool)
- [Float](json.arr.md#float)
- [Integer](json.arr.md#integer)
- [Null](json.arr.md#null)
- [Number](json.arr.md#number)
- [Object](json.arr.md#object)
- [String](json.arr.md#string)

## Constructors

### constructor

\+ **new Arr**(): [*Arr*](json.arr.md)

**Returns:** [*Arr*](json.arr.md)

Inherited from: [Value](json.value.md)

Defined in: [JSON.ts:272](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L272)

## Properties

### \_arr

• **\_arr**: [*Value*](json.value.md)[]

Defined in: [JSON.ts:272](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L272)

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

### push

▸ **push**(`obj`: [*Value*](json.value.md)): *void*

#### Parameters:

Name | Type |
------ | ------ |
`obj` | [*Value*](json.value.md) |

**Returns:** *void*

Defined in: [JSON.ts:278](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L278)

___

### toString

▸ **toString**(): *string*

**Returns:** *string*

Overrides: [Value](json.value.md)

Defined in: [JSON.ts:282](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L282)

___

### valueOf

▸ **valueOf**(): [*Value*](json.value.md)[]

**Returns:** [*Value*](json.value.md)[]

Defined in: [JSON.ts:294](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L294)

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
