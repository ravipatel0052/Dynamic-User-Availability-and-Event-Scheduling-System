import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { handleAdLogin } from "../utils/resource";

const AdminLogin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		if (username.trim() && password.trim()) {
			e.preventDefault();
			handleAdLogin(username, password,navigate);
			setPassword("");
			setUsername("");
		}
  };
  
  const UserLogin = () => {
		navigate("/");
	};

	return (
		<div>
		<nav className='dashboard__nav'>
				<h2>BookMe</h2>

				<button onClick={UserLogin} className='.login__btn'>
					User Login
				</button>
			</nav>
		<main className='login'>
			<form className='login__form' onSubmit={handleSubmit}>
				<h2 className='login__title'>Log into Admin account</h2>
				<label htmlFor='username'>Username</label>
				<input
					id='username'
					name='username'
					type='text'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className='username'
				/>
				<label htmlFor='password'>Password</label>
				<input
					id='password'
					type='password'
					name='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='password'
				/>
				<button className='loginButton'>LOG IN</button>
			</form>
			</main>
			</div>
	);
};

export default AdminLogin;
