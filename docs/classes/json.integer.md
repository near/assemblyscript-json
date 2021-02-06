[assemblyscript-json](../README.md) / [JSON](../modules/json.md) / Integer

# Class: Integer

[JSON](../modules/json.md).Integer

## Hierarchy

* [*Value*](json.value.md)

  ↳ **Integer**

## Table of contents

### Constructors

- [constructor](json.integer.md#constructor)

### Properties

- [\_num](json.integer.md#_num)

### Accessors

- [isArr](json.integer.md#isarr)
- [isBool](json.integer.md#isbool)
- [isFloat](json.integer.md#isfloat)
- [isInteger](json.integer.md#isinteger)
- [isNull](json.integer.md#isnull)
- [isNum](json.integer.md#isnum)
- [isObj](json.integer.md#isobj)
- [isString](json.integer.md#isstring)

### Methods

- [toString](json.integer.md#tostring)
- [valueOf](json.integer.md#valueof)
- [Array](json.integer.md#array)
- [Bool](json.integer.md#bool)
- [Float](json.integer.md#float)
- [Integer](json.integer.md#integer)
- [Null](json.integer.md#null)
- [Number](json.integer.md#number)
- [Object](json.integer.md#object)
- [String](json.integer.md#string)

## Constructors

### constructor

\+ **new Integer**(`_num`: *number*): [*Integer*](json.integer.md)

#### Parameters:

Name | Type |
------ | ------ |
`_num` | *number* |

**Returns:** [*Integer*](json.integer.md)

Inherited from: [Value](json.value.md)

Defined in: [JSON.ts:229](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L229)

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

Defined in: [JSON.ts:234](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L234)

___

### valueOf

▸ **valueOf**(): *number*

**Returns:** *number*

Defined in: [JSON.ts:238](https://github.com/torch2424/assemblyscript-json/blob/d5af3b8/assembly/JSON.ts#L238)

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
