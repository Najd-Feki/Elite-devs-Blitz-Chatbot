import React from "react";
import Header from "../components/headers/light";
import axios from 'axios';
import Footer from "components/footers/SimpleFooter";
import {Link} from "react-router-dom";
import "bootstrap/dist/js/bootstrap";
import "../assets/profilecss/profile.css";
import "jquery/dist/jquery";
import Profiles from "components/profiles/Profiles";
import { current } from "immer";
class ProfileUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this)
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

avatar(e){
    this.state.users.avatar = e.target.value;;
    console.log("avatar",this.state.users.avatar); 
}
headline(e){
    this.state.profiles.headline = e.target.value;;
    console.log("headline",this.state.profiles.headline); 
}
hardSkills(e){
    this.state.profiles.hardSkills = e.target.value;;
    console.log("hardSkills",this.state.profiles.hardSkills); 
}
softSkills(e){
    this.state.profiles.softSkills = e.target.value;;
    console.log("softSkills",this.state.profiles.softSkills); 
}
name(e){
    this.state.users.name = e.target.value;;
    console.log("name",this.state.users.name); 
}
email(e){
    this.state.users.email = e.target.value;;
    console.log("email",this.state.users.email); 
}
age(e){
    this.state.profiles.age = e.target.value;;
    console.log("age",this.state.profiles.age); 
}
phone(e){
    this.state.profiles.phone = e.target.value;;
    console.log("phone",this.state.profiles.phone); 
}
address(e){
    this.state.profiles.address = e.target.value;;
    console.log("address",this.state.profiles.address); 
}
education(e){
    this.state.profiles.education = e.target.value;;
    console.log("education",this.state.profiles.education); 
}
experiences(e){
    this.state.profiles.experiences = e.target.value;;
    console.log("experiences",this.state.profiles.experiences); 
}
academicProject(e){
    this.state.profiles.academicProject = e.target.value;;
    console.log("academicProject",this.state.profiles.academicProject); 
}
summary(e){
    this.state.profiles.summary = e.target.value;;
    console.log("summary",this.state.profiles.summary); 
}
personal(e){
    this.state.profiles.personal = e.target.value;;
    console.log("personal",this.state.profiles.personal); 
}
website(e){
    this.state.profiles.website = e.target.value;;
    console.log("website",this.state.profiles.website); 
}
contacts(e){
    this.state.profiles.contacts = e.target.value;;
    console.log("contacts",this.state.profiles.contacts); 
}
github(e){
    this.state.profiles.github = e.target.value;;
    console.log("github",this.state.profiles.github); 
}
languages(e){
    this.state.profiles.languages = e.target.value;;
    console.log("languages",this.state.profiles.languages); 
}
hobbies(e){
    this.state.profiles.hobbies = e.target.value;;
    console.log("hobbies",this.state.profiles.hobbies); 
}

save(){
    console.log("user",this.state.users._id);
    console.log("profile",this.state.profiles._id);
    var profileid = this.state.profiles._id;
    var userid = this.state.users._id;
    axios.put(`http://localhost:5000/user/modify/${userid}` , this.state.users );
    axios.put(`http://localhost:5000/profile/modify/${profileid}` , this.state.profiles );
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
                            <input className="form-control" style={{color:"black",margin:"20px"}} type="url" placeholder="add photo" name="photo" defaultValue={this.state.users.avatar} onChange={this.avatar.bind(this)}/>

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5>
                            {this.state.users.name}
                            </h5>
                            <h6><input className="form-control" style={{color:"black"}} type="text" placeholder="add hedline" name="hedline" defaultValue={this.state.profiles.headline} onChange={this.headline.bind(this)}/></h6>   

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
                        <Link to ={"/profileupdate/"+ this.state.users._id} onClick={this.save} className="profile-edit-btn" >Edit Profile</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-work">

                            <div><p style={{color: 'rgba(60,13,153)',fontWeight:'bold',fontSize:'20px'}}>hardSkills</p>
                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add hardSkillstab" name="hardSkillstab" defaultValue={this.state.profiles.hardSkills} onChange={this.hardSkills.bind(this)}/></div>

                            <div><p style={{color: 'rgba(60,13,153)',fontWeight:'bold',fontSize:'20px'}}>softSkills</p>
                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add softSkills" name="softSkills" defaultValue={this.state.profiles.softSkills} onChange={this.softSkills.bind(this)}/></div>

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
                                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add name(required)" name="name" defaultValue={this.state.users.name} onChange={this.name.bind(this)}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                            <input className="form-control" style={{color:"black"}} type="email" placeholder="add email(required)" name="email" defaultValue={this.state.users.email} onChange={this.email.bind(this)}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add phone" name="phone" defaultValue={this.state.profiles.phone} onChange={this.phone.bind(this)}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Age</label>
                                            </div>
                                            <div className="col-md-6">
                                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add age" name="age" defaultValue={this.state.profiles.age} onChange={this.age.bind(this)}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Adress</label>
                                            </div>
                                            <div className="col-md-6">
                                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add adress" name="address" defaultValue={this.state.profiles.address} onChange={this.address.bind(this)}/>
                                            </div>
                                        </div>

                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        
                            <div className="row">
                                            <div className="col-md-6">
                                                <label>Education</label>
                                            </div>
                                            <div className="col-md-6">
                                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add education" name="education" defaultValue={this.state.profiles.education} onChange={this.education.bind(this)}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Experiences</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="text" placeholder="add experiences"  name="hobbies" defaultValue={this.state.profiles.experiences} onChange={this.experiences.bind(this)}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Projects</label>
                                            </div>
                                            <div className="col-md-6">
                                            <input className="form-control" style={{color:"black"}} type="text" placeholder="add projects" name="academicProject" defaultValue={this.state.profiles.academicProject} onChange={this.academicProject.bind(this)}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Personal</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="text" placeholder="add personal"  name="personal" defaultValue={this.state.profiles.personal} onChange={this.personal.bind(this)}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Summary</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="text" placeholder="add summary"  name="summary" defaultValue={this.state.profiles.summary} onChange={this.summary.bind(this)}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Website</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="url" placeholder="add website"  name="website" defaultValue={this.state.profiles.website} onChange={this.website.bind(this)}/>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Contacts</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="text" placeholder="add contacts"  name="contacts" defaultValue={this.state.profiles.contacts} onChange={this.contacts.bind(this)}/>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Github</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="url" placeholder="add github"  name="github" defaultValue={this.state.profiles.github} onChange={this.github.bind(this)}/>
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
                                                <input className="form-control" style={{color:"black"}} type="text" placeholder="add languages"  name="languages" defaultValue={this.state.profiles.languages} onChange={this.languages.bind(this)}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Hobbies</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="form-control" style={{color:"black"}} type="text" placeholder="add hobbies"  name="hobbies" defaultValue={this.state.profiles.hobbies} onChange={this.hobbies.bind(this)}/>
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
