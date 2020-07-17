import React from 'react'
import styled from 'styled-components'

import { dateFormat } from '../../utilities/DateFormat'

export const Comment = ({
  id,
  comment,
  updatedAt,
  account
}) => {

  let name = account.displayName || 'anonymous'
  let url = ""
  if (account.isPublic) {
    name = account.nameFirst
    if (account.twitter.length) {
      url = `https://www.twitter.com/${account.twitter}`
    }
  }

  return (
    <StyledComment id={id}>
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