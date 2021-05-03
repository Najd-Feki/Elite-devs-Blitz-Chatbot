import React from 'react'
import '../../assets/css/all.min.css'
import '../../assets/css/bootstrap.css'
import '../../assets/css/responsive.css'
import '../../assets/css/ui.css'

const AdminCourse = ({setId, courseData,setcourseEnrolled, settrifield}) => {
  
    const action =(a)=>{ 
        setId(a);
    }
    const handleAction =(a) => {
      setcourseEnrolled(a);
    }
    const displayCourses = courseData
    .map((course) => {
      return (
      
          <article class="card card-product-list" >
            <div class="row no-gutters">
                <aside class="col-md-3">
                    <a href="#" class="img-wrap">
                        <span class="badge badge-danger"> NEW </span>
                        <img src={course.selectedFile} />
                    </a>
                </aside> 
                <div class="col-md-6">
                    <div class="info-main">
                      <br/>
                        <a class="h5 title" onClick={()=>action(course._id)}> {course.title}  </a>
                       <br></br>
                        <br/>
                        <p> {course.description} </p>
                    </div>
                </div> 
                <aside class="col-sm-3">
                    <div class="info-aside">
                        <div class="price-wrap">
                        <br/>
                            <span class="price h5"> $0 </span>  
                            <del class="price-old"> $50</del>
                        </div>
                        <p class="text-success">Free </p>
                        <br />
                        <p>
                            <a  class="btn btn-primary btn-block" onClick={()=>action(course._id)}> Details </a>
                            <a  class="btn btn-light btn-block" onClick={()=>handleAction(course)}><i class="fa fa-book"></i> 
                                <span class="text">Enroll</span>
                            </a>
                        </p>
                    </div> 
                </aside> 
            </div> 
        </article>
      );
    });
     return (
       
       
             
        
        <div class="row">
          <aside class="col-md-3">
                
                <div class="card">
                  
                    <article class="filter-group">
                        <header class="card-header">
                            <a href="#" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" class="">
                                <i class="icon-control fa fa-chevron-down"></i>
                                <h6 class="title">Field </h6>
                            </a>
                        </header>
                        <div class="filter-content collapse show" id="collapse_2">
                            <div class="card-body">
                                <label class="custom-control custom-checkbox">
                                  <input onChange={() =>
                                settrifield({ name: "Front End" })
                                     } type="checkbox" class="custom-control-input" />
                                  <div class="custom-control-label">Front End</div>
                                </label>
                                <label class="custom-control custom-checkbox">
                                  <input 
                                   onChange={() =>
                                settrifield({ name: "Back End" })
                                     } type="checkbox" class="custom-control-input" />
                                  <div class="custom-control-label">Back end</div>
                                </label>
                                <label class="custom-control custom-checkbox">
                                  <input onChange={() =>
                                settrifield({ name: "Soft Skills" })
                                     } type="checkbox" class="custom-control-input" />
                                  <div class="custom-control-label">Soft Skills</div>
                                </label>
                                <label class="custom-control custom-checkbox">
                                  <input onChange={() =>
                                settrifield({ name: "Hard Skills" })
                                     } type="checkbox" class="custom-control-input" />
                                  <div class="custom-control-label">Hard Skills</div>
                                </label>
                                
                            </div> 
                        </div>
                    </article> 
                    <article class="filter-group">
                        <header class="card-header">
                            <a href="#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" class="">
                                <i class="icon-control fa fa-chevron-down"></i>
                                <h6 class="title">Price range </h6>
                            </a>
                        </header>
                        <div class="filter-content collapse show" id="collapse_3">
                            <div class="card-body">
                                <input type="range" class="custom-range" min="0" max="100" name="" />
                                <div class="form-row">
                                <div class="form-group col-md-6">
                                  <label>Min</label>
                                  <input class="form-control" placeholder="$0" type="number" />
                                </div>
                                <div class="form-group text-right col-md-6">
                                  <label>Max</label>
                                  <input class="form-control" placeholder="$1,0000" type="number" />
                                </div>
                                </div> 
                                <button class="btn btn-block btn-primary">Apply</button>
                            </div>
                        </div>
                    </article> 
                    
                </div> 
                    </aside> 
                    <main class="col-md-9">
      {displayCourses}</main>
      </div>
             
        
    );

}

export default AdminCourse
