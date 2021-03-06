const express = require('express')
const router = express.Router()

const options = {
	clientId: process.env.K2_CLIENT_ID,
	clientSecret: process.env.K2_CLIENT_SECRET,
	baseUrl: process.env.K2_BASE_URL
}

// Including the k2-connect-node module
var K2 = require('k2-connect-node')(options)
var PayService = K2.PayService
var Webhooks = K2.Webhooks

var payResource

// Put in another file and import when needed
var tokens = K2.TokenService
var token_details
tokens
	.getTokens()
	.then(response => {
		// Developer can decide to store the token_details and track expiry
		token_details = response
		console.log(token_details)
	})
	.catch(error => {
		console.log(error)
	})

router.get('/', function (req, res, next) {
	res.render('pay', res.locals.commonData)
})

router.post('/result', function (req, res, next) {
	// Send message and capture the response or error
	Webhooks
		.webhookHandler(req, res, process.env.K2_CLIENT_SECRET)
		.then(response => {
			payResource = response
			console.log(response)
		})
		.catch(error => {
			console.log(error)
		})
})

router.get('/result', function (req, res, next) {
	let resource = payResource

	if (resource != null) {
		res.render('result', {
			resource: JSON.stringify(resource, null, 2)
		})
	} else {
		console.log('Pay result not yet posted')
		res.render('result', { error: 'Pay result not yet posted' })
	}
})

router.post('/', function (req, res, next) {
	var payOpts = {
		destination: req.body.destination,
		amount: req.body.amount,
		currency: 'KES',
		metadata: {
			customer_id: '8675309',
			notes: 'Salary payment for May 2018'
		},
		callbackUrl: 'http://localhost:8000/pay/result',
		accessToken: token_details.access_token
	}

	// Send message and capture the response or error
	PayService
		.sendPay(payOpts)
		.then(response => {
			return res.render('pay', { message: 'Pay recipients request sent successfully request url is: ' + response })
		})
		.catch(error => {
			console.log(error)
			return res.render('pay', { message: 'Error: ' + error })
		})

})

router.get('/recipients', function (req, res, next) {
	res.render('payrecipient', res.locals.commonData)
})

router.post('/recipients', function (req, res, next) {
	var recipientOpts = {
		type: 'mobile_wallet',
		firstName: req.body.first_name,
		lastName: req.body.last_name,
		email: req.body.email,
		phone: req.body.phone,
		network: 'Safaricom',
		accessToken: token_details.access_token
	}

	// Send message and capture the response or error
	PayService
		.addPayRecipient(recipientOpts)
		.then(response => {
			return res.render('payrecipient', { message: 'Pay recipients request sent successfully request url is: ' + response })
		})
		.catch(error => {
			console.log(error)
			return res.render('payrecipient', { message: 'Error: ' + error })
		})
})

router.get('/status', function (req, res, next) {
	res.render('status', {
		resource_desc: 'pay',
		resource: 'pay'
	})
})

router.post('/status', function (req, res, next) {
	PayService
		.payStatus({ accessToken: token_details.access_token, location:  req.body.location })
		.then(response => {
			return res.render('response', { message: 'Pay status is: ' +  JSON.stringify(response, null, 2) })
		})
		.catch(error => {
			console.log(error)
			return res.render('response', { message: 'Error: ' + error })
		})
})

module.exports = router
