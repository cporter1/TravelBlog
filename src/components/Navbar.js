import Link from "./Link"

export default function Navbar() {
    return (
        <ul className="navbar-container">
            <section>
                <Link href='/'  className='navbar-link-item'>Featured Blog</Link>
                <Link href='/'  className='navbar-link-item'>All Blogs</Link>
            </section>
            <section>
                
            </section>
        </ul>
    )
}