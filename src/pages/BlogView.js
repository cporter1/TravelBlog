import { useEffect, useReducer} from "react"
import { getPostsByBlogID , getBlogByBlogID ,
         saveBlogTravelDates, saveBlogTitle ,
         deletePost, deleteComment, updateComment, createComment, getCommentsByBlogID } from "../api-calls/axios-requests"
import { getIDfromParams } from "../models/URLparams.js"
import { goTo } from "../models/Navigation"
import { dateHandler } from "../models/TimeFormat"
import { useUserContext } from "../models/UserContext"
import { timeAgo } from "../models/TimeFormat"
import ConfirmPopup from "../components/ConfirmPopup"
import ParagraphInput from "../components/ParagraphInput"

export default function BlogView() {

	const {username} = useUserContext()
	const [bodyState , setContent] = 
			useReducer(reduceFetches , {blog : {} , posts: [], loading: true, blogOwner: false})

	console.log('bodyState: ' + bodyState.posts)

	function reduceFetches(state , action) {
		if(action.initialize)
			return {
				posts : action.posts,
				blog      : action.blog,
				blogOwner : username === action.blog?.author,
				loading : false
			}
		else if(action.deletePost)
			return {...state,
				postArray: action.posts
			}
		else if(action.newComment) {
			console.log(action.index)
			let updatedPosts = [...state.posts]
			let newElement = updatedPosts[action.index]
			newElement.newComment = action.payload
			updatedPosts[action.index] = newElement

			return {...state,
				posts: updatedPosts,
			}
		}
		else if(action.addComment) {
			let postsArray = [...state.posts]
			let commentsArray = [...postsArray[action.index].comments]
			const author = sessionStorage.getItem('username')
			commentsArray.push({author: author, body: postsArray[action.index].newComment, created_at: Date.now()})
			postsArray[action.index].comments = commentsArray
			return {...state,
				posts: postsArray
			}
		}
		else if(action.commentDraft) {
			console.log('index', action.postIndex, " ", action.commentIndex)
			let updatedPosts = [...state.posts]
			let newElement = updatedPosts[action.postIndex]
			console.log('newElement', newElement)
			newElement.comments[action.commentIndex].commentDraft = action.payload
			updatedPosts[action.postIndex] = newElement

			return {...state,
				posts: updatedPosts,
			}
		}
		else if(action.deleteComment) {
			console.log(action.commentIndex)
			let postsArray = [...state.posts]
			let commentsArray = [...postsArray[action.postIndex].comments]
			commentsArray.splice(action.commentIndex, 1)
			postsArray[action.postIndex].comments = commentsArray

			return {...state,
				posts: postsArray
			}
		}
		else if(action.updateComment) {
			let postsArray = [...state.posts]
			let commentsArray = postsArray[action.postIndex].comments
			let comment = commentsArray[action.commentIndex]
			comment.body = action.payload
			comment.commentDraft = action.payload
			return {...state,
				posts: postsArray,
			}
		}
}

	useEffect(() => {
			if(bodyState.blog.author) return;
			Promise.all([ 
				getBlogByBlogID(     getIDfromParams() ),
				getPostsByBlogID(    getIDfromParams() ),
				getCommentsByBlogID( getIDfromParams() ), 
			])
			.then(async result => {
				console.log('result ' + result[0])
				setContent({blog: result[0] ,
					posts: postsWithComments(result[2], result[1] ) , initialize: true });      
			})
	},[])

    function handleDeletePost(postID , index) {
        deletePost(postID)
        setContent( {deletePost: true , posts: deletePostState(index)} )
    }

    function deletePostState(index) {
        let newArray = [...bodyState.postArray]
        newArray.splice(index , 1)
        return newArray
    }

    function submitNewTitle() {
        saveBlogTitle(bodyState.blog.title , bodyState.blog.id)
    }
    function submitNewTravelDates() {
        saveBlogTravelDates(bodyState.blog.travel_dates , bodyState.blog.id)
    }

	function mapComments(element, commentIndex) {
		const index = this.postIndex + '-' + commentIndex
		return (
			<div className="comment" key={element.id}>
				<div className="comment-main">
					<div className="comment-header">
							<span className="comment-author">{element.author}</span>
							<span className="comment-date">{timeAgo(element.created_at)}</span>
					</div>
					<div className="comment-body" id={'comment-body-' + index}>
						{paragraphsToArray(element.body).map(paragraphMap)}
					</div>
					<div className="comment-editor" id= {'comment-editor-wrapper' + index}>
						<ParagraphInput id={'edit-comment'+index} commentIndex={commentIndex} postIndex={this.postIndex}
							onChange={changeCommentDraft} value={bodyState.posts[this.postIndex].comments[commentIndex].commentDraft}/> 
					</div>
				</div>
				{sessionStorage.getItem('username') === element.author ? 
					<>
						<div className="change-comment-wrapper" id={'change-comment-wrapper-' + index}>
							<button className="edit-comment" onClick={() => {editComment(index)}}>
								edit
							</button>
							<ConfirmPopup ID={'deleteComment' + index} bgID={'pgDeleteComment'+ index} 
								buttonClass='delete-comment' 
								buttonText='delete'
								handleTask={() => {handleDeleteComment(element.id, this.postIndex, commentIndex)}}
								confirmText='Are you sure you want to delete this comment?'
							/>
						</div>
						{/* {console.log(element)} */}
						<div className="save-comment-wrapper" id={'save-comment-wrapper-' + index}>
							<ConfirmPopup ID={'saveComment' + index} bgID={'paSaveComment'+ index} 
								buttonClass='save-comment' 
								buttonText='save' 
								saving={true}
								handleTask={()=> {handleCommentUpdate(element.id, element.commentDraft, this.postIndex, commentIndex); }}
								confirmText='Are you sure you want to save this comment?'
							/>
							<button className="cancel-edit-comment" onClick={() => {cancelEditComment(this.postIndex, commentIndex)}}>
								cancel
							</button>
						</div>
					</>
				: null}
			</div>
		)
	}

	function postsWithComments(commentsArray , postsArray) {
    let postsCopy = [...postsArray];
    let commentsCopy = [...commentsArray];
    let cIndex = 0;

    for(let pI = 0; pI < postsCopy.length; pI++) {
      postsCopy[pI].comments = []
      while(commentsCopy[cIndex]?.post_parent === postsCopy[pI].id.toString()) {
        postsCopy[pI].comments.push(commentsCopy[cIndex]);
        cIndex++;
      }
    }
    return postsCopy
  }

  function toggleCommentsSection(index) {
    let display = document.getElementById('comments-section-' + index).style.display
    if(display === 'none' || display === '') { // invisible => make visible
      document.getElementById('maps-section-' + index).style.display = 'none'
      document.getElementById('comments-section-' + index).style.display = 'inline'

      document.getElementById('comments-tab-' + index).style.backgroundColor = '#70f8f7'
      document.getElementById('maps-tab-' + index).style.backgroundColor = '#01ffff'

    }
    else { // visible => make invisible
      document.getElementById('comments-section-' + index).style.display = 'none'
      document.getElementById('comments-tab-' + index).style.backgroundColor = '#01ffff'
      // document.getElementById('maps-tab-' + index).style.backgroundColor = '#4effff'
    }
  }

  function toggleMapsSection(index) {
    let display = document.getElementById('maps-section-' + index).style.display
    if(display === 'none' || display === '') { // invisible => make visible
      document.getElementById('comments-section-' + index).style.display = 'none'
      document.getElementById('maps-section-' + index).style.display = 'inline'
      
      document.getElementById('comments-tab-' + index).style.backgroundColor = '#01ffff'
      document.getElementById('maps-tab-' + index).style.backgroundColor = '#70f8f7'

    }
    else { // visible => make invisible
      document.getElementById('maps-section-' + index).style.display = 'none'
      document.getElementById('maps-tab-' + index).style.backgroundColor = '#01ffff'
    }
  }

  function editComment(index) {
    // show comment editor
    document.getElementById('comment-editor-wrapper' + index).style.display = 'flex'
    document.getElementById('comment-body-' + index).style.display = 'none'

    // hide edit / delete buttons
    document.getElementById('change-comment-wrapper-' + index).style.display = 'none'

    // show save & cancel buttons
    document.getElementById('save-comment-wrapper-' + index).style.display = 'flex'
  }

  function cancelEditComment(postIndex, commentIndex) {
    const index = postIndex + '-' + commentIndex
    document.getElementById('comment-editor-wrapper' + index).style.display = 'none'
    document.getElementById('comment-body-' + index).style.display = 'inline'

    document.getElementById('change-comment-wrapper-' + index).style.display = 'flex'
    document.getElementById('save-comment-wrapper-' + index).style.display = 'none'

    setContent({commentDraft: true, postIndex: postIndex, commentIndex: commentIndex, payload: bodyState.posts[postIndex].comments[commentIndex].body})

  }

  function changeCommentDraft(value, postIndex, commentIndex) {
    setContent({postIndex: postIndex, commentIndex: commentIndex, payload: value, commentDraft: true})
  }

  function handleCommentChange(value, postIndex) {
    setContent({index: postIndex, payload: value, newComment: true})
  }

  function submitNewComment(index, postID, blogID) {
    createComment(bodyState.posts[index].newComment, postID, blogID)
    setContent({index: index, addComment: true })
  }

  function handleCommentUpdate(ID, body, postIndex, commentIndex) {
    updateComment(ID, body);
    cancelEditComment(postIndex, commentIndex)
    setContent({payload: body,updateComment: true, postIndex: postIndex, commentIndex: commentIndex})
  }

  function handleDeleteComment(ID, postIndex, commentIndex) {
    deleteComment(ID)
    setContent({postIndex: postIndex, commentIndex: commentIndex, deleteComment: true})
  }	

	function postMap(element , postIndex) {
		return (
			<section className="post" key={element.id}>
				<div className="post-grid">
					<header className="post-header">
						<h3>{element.title} </h3>
						<h6>Posted {dateHandler(element.time_posted)}</h6>
						{(bodyState.blogOwner)?
								<h6 style={{margin: '5px 0px'}}>{element.published? 'Public Post' : 'Private Post'}</h6>
								: null
						}
						{bodyState.blogOwner ? 
							<div className="edit-delete-post-wrapper">
								<button className="edit-post-button" 
									onClick={() => goTo(`/editpost/?${element.id}`)}>
									Edit Post</button> 
							<ConfirmPopup ID='deletePost' bgID='pgDeletePost' 
									buttonClass='delete-post-button' 
									buttonText='Delete Post' 
									handleTask={() => handleDeletePost(element.id , postIndex)}
									confirmText='Are you sure you want to delete this post?'
									/>
							</div>
						: null}
					</header>
					<section className="body-section">
							{element.body_array?.map(bodyMap)}
					</section>
				</div>
				<div className="comments-container" >
        	<div className="post-tabs-bar">
						<button className="post-tab" id={'comments-tab-' + postIndex} 
							onClick={() => {toggleCommentsSection(postIndex)}}>
							<i>Comments ({element.comments.length ?? 0})</i>
						</button>
						{/* // change to google maps */}
						<button className="post-tab" id={'maps-tab-' + postIndex} onClick={() => {toggleMapsSection(postIndex)}}>
							<i>Google Maps</i>
						</button>
        	</div>
        	<div className="comments-wrapper" id={'comments-section-' + postIndex} >
          {element.comments.map(mapComments, {postIndex: postIndex})}
          <div className="comment-input-wrapper">
            <ParagraphInput className='new-comment' id={'new-comment'+postIndex} postIndex={postIndex} 
						placeholder='new comment' onChange={handleCommentChange} value={bodyState.posts[postIndex].newComment}/>
            <button className="new-comment-button" 
              disabled={!bodyState.posts[postIndex].newComment || 
								bodyState.posts[postIndex].newComment === '<p><br></p>'}
              onClick={() => submitNewComment(postIndex, element.id, element.blog_id)}> 
              <i>Submit Comment</i>
            </button>
          </div>
        	</div>
					<div className="maps-container" id={'maps-section-' + postIndex} >
						MAPS
					</div>
      	</div>
			</section>
		)

	}
    function bodyMap(element , index) {
        if(element['type'] === 'text') { // textbox section
            return (
                <section style={{whiteSpace: 'pre-wrap'}} className="body-text" key={index}>
                    {paragraphsToArray(element.text).map(paragraphMap)}
                </section>
            )
        } else if(element['type'] === 'image') {
            return (
                <section className="img-wrapper" style={{marginBottom: '2%'}} key={index}>
                    <img alt='' className="uploaded-image"
                        src={element.file}/>
                        <div className="edit-image-caption">{element.text}</div>
                </section>
            )
        } else {console.error('function postSectionMap: invalid array')}
    }
    function paragraphsToArray(text) {
        let output = []
        for(let i = 0; i < text.length; i++) {

            if((text[i] === '<') && (text[i+1] === 'p') && (text[i+2] === '>')) { //found starting tag

                for(let j = i+3; j < text.length; j++) { // looking for end tag

                    if((text[j] === '<') && (text[j+1] === '/') && (text[j+2] === 'p') && 
                        (text[j+3] === '>')) {
                        output.push(text.substring(i+3 , j))
                        i= j+4
                        }
                }
            }
        }
        return output
    }
    function paragraphMap(element , index) {
        if(element=== '<br>') 
            return (
                <br/>
            )
        else {  
            return(
                <p id={index}>
                    {element}
                </p>
            )  
        }
    }


    if(bodyState.loading) {
        return  <div className="loading-container">
                    <div className="loader"/>
                </div>
    }
    else if(bodyState.blogOwner) { // this is your blog
			return (
				<div className="column-container">
					<header className="blog-header-container">
						<div className="edit-title-wrapper">
							<label className="title-label">Title: </label>
							<input className="input-title" type='text' 
								defaultValue={bodyState.blog?.title}
								onChange={(e) => bodyState.blog.title = e.target.value}/>
							<ConfirmPopup ID='title' bgID='bgtitle' handleTask={submitNewTitle}
								buttonClass='new'
								buttonText='Save Title' 
								confirmText='Are you sure you want to save the title?'
								saving={true}/>
						</div>
						<div className="edit-traveldates-wrapper">
								<label className="title-label">Travel Dates: </label>
								<input className="input-title" type='text'
									defaultValue={bodyState.blog?.travel_dates}
									onChange={(e) => bodyState.blog.travel_dates = e.target.value}/>
								<ConfirmPopup ID='dates' bgID="bgDates" handleTask={submitNewTravelDates}
									buttonText='Save Travel Dates' 
									confirmText='Are you sure you want to save the travel dates?'
									saving={true}/>
						</div>
						<label className="updated-label">{timeAgo(bodyState.blog.last_updated)}</label>
						<button className="create-post-button" 
							onClick={()=>{goTo(`/createpost/?${getIDfromParams()}`)}}>
							Create Post
						</button>
					</header>
					<article>
							{bodyState.posts?.map(postMap)}
					</article>
				</div>
			)
    }
    else { // not your blog
        return (
            <div className="column-container">
                <header className="blog-header-container">
                    <h2>{bodyState.blog?.title}</h2>

                    <div className="blog-time-wrapper">
                        <h6>By {bodyState.blog?.author}</h6>
                        <h6>•</h6>
                        <h6>{timeAgo(bodyState.blog?.last_updated)}</h6>
                        <h6>•</h6>
                        <h6>{bodyState.blog?.travel_dates ?? <i>No Travel Dates</i>}</h6>
                    </div>
                </header>
                <article>
                    {bodyState.posts?.map(postMap)}
                </article>
            </div>
        )
    }
}