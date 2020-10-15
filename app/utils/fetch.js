const axios = require('axios')

exports.fetch = async (path, { method = 'get', data = {}, params = {} } = {}) => {
  let response = await axios({
    baseURL: 'http://localhost:4001',
    url: path,
    method,
    data,
    params
  });
  return response.data;
};
