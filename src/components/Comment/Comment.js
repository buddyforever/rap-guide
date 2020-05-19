import React from 'react'
import styled from 'styled-components'

import { dateFormat } from '../../utilities/DateFormat'

export const Comment = ({
  id,
  comment,
  updatedAt,
  account
}) => {

  let name = account.nameFirst + ' ' + account.nameLast;

  return (
    <StyledComment id={id}>
      <div className="comment_image">
        <img src={account.image} alt={name} />
      </div>
      <div className="comment_text">
        {comment}
        <div className="comment_author">
          posted by {name} on {dateFormat(updatedAt)}
        </div>
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