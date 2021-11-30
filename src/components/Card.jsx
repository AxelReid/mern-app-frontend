import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

const Card = React.memo(({ post, view_details }) => {
  return (
    <Post className='card' onClick={() => view_details(post._id)}>
      <div
        className='post-img'
        style={{
          backgroundImage: `url(images/${post.image})`,
        }}
      ></div>
      <div className='post-content'>
        <h4>{post.title}</h4>
        <p className='text secondary'>{post.date}</p>
      </div>
    </Post>
  )
})
export const Post = styled(motion.div)`
  /* min-width: 270px;
  max-width: 270px; */
  flex: 0 0 270px;
  height: 320px;
  scroll-snap-align: center;
  .post-img {
    position: relative;
    width: 100%;
    height: 250px;
    background-position: center;
    background-size: cover;
    background-color: ${({ theme }) => theme.underline};
  }
  .post-content {
    margin: 10px 0 5px 0;
    h4 {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`
export default Card
