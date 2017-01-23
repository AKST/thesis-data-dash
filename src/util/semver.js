export function verstr ({ major, minor, patch }) {
  return `${major}.${minor}.${patch}`
}

export function compare (a, b) {
  if (a.major > b.major) return true
  else if (a.major === b.major) {
    if (a.minor > b.minor) return true
    else if (a.minor === b.minor) {
      if (a.patch > b.patch) return true
      else if (a.patch === b.patch) return true
      else return false
    }
    else return false
  }
  else return false
}

export default { verstr, compare }
