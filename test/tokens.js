require('should')
const expect = require('chai').expect
const nock = require('nock')

var configs = require('./configs')
const response = require('./response/tokens')

var k2, tokens

describe('TokenService', function () {
	this.timeout(5000)

	before(function () {
		k2 = require('../lib')(configs.TEST_ACCOUNT)
		tokens = k2.TokenService

		nock(configs.TEST_ACCOUNT.baseUrl)
			.post('/oauth/token')
			.reply(200, response)
	})

	it('#getTokens()', () => {
		tokens.getTokens().then(response => {
			// expect an object back
			expect(typeof response).to.equal('object')

			// Test result of status for the response
			expect(response.token_type).to.equal('Bearer')

		})
	})
})
