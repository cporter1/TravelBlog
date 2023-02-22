import Navbar from "./components/Navbar"
import Route from './components/Route'

import Featured      from './pages/Featured'
import AllBlogs from "./pages/AllBlogs";
import MyAccount from "./pages/MyAccount";
import MyBlogs   from './pages/MyBlogs'
import CreateBlog from "./pages/CreateBlog";
import CreatePost from "./pages/CreatePost";
import SignIn from "./pages/SignIn";
import BlogView from "./pages/BlogView";
import CreateAccount from "./pages/CreateAccount";
import EditPost from "./pages/EditPost.js";
import useWindowDimensions from "./models/useWindowDimensions";
import MobileWarn from "./pages/MobileWarn";

import './styles/main.css'

import UserContextProvider from './models/UserContext'

function App() {
  if(useWindowDimensions()['width'] < 888) {
    return (
      <UserContextProvider>
      <div className='main-container'>
        <MobileWarn/>
      </div>
    </UserContextProvider>
    )
  }
  else {
    return (
      <UserContextProvider>
        <div className='main-container'>
          <Navbar />
          <Route path='/'              component = {<Featured  />} />
          <Route path='/blogs'         component = {<AllBlogs  />} />
          <Route path='/myaccount'     component = {<MyAccount />} />
          <Route path='/myblogs'       component = {<MyBlogs   />} />
          <Route path='/createblog'    component = {<CreateBlog/>} />
          <Route path='/createpost/'   component = {<CreatePost/>} />
          <Route path='/signin'        component = {<SignIn/>}     />
          <Route path='/blogs/'        component = {<BlogView/>}   />
          <Route path='/createaccount' component = {<CreateAccount/>} />
          <Route path='/editpost/'     component = {<EditPost/>}   />
          <Route notSignedIn={true} component = {<SignIn  />} />
        </div>
      </UserContextProvider>
    );
  }
}

export default App;
