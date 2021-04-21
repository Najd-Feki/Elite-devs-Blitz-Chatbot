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

   function handelDelete(id) {
    axios.delete("http://localhost:5000/reclamation/delete/"+id)
    .then(()=>{ 
      setReclamation(reclamations.filter(reclamation=>
        reclamation._id != id
      ))
    })
   }
   

  return(
    <>
        
        <NavbarAdmin/>
        <div className="container" >
 
  <table className="table">
    <thead className="thead-dark">
      <tr>
        <th>User ID</th>
        <th>Date</th>
        <th>type</th>
        <th>Reclamation</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody >
        {reclamations.map((reclamation,index) =>
            <tr>
            <td>
            <Link to={"/profile/"+reclamation._id}> {reclamation.userId}
                </Link>
                
            </td>
            
            <td>{reclamation.date?.slice(0,10)}</td>
            <td>{reclamation.type}</td>
            <td> {reclamation.description}</td>
            <td>
            <button type="submit" className="btn btn-danger" onClick={()=>handelDelete(reclamation._id)}>Delete</button>
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