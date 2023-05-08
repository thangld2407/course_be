import error_code from "./code";

export function errorHandle(code) {
  return {
    error_code: code,
    message: error_code[code],
  };
}
