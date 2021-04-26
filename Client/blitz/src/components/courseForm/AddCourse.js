import React, {useEffect} from 'react'
import axios from 'axios';
const AddCourse = ({courseData}) => {

    useEffect(() => {
        axios.post("http://localhost:5000/blitzcourse/add", courseData);
    }, [])
    return (
        <div>
                Added
        </div>
    )
}

export default AddCourse
