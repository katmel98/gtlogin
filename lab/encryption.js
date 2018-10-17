var CryptoJS = require('crypto-js');

var data = {email: "katmel98@gmail.com"}

// Encrypt
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();

console.log(ciphertext);

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');

console.log(bytes);

var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

console.log(decryptedData); // [{id: 1}, {id: 2}]