import Link from "./Link"
import { useUserContext } from "../models/UserContext"

export default function Navbar() {

    const { username , email , setContextEmail } = useUserContext()

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
                    <button onClick={() => {setContextEmail(null)}}>Log Out</button>
                </section>
            </ul>
        ) : (
            <ul className="navbar-container">
                <section className="link-container">
                    <Link href='/'       className='navbar-link-item'>Featured Blog</Link>
                    <Link href='/blogs'  className='navbar-link-item'>All Blogs</Link>
                </section>
                
                <section className="link-container">
                    <Link href='/signin' className='navbar-link-item'>Sign In</Link>
                </section>
            </ul>
        )}
        </div>
    )
}
