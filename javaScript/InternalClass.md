# internal [[class]]

The `[[Class]]` internal property in JavaScript is part of the ECMAScript specification and helps the JavaScript engine differentiate built-in object types.

## Historical Context of [[Class]]

In earlier versions of ECMAScript (before ECMAScript 6/ES6, or ES2015), `[[Class]]` was used to categorize objects into various types, such as Object, Array, Function, RegExp, etc.
It was introduced to help standardize how different objects are handled internally, particularly when the typeof operator wasn’t sufficient to distinguish between certain types (e.g., typeof [] returns "object", which doesn't indicate it's an array).

## Accessing the [[Class]] Value

The `[[Class]]` value can be indirectly accessed through the Object.prototype.toString() method. When Object.prototype.toString() is called on an object, it returns a string in the format "[object Type]", where Type is the value of the `[[Class]]` internal property.

```js
const arr = [1, 2, 3];
console.log(Object.prototype.toString.call(arr)); // "[object Array]"

const date = new Date();
console.log(Object.prototype.toString.call(date)); // "[object Date]"

const func = function () {};
console.log(Object.prototype.toString.call(func)); // "[object Function]"

const obj = {};
console.log(Object.prototype.toString.call(obj)); // "[object Object]"
```

This Object.prototype.toString() method is typically used to reliably check for the true type of an object

### How [[Class]] Works Internally

Under the hood, when an object is created, the JavaScript engine assigns it a [[Class]] value to categorize it. Here's a simplified view of how the categorization occurs:

1. **Objects**: Any object literal like {} gets a [[Class]] value of "Object".
2. **Arrays**: When an array is created, its internal [[Class]] is set to "Array".
3. **Functions**: Function objects have [[Class]]: "Function".
4. **Date objects**: When new Date() is called, the [[Class]] becomes "Date".
5. **Regular expressions**: new RegExp() objects are categorized as "RegExp".
6. **Errors**: Various error types, like TypeError or SyntaxError, have their own [[Class]], such as "Error".

### Why [[Class]] Became Less Relevant

In modern JavaScript (after ES6), [[Class]] became more abstract, and explicit mechanisms for type checking have emerged. The introduction of new features like Symbol.toStringTag allows developers to customize the string tag (which is indirectly derived from [[Class]]):

```js
const customObj = {
  [Symbol.toStringTag]: "CustomType",
};

console.log(Object.prototype.toString.call(customObj)); // "[object CustomType]"
```

This lets you define custom object types beyond the built-in ones, giving more flexibility.

### [[Class]] and the typeof Operator

The typeof operator is another way to check types in JavaScript, but it doesn’t always provide sufficient granularity. For example:

```js
console.log(typeof []); // "object"
console.log(typeof {}); // "object"
console.log(typeof new Date()); // "object"
```

While typeof works for basic types like strings, numbers, and functions, it lacks the ability to differentiate between specific object types (like arrays, dates, and regular expressions). This is where the [[Class]] value (or Object.prototype.toString()) comes in handy, as it can distinguish between these objects.

### Checking for Built-in Objects: Alternatives

Instanceof and Array.isArray() are more modern ways to check for certain object types. Here are a few alternatives:

- instanceof can be used to check if an object is an instance of a particular constructor:

  ```js
  console.log([] instanceof Array); // true
  console.log(new Date() instanceof Date); // true
  ```

- Array.isArray() specifically checks if a value is an array:

  ```js
  console.log(Array.isArray([1, 2, 3])); // true
  ```

These don’t work for all cases, especially with cross-frame objects (objects created in different execution contexts, like iframes), where instanceof might fail, but Object.prototype.toString() still provides reliable results.

### How can I see [[class]]?

Although [[Class]] is an internal property in JavaScript and cannot be accessed directly in the code, you can see its value indirectly using the Object.prototype.toString() method. This method provides a string that includes the [[Class]] value in the format "[object Type]".

```js
console.log(Object.prototype.toString.call([]));
// Output: "[object Array]" (indicating [[Class]] is "Array")

console.log(Object.prototype.toString.call({}));
// Output: "[object Object]" (indicating [[Class]] is "Object")

console.log(Object.prototype.toString.call(new Date()));
// Output: "[object Date]" (indicating [[Class]] is "Date")

console.log(Object.prototype.toString.call(/regex/));
// Output: "[object RegExp]" (indicating [[Class]] is "RegExp")

console.log(Object.prototype.toString.call(function () {}));
// Output: "[object Function]" (indicating [[Class]] is "Function")

console.log(Object.prototype.toString.call(null));
// Output: "[object Null]" (indicating [[Class]] is "Null")

console.log(Object.prototype.toString.call(undefined));
// Output: "[object Undefined]" (indicating [[Class]] is "Undefined")

console.log(Object.prototype.toString.call(42));
// Output: "[object Number]" (indicating [[Class]] is "Number")

console.log(Object.prototype.toString.call("Hello"));
// Output: "[object String]" (indicating [[Class]] is "String")

console.log(Object.prototype.toString.call(true));
// Output: "[object Boolean]" (indicating [[Class]] is "Boolean")
```

#### Custom Objects:

If you create a custom object, you will see that it is categorized as "[object Object]":

```js
const myObj = {};
console.log(Object.prototype.toString.call(myObj));
// Output: "[object Object]"
```

### Why is the internal JavaScript property [[Class]] named this way?

The name [[Class]] in JavaScript comes from the ECMAScript specification and refers to an internal mechanism that categorizes objects into types, like "Array", "Object", "Date", and so on. Here's why it's named [[Class]]:

1. **Historical Context: Influence from Object-Oriented Programming (OOP)**

   In many object-oriented programming (OOP) languages, objects are instances of classes, which define the structure and behavior of those objects. Although JavaScript is not a classical OOP language (it's prototype-based rather than class-based), the idea of classifying objects into types or categories is still important for managing them internally. The term [[Class]] was likely chosen to align with this familiar OOP concept, indicating that each object belongs to a certain category or "class."
   In the context of JavaScript, the [[Class]] property doesn't mean a "class" in the sense of an OOP class, but rather a way of organizing different kinds of objects.


2. **Internal and Abstract Nature: Use of Double Brackets [[...]]**

   In the ECMAScript specification, properties that are internal and not directly accessible from JavaScript code are often enclosed in double square brackets [[...]]. This notation is a convention used to denote that these are special internal properties or methods meant only for the JavaScript engine to use. They are part of the language's implementation, but not directly exposed to developers.
   Thus, [[Class]] is not an actual property that you can access via code like object["[[Class]]"]. Instead, it's an internal categorization used by the JavaScript engine.


3. **Purpose of [[Class]]: Categorizing Built-in Objects**

   The purpose of the [[Class]] internal property is to help categorize built-in objects. For example, JavaScript needs to treat arrays, functions, regular expressions, and objects differently. By giving these objects a [[Class]] value (like "Array", "Function", etc.), the engine can handle their behaviors appropriately. The name [[Class]] reflects this concept of "grouping" or "classifying" objects.


4. **Relation to Object.prototype.toString()**

   The use of the term [[Class]] ties into how JavaScript distinguishes object types through Object.prototype.toString(). When you invoke Object.prototype.toString.call(value), you get a string like "[object Array]" or "[object Date]", where the part after "object" reflects the [[Class]] value. This is the JavaScript engine’s way of internally classifying the object, even if JavaScript doesn't have "classes" in the traditional OOP sense.


5. **Transition from [[Class]] to Symbol.toStringTag**

   In modern JavaScript, especially with the introduction of ES6 (ES2015), the concept of [[Class]] has become less central. With Symbol.toStringTag, developers can now customize the "type" string returned by Object.prototype.toString():

### Why Not Another Name?

The term "class" was probably chosen to match familiar terminology from other languages, even though JavaScript didn't initially use traditional classes (before ES6). Other possible names like `[[Type]]` or `[[Category]]` might have been more descriptive, but the use of `class` makes it easier for developers coming from other OOP languages to understand the idea of grouping objects into types.