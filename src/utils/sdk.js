import Superagent from 'superagent'

import Config from '../config'

const CONTENT_TYPE = 'application/json'
const ERROR_MESSAGES = {
  '401': 'Authentication failed'
}

function setAuthorization (data) {
  const header = { 'Authorization': `Bearer ${data.secret}` }
  return (delete data.secret, header)
}

function endRequest (done) {
  return function (err, response) {
    if (err && !response.body) return done(err.message || err)
    if (err && (response.body && response.body.error)) {
      return done(ERROR_MESSAGES[response.body.statusCode])
    }
    return done(null, response.body)
  }
}

function makeRequest (request, headers, done) {
  if (typeof headers === 'function') [done, headers={}] = [headers, done]
  return request.type(CONTENT_TYPE).set(headers).end(endRequest(done))
}

const Post = {
  create (data, done) {
    const request = Superagent.post(`${Config.api.url}/posts`).send(data)
    return makeRequest(request, setAuthorization(data), done)
  }
}

export default {
  Post
}
