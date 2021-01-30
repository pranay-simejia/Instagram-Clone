import { React, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import './Signup.css';

const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [url, setUrl] = useState(undefined);
	const [image, setImage] = useState('');

	const history = useHistory();

	useEffect(() => {
		if (image) {
			postImage();
		}
	}, [image]);

	const postImage = async () => {
		const formdata = new FormData();
		formdata.append('file', image);
		formdata.append('upload_preset', 'instagram_social');
		formdata.append('cloud_name', 'manan07');
		try {
			const { data } = await axios.post(
				'https://api.cloudinary.com/v1_1/manan07/image/upload',
				formdata
			);
			setUrl(data.url);
		} catch (e) {
			M.toast({
				html: 'Internal error, Try later!',
				classes: '#b71c1c red darken-4',
			});
		}
	};

	const createAccount = async () => {
		try {
			const res = await axios.post('/signup', {
				name,
				email,
				password,
				profilePic: url,
			});

			M.toast({
				html: 'Welcome to Instagram,  Sign-in',
				classes: '#66bb6a green lighten-1',
			});
			history.push('/signin');
		} catch (e) {
			M.toast({
				html: 'Internal error, Try later!',
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
					placeholder='Username'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
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
				<div className='file-field input-field'>
					<div className='btn #64b5f6 blue darken-1'>
						<span>Upload Image</span>
						<input type='file' onChange={(e) => setImage(e.target.files[0])} />
					</div>
					<div className='file-path-wrapper'>
						<input
							className='file-path validate'
							placeholder='Profile Pic(Optional)'
							type='text'
						/>
					</div>
				</div>
				<button
					class='btn waves-effect waves-light #42a5f5 blue lighten-1'
					type='submit'
					name='action'
					onClick={() => createAccount()}>
					Signup
					<i class='material-icons right'>send</i>
				</button>
				<h6>
					<Link to='/signin'>Already have an account?</Link>
				</h6>
			</div>
		</div>
	);
};

export default Signup;
