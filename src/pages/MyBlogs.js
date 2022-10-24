import Link from "../components/Link"

export default function MyBlogs() {

    // TODO: API call to grab all of this user's blogs

    return (
        <div className="content-container">
            <button>
                <Link href='/createblog' className="new-blog-button">New Blog</Link>
            </button>
            <button>
                <Link href='/createpost' className="new-blog-button">Create Post</Link>
            </button>
        </div>
    )
}