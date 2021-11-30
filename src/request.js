import axios from 'axios'

const token = localStorage.getItem('auth_token')

export default axios.create({
  headers: { auth_token: token || null },
})
