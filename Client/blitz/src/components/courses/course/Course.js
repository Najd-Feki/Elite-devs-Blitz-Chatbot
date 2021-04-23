import React from 'react'
import { useDispatch } from 'react-redux';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';




const Course = ({ course, setCurrentId }) => {
    const dispatch =useDispatch();

    const openInNewTab = (c) => {
      const newWindow = window.open('https://www.udemy.com'+c, '_blank', 'noopener,noreferrer')
      console.log(c.url);
      if (newWindow) newWindow.opener = null
    }

    return (
      <MDBCol style={{ "padding-top" : "50px" }} onClick={() => openInNewTab(`${course.url}`)}>
      <MDBCard alignItems="stretch">
        <MDBCardImage className="img-fluid" src={course.image_480x270}
          waves />
        <MDBCardBody style={{"height" : "120px"}}>
          <MDBCardTitle style={{"padding-left" : "10px", "padding-right" : "10px"}}>{course.title}</MDBCardTitle>
          <MDBCardText style={{"padding-left" : "10px", "padding-right" : "10px"}}>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
        </MDBCardBody>
      </MDBCard>
      </MDBCol>
        
    )
}

export default Course
