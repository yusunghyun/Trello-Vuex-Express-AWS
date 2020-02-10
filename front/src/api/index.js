import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401
const onUnauthorized = () => {
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`)
}

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data
  }).then(result => result.data)
    .catch(result => {
      const {status} = result.response
      if (status === UNAUTHORIZED) onUnauthorized()
      throw result.response
    })
}

export const setAuthInHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

const {token} = localStorage
if (token) setAuthInHeader(token)

export const board = {
  fetch(id) {
    return id ? request('get', `/boards/${id}`) : request('get', '/boards')
  },
  create(title){
    return request('post','/boards',{title})
  },
  destroy(id){
    return request('delete',`/boards/${id}`)
  },
  update(id,payload){
    return request('put',`/boards/${id}`,payload)
  },
}
export const list = {
  create(payload){
    return request('post','/lists',payload)
  },
  update(id, payload) {
    return request('put',`/lists/${id}`,payload)
  },
  destroy(id){
    return request('delete',`/lists/${id}`)
  }
}
//인증을 위한
export const auth = {
  join(email,password){
    return request('post','/auth/join',{email,password})
  },
  login(email, password) {
    return request('post', '/auth/login', {email, password}) 
  },
  logout(){
    return request('get','/auth/logout')
  },
}
export const card = {
  create(title, ListId, pos){
    return request('post','/cards',{title, ListId, pos})
  },
  fetch(id){
    return request('get',`/cards/${id}`)
  },
  update(id,payload){
    return request('put',`/cards/${id}`,payload)
  },
  destroy(id){
    return request('delete',`/cards/${id}`)
  }
}