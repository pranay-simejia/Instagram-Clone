import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import M from 'materialize-css';
import axios from 'axios';
import './Profile.css';
import Loader from '../../Loader';

const Profile = () => {
	const [image, setImage] = useState('');
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [url, setUrl] = useState(user.profilePic);

	const getData = async () => {
		const { data } = await axios.get('/myposts');
		setData(data);
	};
	const [data, setData] = useState([]);
	useEffect(() => {
		getData();
	}, []);

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
			const user = await axios.put('/updateprofilepic', {
				profilePic: data.url,
			});
			dispatch({ type: 'USER', payload: user.data });
			setUrl(data.url);
		} catch (e) {
			M.toast({
				html: 'Internal error, Try later!',
				classes: '#b71c1c red darken-4',
			});
		}
	};

	const gallery = data.map((item) => (
		<img key={item._id} className='item' src={item.photo} alt={item.title} />
	));
	return (
		<div style={{ maxWidth: '550px', margin: '0px auto' }}>
			{user.followers && user.following ? (
				<div
					style={{
						margin: '18px 0px',
						borderBottom: '1px solid grey',
					}}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-around',
						}}>
						<div>
							<img
								style={{
									width: '160px',
									height: '160px',
									borderRadius: '80px',
								}}
								src={url}
							/>
						</div>
						<div>
							<h4>{user.name}</h4>
							<h5>{user.email}</h5>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									width: '108%',
								}}>
								<h6>{data.length} posts</h6>
								<h6>{user.followers.length} followers</h6>
								<h6>{user.following.length} following</h6>
							</div>
						</div>
					</div>

					<div className='file-field input-field' style={{ margin: '10px' }}>
						<div className='btn #64b5f6 blue darken-1'>
							<span>Update pic</span>
							<input
								type='file'
								onChange={(e) => setImage(e.target.files[0])}
							/>
						</div>
						<div className='file-path-wrapper'>
							<input className='file-path validate' type='text' />
						</div>
					</div>
				</div>
			) : (
				<Loader />
			)}
			<div className='gallery'>{gallery}</div>
		</div>
	);
};

export default Profile;
