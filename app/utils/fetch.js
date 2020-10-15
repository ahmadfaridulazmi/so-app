const axios = require('axios'),
    { PAYMENT_SERVICE_URL } = require('../../config')

exports.fetch = async (path, { method = 'get', data = {}, params = {} } = {}) => {
  let response = await axios({
    baseURL: PAYMENT_SERVICE_URL,
    url: path,
    method,
    data,
    params
  });
  return response.data;
};
