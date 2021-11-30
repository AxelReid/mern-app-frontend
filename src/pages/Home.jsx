import React, { useCallback, useEffect, useRef, useState } from 'react'
import Profile from '../components/Profile'
import Form from '../components/Form'
import Card from '../components/Card'
import styled from 'styled-components'
import { useGlobalContext } from '../context'
import { BiCaretRight, BiCaretLeft } from 'react-icons/all'
import { AnimatePresence } from 'framer-motion'

const Home = () => {
  const slideRef = useRef(null)
  const { userState } = useGlobalContext()
  const [post_extended, setPost_extended] = useState(null)

  const view_details = useCallback(
    (post_id = null) => {
      const post = userState.userPosts.find((p) => p._id === post_id)
      setPost_extended(post_id ? post : userState.userPosts[0])
    },
    [userState]
  )

  useEffect(() => {
    view_details()
  }, [userState])

  const postLider = ({
    currentTarget: {
      dataset: { dir },
    },
  }) => {
    const slider = slideRef.current
    slider.scrollBy({ left: dir + 500, behavior: 'smooth' })
  }

  return (
    <Homebody className='padding gap'>
      <div className='first-row gap'>
        <Profile />
        <section className='cards card shadow'>
          <div className='posts-header'>
            <h3>Posts</h3>
            <div>
              <i data-dir='-' onClick={(e) => postLider(e)}>
                <BiCaretLeft />
              </i>
              <i data-dir='+' onClick={(e) => postLider(e)}>
                <BiCaretRight />
              </i>
            </div>
          </div>
          <div className='posts' ref={slideRef}>
            <AnimatePresence>
              {userState.userPosts &&
                userState.userPosts.map((post, index) => (
                  <Card
                    key={post._id}
                    post={{ ...post, index }}
                    view_details={view_details}
                  />
                ))}
              {userState.userPosts.length === 0 && (
                <label className='no-post'>You don't have any post yet</label>
              )}
            </AnimatePresence>
          </div>
        </section>
        <Form />
      </div>
      <div className='card padding flex-1'>
        {post_extended && (
          <div className='post_details gap'>
            <img
              className=''
              src={`images/${post_extended.image}`}
              alt='post-image'
            />
            <div>
              <h1>{post_extended.title}</h1>
              <p className='text secondary'>{post_extended.date}</p>
              <p className='fullText'>{post_extended.text}</p>
            </div>
          </div>
        )}
      </div>
    </Homebody>
  )
}
export const Homebody = styled.main`
  position: relative;
  width: 100%;
  min-height: calc(100vh - 100px);
  ${({ theme }) => theme.mixins.flexBox('stretch', 'flex-start', 'column')}
  .first-row {
    ${({ theme }) => theme.mixins.flexBox('stretch', 'flex-start')}
  }
  .cards {
    height: 418px;
    position: relative;
    flex: 1 1 auto;
    .posts-header {
      border-bottom: 1px solid ${({ theme }) => theme.underline};
      width: 100%;
      padding-bottom: 20px;
      ${({ theme }) => theme.mixins.flexBox('center', 'space-between')}
      div {
        ${({ theme }) => theme.mixins.flexBox()}
        gap: 5px;
        i {
          border-radius: 50px;
          border: 1px solid ${({ theme }) => theme.color_darker};
          width: 25px;
          height: 25px;
          color: ${({ theme }) => theme.color_darker};
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: 0.3s;
          &:hover {
            color: ${({ theme }) => theme.color_light};
            border-color: ${({ theme }) => theme.color_light};
          }
        }
      }
    }
    .posts {
      margin-top: 20px;
      overflow-x: auto;
      &::-webkit-scrollbar {
        height: 0 !important;
      }
      ${({ theme }) => theme.mixins.flexBox('stretch', 'flex-start')}
      gap: 20px;
      scroll-snap-type: x mandatory;
      .no-post {
        width: 100%;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-style: italic;
        font-size: Clamp(1rem, 2vw, 1.5rem);
      }
    }
    padding: 20px;
    padding-bottom: 0px;
  }
  .post_details {
    ${({ theme }) => theme.mixins.flexBox('flex-start', 'flex-start')}
    img {
      width: 100%;
      max-width: 700px;
    }
    .secondary {
      margin-top: 7px;
    }
    .fullText {
      margin-top: 30px;
    }
  }
  @media (max-width: 620px) {
    .first-row {
      flex-direction: column;
    }
  }
`
export default Home
