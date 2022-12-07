import axios from "axios"

export function request(config) {
  const instance = axios.create({
    baseURL: "",
    timeout: 10000
  })

  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (err) => {
      console.log(err)
    }
  )

  instance.interceptors.response.use(
    (res) => {
      return res
    },
    (err) => {
      console.log(err)
    }
  )

  // instance.defaults.headers.common[
  //   "Authorization"
  // ] = `token ${}`
  instance.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8"

  return instance(config)
}

export function request_base(config) {
  const instance = axios.create({
    baseURL: "",
    timeout: 10000
  })

  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (err) => {
      console.log(err)
    }
  )

  instance.interceptors.response.use(
    (res) => {
      return res
    },
    (err) => {
      console.log(err)
    }
  )

  instance.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8"

  return instance(config)
}
