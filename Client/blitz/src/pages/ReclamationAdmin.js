import React,{useState,useEffect}  from 'react';
import NavbarAdmin from '../components/admin/NavbarAdmin'
import './Admin.css'
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function ReclamationAdmin() {
    const [reclamations, setReclamation] = useState([])


    useEffect(async() => { 
       const response = await axios.get("http://localhost:5000/reclamation")
       setReclamation(response.data)  
    },[])

  return(
    <>
        
        <NavbarAdmin/>
        <div className="container" >
 
  <table className="table">
    <thead className="thead-dark">
      <tr>
        <th>User ID</th>
        <th>Email</th>
        <th>Reclamation</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody >
        {reclamations.map((reclamation,index) =>
            <tr>
            <td>
                { reclamation.userId}
                
            </td>
            <td> {reclamation.email}</td>
            <td>{reclamation.date}</td>
            <td>
            <button type="submit" className="btn btn-danger" >Delete</button>
            </td>
            </tr>
            
         ) }
        
      
    </tbody>

  </table>
  
</div>

        
        <h1 className='reclamationAdmin'>Reclamation</h1>
    </>
  ) 
}