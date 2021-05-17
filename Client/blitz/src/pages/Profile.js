import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/headers/light';
import axios from 'axios';
import Footer from 'components/footers/SimpleFooter';
import 'bootstrap/dist/js/bootstrap';
import '../assets/profilecss/profile.css';
import 'jquery/dist/jquery';
class Profile extends React.Component {
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
    axios
      .get('http://localhost:5000/user/' + this.props.match.params.id)
      .then((Response) => {
        this.setState({ users: Response.data });
        console.log('users', Response.data);
        axios
          .get('http://localhost:5000/profile/' + Response.data.profile)
          .then((res) => {
            console.log('profile', res.data);
            if (res.data != undefined) this.setState({ profiles: res.data });

            if (res.data.languages != undefined)
              this.setState({ langtab: res.data?.languages });

            if (res.data.hardSkills != undefined)
              this.setState({ hardSkillstab: res.data.hardSkills });

            if (res.data.softSkills != undefined)
              this.setState({ softSkillstab: res.data?.softSkills });

            if (res.data.hobbies != undefined)
              this.setState({ hobbiestab: res.data?.hobbies });

            if (res.data.experiences != undefined)
              this.setState({ experiencestab: res.data?.experiences });

            if (res.data.user != undefined)
              this.setState({ userid: res.data?.user });
          });
      });
  }
  render() {
    return (
      <>
        <Header />
        <div className='profile-body'>
          <br />
          <div className='container emp-profile'>
            <form method='post'>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='profile-img'>
                    <img src={this.state.users.avatar} alt='' />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='profile-head'>
                    <h5>{this.state.users.name}</h5>
                    <div>
                      {this.state.profiles.headline != undefined ? (
                        <h6>{this.state.profiles.headline}</h6>
                      ) : (
                        <div></div>
                      )}
                    </div>

                    <ul className='nav nav-tabs' id='myTab' role='tablist'>
                      <li className='nav-item'>
                        <a
                          className='nav-link active'
                          id='home-tab'
                          data-toggle='tab'
                          href='#home'
                          role='tab'
                          aria-controls='home'
                          aria-selected='true'
                        >
                          About
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a
                          className='nav-link'
                          id='profile-tab'
                          data-toggle='tab'
                          href='#profile'
                          role='tab'
                          aria-controls='profile'
                          aria-selected='false'
                        >
                          Timeline
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-md-2'>
                  <Link to={'/profileupdate/' + this.state.users._id}className='profile-edit-btn'>Edit profile</Link>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='profile-work'>
                    <div>
                      {this.state.hardSkillstab.length != 0 ? (
                        <div>
                          <p
                            style={{
                              color: 'rgba(60,13,153)',
                              fontWeight: 'bold',
                              fontSize: '20px',
                            }}
                          >
                            hardSkills
                          </p>
                          <div>
                            {this.state.hardSkillstab.map((x, index) => (
                              <div key={index}>{x}</div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>

                    <div>
                      {this.state.softSkillstab.length != 0 ? (
                        <div>
                          <p
                            style={{
                              color: 'rgba(60,13,153)',
                              fontWeight: 'bold',
                              fontSize: '20px',
                            }}
                          >
                            softSkills
                          </p>
                          <div>
                            {this.state.softSkillstab.map((x, index) => (
                              <div key={index}>{x}</div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='col-md-8'>
                  <div className='tab-content profile-tab' id='myTabContent'>
                    <div
                      className='tab-pane fade show active'
                      id='home'
                      role='tabpanel'
                      aria-labelledby='home-tab'
                    >
                      <div className='row'>
                        <div className='col-md-6'>
                          <label style={{fontSize: "20px"}}>User Id</label>
                        </div>
                        <div className='col-md-6'>
                          <p>{this.state.users._id}</p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <label style={{fontSize: "20px"}}>Name</label>
                        </div>
                        <div className='col-md-6'>
                          <p>{this.state.users.name}</p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <label style={{fontSize: "20px"}}>Email</label>
                        </div>
                        <div className='col-md-6'>
                          <p>{this.state.users.email}</p>
                        </div>
                      </div>

                      <div>
                        {this.state.profiles.phone != undefined ? (
                          <div className='row'>
                            <div className='col-md-6'>
                              <label style={{fontSize: "20px"}} >Phone</label>
                            </div>
                            <div className='col-md-6'>
                              <p>{this.state.profiles.phone}</p>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div>
                        {this.state.profiles.age != undefined ? (
                          <div className='row'>
                            <div className='col-md-6'>
                              <label style={{fontSize: "20px"}}>Age</label>
                            </div>
                            <div className='col-md-6'>
                              <p>{this.state.profiles.age}</p>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div>
                        {this.state.profiles.address != undefined ? (
                          <div className='row'>
                            <div className='col-md-6'>
                              <label style={{fontSize: "20px"}}>Adress</label>
                            </div>
                            <div className='col-md-6'>
                              <p>{this.state.profiles.address}</p>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                    <div
                      className='tab-pane fade'
                      id='profile'
                      role='tabpanel'
                      aria-labelledby='profile-tab'
                    >
                      <div>
                        {this.state.profiles.education != undefined ? (
                          <div className='row'>
                            <div className='col-md-6'>
                              <label style={{fontSize: "20px"}}>Education</label>
                            </div>
                            <div className='col-md-6'>
                              <p>{this.state.profiles.education}</p>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div>
                        {this.state.experiencestab.length != 0 ? (
                          <div className='row'>
                            <div className='col-md-6'>
                              <label style={{fontSize: "20px"}}>Experiences</label>
                            </div>
                            <div className='col-md-6'>
                              <p>
                                {this.state.experiencestab.map((x, index) => (
                                  <p key={index}>{x}</p>
                                ))}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div>
                        {this.state.profiles.academicProject != undefined ? (
                          <div className='row'>
                            <div className='col-md-6'>
                              <label style={{fontSize: "20px"}}>Projects</label>
                            </div>
                            <div className='col-md-6'>
                              <p>{this.state.profiles.academicProject}</p>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div>
                        {this.state.profiles.personal != undefined ? (
                          <div className='row'>
                            <div className='col-md-6'>
                              <label style={{fontSize: "20px"}}>Personal</label>
                            </div>
                            <div className='col-md-6'>
                              <p>{this.state.profiles.personal}</p>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div>
                        {this.state.profiles.summary != undefined ? (
                          <div className='row'>
                            <div className='col-md-6'>
                              <label style={{fontSize: "20px"}}>Summary</label>
                            </div>
                            <div className='col-md-6'>
                              <p>{this.state.profiles.summary}</p>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div>
                        {this.state.profiles.website != undefined ? (
                          <div className='row'>
                            <div className='col-md-6'>
                              <label style={{fontSize: "20px"}}>Website</label>
                            </div>
                            <div className='col-md-6'>
                              <p>{this.state.profiles.website}</p>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div>
                        {this.state.profiles.contacts != undefined ? (
                          <div className='row'>
                            <div className='col-md-6'>
                              <label style={{fontSize: "20px"}}>Contacts</label>
                            </div>
                            <div className='col-md-6'>
                              <p>{this.state.profiles.contacts}</p>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div>
                        {this.state.profiles.github != undefined ? (
                          <div className='row'>
                            <div className='col-md-6'>
                              <label style={{fontSize: "20px"}}>Github</label>
                            </div>
                            <div className='col-md-6'>
                              <p>{this.state.profiles.github}</p>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div>
                        {this.state.profiles.linkedIn != undefined ? (
                          <div className='row'>
                            <div className='col-md-6'>
                              <label style={{fontSize: "20px"}}>LinkedIn</label>
                            </div>
                            <div className='col-md-6'>
                              <p>{this.state.profiles.linkedIn}</p>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div>
                        {this.state.langtab.length != 0 ? (
                          <div className='row'>
                            <div className='col-md-6'>
                              <label style={{fontSize: "20px"}}>Languages</label>
                            </div>
                            <div className='col-md-6'>
                              <p>
                                {this.state.langtab.map((x, index) => (
                                  <p key={index}>{x}</p>
                                ))}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div>
                        {this.state.hobbiestab.length != 0 ? (
                          <div className='row'>
                            <div className='col-md-6'>
                              <label style={{fontSize: "20px"}}>Hobbies</label>
                            </div>
                            <div className='col-md-6'>
                              <p>
                                {this.state.hobbiestab.map((x, index) => (
                                  <p key={index}>{x}</p>
                                ))}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <Footer />
        </div>{' '}
      </>
    );
  }
}

export default Profile;
