var multer = require("multer");
var ResumeParser = require("../Chatbot/resumeParser");
var filename;
var path;
module.exports = (app) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      path = __dirname.replace("routes", "") + "public/uploads/documentcontrol";
      cb(null, path);
    },
    filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      filename = "part" + "-" + datetimestamp + "." + file.originalname.split(".")[file.originalname.split(".").length - 1];
      cb(null, filename);
    },
  });
  var upload = multer({ storage: storage }).single("file");

  app.post("/upload/resume", function (req, res) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      console.log("../resumes/" + filename);
      ResumeParser(path + "/" + filename);
      return res.status(200).send(req.file);
    });
  });
};
