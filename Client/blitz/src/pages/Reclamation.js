import React,{useState,useEffect} from "react";
import Header from "components/headers/light.js";
import '../assets/reclamation/reclamation.css'
import axios from "axios";
import Footer from "components/footers/SimpleFooter";

export default () => {
  
     const [reclamation,setReclamation]=useState({userId:'',type:'',description:'',date:Date.now()})
     const [submitted, setSubmitted] = useState(false);
   
     const handleSubmit = (e) => {
      e.preventDefault();
     axios.post('http://localhost:5000/reclamation/add',reclamation)
     .then(setReclamation({userId:'',type:'',description:'',date:Date.now()}))
     .then(alert('Clain successfully sent'))
    };
  
     const handleUserIdInputChange = (event) => {
      event.persist();
      setReclamation((reclamation) => ({
        ...reclamation,
        userId: event.target.value,
      }));
    };

    const handleTypeInputChange = (event) => {
      event.persist();
      setReclamation((reclamation) => ({
        ...reclamation,
        type: event.target.value,
      }));
    };
    
    const handledescriptionInputChange = (event) => {
      event.persist();
      setReclamation((reclamation) => ({
        ...reclamation,
        description: event.target.value,
      }));
    };



    return (
      <>
        <Header />
        
      <div className="reclamation-container reclamation-body">
  <h2>Here you can post our complaints</h2>
  <h1>send us </h1>
  
  <form action="" className='reclamation-form' >
    <div className="reclamation-fields">
    <p className="reclamation-p">id</p>
      <span>
       <input placeholder="Id" type="text" value={reclamation.userId} onChange={handleUserIdInputChange} className='reclamation-input'/>
    </span>
    <br />
    <p className="reclamation-p">Subject</p>
     <span>
       <input placeholder="type" type="type" value={reclamation.type} onChange={handleTypeInputChange} className='reclamation-input' />
    </span>
    <br />
    <span>
        <p className="reclamation-p">your complaint</p>
       <textarea placeholder="description" type="description" rows="4" cols="50" value={reclamation.description} onChange={handledescriptionInputChange}  />
    </span>
    </div>
    <br/>
    <div className="submit">
      <input className="submit" value="send" type="button" onClick={handleSubmit} className='reclamation-input'/>
    </div>
   
  </form>
  <Footer /> 
</div>
   
    </>
    );
};