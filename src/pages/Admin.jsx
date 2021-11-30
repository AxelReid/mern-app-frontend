import React, { useCallback, memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import UserDetail from '../components/Admin/UserDetail'
import UsersTable from '../components/Admin/UsersTable'
import { useGlobalContext } from '../context'
import request from '../request'

const Admin = memo(() => {
  const { userState, userDispatch } = useGlobalContext()
  const [user_id, setUser_id] = useState(null)

  const getUser_id = useCallback(
    (id = null) => {
      setUser_id(id)
    },
    [user_id]
  )

  const fetchAllUser = useCallback(async () => {
    try {
      const allusers = await request.get('/user/admin/all-users')
      userDispatch({ type: 'ALL_USERS', payload: { allUsers: allusers.data } })
      if (allusers.data.length > 0) {
        getUser_id(allusers.data[0]._id)
      }
    } catch (error) {
      console.log(`couldn't fetch all the users`)
    }
  }, [userState])

  useEffect(() => {
    fetchAllUser()
  }, [])

  return (
    <AdminPanel className='padding gap fluid'>
      <UsersTable getUser_id={getUser_id} />
      <div className='right-scrollable'>
        <UserDetail user_id={user_id} getUser_id={getUser_id} />
      </div>
    </AdminPanel>
  )
})
const AdminPanel = styled.div`
  width: 100%;
  padding-bottom: 0;
  ${({ theme }) => theme.mixins.flexBox('stretch')};
  .right-scrollable {
    position: relative;
    overflow-y: auto;
    flex: 1 1 auto;
  }
`
export default Admin
