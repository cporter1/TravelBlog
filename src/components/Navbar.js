import Link from "./Link"
import { useUserContext } from "../models/UserContext"
import { removeSession } from "../models/UserContext"
import { goTo } from "../models/Navigation"

export default function Navbar() {

    const { email , setContext } = useUserContext()

    return (
        <>
        {(email) ? (
            <ul className="navbar-container">
                <section className="link-container">
                    <Link href='/'       className='navbar-link-item'>Featured</Link>
                    <Link href='/blogs'  className='navbar-link-item'>All Blogs</Link>
                    <Link href='/myblogs' className='navbar-link-item'  >My Blogs</Link>
                </section>
                
                <section className="link-container">
                    <Link href='/myaccount' className='navbar-link-item'>My Account</Link>
                    <div className='navbar-link-item' style={{cursor:'pointer'}}
                        onClick={() => {removeSession(); setContext(null , null , null);
                            goTo('/signin')}}>Log Out</div>
                </section>
            </ul>
        ) : ( null
        )}
        </>
    )
}
