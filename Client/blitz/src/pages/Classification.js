import React, { useState, useEffect } from 'react';
import './Admin.css'
import NavbarAdmin from '../components/headers/light'
import axios from "axios";
import { Link } from 'react-router-dom';
import Stat from "../components/stat/stat"
import {BsFillCapslockFill} from "react-icons/bs"
import{FiUserPlus} from"react-icons/fi"
import {FaUserCheck} from "react-icons/fa"
import { FcAbout } from "react-icons/fc";

export default function Classifications({done}) {
   
 
    const [style, setStyle] = useState({});
    const [usersNumber, setUsersNumber] = useState([]);
    const [reclamations, setReclamation] = useState([]);
    const [ages,setAges]=useState([]);
    const [profilUser,setProfilUser]=useState([]);
    const [Enfants,setEnfants]=useState([]);
    const [jeunes,setJeunes]=useState([]);
    const [Agees,setAgees]=useState([]);


    useEffect(async () => {
      const response = await axios.get('http://localhost:5000/users');
      setUsersNumber(response.data.length);

    
      response.data.map(
         async (e)=>{for (var i=0;i<=usersNumber;i++)
            {  
                await axios.get("http://localhost:5000/profile/" + e.profile).then((res) => {
                //console.log("profile", res.data);
                if(res.data.age!==undefined)
                {ages.push(res.data.age) }

                if(res.data.age<20){Enfants.push(res.data.age)}
                console.log("childs",Enfants.length)
                if((res.data.age>=20)&&(res.data.age<=30)){jeunes.push(res.data.age)}
                console.log("young",jeunes.length)
                if((res.data.age>30)){Agees.push(res.data.age)}
                console.log("older",Agees.length);

                    
               // console.log("age",ages)
               // console.log(ages.length)
                 
                //Num users who have profile
                if(e.profile!==undefined)
                {
                profilUser.push(e)}  

                 })
                
            }
        }
        )

        ages.map (
            (y)=>{console.log(y)
                /* if(y<0){Enfants.push(y) }
            else
            {console.log('fjfjf')}
            console.log('enfan  ',Enfants.length)*/
            

            }
        )
       
            
            
         
    }, []);
    

    useEffect(async () => {
      const response = await axios.get('http://localhost:5000/reclamation');
      setReclamation(response.data.length);
     
    }, []);

    
    
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${done}%`
      }
      
      setStyle(newStyle);
    }, 200);


  return (
      <>
      
   <NavbarAdmin/>

   <br/>
   <div className="row">
   <div className="col-md-4" >
                            <div className="card ">
                                <div className="card-header ">
                                    <h4 className="card-title">User Registrations <FiUserPlus></FiUserPlus></h4>
                                    
                                </div>
                                <div className="card-body ">
                               <h4>{usersNumber}</h4> 
                                    <div className="legend">
                                    <Link to={'/users'}> <BsFillCapslockFill/>More informations</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4" >
                            <div className="card ">
                                <div className="card-header ">
                                    <h4 className="card-title">Reclamations <FcAbout></FcAbout></h4>
                                    
                                </div>
                                <div className="card-body ">
                                <h4>{reclamations}</h4>
                                    <div className="legend">
                                    <Link to={'/reclamationAdmin'}><BsFillCapslockFill/>More informations  </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4" >
                            <div className="card ">
                                <div className="card-header ">
                                    <h4 className="card-title">users have profils <FaUserCheck></FaUserCheck></h4>
                                    
                                </div>
                                <div className="card-body ">
                                <h4>{ages.length}</h4>
                                    <div className="legend">
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
    <div className="card">
    <div >
        <h4 className="legend-table">table of users who done their profils</h4>
    </div>
                        
<div className="row">
<table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Date of the creation</th>
                
              </tr>
            </thead>
            <tbody>
              {profilUser.map((user, index) => (
                <tr key={index}>
                  <td>
                    <Link to={'/profile/' + user._id}> {user.name}</Link>
                  </td>
                  <td> {user.email}</td>
                  <td>{user.date?.slice(0, 10)}</td>
                  
                   
                </tr>
              ))}
            </tbody>
          </table>
          </div>
</div>

                        <div className="card">
                         <Stat  />
                         
                         </div>
                         
                        
                        
        </>
  );
}