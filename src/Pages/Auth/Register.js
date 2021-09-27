import {InputText} from 'primereact/inputtext';
import React, {Component} from 'react';
import {Button} from 'primereact/button';
import './register.css';
import {withRouter} from 'react-router';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      email: '',
      phoneNumber: '',
      error: {
        userName: '',
        password: '',
        email: '',
        phoneNumber: '',
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  handleSubmit = (e) => {
    alert(JSON.stringify(this.state));
    e.preventDefault();
    this.props.history.push('register/landingPage');
  };
  render() {
    return (
      <div
        style={{
          border: '1px solid',
          backgroundColor: '#7f7f7f',
          paddingBottom: '170px',
          position: 'fixed',
          width: '100%',
        }}
      >
        <div className=" p-shadow-6  seller">
          <form onSubmit={this.handleSubmit}>
            <div
              className="p-grid   
                    title p-mt-6 p-justify-center"
            >
              <h1 className="title"> Welcome to Dolphins Admin Portal</h1>
            </div>
            <div className="p-grid p-pt-2 p-justify-center">
              <i className="fa fa-user-circle fa-2x title">
                <span className="register">Registration Form</span>
              </i>
            </div>
            <div className="p-grid p-pt-5 p-justify-center">
              <div className="inputTex p-d-flex p-card ">
                <span className=" inputTex input-group-text p-p-2 p-pl-6 p-pt-0 p-m-0">
                  <i className="p-pl-2  fa fa-user fa-2x "></i>
                </span>
              </div>

              <div className="p-d-flex p-card">
                <InputText
                  type="text"
                  className="form-control"
                  placeholder="UserName"
                  style={{width: '320px'}}
                  name="userName"
                  value={this.state.userName}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="p-grid p-justify-center p-pt-4">
              <div className="p-d-flex p-card inputTex">
                <span className=" inputTex input-group-text p-p-2 p-pl-6 p-pt-0 p-m-0">
                  <i
                    className="p-pl-2 pi pi-envelope

                                   fa-2x "
                  ></i>
                </span>
              </div>

              <div className="p-d-flex p-card">
                <InputText
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  style={{width: '320px'}}
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="p-grid p-justify-center p-pt-4">
              <div className="p-d-flex p-card inputTex">
                <span className=" inputTex input-group-text p-p-2 p-pl-6 p-pt-0 p-m-0">
                  <i
                    className="p-pl-2 pi pi-key
                                 fa-2x "
                  ></i>
                </span>
              </div>

              <div className="p-d-flex p-card">
                <InputText
                  type="text"
                  className="form-control"
                  placeholder="Password"
                  style={{width: '320px'}}
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>{' '}
            <div className="p-grid p-justify-center p-pt-4">
              <div className="p-d-flex p-card inputTex">
                <span className=" inputTex input-group-text p-p-2 p-pl-6 p-pt-0 p-m-0">
                  <i
                    className="p-pl-2 pi pi-phone

                               fa-2x "
                  ></i>
                </span>
              </div>

              <div className="p-d-flex p-card">
                <InputText
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  style={{width: '320px'}}
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="p-grid p-pt-5 p-justify-center">
              <div className="p-d-flex p-card">
                <Button
                  label="Register"
                  className="p-py-2 p-px-1 p-text-center p-m-0 p-button-primary"
                  style={{width: '370px'}}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Register);
