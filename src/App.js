import Navbar from "./components/Navbar"
import Route from './components/Route'

import Home      from './pages/Home'
import AllBlogs from "./pages/AllBlogs";
import MyAccount from "./pages/MyAccount";
import MyBlogs   from './pages/MyBlogs'
import EditBlogs from './pages/EditBlog'

import './styles/main.css'

function App() {
  return (
    <div className='main-container'>
      <Navbar />
      <Route path='/'              component = {<Home      />} />
      <Route path='/blogs'         component = {<AllBlogs  />} />
      <Route path='/myaccount'     component = {<MyAccount />} />
      <Route path='/myblogs'       component = {<MyBlogs   />} />
      <Route path='/editblog'      component = {<EditBlogs />} />
    </div>
  );
}

export default App;
