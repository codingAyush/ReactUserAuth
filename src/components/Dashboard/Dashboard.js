import React, { Component } from 'react';
import   './dashboard.css';
import NoImage from '../../assets/images/noImage.jpg';
import axios from 'axios';
import Auth from '../../shared/auth';
const queryString = require('query-string');

 class Dashboard extends Component{

   queryParams=queryString.parse(this.props.location.search);
 
     handleSignOut=()=>{
        axios.get('http://ec2-13-232-20-56.ap-south-1.compute.amazonaws.com/api/signout')
        .then((result)=>{
            Auth.logout();
            this.props.history.push('/');
        })
        .catch((err)=>{

        })
    }

    render(){
        return(
            <div className="card">
                    <div className="signOut">
                        <button  onClick={this.handleSignOut} >signOut</button>
                    </div>
                    <img src={NoImage} alt="noImage" />
                    <h1>{this.queryParams.name}</h1>
                    <p className="title">CEO & Founder, Example</p>
                    <p className="title">{this.queryParams.email}</p>
                    <p>Harvard University</p>
            </div>
        );
  }
}

export default Dashboard;