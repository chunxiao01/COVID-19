import jsonp from "jsonp"

export function get_map_data_jsonp() {
  return new Promise((resolve, reject) => {
    jsonp(
      `https://interface.sina.cn/news/wap/fymap2020_data.d.json`,
      null,
      (err, data) => {
        if (!err) {
          resolve(data)
        } else {
          reject(err)
        }
      }
    )
  })
}
