const server = require('../api/server')
const request = require('supertest');

describe('Get / jokes', () => {
  it('returns status 200 after call', async() => {
    await request(server).get('/api/jokes/')
      .expect(200)
  })

  it('returns json format', async() => {
    const resp = await request(server).get('/api/jokes/');

    expect(resp.type).toEqual('application/json')
  })


})