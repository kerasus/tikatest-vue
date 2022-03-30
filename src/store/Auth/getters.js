// import { User } from 'src/models/User'

export function user (state) {
  // return new User(state.user)
  return state.user
}
export function accessToken (state) {
  return state.accessToken
}
export function redirectTo (state) {
  return state.redirectTo
}
