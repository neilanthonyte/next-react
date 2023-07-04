// below helper methods sourced from:
// http://code.fitness/post/2016/01/javascript-enumerate-methods.html
function hasMethod(obj: any, name: string) {
  const desc = Object.getOwnPropertyDescriptor(obj, name);
  return !!desc && typeof desc.value === "function";
}

export function getInstanceMethodNames(obj: any, stop?: any): string[] {
  const array: string[] = [];
  let proto = Object.getPrototypeOf(obj);
  while (proto && proto !== stop) {
    Object.getOwnPropertyNames(proto).forEach((name) => {
      if (name !== "constructor") {
        if (hasMethod(proto, name)) {
          array.push(name);
        }
      }
    });
    proto = Object.getPrototypeOf(proto);
  }
  return array;
}
