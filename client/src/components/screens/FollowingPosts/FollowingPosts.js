import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './FollowingPosts.css';
import axios from 'axios';
import M from 'materialize-css';

const FollowingPosts = () => {
	const user = useSelector((state) => state.user);
	const [postsData, setPostsData] = useState([]);
	useEffect(() => {
		const getPostsData = async () => {
			const postsData = await axios.get('/getsubposts');
			setPostsData(postsData.data);
		};
		getPostsData();
	}, []);

	const likePost = async (postId) => {
		const { data } = await axios.put('/like', { postId });
		if (data.error) {
			M.toast({
				html: 'Internal error, Try later!',
				classes: '#66bb6a red lighten-1',
			});
			return;
		}

		const updatedPostsData = postsData.map((postData) => {
			if (postData._id === postId) {
				return data;
			} else {
				return postData;
			}
		});

		setPostsData(updatedPostsData);
	};
	const unlikePost = async (postId) => {
		const { data } = await axios.put('/unlike', { postId });

		if (data.error) {
			M.toast({
				html: 'Internal error, Try later!',
				classes: '#66bb6a red lighten-1',
			});
			return;
		}
		const updatedPostsData = postsData.map((postData) => {
			if (postData._id === postId) {
				return data;
			} else {
				return postData;
			}
		});
		setPostsData(updatedPostsData);
	};

	const makeComment = async (postId, text) => {
		const { data } = await axios.put('/comment', { postId, text });

		if (data.error) {
			M.toast({
				html: 'Internal error, Try later!',
				classes: '#66bb6a red lighten-1',
			});
			return;
		}
		const updatedPostsData = postsData.map((postData) => {
			if (postData._id === data._id) {
				return data;
			} else {
				return postData;
			}
		});
		setPostsData(updatedPostsData);
	};
	const deletePost = async (postId) => {
		const { data } = await axios.delete(`/delete/${postId}`);

		if (data.error) {
			M.toast({
				html: 'Internal error, Try later!',
				classes: '#66bb6a red lighten-1',
			});
			return;
		}
		const updatedPostsData = postsData.filter((postData) => {
			return postData._id !== postId;
		});

		setPostsData(updatedPostsData);
		M.toast({
			html: 'successfully deleted',
			classes: '#66bb6a green lighten-1',
		});
	};

	const posts = postsData.map((post) => {
		return (
			<div className='card home-card' id={post._id}>
				<h5>
					<Link to={`/user/${post.postedBy._id}`}>{post.postedBy.name}</Link>
					{user._id === post.postedBy._id ? (
						<i
							style={{ float: 'right', margin: '2px', padding: '1px' }}
							className='material-icons '
							onClick={() => {
								deletePost(post._id);
							}}>
							delete
						</i>
					) : null}
				</h5>

				<div className='card-image'>
					<img src={post.photo} alt='' />
				</div>
				<div className='card-content'>
					{post.likes.includes(user._id) ? (
						<i
							className='material-icons red-text'
							style={{ color: 'red' }}
							onClick={() => {
								unlikePost(post._id);
							}}>
							favorite
						</i>
					) : (
						<i
							className='material-icons white-text'
							style={{ WebkitTextStroke: '1px red' }}
							onClick={() => {
								likePost(post._id);
							}}>
							favorite
						</i>
					)}

					<h6>{post.likes.length} Likes</h6>
					<h6>{post.title}</h6>
					<p>{post.body}</p>
					{post.comments.map((comment) => (
						<h6>
							<Link to={`/user/${comment.postedBy._id}`}>
								<b>{comment.postedBy.name} :</b>
							</Link>
							{comment.text}
						</h6>
					))}
					<form
						onSubmit={(e) => {
							e.preventDefault();
							makeComment(post._id, e.target[0].value);
							e.target[0].value = '';
						}}>
						<input type='text' name='' placeholder='Comment' />
					</form>
				</div>
			</div>
		);
	});

	return <div className='home'>{posts}</div>;
};

export default FollowingPosts;
