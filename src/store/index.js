// actions
const SET_USERS = 'SET_USERS'
const LOAD_MORE_USERS = 'LOAD_MORE_USERS'
const SET_PAGE = 'SET_PAGE'
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES'


const initialState = {
  page: 0,
  users: [],
  totalPages: 0
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case LOAD_MORE_USERS:
      return {
        ...state,
        users: [...state.users, ...action.payload]
      }
    case SET_PAGE:
      return {
        ...state,
        page: action.payload
      }
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload
      }
    default: 
      return state
  }
}

export default rootReducer