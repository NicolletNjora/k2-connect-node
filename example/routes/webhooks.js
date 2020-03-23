const express = require('express')
const router = express.Router()

const options = {
	clientId: process.env.K2_CLIENT_ID,
	clientSecret: process.env.K2_CLIENT_SECRET,
	baseUrl: process.env.K2_BASE_URL
}

// Including the k2-connect-node module
var K2 = require('k2-connect-node')(options)
var Webhooks = K2.Webhooks
var tokens = K2.TokenService
var buyGoodsResource, b2bResource, reversalResource
var customerResource, transferResource, m2mResource
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

router.post('/', function (req, res, next) {
	// console.log("I start here")
	// // console.log(JSON.stringify(req.body))
	// console.log(req.get('X-kopokopo-signature'))
	// console.log("and end here")
	webhookSecret =  process.env.BUYGOODS_WEBHOOK_SECRET
	Webhooks
		.webhookHandler(req, res, webhookSecret)
		.then(response => {
			buyGoodsResource = response
		})
		.catch(error => {
			console.log(error)
		})
})

router.post('/result', function (req, res, next) {
	// console.log("I start here")
	// // console.log(JSON.stringify(req.body))
	// console.log(req.get('X-kopokopo-signature'))
	// console.log("and end here")
	Webhooks
		.webhookHandler(req, res, process.env.K2_CLIENT_SECRET)
		.then(response => {
			buyGoodsResource = response
		})
		.catch(error => {
			console.log(error)
		})
})

router.post('/b2breceived', function (req, res, next) {
	Webhooks
		.webhookHandler(req, res, process.env.BUYGOODS_WEBHOOK_SECRET)
		.then(response => {
			b2bResource = response
		})
		.catch(error => {
			console.log(error)
		})
})

router.post('/m2mreceived', function (req, res, next) {
	Webhooks
		.webhookHandler(req, res, process.env.BUYGOODS_WEBHOOK_SECRET)
		.then(response => {
			m2mResource = response
		})
		.catch(error => {
			console.log(error)
		})
})

router.post('/customercreated', function (req, res, next) {
	Webhooks
		.webhookHandler(req, res, process.env.BUYGOODS_WEBHOOK_SECRET)
		.then(response => {
			customerResource = response
		})
		.catch(error => {
			console.log(error)
		})
})

router.post('/buygoodsreversed', function (req, res, next) {
	Webhooks
		.webhookHandler(req, res, process.env.BUYGOODS_WEBHOOK_SECRET)
		.then(response => {
			reversalResource = response
		})
		.catch(error => {
			console.log(error)
		})
})

router.post('/transfercompleted', function (req, res, next) {
	Webhooks
		.webhookHandler(req, res, process.env.BUYGOODS_WEBHOOK_SECRET)
		.then(response => {
			transferResource = response
		})
		.catch(error => {
			console.log(error)
		})
})

router.get('/b2breceived', function (req, res, next) {
	let resource = b2bResource

	if (resource != null) {
		res.render('webhookresource', {
			resourceType: "B2b received",
			resource: JSON.stringify(resource, null, 2)
		})
	} else {
		console.log('Resource not yet created')
		res.render('webhookresource', { error: 'Resource not yet created' })
	}
})

router.get('/m2mreceived', function (req, res, next) {
	let resource = m2mResource

	if (resource != null) {
		res.render('webhookresource', {
			resourceType: "M2m received",
			resource: JSON.stringify(resource, null, 2)
		})
	} else {
		console.log('Resource not yet created')
		res.render('webhookresource', { error: 'Resource not yet created' })
	}
})

router.get('/customercreated', function (req, res, next) {
	let resource = customerResource

	if (resource != null) {
		res.render('webhookresource', {
			resourceType: "Customer created",
			resource: JSON.stringify(resource, null, 2)
		})
	} else {
		console.log('Resource not yet created')
		res.render('webhookresource', { error: 'Resource not yet created' })
	}
})

router.get('/transfercompleted', function (req, res, next) {
	let resource = transferResource

	if (resource != null) {
		res.render('webhookresource', {
			resourceType: "Transfer Completed",
			resource: JSON.stringify(resource, null, 2)
		})
	} else {
		console.log('Resource not yet created')
		res.render('webhookresource', { error: 'Resource not yet created' })
	}
})

router.get('/buygoodsreversed', function (req, res, next) {
	let resource = reversalResource

	if (resource != null) {
		res.render('webhookresource', {
			resourceType: "Buygoods reversed",
			resource: JSON.stringify(resource, null, 2)
		})
	} else {
		console.log('Resource not yet created')
		res.render('webhookresource', { error: 'Resource not yet created' })
	}
})

router.get('/buygoodsreceived', function (req, res, next) {
	let resource = buyGoodsResource

	if (resource != null) {
		res.render('webhookresource', {
			resourceType: "Buygoods received",
			resource: JSON.stringify(resource, null, 2)
		})
	} else {
		console.log('Resource not yet created')
		res.render('webhookresource', { error: 'Resource not yet created' })
	}
})

router.get('/subscribe', function (req, res, next) {
	res.render('subscribe', res.locals.commonData)
})


router.post('/subscribe', function (req, res, next) {
	const subscribeOptions = {
		eventType: req.body.event_type,
		url: req.body.url,  
		webhookSecret: process.env.BUYGOODS_WEBHOOK_SECRET,
		accessToken: token_details.access_token,
		scope: "Till",
		scopeReference: "55555"
	}

	Webhooks
		.subscribe(subscribeOptions)
		.then(response => {
			return res.render('subscribe', { message: 'Subscribe successful resource id is: ' + response })
		})
		.catch(error => {
			console.log(error)
			return res.render('subscribe', { message: error.error.message })
		})
})


module.exports = router
