const express = require('express')
const router = express.Router()

const options = {
	clientId: process.env.K2_CLIENT_ID,
	clientSecret: process.env.K2_CLIENT_SECRET,
	baseUrl: process.env.K2_BASE_URL
}

// Including the k2-connect-node module
var K2 = require('k2-connect-node')(options)
var TransferService = K2.TransferService

// Put in another file and import when needed
var tokens = K2.TokenService
var token_details
tokens
	.getTokens()
	.then(response => {
		// Developer can decide to store the token_details and track expiry
		token_details = response
	})
	.catch(error => {
		console.log(error)
	})

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('transfer', res.locals.commonData)
})

router.post('/', function (req, res, next) {
	var transferOpts = {
		amount : req.body.amount,
		currency: 'KES',
		destination: req.body.destination,
		accessToken: token_details.access_token
	}

	// Send message and capture the response or error
	TransferService
		.settleFunds(transferOpts)
		.then(response => {
			return res.render('transfer', { message: 'Transfer request sent successfully request url is: ' + response })
		})
		.catch(error => {
			console.log(error)
			return res.render('transfer', { message: 'Error: ' + error })
		})
})

router.post('/createsettlement', function (req, res, next) {
	var settlementAccountOpts = {
		accountName: req.body.accountName,
		bankId: req.body.bankId,
		bankBranchId: req.body.bankBranchId,
		accountNumber: req.body.accountNumber,
		accessToken: token_details.access_token
	}

	// Send message and capture the response or error
	TransferService
		.createSettlementAccount(settlementAccountOpts)
		.then(response => {
			return res.render('createsettlement', { message: 'Settlement Account details request sent successfully request url is: ' + response })
		})
		.catch(error => {
			console.log(error)
			return res.render('createsettlement', { message: error })
		})
})

router.get('/createsettlement', function (req, res, next) {
	res.render('createsettlement', res.locals.commonData)
})

router.get('/status', function (req, res, next) {
	res.render('status', {
		resource_desc: 'transfer',
		resource: 'transfer'
	})
})

router.post('/status', function (req, res, next) {
	TransferService
		.settlementStatus({ accessToken: token_details.access_token, location: req.body.location })
		.then(response =>{
			return res.render('response', { message: 'Transfer status is: ' + response })
		})
		.catch(error => {
			console.log(error)
			return res.render('response', { message: 'Error: ' + error })
		})
})

module.exports = router
