require('should')
const expect = require('chai').expect
const nock = require('nock')

var configs = require('./configs')
const response = require('./response/transfer')

var k2, transfer

describe('TransferService', function () {
	this.timeout(5000)

	before(function () {
		k2 = require('../lib')(configs.TEST_ACCOUNT)
		transfer = k2.TransferService
	})

	describe('settleFunds()', function () {
		beforeEach(() => {
			nock(configs.TEST_ACCOUNT.baseUrl)
				.post('/api/'+configs.version+'/transfers')
				.reply(201, {}, response.location)
		})

		describe('settleFunds() absence of required values validation', function () {

			it('#settleFunds() has to have a currency', function () {
				var opts = {}
				opts.amount = 200
				opts.destination = 'my_destination'
				opts.accessToken = 'hardToGuessKey'

				return transfer.settleFunds(opts)
					.should.be.rejectedWith(Error, { message: 'Currency can\'t be blank; ' })
			})

			it('#settleFunds() has to have an amount', function () {
				var opts = {}
				opts.currency = 'KES'
				opts.destination = 'my_destination'
				opts.accessToken = 'hardToGuessKey'

				return transfer.settleFunds(opts)
					.should.be.rejectedWith(Error, { message: 'Amount can\'t be blank; ' })
			})

			it('#settleFunds() has to have an accessToken', function () {
				var opts = {}
				opts.currency = 'KES'
				opts.amount = 200
				opts.destination = 'my_destination'

				return transfer.settleFunds(opts)
					.should.be.rejectedWith(Error, { message: 'Access token can\'t be blank; ' })
			})
		})

		describe('settleFunds() data types validation', function () {
			var opts = {}
			it('#settleFunds() currency has to be a string', function () {
				opts.currency = 3
				opts.amount = 200
				opts.destination = 'my_destination'
				opts.accessToken = 'hardToGuessKey'

				return transfer.settleFunds(opts)
					.should.be.rejectedWith(Error, { message: 'Currency must be a string; ' })
			})

			it('#settleFunds() amount has to be an integer', function () {
				opts.currency = 'KES'
				opts.amount = 'Two hundred'
				opts.destination = 'my_destination'
				opts.accessToken = 'hardToGuessKey'

				return transfer.settleFunds(opts)
					.should.be.rejectedWith(Error, { message: 'Amount is not a number; ' })
			})

			it('#settleFunds() amount has to be more than 50', function () {
				opts.currency = 'KES'
				opts.amount = 20
				opts.destination = 'my_destination'
				opts.accessToken = 'hardToGuessKey'

				return transfer.settleFunds(opts)
					.should.be.rejectedWith(Error, { message: 'Amount must be greater than 50; ' })
			})

			it('#settleFunds() destination has to be a string', function () {
				opts.currency = 'KES'
				opts.amount = 200
				opts.destination = 2
				opts.accessToken = 'hardToGuessKey'

				return transfer.settleFunds(opts)
					.should.be.rejectedWith(Error, { message: 'Destination must be a string; ' })
			})
		})
		it('#settleFunds() succeeds', () => {
			var opts = {}
	
			opts.destination = 'my_destination'
			opts.currency = 'KES'
			opts.amount = 200
			opts.accessToken = 'hardToGuessKey'
	
			return transfer.settleFunds(opts).then(response => {
				expect(response).to.equal('https://api-sandbox.kopokopo.com/transfers/d76265cd-0951-e511-80da-0aa34a9b2388')
			})
				
		})
	})

	describe('createMerchantBankAccount()', function () {

		beforeEach(() => {
			nock(configs.TEST_ACCOUNT.baseUrl)
				.post('/api/'+configs.version+'/merchant_bank_accounts')
				.reply(201, {}, response.merchantAccountLocation)
		})
	
		describe('createMerchantBankAccount() validation', function () {
			
			it('#createMerchantBankAccount() has to have a bankId', function () {
				var opts = {}
	
				opts.accountName = 'my_account_name'
				opts.bankBranchId = '9ed38155-7d6f-11e3-83c3-5404a6144203'
				opts.accountNumber = '1234567890'
				opts.accessToken = 'hardToGuessKey'
	
				return transfer.createMerchantBankAccount(opts)
					.should.be.rejectedWith(Error, { message: 'Bank id can\'t be blank; ' })
			})
	
			it('#createMerchantBankAccount() has to have an accountName', function () {
				var opts = {}
	
				opts.bankId = '89076-9ed38155-7d6f-11e3-83c3-5404a6144203-adiu'
				opts.bankBranchId = '9ed38155-7d6f-11e3-83c3-5404a6144203'
				opts.accountNumber = '1234567890'
				opts.accessToken = 'hardToGuessKey'
	
				return transfer.createMerchantBankAccount(opts)
					.should.be.rejectedWith(Error, { message: 'Account name can\'t be blank; ' })
			})
	
			it('#createMerchantBankAccount() has to have an accessToken', function () {
				var opts = {}
	
				opts.accountName = 'my_account_name'
				opts.bankId = '89076-9ed38155-7d6f-11e3-83c3-5404a6144203-adiu'
				opts.bankBranchId = '9ed38155-7d6f-11e3-83c3-5404a6144203'
				opts.accountNumber = '1234567890'
	
				return transfer.createMerchantBankAccount(opts)
					.should.be.rejectedWith(Error, { message: 'Access token can\'t be blank; ' })
			})
		})
	
		it('#createMerchantBankAccount()', () => {
			var opts = {}
	
			opts.accountName = 'my_account_name'
			opts.bankId = '89076-9ed38155-7d6f-11e3-83c3-5404a6144203-adiu'
			opts.bankBranchId = '9ed38155-7d6f-11e3-83c3-5404a6144203'
			opts.accountNumber = '1234567890'
			opts.accessToken = 'hardToGuessKey'
	
	
			return transfer.createMerchantBankAccount(opts).then(response => {
				expect(response).to.equal('https://api-sandbox.kopokopo.com/merchant_bank_accounts/AB443D36-3757-44C1-A1B4-29727FB3111C')
			})
		})
	})

	describe('createMerchantWallet()', function () {

		beforeEach(() => {
			nock(configs.TEST_ACCOUNT.baseUrl)
				.post('/api/'+configs.version+'/merchant_wallets')
				.reply(201, {}, response.merchantWalletLocation)
		})

		describe('createMerchantWallet() validation', function () {
			
			it('#createMerchantWallet() has to have a msisdn', function () {
				var opts = {}

				opts.network = 'Safaricom'
                opts.accessToken = 'hardToGuessKey'

				return transfer.createMerchantWallet(opts)
					.should.be.rejectedWith(Error, { message: 'Msisdn can\'t be blank; ' })
			})

			it('#createMerchantWallet() has to have a network', function () {
				var opts = {}

                opts.msisdn = '+254701234567'
                opts.accessToken = 'hardToGuessKey'

				return transfer.createMerchantWallet(opts)
					.should.be.rejectedWith(Error, { message: 'Network can\'t be blank; ' })
			})

			it('#createMerchantWallet() has to have an accessToken', function () {
				var opts = {}

				opts.network = 'Safaricom'
                opts.msisdn = '+254701234567'

				return transfer.createMerchantWallet(opts)
					.should.be.rejectedWith(Error, { message: 'Access token can\'t be blank; ' })
			})
		})

		it('#createMerchantWallet()', () => {
			var opts = {}
	
			opts.network = 'Safaricom'
			opts.msisdn = '+254701234567'
			opts.accessToken = 'hardToGuessKey'
	
			return transfer.createMerchantWallet(opts).then(response => {
				expect(response).to.equal('https://api-sandbox.kopokopo.com/merchant_wallets/AB443D36-3757-44C1-A1B4-29727FB3111C')
			})
		})
	})
	describe('settlementStatus()', function () {
		beforeEach(() => {
			nock(configs.TEST_ACCOUNT.baseUrl)
				.get('/api/'+configs.version+'/my_transfer_request_location')
				.reply(200, response.status)
		})

		describe('settlementStatus() validation', function () {
			var opts = {}

			it('#settlementStatus() cannot be empty', function () {
				return transfer.settlementStatus(opts).should.be.rejected()
			})

			it('#settlementStatus() has to have location', function () {
				var opts = {}
				opts.accessToken = 'hardToGuessKey'

				return transfer.settlementStatus(opts).should.be.rejectedWith(Error, { message: 'Location can\'t be blank; ' })
			})

			it('#settlementStatus() location has to be a string', function () {
				var opts = {}
				opts.location = 4
				opts.accessToken = 'hardToGuessKey'

				return transfer.settlementStatus(opts).should.be.rejectedWith(Error, { message: 'Location must be a string; ' })
			})

			it('#settlementStatus() has to have accessToken', function () {
				var opts = {}
				opts.location = configs.TEST_ACCOUNT.baseUrl +'/api/'+configs.version+'/my_transfer_request_location'

				return transfer.settlementStatus(opts).should.be.rejectedWith(Error, { message: 'Access token can\'t be blank; ' })
			})
		})

		it('#settlementStatus()', () => {
			var opts = {}

			opts.accessToken = 'hardToGuessKey'
			opts.location = configs.TEST_ACCOUNT.baseUrl + '/api/'+configs.version + '/my_transfer_request_location'

			return transfer.settlementStatus(opts).then(response => {
				// expect an object back
				expect(typeof response).to.equal('object')
				
				// Test result of status for the response
				expect(response.data.attributes.status).to.equal('Sent')

			})
		})
	})
})
