import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import Home from './components/screens/Home/Home';
import FollowingPosts from './components/screens/FollowingPosts/FollowingPosts';
import Signin from './components/screens/Signin/Signin';
import Signup from './components/screens/Signup/Signup';
import CreatePost from './components/screens/CreatePost/CreatePost';
import Profile from './components/screens/Profile/Profile';
import UserProfile from './components/screens/UserProfle.js/UserProfile';
import Reset from './components/screens/Reset/Reset';
import './App.css';
function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Navbar />
				<PrivateRoute exact component={Home} path='/' />

				<PrivateRoute component={FollowingPosts} path='/myfollowing' />
				<PrivateRoute component={Profile} path='/profile' />

				<PrivateRoute component={CreatePost} path='/create' />
				<PrivateRoute component={UserProfile} path='/user/:userId' />
				{/* <Route path='/user/:userId'>
					<UserProfile/>
				</Route> */}

				<Route path='/signin'>
					<Signin />
				</Route>
				<Route path='/signup'>
					<Signup />
				</Route>
				<Route path='/reset'>
					<Reset />
				</Route>
			</BrowserRouter>
		</div>
	);
}

export default App;
