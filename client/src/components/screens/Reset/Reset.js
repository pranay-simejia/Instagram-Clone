import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';

const Reset = () => {
	const [email, setEmail] = useState('');

	const history = useHistory();

	const loginAccount = async () => {
		try {
			const res = await axios.post('/Reset', {
				email,
			});

			M.toast({
				html: 'Check your provided Email',
				classes: '#66bb6a green lighten-1',
			});
			history.push('/');
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
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<button
					class='btn waves-effect waves-light #42a5f5 blue lighten-1'
					type='submit'
					name='action'
					onClick={() => loginAccount()}>
					Reset Password
					<i class='material-icons right'>send</i>
				</button>
			</div>
		</div>
	);
};

export default Reset;
