import { useEffect, useReducer } from "react"
import { getAllBlogs , featureBlog,
        getAllAccounts} from "../api-calls/axios-requests"
import Link from "../components/Link"
import { useUserContext } from "../models/UserContext"
// import {getAll}

export default function MyAccount() {

    const {email, username , accRole} = useUserContext()
    const [blogsState , setBlogState] = 
        useReducer(reduceState , {blogsArray : [], accArray: [] , loading: true})

    function reduceState(state , action) {
        if(action.type === 'updateFeatured') {
            return {...state,
                blogsArray: featureBlogLocal(state.blogsArray , action.payload.index)
            }
        } else {
            return {
                blogsArray: action.blogsArray,
                accArray: action.accArray,
                loading : false
            }
        }
    }

    useEffect(() => {
        Promise.all([getAllBlogs() , getAllAccounts()])
            .then(async result => {
                setBlogState({blogsArray: result[0] , accArray: result[1]})
            })
    },[])

    function featureBlogLocal(blogsArray , index) {
        const output = [...blogsArray]
        output.forEach((element) => element.featured = false)
        output[index]['featured'] = true
        return output
    }

    function AccountInfo({username , email}) {
        return (
            <section className="acc-info-wrapper">
                <span>Username: </span> <span> {username}</span>
                <span>email:</span> <span> {email}</span>
            </section>
        )
    }

    function mapFeaturedStatus(element , index) {
        return (
            <section className="featured-grid" key = {element.id}>
                <label>{element.title} </label>
                <label>{element.author} </label>
                <label>{element.featured.toString()} </label>
                <button onClick={() => {featureBlog(element.id); 
                    setBlogState({type: 'updateFeatured' , payload: {index: index } })}}>
                    Feature this blog</button>
            </section>
        )
    }
    function mapAccounts(element , index) {
        return (
            <section className="account-grid" key={index}>
                <span>{element.username}</span>
                <span>{element.email}</span>
                <span>{element.role}</span>
            </section>
        )

    }

    if(accRole === 'admin') {
        return (
            <div className="column-container">
                <Link style={{marginTop: '10px'}} href='/createaccount' className='navbar-link-item'>
                    Create Account</Link>
                <AccountInfo username={username} email={email}/>
                <br/>
                <h2>Blogs</h2><br/>
                <ul>
                    {blogsState.blogsArray?.map(mapFeaturedStatus)}
                </ul><br/>
                <h2>Accounts</h2><br/>
                <ul style={{marginBottom: '2%'}}>
                    {blogsState.accArray?.map(mapAccounts)}
                </ul>
            </div>
        )
    }
    else {
        return (
            <div className="column-container">
                <ul>
                    <AccountInfo username={username} email={email}/>
                </ul>
            </div>
        )
    }
}