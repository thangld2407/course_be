export function ACCESS_TOKEN_CACHE_KEY(userId) {
  return `ACCESS_TOKEN_${userId}`;
}

export function REFRESH_TOKEN_CACHE_KEY(userId) {
  return `REFRESH_TOKEN_${userId}`;
}

export function USER_CACHE_KEY(userId) {
  return `USER_${userId}`;
}

// OTP:email

export function OTP_EMAIL(email) {
  return `OTP:${email}`;
}
