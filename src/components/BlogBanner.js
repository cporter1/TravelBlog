import { goTo } from "../models/Navigation"
import { timeAgo } from "../models/TimeFormat";

export default function BlogBanner({author , lastUpdated , title, id}) {

    return (
        <section onClick={ () => { goTo(`/blogs/?${id}`) }}>
            <h3> {title}</h3>
            <h5> By {author}</h5>
            <h6> Last Updated: {timeAgo(lastUpdated)}</h6>
        </section>
    )
}