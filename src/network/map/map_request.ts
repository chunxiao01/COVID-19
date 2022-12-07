import { request } from "../request"

export function get_map_data() {
  return request({
    // url: `https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427`,
    url: `https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf`,
    method: "get"
  })
}
