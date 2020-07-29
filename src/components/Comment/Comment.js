import React, { useContext, useRef } from 'react'
import styled from 'styled-components'

import { dateFormat } from '../../utilities/DateFormat'
import { UserContext } from '../../context/UserContext'

import { useMutation } from '@apollo/react-hooks'
import { DELETE_COMMENT } from '../../queries/comments'

export const Comment = ({
  id,
  comment,
  updatedAt,
  account
}) => {

  const { user } = useContext(UserContext)
  const commentRef = useRef(null)

  let name = account.displayName || 'someone'
  let url = ""
  if (account.isPublic) {
    name = account.nameFirst
    if (account.twitter.length) {
      url = `https://www.twitter.com/${account.twitter}`
    }
  }

  function removeComment() {
    // TODO - IMPLEMENT REMOVE COMMENT
    console.log(comment.id);
    commentRef.current.remove();
  }

  return (
    <StyledComment id={id} ref={commentRef}>
      <div className="comment_text">
        {comment}
        {account.isPublic && account.twitter && (
          <div className="comment_author">
            posted by <a target="_blank" href={url}>{name}</a> on {dateFormat(updatedAt)}
          </div>
        )}
        {(!account.twitter || !account.twitter.length || !account.isPublic) && (
          <div className="comment_author">
            posted by {name} on {dateFormat(updatedAt)}
          </div>
        )}
        {/*account.id === user.id && <button onClick={removeComment}>remove</button>*/}
      </div>
    </StyledComment>
  )
}

export default Comment

const StyledComment = styled.div`
  display: flex;
  margin: 10px 0;

  .comment_image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 2.5rem;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .comment_author {
    font-size: 1.4rem;
    color: #666666;
    font-style: italic;
  }
`