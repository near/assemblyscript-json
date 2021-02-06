[assemblyscript-json](../README.md) / [JSON](../modules/json.md) / Str

# Class: Str

[JSON](../modules/json.md).Str

## Hierarchy

* [*Value*](json.value.md)

  ↳ **Str**

## Table of contents

### Constructors

- [constructor](json.str.md#constructor)

### Properties

- [\_str](json.str.md#_str)

### Accessors

- [isArr](json.str.md#isarr)
- [isBool](json.str.md#isbool)
- [isFloat](json.str.md#isfloat)
- [isInteger](json.str.md#isinteger)
- [isNull](json.str.md#isnull)
- [isNum](json.str.md#isnum)
- [isObj](json.str.md#isobj)
- [isString](json.str.md#isstring)

### Methods

- [toString](json.str.md#tostring)
- [valueOf](json.str.md#valueof)
- [Array](json.str.md#array)
- [Bool](json.str.md#bool)
- [Float](json.str.md#float)
- [Integer](json.str.md#integer)
- [Null](json.str.md#null)
- [Number](json.str.md#number)
- [Object](json.str.md#object)
- [String](json.str.md#string)

## Constructors

### constructor

\+ **new Str**(`_str`: *string*): [*Str*](json.str.md)

#### Parameters:

Name | Type |
------ | ------ |
`_str` | *string* |

**Returns:** [*Str*](json.str.md)

Inherited from: [Value](json.value.md)

Defined in: [JSON.ts:198](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L198)

## Properties

### \_str

• **\_str**: *string*

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

Defined in: [JSON.ts:203](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L203)

___

### valueOf

▸ **valueOf**(): *string*

**Returns:** *string*

Defined in: [JSON.ts:207](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L207)

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
