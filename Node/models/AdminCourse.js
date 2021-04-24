const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({

    title : String,
    description : String,
    link : String,
    tags : [String],
    selectedFile : [String],
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    quiz : [String],
    numberOfEnrolls : Number,
    tutorName : String,
    tutorDetails : [String]

});

const CourseMessage = mongoose.model('AdminCourse', courseSchema);

module.exports = mongoose.model("AdminCourse", courseSchema);