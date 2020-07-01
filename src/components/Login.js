import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Auth from '../shared/auth'
class Login extends Component {
	
		state = {
			userData:{
				email: '',
				password: '',
				name:'',
				role:0,
				_id:'',
				token:'',
				isAuthenticated:false
			},
			error:false,
			errorMsg:null
		};

	
	
//handling the user input
	handleUserInput= (e) =>{
  		const name = e.target.name;
		  const value = e.target.value;
		this.setState({
			  userData:{...this.state.userData, [name]:value}
		  })
		}




	displayLogin=(e)=> {
		e.preventDefault();
		console.log('You are logged in');
		
		axios.post('http://ec2-13-232-20-56.ap-south-1.compute.amazonaws.com/api/signin', this.state.userData,{
		headers: {"Access-Control-Allow-Origin": "http://localhost:3000/"},
		responseType: 'json',
		})
		.then((result)=>{
			// console.log(`result= ${JSON.stringify(result.data)}`);

			this.setState({

				userData:{
							...this.state.userData, 
							token:result.data.token,
							_id:result.data.user._id,
							name:result.data.user.name,
							role:result.data.user.role,
							isAuthenticated:true
				}
				
			})

			if(this.state.userData.isAuthenticated){
				Auth.login();
				this.props.history.push({
					pathname:'/dashboard',
					search: `?name=${this.state.userData.name}&email=${this.state.userData.email}`
				});
			}

			console.log(this.state);
		})
		.catch((err)=>{
			// console.log(`error = ${JSON.stringify(err.response.data.error)}`);
			
			this.setState({
				error:true, errorMsg:err.response.data.error
			})
				setTimeout(()=>{
					this.setState({
					error:false, errorMsg:null
				})
				},3000)	
		})

		
	}

	render() {
		return (
			<div className="login">
				<form onSubmit={this.displayLogin}>
					<h2>Login</h2>
					<div className="username">
						<input
							type="text"
							placeholder="Username..."
							value={this.state.userData.email}
							onChange={(e)=>this.handleUserInput(e)}
							name="email"
						/>
					</div>

					<div className="password">
						<input
							type="password"
							placeholder="Password..."
							value={this.state.userData.password}
							onChange={(e)=>this.handleUserInput(e)}
							name="password"
						/>
					</div>
					{
						this.state.error?this.state.errorMsg:null
					}
					<input type="submit" value="Login" />
				</form>

				<Link to="/register">Create an account</Link>
			</div>
		);
		}
}

export default Login;
