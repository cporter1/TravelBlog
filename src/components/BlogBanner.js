import { goTo } from "../models/Navigation"
import { timeAgo } from "../models/TimeFormat";

export default function BlogBanner({author , lastUpdated , title, id}) {

    return (
        <section className="blog-banner" onClick={ () => { goTo(`/blogs/?${id}`) }}>
            <h3>{title}</h3>
            <h6>By {author}</h6>
            <h6>{timeAgo(lastUpdated)}</h6>
        </section>
    )
}