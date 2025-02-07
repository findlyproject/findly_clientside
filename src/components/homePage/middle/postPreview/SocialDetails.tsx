import { useState } from 'react'

export function SocialDetails({post}) {
  const [isShowLikes, setisShowLikes] = useState(false)

  const toggleLikes = () => {
    setisShowLikes((prevVal) => !prevVal)
  }

  
  return (
    <section className="social-details">
      <div className="likes-count">
        <span onClick={toggleLikes}>
          {!post.reactions?.length
            ? ''
            : post.reactions?.length > 1
            ? post.reactions?.length + ' likes'
            : '1 like'}
        </span>
      </div>
      <div className="share-comment">
        <div className="comment-count" >
        
        </div>
        <div className="share-count">
          
        </div>
      </div>
      {isShowLikes && (
        <div
          className="likes-container"
          onClick={(ev) => {
            ev.stopPropagation()
            toggleLikes()
          }}
        >
          <div
            className="likes"
            onClick={(ev) => {
              ev.stopPropagation()
            }}
          >
         
          </div>
        </div>
      )}
    </section>
  )
}
