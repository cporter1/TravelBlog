
function parseBlogsFromPosts(blogsAndPosts) {
    let i = 0
    while(blogsAndPosts[i] !== 'posts') {
        i++;
    }
    const blogs = blogsAndPosts.splice(1 , i-1)
    const posts = blogsAndPosts.splice(1 , blogsAndPosts.length)
    return [blogs , posts]
}



export { parseBlogsFromPosts }