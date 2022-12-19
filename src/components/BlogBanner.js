
export default function BlogBanner({author , lastUpdate , title, id}) {

    function goTo(dest) {
        window.history.pushState({} , '' , dest)
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    return (
        <section onClick={ () => { goTo(`/blogs/?${id}`) }}>
            <h3> {title}</h3>
            <h5> By {author}</h5>
            <h6> Last Update: {lastUpdate} </h6>
        </section>
    )
}