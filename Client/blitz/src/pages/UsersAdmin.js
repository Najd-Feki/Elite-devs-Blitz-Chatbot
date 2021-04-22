import React,{useState,useEffect}  from 'react';
import NavbarAdmin from '../components/admin/NavbarAdmin'
import './Admin.css'
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function UsersAdmin() {
    const [users, setUsers] = useState([])


    useEffect(async() => { 
       const response = await axios.get("http://localhost:5000/user")
       setUsers(response.data)  
    },[])

    function handelDelete(id) {
      axios.delete("http://localhost:5000/user/delete/"+id)
      .then(()=>{ 
        setUsers(users.filter(user=>
         user._id != id
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
        <th>User Name</th>
        <th>Email</th>
        <th>Date of the creation of the account</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody >
        {users.map((user,index) =>
            <tr>
            <td>
                <Link to={"/profile/"+user._id}> {user.userName}
                </Link>
            </td>
            <td> {user.email}</td>
            <td>{user.date?.slice(0,10)}</td>
            <td>
            <button type="submit" className="btn btn-danger" onClick={()=>handelDelete(user._id)}>Delete</button>
            </td>
            </tr>
            
         ) }
        
      
    </tbody>

  </table>
  
</div>


    </>
  )
}