import React, { useState, useEffect } from 'react';
import './Admin.css'
import NavbarAdmin from '../components/headers/light'
import axios from "axios";


export default function Classifications({done}) {

    var xx = 0;
    const [style, setStyle] = useState({});
    const [usersNumber, setUsersNumber] = useState([]);
    const [reclamations, setReclamation] = useState([]);
    
    
    useEffect(async () => {
      const response = await axios.get('http://localhost:5000/users');
      setUsersNumber(response.data.length);
     
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
   <div class="row">
   <div class="col-md-4" >
                            <div className="card ">
                                <div className="card-header ">
                                    <h4 className="card-title">Users Ages</h4>
                                    
                                </div>
                                <div className="card-body ">
                                <div className="progress">
			                          <div className="progress-enfants" style={style}>
				                          {done=20}%
		                          	</div>                              
	                            	</div>
                                <div className="progress">
			                          <div className="progress-jeunes" style={style}>
				                          {done=60}%
		                          	</div>                              
	                            	</div>
                                <div className="progress">
			                          <div className="progress-agees" style={style}>
				                          {done=20}%
		                          	</div>                              
	                            	</div>
                                    <div className="legend">
                                        <i className="fa fa-circle text-success"></i> Enfants
                                        <i className="fa fa-circle text-danger"></i> Jeunes
                                        <i className="fa fa-circle text-warning"></i> Agées
                                    </div>
                                   
                                    
                                </div>
                            </div>
                        </div>
        
   <div class="col-md-4" >
                            <div className="card ">
                                <div className="card-header ">
                                    <h4 className="card-title">User Registrations</h4>
                                    
                                </div>
                                <div className="card-body ">
                                {usersNumber}
                                    <div className="legend">
                                       users number 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4" >
                            <div className="card ">
                                <div className="card-header ">
                                    <h4 className="card-title">Reclamations</h4>
                                    
                                </div>
                                <div className="card-body ">
                                {reclamations}
                                    <div className="legend">
                                       reclamations number 
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        </div>

     
      

        
        </>
  );
}