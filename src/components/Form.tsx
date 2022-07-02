// import { templateLiteral } from '@babel/types';
import React from 'react';
import {AiOutlineCheck, AiOutlineClose} from 'react-icons/ai';
import '../styles/form.css';

export interface Data {
	email: string;
	password: string;
	validEmail: boolean;
	validPassword: boolean;
}

export default class Form extends React.Component {
	constructor(props: any) {
		super(props);
		this.state = {
			email:"",
			password: "",
			validEmail: false,
			validPassword: false,
		};
	}

	onChangeHandler(e: any) {
		this.setOnChange(e);
		setTimeout(() => {
			this.validate();
		},1);
	}

	setOnChange(e: any) {
		this.setState(prevState => ({
			[e.target.id] : e.target.value
		}));
	}
	validate() {
		const emailCheck = document.querySelector('.emailCheck') as HTMLElement;
		const passwordCheck = document.querySelector('.passwordCheck') as HTMLElement;
		const { email, password} = this.state as Data;
		const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gim;
		if (!emailRegex.test(email) && email.length > 0) {
			emailCheck.style.display = 'inline-block';
			this.setState(prevState => ({
				validEmail : false
			}));
		}
		else if (email.length > 0) {
			emailCheck.style.display = 'inline-block';
			this.setState(prevState => ({
				validEmail : true
			}));
		}
		if (!passwordRegex.test(password) && password.length > 0) {
			passwordCheck.style.display = 'inline-block';
			this.setState(prevState => ({
				validPassword : false
			}));
		}
		else if (password.length > 0) {
			passwordCheck.style.display = 'inline-block';
			this.setState(prevState => ({
				validPassword : true
			}));
		}
	}
	render() {
		return (
			<form>
				<label htmlFor="email">email:</label>
				<input type="email" id="email" onChange={(e) => this.onChangeHandler(e)}/>
				<span className="emailCheck" style={{display : 'none'}}> {
					((this.state as Data).validEmail)? <AiOutlineCheck style={{color: 'green'}}/>: <AiOutlineClose style={{color: 'red'}}/>
				} </span>
				<label htmlFor="password">password:</label>
				<input type="password" id="password" onChange={(e) => this.onChangeHandler(e)}/>
				<span className="passwordCheck" style={{display : 'none'}}> {
					((this.state as Data).validPassword)? <AiOutlineCheck style={{color: 'green'}}/>: <AiOutlineClose style={{color: 'red'}}/>
				} </span>
			</form>
		);
	}
}
