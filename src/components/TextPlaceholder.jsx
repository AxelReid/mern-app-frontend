import React from 'react'
import styled from 'styled-components'

const TextPlaceholder = ({
  width = '90px',
  height = '20px',
  circle = '20px',
  margin = '0',
}) => {
  const style = {
    width,
    height,
    borderRadius: circle,
    margin,
    overflow: 'hidden',
  }
  return <Text className='loading' style={style}></Text>
}
const Text = styled.div`
  position: relative;
  background: ${({ theme }) => theme.underline};
`
export default TextPlaceholder
