const helpers = require('./authHelpers')
const request = require('supertest');
const server = require('../api/server')

describe('post /auth/registration', () => {

  beforeEach(async () => {
    await helpers.find().truncate();
  });
  
  it('returns correct number of users', async () => {

    await helpers.add({username: 'nickh12443', password: '12345'})

    const users = await helpers.find();

    expect(users).toHaveLength(1);
  })

  beforeEach(async () => {
    await helpers.find().truncate();
  });
  

  it('returns user', async () => {
    await helpers.add({username: 'nickh12443', password: '12345'})

    const users = await helpers.find("nickh12443");

    expect(users).toEqual([{id: 1, username: "nickh12443", password: "12345"}])

  })
})