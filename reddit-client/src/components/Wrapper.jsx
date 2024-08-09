import { PostList } from './PostList'
import { useGetDataQuery } from '../api/apiSlice'
import { useParams } from 'react-router-dom'

const Wrapper = () => {
  const { endpoint } = useParams()

  console.log('here')

  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetDataQuery(endpoint)
  
  let content
  if (isLoading) {
    content = <h2 className='loading'>Loading...</h2>
  } else if (isError) {
    content = <h2 className='loading'>{error.status}</h2>
    console.log(error)
  } else if (!posts) {
    content = <h2 className='loading'>DATA_ERROR: undefined</h2>
  } else if (isSuccess) {
    content = <PostList posts={posts} />
  }

  return content
}

export default Wrapper;