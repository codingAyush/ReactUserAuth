import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FormErrors } from './formErrors';

class Register extends Component {
	//handling the state
		state = {
			userData:{
				name: '',
				email: '',
				password: ''
			},
			formErrors: {email: '', password: ''},
    		emailValid: false,
    		passwordValid: false,
			formValid: false,
			error:false,
			msg:null,
			success:false,
			isRegistered:false
			
		};

//handling the user input
	handleUserInput= (e) =>{
  		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			  userData:{...this.state.userData, [name]:value}
		  },
				() => { this.validateField(name, value) }
				);
		}


// for validation
validateField(fieldName, value) {
  let fieldValidationErrors = this.state.formErrors;
  let emailValid = this.state.emailValid;
  let passwordValid = this.state.passwordValid;

  switch(fieldName) {
    case 'email':
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
	  fieldValidationErrors.email = emailValid ? '' : ' is invalid';
	  
      break;
    case 'password':
      passwordValid = value.length >= 6;
      fieldValidationErrors.password = passwordValid ? '': ' is too short';
      break;
    default:
      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  emailValid: emailValid,
                  passwordValid: passwordValid
                }, this.validateForm);
}

validateForm() {
  this.setState({formValid: this.state.emailValid && this.state.passwordValid});
}

displayLogin=(e) =>{
		e.preventDefault();
		console.log(this.state.userData);
		axios.post('http://ec2-13-232-20-56.ap-south-1.compute.amazonaws.com/api/signup', this.state.userData,{
		headers: {"Access-Control-Allow-Origin": "http://localhost:3000/"},
		responseType: 'json',
		})
		.then((result)=>{
			// console.log(`result= ${JSON.stringify(result.data)}`);

			this.setState({
				success:true, msg:`${result.data.user.name} is registerd successfully.`
			});

			if(this.state.success){
				this.props.history.push('/');
			}
			setTimeout(()=>{
				this.setState({
				error:false, msg:null
			})
			},5000)	
		})
		.catch((err)=>{
			this.setState({
				error:true, msg:err.response.data.error
			});
				setTimeout(()=>{
					this.setState({
					error:false, msg:null
				})
				},5000)	
		})
	}

	render() {
		return (
			<div className="register">
				<form onSubmit={this.displayLogin}>
					<h2>Register</h2>

					<div className="name">
						<input
							type="text"
							placeholder="Full Name"
							name="name"
							value={this.state.name}
							onChange={(e)=>this.handleUserInput(e)}
						/>
					</div>

					<div className="email">
						<input
							type="text"
							placeholder="Enter your email"
							name="email"
							value={this.state.email}
							onChange={(e)=>this.handleUserInput(e)}
						/>
					</div>

					<div className="pasword">
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={this.state.password}
							onChange={(e)=>this.handleUserInput(e)}
						/>
					</div>
					{
						this.state.error?this.state.msg:null
						}
					{	this.state.success?this.state.msg:null
					}
				<FormErrors formErrors={this.state.formErrors}></FormErrors>
				
					<input type="submit" disabled={!this.state.formValid} value="Register" />
				</form>

				<Link to="/">Login Here</Link>
			</div>
		);
	}
}

export default Register;
