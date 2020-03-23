'use strict'
// light-weight server
const auth = require('./helpers/auth').auth
const webhooksValidate = require('./validate/webhooks')
const statusValidate = require('./validate/statusValidate')
const dispatch = require('./helpers/dispatch')
const routes = require('./helpers/routes')

/**
 * Handles webhook perations
 * @module Webhooks
 * @constructor
 * @param {object} options
 * @param {string} options.clientSecret
 * @param {string} options.baseUrl
*/
function Webhooks(options) {
	this.options = options
	const baseUrl = this.options.baseUrl

	/**
	 * Handles incoming webhooks and asynchronous requests responses
	 * @function webhookHandler
	 * @memberof Webhooks
	 * @param {Request} req
	 * @param {Response} res
	 * @param {string} webhookSecret
	*/
	this.webhookHandler = function (req, res, webhookSecret) {
		return new Promise(function (resolve, reject) {
			let statusCode = auth(JSON.stringify(req.body), req.get('X-kopokopo-signature'), webhookSecret)
			res.status(statusCode).json()

			if (statusCode === 200) {
				resolve(req.body)
			} else {
				reject(statusCode + ': Webhook not authenticated')
			}
		})
	}

	/**
	 * Handles the webhook subscribe operations
	 * @function subscribe
	 * @memberof Webhooks
	 * @param {object} opts
	 * @param {string} opts.eventType - The event type of the webhook that is being subscribed to.
	 * @param {string} opts.url - The url that the webhook will be posted to.
	 * @param {string} opts.webhookSecret - The secret key that will be used to encrypt the payload.
	 * @param {string} opts.accessToken - The access token for authorization.
	 * @param {string} opts.scope - The scope for subscription.
	 * @param {string} opts.scopeReference - The scope reference.
	 * @returns {Promise} Promise object having the location url of the resource.
	*/
	this.subscribe = function (opts) {
		return new Promise(function (resolve, reject) {
			let validationError = webhooksValidate.webhookSubscribeValidate(opts)

			if (validationError) {
				reject(validationError)
			}

			var reqBody = {
				'event_type': opts.eventType,
				'url': opts.url,
				'secret': opts.webhookSecret,
				'scope': opts.scope,
				'scope_reference': opts.scopeReference
			}

			dispatch.sendRequest(reqBody, baseUrl + routes.webhook_subscription_endpoint, opts.accessToken)
				.then((response) => {
					resolve(response.headers['location'])
				})
				.catch((error) => {
					reject(error)
				})
		})
	}

	/**
	 * Handles requests for querrying a settlement request status
	 * @function webhookSubscriptionStatus
	 * @memberof Webhooks
	 * @param {object} opts
	 * @param {string} opts.location - The location url of the request.
	 * @param {string} opts.accessToken - The access token for authorization.
	 * @returns {Promise} Promise object having details on the status of the request
	*/
	this.webhookSubscriptionStatus = function (opts) {
		return new Promise(function (resolve, reject) {
			let validationError = statusValidate(opts)

			if (validationError) {
				reject(validationError)
			}

			dispatch.getContent(opts.location, opts.accessToken)
				.then((response) => {
					resolve(response)
				})
				.catch((error) => {
					reject(error)
				})
		})
	}
}

module.exports = {
	Webhooks
}
