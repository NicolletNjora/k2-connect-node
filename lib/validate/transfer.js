const validate  = require('validate.js')
const errorBuilder = require('../helpers/errorbuilder')

function merchantBankAccountValidation(opts){
	var constraints = {
		'accountName': {
			presence: true,
			isString: true
		},
		'bankId': {
			presence: true,
			isString: true
		},
		'bankBranchId': {
			presence: true,
			isString: true
		},
		'accountNumber': {
			presence: true,
			isString: true
		},
		'accessToken': {
			presence: true,
			isString: true
		}
	}
	return errorBuilder(validate(opts, constraints))
}

function merchantWalletValidation(opts){
	var constraints = {
		'network': {
			presence: true,
			isString: true
		},
		'msisdn': {
			presence: true,
			isString: true
		},
		'accessToken': {
			presence: true,
			isString: true
		}
	}
	return errorBuilder(validate(opts, constraints))
}

function settlementValidation(opts){    
	var constraints = {
		'currency': {
			presence: true,
			isString: true
		},
		'amount': {
			presence: true,
			numericality: {
				onlyInteger: true,
				greaterThan: 50
			}
		},
		'destination': {
			presence: false,
			isString: true
		},
		'accessToken': {
			presence: true,
			isString: true
		},
		'callbackUrl': {
			isString: true,
			url: {
				allowLocal: true
			}
		},
	}
    
	return errorBuilder(validate(opts, constraints))
}

module.exports = {
	merchantBankAccountValidation,
	merchantWalletValidation,
	settlementValidation
}