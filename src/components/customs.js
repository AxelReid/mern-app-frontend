import styled from 'styled-components'
import spin from '../assets/spin.gif'
import preloader from '../assets/preloader.gif'
import { motion } from 'framer-motion'
import { useEffect, memo } from 'react'
import { useGlobalContext } from '../context'

// spin
export const SimpleSpin = memo(({ height = '35px' }) => {
  return (
    <Spinner height={height}>
      <img src={spin} alt='' />
    </Spinner>
  )
})
// preloader
export const Preloader = memo(({ height = '50px' }) => {
  return (
    <Spinner height={height}>
      <img src={preloader} alt='' />
    </Spinner>
  )
})
const Spinner = styled.div`
  position: relative;
  height: ${({ height }) => height};
  img {
    height: 100%;
  }
`

// alert
const animAlert = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
export const Alert = memo(({ top = 0, type }) => {
  const { alert, setAlert } = useGlobalContext()
  const { msg, status } = alert
  useEffect(() => {
    const wait = setTimeout(() => {
      setAlert({ status: '', msg: '' })
    }, 1500)
    return () => clearTimeout(wait)
  })
  return (
    <TextAlert
      variants={animAlert}
      initial='hidden'
      animate='visible'
      exit='hidden'
      data-is={status}
      className={'alert ' + type}
      top={top}
    >
      {msg}
    </TextAlert>
  )
})
const TextAlert = styled(motion.p)`
  position: absolute;
  width: max-content;
  top: ${({ top }) => top};
  left: 50%;
  transform: translateX(-50%);
`
