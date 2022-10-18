import Link from "./Link"

export default function Navbar() {

    function isSignedIn() {
        return true;
    }
    if(isSignedIn()) {
        return (
            <ul className="navbar-container">
                <section className="link-container">
                    <Link href='/'       className='navbar-link-item'>Featured Blog</Link>
                    <Link href='/blogs'  className='navbar-link-item'>All Blogs</Link>
                </section>
                
                <section className="link-container">
                    <Link href='/myaccount' className='navbar-link-item'>My Account</Link>
                    <Link href='/myblogs' className='navbar-link-item'  >My Blogs</Link>
                </section>
            </ul>
        )    
    }
    else {
        return (
            <ul className="navbar-container">
                <section className="link-container">
                    <Link href='/'       className='navbar-link-item'>Featured Blog</Link>
                    <Link href='/blogs'  className='navbar-link-item'>All Blogs</Link>
                </section>
                
                <section className="link-container">
                    <Link href='/signin' className='navbar-link-item'>Sign In</Link>
                </section>
            </ul>
        )
    }
}