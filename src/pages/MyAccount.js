import { useEffect, useReducer } from "react"
import { getAllBlogs , featureBlog} from "../api-calls/axios-requests"
import Link from "../components/Link"
import { useUserContext } from "../models/UserContext"
// import {getAll}

export default function MyAccount() {

    const {email, username , accRole} = useUserContext()
    const [blogsState , setBlogState] = 
        useReducer(reduceState , {blogsArray : [] , loading: true})

    function reduceState(state , action) {
        if(action.type === 'updateFeatured') {
            return {...state,
                blogsArray: featureBlogLocal(state.blogsArray , action.payload.index)
            }
        } else {
            return {
                blogsArray: action.blogsArray,
                loading : false
            }
        }
    }

    useEffect(() => {
        getAllBlogs()
            .then(async result => {
                // console.log(result)
                setBlogState({blogsArray: result})
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
            <ul>
                <li> <span>Username: {username}</span> </li>
                <li> <span>email: {email}</span> </li>
                <li> <span>Privledges: {accRole}</span> </li>
            </ul>
        )
    }

    function mapFeaturedStatus(element , index) {
        return (
            <section key = {element.id}>
                <label>{element.title} </label>
                <label>{element.author} </label>
                <label>{element.featured.toString()} </label>
                <button onClick={() => {featureBlog(element.id); 
                    setBlogState({type: 'updateFeatured' , payload: {index: index } })}}>
                    Feature this blog</button>
            </section>
        )
    }

    if(accRole === 'admin') {
        return (
            <div>
                <ul>
                    <Link href='/createaccount' className='navbar-link-item'>
                        Create Account</Link>
                </ul>
                <ul>
                    <AccountInfo username={username} email={email}/>
                </ul>
                <br/>
                <ul>
                    {blogsState.blogsArray?.map(mapFeaturedStatus)}
                </ul>
            </div>
        )
    }
    else {
        return (
            <div>
                <ul>
                    <AccountInfo username={username} email={email}/>
                </ul>
            </div>
        )
    }
}