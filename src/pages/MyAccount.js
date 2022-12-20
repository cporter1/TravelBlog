import { useEffect } from "react"
import Link from "../components/Link"
import { useUserContext } from "../models/UserContext"

export default function MyAccount() {

    const {email, username , accRole} = useUserContext()


    function AccountInfo({username}) {
        console.log(username)
        // return (
        //     <ul>
        //         <li>
        //             <label>Username:</label>
        //             {username}
        //         </li>
        //     </ul>
        // )
    }

    if(accRole === 'admin') {
        return (
            <div>
                <ul>
                    <Link href='/createaccount' className='navbar-link-item'>Create Account</Link>
                </ul>
                <ul>
                    <AccountInfo username={username} ></AccountInfo>
                </ul>
            </div>
        )
    }
    else {
        return (
            <div>
                <ul>
                    <Link href='/createaccount' className='navbar-link-item'>Create Account</Link>
                </ul>
            </div>
        )
    }
}