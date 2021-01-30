import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CretePost = () => {
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [image, setImage] = useState('');
	const [url, setUrl] = useState('');

	useEffect(() => {
		if (url !== '') {
			const postReq = async () => {
				await axios.post('/createpost', {
					title,
					body,
					photo: url,
				});
				M.toast({
					html: 'created post successfully',
					classes: '#66bb6a green lighten-1',
				});
				history.push('/');
			};
			postReq();
		}
	}, [url]);

	const postDetails = async () => {
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
			M.toast({ html: 'Internal error, Try later!', classes: '#b71c1c red darken-4' });
		}
	};
	return (
		<div
			className='card input-filed'
			style={{
				margin: '30px auto',
				maxWidth: '500px',
				padding: '20px',
				textAlign: 'center',
			}}>
			<input
				type='text'
				placeholder='title'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				type='text'
				placeholder='body'
				value={body}
				onChange={(e) => setBody(e.target.value)}
			/>
			<div className='file-field input-field'>
				<div className='btn #64b5f6 blue darken-1'>
					<span>Upload Image</span>
					<input type='file' onChange={(e) => setImage(e.target.files[0])} />
				</div>
				<div className='file-path-wrapper'>
					<input className='file-path validate' type='text' />
				</div>
			</div>
			<button
				className='btn waves-effect waves-light #64b5f6 blue darken-1'
				onClick={() => postDetails()}>
				Submit post
			</button>
		</div>
	);
};

export default CretePost;
