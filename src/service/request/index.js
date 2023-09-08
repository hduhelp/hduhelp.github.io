import axios from 'axios'

const httpGet = async url => {
  let resp = await axios.get(url)
  console.log(resp.data.data)
  return resp.data.data
}

export default httpGet
