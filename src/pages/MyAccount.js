import Link from "../components/Link"
import { useUserContext } from "../models/UserContext"

export default function MyAccount() {

    const {email , accRole} = useUserContext()

    if(accRole === 'admin') {
        return (
            <div>
                <ul>
                    <Link href='/createaccount' className='navbar-link-item'>Create Account</Link>
                    <div className='navbar-link-item'>{accRole}</div>
                </ul>
                <ul>

                </ul>
            </div>
        )
    }
    else {
        return (
            <div>
                <ul>
                    <Link href='/createaccount' className='navbar-link-item'>Create Account</Link>
                    <div>{accRole}</div>
                </ul>
            </div>
        )
    }
}