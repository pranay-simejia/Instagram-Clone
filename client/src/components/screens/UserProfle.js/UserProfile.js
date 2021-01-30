import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Loader from '../../Loader';
import './UserProfile.css';
import { useParams, useHistory } from 'react-router-dom';

const UserProfile = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const { userId } = useParams();
	const [userProfile, setProfile] = useState({});
	if (userId === user._id) {
		history.push('/profile');
	}

	const getData = async () => {
		const { data } = await axios.get(`/user/${userId}`);
		console.log(user);
		// console.log(data)
		setProfile(data);
	};

	useEffect(() => {
		getData();
	}, []);

	const followUser = async (followId) => {
		const { data } = await axios.put('/follow', {
			followId,
		});

		let updatedUserProfile = {};

		updatedUserProfile.user = data.userFollowed;
		updatedUserProfile.posts = userProfile.posts;
		setProfile(updatedUserProfile);
		dispatch({ type: 'USER', payload: data.userFollowing });
	};
	const unfollowUser = async (unfollowId) => {
		const { data } = await axios.put('/unfollow', {
			unfollowId,
		});

		let updatedUserProfile = {};

		updatedUserProfile.user = data.userFollowed;
		updatedUserProfile.posts = userProfile.posts;
		setProfile(updatedUserProfile);
		dispatch({ type: 'USER', payload: data.userFollowing });
	};
	return (
		<>
			{' '}
			{userProfile.user && userProfile.posts ? (
				<div style={{ maxWidth: '550px', margin: '0px auto' }}>
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
									src={userProfile.user.profilePic}
								/>
							</div>
							<div>
								<h4>{userProfile.user.name}</h4>
								<h5>{userProfile.user.email}</h5>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
										width: '108%',
									}}>
									<div style={{ display: 'flex', flexDirection: 'row' }}>
										<h6 style={{ margin: '2px 4px' }}>
											{userProfile.posts.length} posts
										</h6>
										<h6 style={{ margin: '2px 4px' }}>
											{userProfile.user.followers.length} followers
										</h6>
										<h6 style={{ margin: '2px 4px' }}>
											{userProfile.user.following.length} following
										</h6>
									</div>
									<div style={{ display: 'flex', flexDirection: 'row' }}>
										{!userProfile.user.followers.includes(user._id) ? (
											<button
												class='btn waves-effect waves-light #42a5f5 blue lighten-1'
												style={{ margin: '2px' }}
												type='submit'
												name='action'
												onClick={() => followUser(userProfile.user._id)}>
												Follow
											</button>
										) : (
											<button
												style={{ margin: '2px' }}
												class='btn waves-effect waves-light #42a5f5 blue lighten-1'
												type='submit'
												name='action'
												onClick={() => unfollowUser(userProfile.user._id)}>
												Unfollow
											</button>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className='file-field input-field' style={{ margin: '10px' }}>
							<div className='btn #64b5f6 blue darken-1'>
								<span>Update pic</span>
								<input
									type='file'
									// onChange={(e) => updatePhoto(e.target.files[0])}
								/>
							</div>
							<div className='file-path-wrapper'>
								<input className='file-path validate' type='text' />
							</div>
						</div>
					</div>

					<div className='gallery'>
						{userProfile.posts.map((item) => (
							<img
								key={item._id}
								className='item'
								src={item.photo}
								alt={item.title}
							/>
						))}
					</div>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};

export default UserProfile;
