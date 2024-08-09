import { PostList } from './PostList'
import { useGetHomeQuery } from '../api/apiSlice'
import { useParams } from 'react-router-dom'

const HomePage = () => {
//   const { endpoint } = useParams()

  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetHomeQuery()
  
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

export default HomePage;