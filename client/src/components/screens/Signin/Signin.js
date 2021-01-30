import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import M from 'materialize-css';
import './Signin.css';
const Signin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const history = useHistory();
	const dispatch = useDispatch();

	const loginAccount = async () => {
		try {
			const res = await axios.post('/signin', {
				email,
				password,
			});

			M.toast({ html: 'Welcome Back!', classes: '#66bb6a green lighten-1' });
			dispatch({ type: 'USER', payload: res.data });
			history.push('/');
		} catch (e) {
			M.toast({
				html: 'Please enter valid credentials!',
				classes: '#b71c1c red darken-4',
			});
		}
	};
	return (
		<div className='mycard'>
			<div className='card auth input-field'>
				<h2>Instagram</h2>
				<input
					type='text'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					class='btn waves-effect waves-light #42a5f5 blue lighten-1'
					type='submit'
					name='action'
					onClick={() => loginAccount()}>
					Signin
					<i class='material-icons right'>send</i>
				</button>
				<h6>
					<Link to='/signup'>Don't have an account?</Link>
				</h6>
				<h6>
					<Link to='/reset'>Forgot Password?</Link>
				</h6>
			</div>
		</div>
	);
};

export default Signin;
