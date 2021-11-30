import React, { memo } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context'
import Table from './Table'

const UsersTable = memo(({ getUser_id }) => {
  const { userState } = useGlobalContext()
  const { allUsers } = userState

  const displayUsers = allUsers.map(({ _id, username }) => ({
    _id,
    image: '',
    username,
  }))

  return (
    <AllUsers className='card shadow'>
      <Table
        data={displayUsers}
        getUser_id={getUser_id}
        title='All users'
        type='users'
      />
    </AllUsers>
  )
})
const AllUsers = styled.aside`
  flex: 0 1 380px;
  overflow-y: auto;
  @media (max-width: 700px) {
    position: fixed;
    top: 120px;
    left: -100%;
  }
`
export default UsersTable
