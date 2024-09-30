# Mutable vs Immutable
 `immutable` and `mutable` refer to whether a data structure can be modified after it is created.

## Immutable

An immutable object or value is __unchangeable__ after it has been created. Any operation that seems to "change" an immutable value actually creates a new value without altering the original. Immutability is often used for reliability and to avoid unintended side effects, especially in functional programming.

* Example in JavaScript (Primitive values like String, Number, Boolean are immutable):

```js
let str = "Hello";
let newStr = str.toUpperCase();  // creates a new string "HELLO"
console.log(str);    // "Hello" (original remains unchanged)
console.log(newStr); // "HELLO" (new string)
```

#### Common Immutable Types:
* __Primitive types__: Strings, Numbers, Booleans, Undefined, Null, Symbol, BigInt.
* Data structures in functional programming or libraries like Immutable.js can also provide immutability.


## Mutable
A mutable object or value can be changed after it is created. Changes are made in place, meaning modifying the object or value affects the original.

#### Common Mutable Types:
* __Objects__: Object, Array, Function, Map, Set, etc.


* Example in JavaScript (Objects and Arrays are mutable):

```js
let arr = [1, 2, 3];
arr.push(4);  // modifies the original array
console.log(arr);  // [1, 2, 3, 4]
```
</br>

> **Note:** Immutability is often used to avoid bugs in programs, especially in concurrent or functional programming paradigms, while mutability is useful when you need efficiency in data manipulation.

### Understanding how mutable and immutable data types are stored in memory can help clarify their behavior in programming languages like JavaScript.

#### Mutable Data Types

1. __Memory Allocation:__ When a mutable object is created, memory is allocated to store the object. For example, when you create an object:

```js
let obj = { name: "Alice", age: 30 };
```
* Memory is allocated for the obj, and a reference (or pointer) to this memory location is stored in the variable obj.

</br>

2. __Reference:__ If you assign this object to another variable:

```js
let anotherObj = obj;
```

* `anotherObj` holds a reference to the same memory location as obj. Both variables point to the same object in memory.

</br>

3. __Modification:__ When you modify the object through either reference:

```js
anotherObj.age = 31;  // Modifies the object in memory
```

* Since both `obj` and `anotherObj` refer to the same memory location, the change is reflected when accessing either variable:

```js
console.log(obj.age);  // Outputs: 31
```

#### Immutable Data Types

1. __Memory Allocation:__ When you create an immutable value, like a number or a string, memory is allocated to store that value:

```js
let num = 10;  // Immutable number
let str = "Hello";  // Immutable string
```

2.__Value Storage:__ For immutable types, the variable directly stores the value. For example, if you assign num to another variable:

```js
let anotherNum = num;  // anotherNum stores a copy of the value
```

* Here, anotherNum holds a separate copy of the value 10. If you change anotherNum:

```js
anotherNum = 20;
```

* This does not affect num, which remains 10 because they are independent in memory.

3. __Reassignment:__ When you "change" an immutable value, a new value is created in a different memory location:

```js
str = str.toUpperCase();  // Creates a new string in memory
```

* The original string remains unchanged, and str now points to the new string, which is a separate object in memory.

### Visualization
1. __Mutable example:__
```css
[Memory]
Address 0x01: { name: "Alice", age: 30 } (obj)
Address 0x01: { name: "Alice", age: 31 } (anotherObj)
```

2. __Immutable example:__
```csharp
[Memory]
Address 0x02: 10 (num)
Address 0x03: 10 (anotherNum)
Address 0x04: "Hello" (str)
Address 0x05: "HELLO" (new string after transformation)
```