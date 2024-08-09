import { useGetPostDataQuery } from "../api/apiSlice"
import { Post } from "./Post"
import { useParams } from "react-router-dom"

export const Detail = () => {

const { sub, path, post, comment } = useParams()

  let URI = `${sub}/comments/${path}/${post}`
  if (comment) {
    URI = URI.concat(`/${comment}`)
  }

  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostDataQuery(URI)

  let content
  if (isLoading) {
    content = <h2 className='loading'>Loading...</h2>
  } else if (isError) {
    content = <h2 className='loading'>{error.status}</h2>
    console.log(error)
  } else if (!posts) {
    content = <h2 className='loading'>DATA_ERROR: undefined</h2>
  } else if (isSuccess) {
    content = <ul id="post-list">
    {posts.map((post) => <Post 
        key={post.data.id} 
        data={post.data} 
        kind={post.kind}
        replies={post.kind === 't1' ?
          post.data.replies : null
        }
      />
    )}
  </ul>
  }

  return content
}