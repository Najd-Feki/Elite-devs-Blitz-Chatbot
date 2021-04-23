

const axios = require("axios");
const mongoose = require("mongoose");
const CourseMessage = require("../models/courseMessage.js");
const request = require("request");




const getCourse = async (req, res) => {
    const options = {
        url: 'https://www.udemy.com/api-2.0/courses',
        headers: {
            'Authorization' : 'Basic c2Y5TXgyZWdHeDBwbHVUblBWd3paTGNlMW5XTUVCOTF0MHdDYlNJZTpoazJaaWdxbDVEZENkdkNoNjJrbFI2UGp1SkE3aThUTDF0TldCQkVQcFFIWlVCcVREajZ5dEtFTjNpSEJRYzZ4bnNxMkFPQjZZUjhHRlh0NUs0NmtlZjRIR1dCSWtsckxYbTRuZmlaRmNpQlAyM1RSNUxPUHR5Q0tVUjNNVHcyVw=='
            ,  json: true 
        }
      };
        const x= request(options, (err, res, body) => {
        if (err) { return console.log(err); }
        const info = JSON.parse(body);
        const data = info.results;
        }).pipe(res);
        
}

const getCourseDb = async (req, res) => {
    try {

        const courseMessage = await CourseMessage.find();
        res.status(200).json(courseMessage);
    } catch (error) {
        res.status(404).json({message : error.message()});
    }
}

const DeleteCourseDb = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Course Found with id : ${id} ');

    await CourseMessage.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
    
}

const getCourseUdemy = async (req, res) => {
    try {
        const UdemyUrl = `https://www.udemy.com/api-2.0/courses`;
        axios.defaults.headers.common['Authorization'] = 'Basic c2Y5TXgyZWdHeDBwbHVUblBWd3paTGNlMW5XTUVCOTF0MHdDYlNJZTpoazJaaWdxbDVEZENkdkNoNjJrbFI2UGp1SkE3aThUTDF0TldCQkVQcFFIWlVCcVREajZ5dEtFTjNpSEJRYzZ4bnNxMkFPQjZZUjhHRlh0NUs0NmtlZjRIR1dCSWtsckxYbTRuZmlaRmNpQlAyM1RSNUxPUHR5Q0tVUjNNVHcyVw==';
        await axios.get(UdemyUrl)
        .then(response => {
             res.send(response.data.results);
        });
        res.end();
    } catch (error) {
            console.log(error);
    }
}

const getCourseUdemyBySearch = async (req, res) => {
    try {
        const a = req.params.search;
        const UdemyUrl = `https://www.udemy.com/api-2.0/courses/?search=${a}`;
        axios.defaults.headers.common['Authorization'] = 'Basic c2Y5TXgyZWdHeDBwbHVUblBWd3paTGNlMW5XTUVCOTF0MHdDYlNJZTpoazJaaWdxbDVEZENkdkNoNjJrbFI2UGp1SkE3aThUTDF0TldCQkVQcFFIWlVCcVREajZ5dEtFTjNpSEJRYzZ4bnNxMkFPQjZZUjhHRlh0NUs0NmtlZjRIR1dCSWtsckxYbTRuZmlaRmNpQlAyM1RSNUxPUHR5Q0tVUjNNVHcyVw==';
        await axios.get(UdemyUrl)
        .then(response => {
             res.send(response.data.results);
        });
        res.end();
    } catch (error) {
            console.log(error);
    }
}

module.exports = {

    getCourse,
    getCourseDb,
    getCourseUdemy,
    getCourseUdemyBySearch,
    DeleteCourseDb
}