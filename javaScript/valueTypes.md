# Value Types

In JavaScript, there are two broad categories of value types: `primitive` types and `reference` types.

## Primitive Types

These are the most basic types of values in JavaScript, and they are immutable (i.e., their value cannot be changed once assigned).

The six primitive types are:
1. __String__: Represents a sequence of characters (e.g., "Hello", 'World').
2. __Number__: Represents both integer and floating-point numbers (e.g., 42, 3.14).
3. __Boolean__: Represents a logical value, either true or false.
4. __Undefined__: Represents an uninitialized variable (a variable declared but not yet assigned a value).
5. __Null__: Represents an intentional absence of any object value.
6. __Symbol__ (introduced in ES6): Represents a unique identifier used for object property keys.

Additionally, as of ES2020, there's a new primitive:

7. __BigInt__: Represents integers larger than the maximum safe integer for the Number type (which is 2^53 - 1). BigInt allows working with arbitrary-precision integers.

## Reference Types (Objects)

Objects are mutable and stored by reference rather than by value. Reference types can contain complex data structures like arrays, functions, and other objects.

The main reference types are:

1. __Object__: A collection of key-value pairs, where keys can be strings or symbols, and values can be any type, including other objects.

```js
let obj = { name: "John", age: 30 };
```
</br>

2. __Array__: A special kind of object that holds a list of values.

```js
let arr = [1, 2, 3, 4];
```
</br>

3. __Function__: A callable object that executes a block of code when invoked.

```js
function greet() {
  console.log("Hello");
}
```

#### Other built-in object types include:

__Date__: For working with dates and times.</br>
__RegExp__: For pattern matching with regular expressions.</br>
__Map and Set__: For storing key-value pairs and unique values, respectively.</br>
__WeakMap and WeakSet__: Similar to Map and Set, but allow for garbage collection of unused keys.</br>