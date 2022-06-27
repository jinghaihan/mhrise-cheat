import axios from 'axios'

const onError = error => {
  if (!error.response) {
    return Promise.reject(error)
  }

  const status = error.response.status

  switch (status) {
    case 400:
      break
    case 401:
      break
    case 403:
      break
    case 404:
      break
    case 409:
      break
    case 500:
      break
  }

  return error.response.data
}

const request = axios.create({
  timeout: 1000 * 60 * 5
})

request.interceptors.request.use(
  config => {
    if (process.env.NODE_ENV === 'development') {
      config.withCredentials = true
    }
    return config
  }
)

request.interceptors.response.use(result => {
  return result
}, onError)

export default request
