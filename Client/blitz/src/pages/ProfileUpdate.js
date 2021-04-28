import React from "react";
import Header from "../components/headers/light";
import axios from 'axios';
import Footer from "components/footers/SimpleFooter";
import "bootstrap/dist/js/bootstrap";
import "../assets/profilecss/profile.css";
import "jquery/dist/jquery";
class ProfileUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      langtab: [],
      hardSkillstab: [],
      softSkillstab: [],
      hobbiestab: [],
      experiencestab: [],
      users: [],
      userid: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/user/" + this.props.match.params.id).then((Response) => {
      this.setState({ users: Response.data });
      console.log("users", Response.data);
      axios.get("http://localhost:5000/profile/" + Response.data.profile).then((res) => {
        console.log("profile", res.data);
        if(res.data != undefined)
        this.setState({ profiles: res.data });

        if(res.data.languages != undefined)
        this.setState({ langtab: res.data?.languages });

        if(res.data.hardSkills != undefined)
        this.setState({ hardSkillstab: res.data.hardSkills });

        if(res.data.softSkills != undefined)
        this.setState({ softSkillstab: res.data?.softSkills });

        if(res.data.hobbies != undefined)
        this.setState({ hobbiestab: res.data?.hobbies });

        if(res.data.experiences != undefined)
        this.setState({ experiencestab: res.data?.experiences });

        if(res.data.user != undefined)
        this.setState({ userid: res.data?.user });
      });
    });
  }
  save(){
    this.state.profiles.age="20";
}
  render() {
    return (
      <>
    <Header />
    <div className="profile-body">
      <br/>
      <div className="container emp-profile">
            <form method="post">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src={this.state.users.avatar} alt=""/>
                            <input className="form-control" style={{color:"black",margin:"20px"}} type="url" placeholder="add photo" name="photo" defaultValue={this.state.users.avatar}/>

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5>
                            {this.state.users.name}
                            </h5>
                            <h6><input className="form-control" style={{color:"black"}} type="text" placeholder="add hedline" name="hedline" defaultValue={this.state.profiles.headline}/></h6>   

                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2">
                        {/* <input type="submit" className="profile-edit-btn" onSubmit={} name="btnAddMore" value="Save"/> */}
                        <button className="profile-edit-btn" onClick={this.save}>Save</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-work">

                            <div><p style={{color: 'rgba(60,13,153)',fontWeight:'bold',fontSize:'20px'}}>hardSkills</p>
                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add hardSkillstab" name="hardSkillstab" defaultValue={this.state.profiles.hardSkills}/></div>

                            <div><p style={{color: 'rgba(60,13,153)',fontWeight:'bold',fontSize:'20px'}}>softSkills</p>
                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add softSkills" name="softSkills" defaultValue={this.state.profiles.softSkills}/></div>

                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add name(required)" name="name" defaultValue={this.state.users.name}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                            <input className="form-control" style={{color:"black"}} type="email" placeholder="add email(required)" name="email" defaultValue={this.state.users.email}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add phone" name="phone" defaultValue={this.state.profiles.phone}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Age</label>
                                            </div>
                                            <div className="col-md-6">
                                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add age" name="age" defaultValue={this.state.profiles.age}/>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Adress</label>
                                            </div>
                                            <div className="col-md-6">
                                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add adress" name="address" defaultValue={this.state.profiles.address}/>
                                            </div>
                                        </div>

                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        
                            <div className="row">
                                            <div className="col-md-6">
                                                <label>Education</label>
                                            </div>
                                            <div className="col-md-6">
                                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add education" name="education" defaultValue={this.state.profiles.education}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Experiences</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="text" placeholder="add experiences"  name="hobbies" defaultValue={this.state.profiles.experiences}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Projects</label>
                                            </div>
                                            <div className="col-md-6">
                                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add projects" name="academicProject" defaultValue={this.state.profiles.academicProject}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Personal</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="text" placeholder="add personal"  name="personal" defaultValue={this.state.profiles.personal}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Summary</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="text" placeholder="add summary"  name="summary" defaultValue={this.state.profiles.summary}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Website</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="url" placeholder="add website"  name="website" defaultValue={this.state.profiles.website}/>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Contacts</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="text" placeholder="add contacts"  name="contacts" defaultValue={this.state.profiles.contacts}/>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Github</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="url" placeholder="add github"  name="github" defaultValue={this.state.profiles.github}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Linkedin</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="url" placeholder="add linkedin"  name="linkedin" defaultValue={this.state.profiles.linkedin}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Languages</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="text" placeholder="add languages"  name="languages" defaultValue={this.state.profiles.languages}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Hobbies</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="text" placeholder="add hobbies"  name="hobbies" defaultValue={this.state.profiles.hobbies}/>
                                            </div>
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
        <Footer />    
      </div>      </>
    );
  }
}

export default ProfileUpdate;
