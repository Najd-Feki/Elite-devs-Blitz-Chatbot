
const express = require('express');


const Controller = require('../controllers/course');

const router = express.Router();

router.get('/a',Controller.getCourseDb);
router.delete('/:id', Controller.DeleteCourseDb);
router.route('/udemy').get( Controller.getCourseUdemy);
router.get('/:search', Controller.getCourseUdemyBySearch);

module.exports = router;