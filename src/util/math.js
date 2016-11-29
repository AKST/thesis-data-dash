export function round (number, places) {
  const m = 10 ** places
  return Math.floor(number * m) / m
}

export function commaSeperate (number) {
  const santized = number != null ? number : 0
  return santized.toString().replace((c, i, a) =>
    i && c !== '.' && ((a.length - i) % 3 === 0) ? ',' + c : c)
}

export default { round, commaSeperate }
