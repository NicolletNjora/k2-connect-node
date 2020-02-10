const expect = require('chai').expect
const auth = require('../lib/helpers/auth').auth

describe('Auth', function () {
	this.timeout(5000)

	it('#auth() succeeds', () => {
        requestBody = "Hello"
        signature = "b0da729eff2772eacaf84b1b9d8a587b40d886b715610c81c97904627dacb915"
        webhookSecret = "my_secret"

        response = auth(requestBody, signature, webhookSecret)
        
        return expect(response).to.equal(200)
    })
    
    it('#auth() with wrong secret fails', () => {
        requestBody = "Hello"
        signature = "b0da729eff2772eacaf84b1b9d8a587b40d886b715610c81c97904627dacb915"
        webhookSecret = "my_wrong_secret"

        response = auth(requestBody, signature, webhookSecret)
        
        return expect(response).to.equal(401)
	})
})
