export function isBoth (a, b) {
  return x => a(x) && b(x)
}

export default { isBoth }
