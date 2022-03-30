const baseApiVersion = '/api/v1'

const API_ADDRESS = {
  // socket: process.env.VUE_APP_SOCKET_TARGET_API_SERVER,
  auth: {
    login: baseApiVersion + '/auth/login'
  },
  user: {
    base: baseApiVersion + '/user',
  }
}
export default API_ADDRESS
