import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Match } from '.'

const app = () => express(apiRoot, routes)

let match

beforeEach(async () => {
  match = await Match.create({})
})

test('POST /matches 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, team1_id: 'test', team2_id: 'test', team1_score: 'test', team2_score: 'test', group: 'test', user_id: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.team1_id).toEqual('test')
  expect(body.team2_id).toEqual('test')
  expect(body.team1_score).toEqual('test')
  expect(body.team2_score).toEqual('test')
  expect(body.group).toEqual('test')
  expect(body.user_id).toEqual('test')
})

test('POST /matches 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /matches 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /matches/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${match.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(match.id)
})

test('GET /matches/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /matches/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${match.id}`)
    .send({ access_token: masterKey, team1_id: 'test', team2_id: 'test', team1_score: 'test', team2_score: 'test', group: 'test', user_id: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(match.id)
  expect(body.team1_id).toEqual('test')
  expect(body.team2_id).toEqual('test')
  expect(body.team1_score).toEqual('test')
  expect(body.team2_score).toEqual('test')
  expect(body.group).toEqual('test')
  expect(body.user_id).toEqual('test')
})

test('PUT /matches/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${match.id}`)
  expect(status).toBe(401)
})

test('PUT /matches/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, team1_id: 'test', team2_id: 'test', team1_score: 'test', team2_score: 'test', group: 'test', user_id: 'test' })
  expect(status).toBe(404)
})

test('DELETE /matches/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${match.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /matches/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${match.id}`)
  expect(status).toBe(401)
})

test('DELETE /matches/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
