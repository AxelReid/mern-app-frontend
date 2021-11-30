export const userReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return
    case 'GET_POSTS':
      const sorted_posts = action.payload.posts.sort((a, b) => {
        const a_time = new Date(a.date).getTime()
        const b_time = new Date(b.date).getTime()
        return a_time < b_time ? 1 : a_time > b_time ? -1 : 0
      })
      return {
        ...state,
        userPosts: sorted_posts,
      }
    case 'GET_USER':
      return {
        ...state,
        user: action.payload.user,
      }
    case 'CLEAN':
      return {
        ...state,
        userPosts: [],
        user: null,
      }
    // admin actions
    case 'ALL_USERS':
      return {
        ...state,
        allUsers: action.payload.allUsers,
      }
    case 'CHANGE_USER':
      const { user_id, key, value } = action
      const users = state.allUsers.map((user) => {
        if (user._id === user_id) {
          return {
            ...user,
            [key]: value,
          }
        }
        return user
      })
      return {
        ...state,
        allUsers: users,
      }
    case 'DROP_USER':
      const left_users = state.allUsers.filter(({ _id }) => _id !== action.ID)
      return {
        ...state,
        allUsers: left_users,
      }
    default:
      return state
  }
}
