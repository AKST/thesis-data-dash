export function staleData (time) {
  const elapsed = Date.now() - time
  return elapsed > (1000 * 60 * 60 * 24)
}
