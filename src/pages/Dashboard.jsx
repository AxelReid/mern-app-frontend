import React from 'react'
import styled from 'styled-components'

const Dashboard = () => {
  return (
    <DashboardView className='padding'>
      <div className='stats gap'>
        <div className='stat-col gap'>
          <div className='card shadow'>fg</div>
          <div className='card shadow'>fg</div>
        </div>
        <div className='card shadow'>fg</div>
        <div className='card shadow'>fg</div>
      </div>
    </DashboardView>
  )
}
const DashboardView = styled.div`
  position: relative;
  .stats {
    position: relative;
    ${({ theme }) => theme.mixins.flexBox('stretch', 'flex-start')}
    .card {
      padding: 10px;
      height: 390px;
      flex: 0 0 290px;
    }
    .stat-col {
      flex: 0 0 600px;
      position: relative;
      ${({ theme }) => theme.mixins.flexBox('stretch', 'flex-start', 'column')}
      div {
        height: auto !important;
      }
    }
  }
`
export default Dashboard
