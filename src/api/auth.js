import request from '@/utils/request'
import url from './baseUrl'

const { api } = url

export function getMenu () {
  return request.get(`${api}/menu.json`)
}
