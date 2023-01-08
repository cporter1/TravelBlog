import Navbar from "./components/Navbar"
import Route from './components/Route'

import Featured      from './pages/Featured'
import AllBlogs from "./pages/AllBlogs";
import MyAccount from "./pages/MyAccount";
import MyBlogs   from './pages/MyBlogs'
import EditBlogs from './pages/EditBlog'
import CreateBlog from "./pages/CreateBlog";
import CreatePost from "./pages/CreatePost";
import SignIn from "./pages/SignIn";
import BlogView from "./pages/BlogView";
import CreateAccount from "./pages/CreateAccount";
import EditPost from "./pages/EditPost.js";

import './styles/main.css'

import UserContextProvider from './models/UserContext'

function notSignedIn() {
  return !(sessionStorage.getItem('username') !== null)
}

function App() {
  if(notSignedIn()) {
    return (
      <UserContextProvider>
        <div className='main-container'>
          <Route path='*' component = {<SignIn  />} />
        </div>
    </UserContextProvider>
  );
  } else {
  return (
    <UserContextProvider>
      <div className='main-container'>
        <Navbar />
        <Route path='/'              component = {<Featured  />} />
        <Route path='/blogs'         component = {<AllBlogs  />} />
        <Route path='/myaccount'     component = {<MyAccount />} />
        <Route path='/myblogs'       component = {<MyBlogs   />} />
        <Route path='/editblog'      component = {<EditBlogs />} />
        <Route path='/createblog'    component = {<CreateBlog/>} />
        <Route path='/createpost/'   component = {<CreatePost/>} />
        <Route path='/signin'        component = {<SignIn/>}     />
        <Route path='/blogs/'        component = {<BlogView/>}   />
        <Route path='/createaccount' component = {<CreateAccount/>} />
        <Route path='/editpost/'     component = {<EditPost/>}   />
      </div>
    </UserContextProvider>
  );
  }
}

export default App;
