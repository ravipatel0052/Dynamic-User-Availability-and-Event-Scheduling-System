import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleLogin } from "../utils/resource";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		if (username.trim() && password.trim()) {
			e.preventDefault();
			handleLogin(username, password, navigate);
			setPassword("");
			setUsername("");
		}
	};

	const handleAdminLogin = () => {
		localStorage.removeItem("_id");
		localStorage.removeItem("_myEmail");
		navigate("/adminlogin");
	};

	return (
		<div>
		<nav className='dashboard__nav'>
				<h2>BookMe</h2>

				<button onClick={handleAdminLogin} className='.admin__btn'>
					Admin Login
				</button>
			</nav>
		<main className='login'>
			<form className='login__form' onSubmit={handleSubmit}>
				<h2 className='login__title'>Log into your account</h2>
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
				<p style={{ textAlign: "center", marginTop: "30px" }}>
					Don't have an account?{" "}
					<Link className='link' to='/register'>
						Create one
					</Link>
				</p>
			</form>
			</main>
			</div>
	);
};

export default Login;
