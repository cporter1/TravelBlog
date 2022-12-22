import Link from "../components/Link"
import { useUserContext } from "../models/UserContext"

export default function MyAccount() {

    const {email, username , accRole} = useUserContext()


    function AccountInfo({username , email}) {
        return (
            <ul>
                <li>
                    <label>Username: {username}</label>
                </li>
                <li>
                    <label>email: {email}</label>
                </li>
            </ul>
        )
    }

    if(accRole === 'admin') {
        return (
            <div>
                <ul>
                    <Link href='/createaccount' className='navbar-link-item'>Create Account</Link>
                </ul>
                <ul>
                    <AccountInfo username={username} email={email}/>
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