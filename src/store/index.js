// actions
const SET_USERS = 'SET_USERS'
const LOAD_MORE_USERS = 'LOAD_MORE_USERS'
const SET_PAGE = 'SET_PAGE'
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES'
const SET_MOBILE_NAV = 'SET_MOBILE_NAV'
const SET_USERS_COUNT = 'SET_USERS_COUNT'
const SET_CONGRATS = 'SET_CONGRATS'

const initialState = {
  page: 0,
  users: [],
  totalPages: 0,
  usersCount: 6,
  mobileNav: false,
  congrats: false
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_CONGRATS: 
      return {
        ...state,
        congrats: action.payload
      }
    case SET_USERS_COUNT:
      return {
        ...state,
        usersCount: action.payload
      }
    case SET_MOBILE_NAV:
      return {
        ...state,
        mobileNav: action.payload
      }
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