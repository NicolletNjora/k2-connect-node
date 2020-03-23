'use strict'
const dispatch = require('./helpers/dispatch')
const transferValidate = require('./validate/transfer')
const statusValidate = require('./validate/statusValidate')
const routes = require('./helpers/routes')

/**
 * Handles the transfer/settlement operations
 * @module TransferService
 * @constructor
 * @param {object} options
 * @param {string} options.baseUrl
*/
function TransferService(options) {
	this.options = options
	const baseUrl = this.options.baseUrl

	/**
	 * Handles requests for creating a merchant bank account
	 * @function createMerchantBankAccount
	 * @memberof TransferService
	 * @param {object} opts
	 * @returns {Promise} Promise object having the location url of the request
	*/
	this.createMerchantBankAccount = function (opts) {
		return new Promise(function (resolve, reject) {
			let validationError = transferValidate.merchantBankAccountValidation(opts)

			if (validationError) {
				reject(validationError)
			}

			var reqBody = {
				'account_name': opts.accountName,
				'bank_id': opts.bankId,
				'bank_branch_id': opts.bankBranchId,
				'account_number': opts.accountNumber
			}

			dispatch.sendRequest(reqBody, baseUrl + routes.merchant_bank_account_endpoint, opts.accessToken)
				.then((response) => {
					resolve(response.headers['location'])
				})
				.catch((error) => {
					reject(error)
				})
		})
	}

	/**
	 * Handles requests for creating a merchant mobile wallet
	 * @function createMerchantWallet
	 * @memberof TransferService
	 * @param {object} opts
	 * @returns {Promise} Promise object having the location url of the request
	*/
	this.createMerchantWallet = function (opts) {
		return new Promise(function (resolve, reject) {
			let validationError = transferValidate.merchantWalletValidation(opts)

			if (validationError) {
				reject(validationError)
			}

			var reqBody = {
				'network': opts.network,
				'msisdn': opts.msisdn,
			}

			dispatch.sendRequest(reqBody, baseUrl + routes.merchant_wallet_endpoint, opts.accessToken)
				.then((response) => {
					resolve(response.headers['location'])
				})
				.catch((error) => {
					reject(error)
				})
		})
	}

	/**
	 * Handles requests for settling/transfering funds
	 * @function settleFunds
	 * @memberof TransferService
	 * @param {object} opts
	 * @param {string} opts.amount - The amount to settle.
	 * @param {string} opts.currency - The currency to settle to.
	 * @param {string} opts.destination - The destination of the settlement i.e bank or mobile wallet
	 * @param {string} opts.accessToken - The access token for authorization.
	 * @returns {Promise} Promise object having the location url of the request
	*/
	this.settleFunds = function (opts) {
		return new Promise(function (resolve, reject) {
			let validationError = transferValidate.settlementValidation(opts)

			if (validationError) {
				reject(validationError)
			}
			var reqBody = {
				'amount': {
					'currency': opts.currency,
					'value': opts.amount
				},
				'destination_type': opts.destinationType,
				'destination_reference': opts.destinationReference,
				'_links': {
					'callback_url': opts.callbackUrl
				}
			}

			dispatch.sendRequest(reqBody, baseUrl + routes.settle_funds_endpoint, opts.accessToken)
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
	 * @function settlementStatus
	 * @memberof TransferService
	 * @param {object} opts
	 * @param {string} opts.location - The location url of the request.
	 * @param {string} opts.accessToken - The access token for authorization.
	 * @returns {Promise} Promise object having details on the status of the request
	*/
	this.settlementStatus = function (opts) {
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
	TransferService
}
