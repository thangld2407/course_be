import CryptoJS from "crypto-js";
import CONFIG from "../config";

export function hashPw(password) {
  return CryptoJS.AES.encrypt(password, CONFIG.HASH_SECRET_KEY).toString();
}

export function comparePw(password, hash) {
  let decrypt = CryptoJS.AES.decrypt(hash, CONFIG.HASH_SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
  return decrypt === password;
}

export function generatePassword() {
  let chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let pass = "";

  let passwordLength = 10;

  for (let i = 0; i <= passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    pass += chars.substring(randomNumber, randomNumber + 1);

  }
  return pass;
}

// Path: src\helper\hashPw.js
