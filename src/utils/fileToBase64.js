var fs = require("fs");
function base64_encode(file) {
  var bitmap = fs.readFileSync(file);
  return new Buffer(bitmap).toString("base64");
}

function fileToBase64(filePath) {
  // Read file asynchronously
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        reject(error);
      } else {
        // Convert data to base64 format
        const base64String = data.toString("base64");
        resolve(base64String);
      }
    });
  });
}

module.exports = { base64_encode, fileToBase64 };
