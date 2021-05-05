import React, {useEffect,useState} from 'react'
import axios from 'axios';
import {  Divider, Col, Row } from 'antd';
import Button from '@material-ui/core/Button';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );
const AddCourse = ({courseData,classes}) => {
const [add,setAdd] = useState(false);
    useEffect(() => {
        if(add){
        axios.post("http://localhost:5000/blitzcourse/add", courseData);
        toast.success('Course added with title: '+courseData.title);
    }
    }, [add])
    return (
        <>
        <p  style={{ marginBottom: 24 ,color:"#3076ab"}}>
            Course Details
          </p>
          <p className="site-description-item-profile-p">course</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Title" content={courseData.title} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Field Of Study" content={courseData.field} />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Course Discription"
                content={courseData.description}
              />
            </Col>
          </Row>
          <Divider />
          <p style={{color:"#3076ab"}}>Tutuor</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Name" content={courseData.tutorName} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="BIO" content={courseData.tutorDetails} />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Skills"
                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
              />
            </Col>
          </Row>
          <Divider />
          <p style={{color:"#3076ab"}}>Contacts</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Email" content="mehdi.hrairi@esprit.tn" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Phone Number" content="+216 23 485 725" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Github"
                content={
                  <a href="https://github.com/MEHDIHRAIRI?tab=repositories">
                    Github link
                  </a>
                }
              />
            </Col>
          </Row>
          <Button  
          variant="contained"
          color="primary"
          className={classes.button} 
          onClick={()=>setAdd(true)}>Add Course</Button>
        
        </>
    )
}

export default AddCourse
