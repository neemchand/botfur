const messages = require('../locales/en');

function getMessage(key) {
  const keys = key.split('.');
  let result = messages;
  
  for (const k of keys) {
    if (result && result[k]) {
      result = result[k];
    } else {
      return key; // Return the key if message not found
    }
  }
  
  return result;
}

module.exports = {
  getMessage
};