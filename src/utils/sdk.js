import Superagent from 'superagent'

import Config from '../config'

const CONTENT_TYPE = 'application/json'
const ERROR_MESSAGES = {
  '401': 'Authentication failed',
  '404': 'Not found'
}

function setAuthorization (data) {
  const header = { 'Authorization': `Bearer ${data.secret}` }
  return (delete data.secret, header)
}

function endRequest (done) {
  return function (err, response) {
    const {body} = response
    if (err && !body) return done(err.message || err)
    if (err && (body && body.error)) {
      return done(ERROR_MESSAGES[body.statusCode])
    }
    return done(null, body)
  }
}

function makeRequest (request, headers, done) {
  if (typeof headers === 'function') [done, headers={}] = [headers, done]
  return request.type(CONTENT_TYPE).set(headers).end(endRequest(done))
}

export const Post = {
  create (data, done) {
    const request = Superagent.post(`${Config.api.url}/posts`).send(data)
    return makeRequest(request, setAuthorization(data), done)
  },
  get (slug, done) {
   const request = Superagent.get(`${Config.api.url}/posts/${slug}`)
   return makeRequest(request, done)
  },
  getAll (done) {
   const request = Superagent.get(`${Config.api.url}/posts`)
   return makeRequest(request, done)
  }
}

export const Place = {
  getAll (query={}, done) {
    const request = Superagent.get(`${Config.api.url}/places`)
    if (query.visitor) request.query({ visitor: query.isVisitor })
    if (query.condensed) request.query({ condensed: query.condensed })
    return makeRequest(request, done)
  }
}
