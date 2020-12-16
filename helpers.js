export function isString(str) {
  return typeof str === 'string';
}

export function isFunction(fn) {
  return typeof fn === 'function';
}

export function isSubClass(ClassA, ClassB) {
  return ClassA.prototype instanceof ClassB;
}

export function extend(objA, objB) {
  for (const key in objB) {
    objA[key] = objB[key];
  }
}