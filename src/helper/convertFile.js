import pdfUtil from "pdf-to-text";
import WordExtractor from "word-extractor";

const extractor = new WordExtractor();

export function convertPdfToText(file) {
  return new Promise((resolve, reject) => {
    pdfUtil.pdfToText(file, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export function convertWordToText(file) {
  return new Promise((resolve, reject) => {
    extractor
      .extract(file)
      .then((doc) => {
        resolve(doc.getBody());
      })
      .catch((err) => {
        reject(err);
      });
  });
}
