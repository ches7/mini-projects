import { useNavigate, useLocation } from "react-router-dom"

export const Post = ({ data, kind, replies }) => {
  const {
    title,
    author,
    selftext,
    body,
    url_overridden_by_dest,
    score
  } = data

  console.log(data)

  const children = replies?.data?.children || []
  const navigate = useNavigate()
  const location = useLocation()

  const onClick = (URI) => {
    const pathname = URI.slice(0, -1)
    if (pathname !== location.pathname) {
      navigate(pathname)
    }
  }

  return (
    <li className="post" onClick={() => onClick(data.permalink)}>
      <h4>Posted by: {author}</h4>
      <h2>{title}</h2>
      {
      data.url_overridden_by_dest? <img width='580' src={url_overridden_by_dest}></img> : null
    }
      {kind === 't3' ? 
        <p>{selftext.slice(0, 400)}</p> :
        <p>{body}</p>
      }
      {data.is_video ? 
        <video width='580' controls>
          <source src={data.media.reddit_video.scrubber_media_url} />
        </video> : null}
      <h4>Score: {score}</h4>
    </li>
  )
}