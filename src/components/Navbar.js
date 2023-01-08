import Link from "./Link"
import { useUserContext } from "../models/UserContext"
import { removeSession } from "../models/UserContext"
import { goTo } from "../models/Navigation"

export default function Navbar() {

    const { email , setContext } = useUserContext()

    return (
        <div>
        {(email) ? (
            <ul className="navbar-container">
                <section className="link-container">
                    <Link href='/'       className='navbar-link-item'>Featured Blog</Link>
                    <Link href='/blogs'  className='navbar-link-item'>All Blogs</Link>
                </section>
                
                <section className="link-container">
                    <Link href='/myaccount' className='navbar-link-item'>My Account</Link>
                    <Link href='/myblogs' className='navbar-link-item'  >My Blogs</Link>
                    <div className='navbar-link-item' 
                        onClick={() => {removeSession(); setContext(null , null , null);
                            goTo('/signin')}}>Log Out</div>
                </section>
            </ul>
        ) : (
            <ul className="navbar-container">
                <section className="link-container">
                    <Link href='/signin' className='navbar-link-item'>Sign In</Link>
                </section>
            </ul>
        )}
        </div>
    )
}
