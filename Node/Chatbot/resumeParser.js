// var pdfreader = require("pdfreader/lib/");

// const nbCols = 2;
// const cellPadding = 40; // each cell is padded to fit 40 characters
// const columnQuantitizer = (item) => parseFloat(item.x) >= 20;

// const padColumns = (array, nb) => Array.apply(null, { length: nb }).map((val, i) => array[i] || []);
// // .. because map() skips undefined elements

// const mergeCells = (cells) =>
//   (cells || [])
//     .map((cell) => cell.text)
//     .join("") // merge cells
//     .substr(0, cellPadding)
//     .padEnd(cellPadding, " "); // padding

// const renderMatrix = (matrix) => (matrix || []).map((row, y) => padColumns(row, nbCols).map(mergeCells).join(" | ")).join("\n");

// var table = new pdfreader.TableParser();

// new pdfreader.PdfReader().parseFileItems("../CV.pdf", function (err, item) {
//   if (!item || item.page) {
//     // end of file, or page
//     console.log(renderMatrix(table.getMatrix()));
//     if (item != undefined) console.log("PAGE:", item.page);
//     table = new pdfreader.TableParser(); // new/clear table for next page
//   } else if (item.text) {
//     // accumulate text items into rows object, per line
//     table.processItem(item, columnQuantitizer(item));
//   }
// });

/////////////////////

const ResumeParser = require("resume-parser");

// From file to file
ResumeParser.parseResume("../CV.pdf", "../") // input file, output dir
  .then((file) => {
    console.log("Yay! " + file);
  })
  .catch((error) => {
    console.error(error);
  });
