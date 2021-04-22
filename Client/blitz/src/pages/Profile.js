import React from "react";
import Header from "../components/headers/light";
import axios from 'axios';
import Footer from "components/footers/SimpleFooter";
import "bootstrap/dist/js/bootstrap"
import "../assets/profilecss/profile.css";
//import "bootstrap/dist/css/bootstrap.min.css"
import "jquery/dist/jquery";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    console.log("id", this.props.match.params.id);
    this.state = {
      profiles: [],
      langtab: [],
      hardSkillstab: [],
      softSkillstab: [],
      hobbiestab: [],
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
        this.setState({ profiles: res.data });
        this.setState({ langtab: res.data.languages });
        this.setState({ hardSkillstab: res.data.hardSkills });
        this.setState({ softSkillstab: res.data.softSkills });
        this.setState({ hobbiestab: res.data.hobbies });
        this.setState({ userid: res.data.user });
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
                            <img src={this.state.users.photo} alt=""/>
                            <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                                    <h5>
                                    {this.state.users.userName}
                                    </h5>
                                    <h6>
                                        Web Developer and Designer
                                    </h6>
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
                        <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-work">
                            <label style={{color:'rgba(60,13,153)',fontWeight:'bold',fontSize:'20px'}}>hardSkills</label>
                            <div>{this.state.hardSkillstab.map((x,index) =>(<div key={index}>{x}</div>))}</div>

                            <label style={{color: 'rgba(60,13,153)',fontWeight:'bold',fontSize:'20px'}}>softSkills</label>
                            <div>{this.state.softSkillstab.map((x,index) =>(<div key={index}>{x}</div>))}</div>

                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                            <p>{this.state.profiles.user}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                            <p>{this.state.users.userName}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                            <p>{this.state.profiles.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                            <p>{this.state.profiles.phone}</p>                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Profession</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Web Developer and Designer</p>
                                            </div>
                                        </div>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Age</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.profiles.age}</p> 
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Adress</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.profiles.address}</p> 
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Education</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.profiles.education}</p> 
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Languages</label>
                                            </div>
                                            <div className="col-md-6">
                                                <div>{this.state.langtab.map((x,index) =>(<p key={index}>{x}</p>))}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Hobbies</label>
                                            </div>
                                            <div className="col-md-6">
                                            <div>{this.state.hobbiestab.map((x,index) =>(<p key={index}>{x}</p>))}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Experiences</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.profiles.experiences}</p> 
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Projects</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.profiles.academicProject}</p> 
                                            </div>
                                        </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Your Bio</label><br/>
                                        <p>  linkedIn + github not ready</p>
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

export default Profile;
