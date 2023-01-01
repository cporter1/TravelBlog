import Navbar from "./components/Navbar"
import Route from './components/Route'

import Home      from './pages/Home'
import AllBlogs from "./pages/AllBlogs";
import MyAccount from "./pages/MyAccount";
import MyBlogs   from './pages/MyBlogs'
import EditBlogs from './pages/EditBlog'
import CreateBlog from "./pages/CreateBlog";
import CreatePost from "./pages/CreatePost";
import SignIn from "./pages/SignIn";
import BlogView from "./pages/BlogView";
import CreateAccount from "./pages/CreateAccount";

import './styles/main.css'

import  UserContextProvider  from './models/UserContext'


function App() {
  return (
    <UserContextProvider>
      <div className='main-container'>
        <Navbar />
        <Route path='/'              component = {<Home      />} />
        <Route path='/blogs'         component = {<AllBlogs  />} />
        <Route path='/myaccount'     component = {<MyAccount />} />
        <Route path='/myblogs'       component = {<MyBlogs   />} />
        <Route path='/editblog'      component = {<EditBlogs />} />
        <Route path='/createblog'    component = {<CreateBlog/>} />
        <Route path='/createpost/'    component = {<CreatePost/>} />
        <Route path='/signin'        component = {<SignIn/>} />
        <Route path='/blogs/'        component = {<BlogView/>} />
        <Route path='/createaccount' component = {<CreateAccount/>} />
      </div>
    </UserContextProvider>
  );
}

export default App;
