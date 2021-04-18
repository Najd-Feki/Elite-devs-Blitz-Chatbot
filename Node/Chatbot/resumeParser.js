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
const ResumeParser = require("resume-parser-object");
const Profile = require("../models/profile");
const User = require("../models/user");
module.exports = (path, isUri, userId) => {
  // From file to file
  if (!isUri) {
    ResumeParser.parseResumeFile(path, "../") // input file, output dir
      .then((file) => {
        console.log("Yay! " + file);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    //From url
    ResumeParser.parseResumeUrl(path)
      .then((data) => {
        console.log("parsed " + data);
        saveUser(data, userId);
      })
      .catch((error) => {
        console.log("parser error : ", error);
      });
  }
};
async function saveUser(data, userId) {
  const profile = new Profile({
    name: data.name,
    headline: data.headline != undefined ? data.headline : "",
    age: data.age,
    phone: data.phone,
    email: data.email,
    contacts: data.contacts,
    personal: data.personal,
    website: data.website,
    address: data.address,
    education: data.education,
    academicProject: data.projectDescription,
    interests: data.interests,
    hardSkills: data.skills,
    awards: data.awards,
    positions: data.positions,
    languages: data.languages,
    experiences: data.experience,
    courses: data.courses,
    socialProfiles: data.profiles,
  });
  try {
    let pro = await profile.save();
    console.log("profle id is : " + pro._id);
    const user = User.findByIdAndUpdate(userId, { profile: (await pro)._id }, (err, result) => {
      if (err) console.log(err);
      else console.log(result);
    });
    console.log("user is : ", user);
  } catch (err) {
    console.log(err);
  }
}
