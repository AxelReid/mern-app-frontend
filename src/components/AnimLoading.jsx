import { motion } from 'framer-motion'

import React from 'react'
const AnimLoading = () => {
  const page_anim = {
    red: {
      hidden: { scaleX: 0 },
      visible: {
        scaleX: [1, 0],
        transformOrigin: 'right',
        transition: { duration: 0.4, delay: 0.2 },
      },
    },
    black: {
      hidden: { right: '100%' },
      visible: {
        skewX: ['0deg', '-5deg', '0deg'],
        right: ['100%', '0%'],
        transition: { duration: 0.5 },
      },
      done: {
        right: '-100%',
        skewX: ['0deg', '-5deg', '0deg'],
        transition: { duration: 0.5 },
      },
    },
    text: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { delay: 0.4 } },
      done: { opacity: 0 },
    },
  }

  return (
    <motion.div
      className='anim-page _black'
      variants={page_anim.black}
      initial='hidden'
      animate='visible'
      exit='done'
    >
      <motion.div className='_red' variants={page_anim.red}></motion.div>
      <motion.h1 variants={page_anim.text} className='text secondary'>
        LOADING...
      </motion.h1>
    </motion.div>
  )
}

export default AnimLoading
