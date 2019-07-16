export default function isFunction(target) {
  return Object.prototype.toString.call(target) === '[object String]'
}
