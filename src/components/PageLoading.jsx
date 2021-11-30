import React from 'react'
import { Homebody } from '../pages/Home'
import { User } from './Profile'
import { Addpost } from './Form'
import { Post } from './Card'
import TextPlaceholder from './TextPlaceholder'

const PageLoading = ({ page }) => {
  switch (page) {
    case '':
      return (
        <Homebody className='padding gap'>
          <div className='first-row gap'>
            <User className='card'>
              <div className='block'>
                <div className='avatar card loading'></div>
                <TextPlaceholder
                  width='100px'
                  height='15px'
                  margin='10px 0 15px 0'
                />
                <TextPlaceholder width='135px' height='10px' />
              </div>
            </User>
            <section className='cards card shadow'>
              <div className='posts-header'>
                <TextPlaceholder width='80px' height='25px' />
                <div>
                  <TextPlaceholder width='25px' height='25px' circle='50%' />
                  <TextPlaceholder width='25px' height='25px' circle='50%' />
                </div>
              </div>
              <div className='posts'>
                <Post className='card'>
                  <div className='post-img loading'></div>
                  <div className='post-content'>
                    <TextPlaceholder height='15px' margin='13px 0 10px 0' />
                    <TextPlaceholder width='180px' height='12px' />
                  </div>
                </Post>
                <Post className='card'>
                  <div className='post-img loading'></div>
                  <div className='post-content'>
                    <TextPlaceholder height='15px' margin='13px 0 10px 0' />
                    <TextPlaceholder width='180px' height='12px' />
                  </div>
                </Post>
              </div>
            </section>
            <Addpost>
              <form className='gap'>
                <div className='form-style'></div>
                <div className='form-style'></div>
                <div className='form-style' style={{ height: 168 }}></div>
                <div className='form-rows gap'>
                  <div className='form-style post-img'></div>
                  <div className='form-btns gap'>
                    <div className='form-style' style={{ height: 40 }}></div>
                    <div className='form-style' style={{ height: 40 }}></div>
                  </div>
                </div>
              </form>
            </Addpost>
          </div>
          <div className='card padding flex-1'>
            <TextPlaceholder width='180px' height='30px' />
          </div>
        </Homebody>
      )
    default:
      return <h1>Loading...</h1>
  }
}

export default PageLoading
