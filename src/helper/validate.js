export function validEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

export function validPassword(str) {
  return /^[0-9a-zA-Z]{8,}$/.test(str);
}

export function validName(str) {
  return /^[a-zA-Z]{2,}$/.test(str);
}


