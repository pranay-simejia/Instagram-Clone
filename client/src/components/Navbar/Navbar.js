import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import M from 'materialize-css';
import './Navbar.css';
// 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
const Navbar = () => {
	const searchModal = useRef(null);

	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const history = useHistory();
	const [search, setSearch] = useState('');
	const [userDetails, setUserDetails] = useState([]);
	const logoutHandler = async () => {
		await axios.get('/logout');
		dispatch({ type: 'LOGOUT', payload: null });
		history.push('/signin');
	};

	const fetchUsers = async (query) => {
		setSearch(query);
		const users = await axios.post('/search-users', { query });
		console.log(users);
		setUserDetails(users.data);
	};

	useEffect(() => {
		M.Modal.init(searchModal.current);
	}, []);

	let navElements = [];
	if (!user) {
		navElements = [
			<li>
				<Link to='/signin'>Signin</Link>
			</li>,
			<li>
				<Link to='/signup'>Signup</Link>
			</li>,
		];
	} else {
		navElements = [
			<li key='1'>
				<i
					data-target='modal1'
					className='large material-icons modal-trigger'
					style={{ color: 'black' }}>
					search
				</i>
			</li>,

			<li>
				<Link to='/myfollowing'>My following</Link>
			</li>,
			<li>
				<Link to='/profile'>Profile</Link>
			</li>,
			<li>
				<Link to='/create'>Create</Link>
			</li>,
			<li>
				<button
					class='btn waves-effect waves-light white-text #c62828 red darken-3'
					type='submit'
					onClick={() => logoutHandler()}>
					Logout
				</button>
			</li>,
		];
	}
	return (
		<nav>
			<div className='nav-wrapper white'>
				<Link to={user ? '/' : '/signin'} className='brand-logo left'>
					Instagram
				</Link>

				<ul id='nav-mobile' className='right hide-on-med-and-down'>
					{navElements}
				</ul>
			</div>
			<div
				id='modal1'
				class='modal'
				ref={searchModal}
				style={{ color: 'black' }}>
				<div className='modal-content'>
					<input
						type='text'
						placeholder='search users using email'
						value={search}
						onChange={(e) =>
							fetchUsers(e.target.value === '' ? '' : e.target.value)
						}
					/>
					<ul className='collection'>
						{userDetails.map((item) => {
							return (
								<Link
									to={item._id !== user._id ? '/user/' + item._id : '/profile'}
									onClick={() => {
										M.Modal.getInstance(searchModal.current).close();
										setSearch('');
									}}>
									<li className='collection-item' style={{ width: '100%' }}>
										{item.email}
									</li>
								</Link>
							);
						})}
					</ul>
				</div>
				<div className='modal-footer'>
					<button
						className='modal-close waves-effect waves-green btn-flat'
						onClick={() => setSearch('')}>
						close
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
