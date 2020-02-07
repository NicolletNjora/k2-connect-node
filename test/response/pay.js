module.exports.status = {
	data: {
	  id: 'cae791ae-c102-41b5-80a9-aca7595cd9dc',
	  type: 'payment',
	  attributes: {
		transaction_reference: '1581064405',
		destination: 'b966dfbf-0084-4ee0-bd25-0a5909f5ce09',
		status: 'Sent',
		origination_time: '2020-02-07T11:33:25.124+03:00',
		initiation_time: '2020-02-07T11:33:25.021+03:00',
		amount: {
		  currency: 'KES',
		  value: '20000.0'
		},
		meta_data: {
		  notes: 'Salary payment for May 2018',
		  customerId: '8675309',
		  something_else: 'Something else'
		},
		_links: {
		  callback_url: 'https://webhook.site/fa3645c6-7199-426a-8efa-98e7b754babb',
		  self: 'http://localhost:3000/api/v1/payments/cae791ae-c102-41b5-80a9-aca7595cd9dc'
		}
	  }
	}
}
module.exports.recipientsLocation = {
	location: 'https://api-sandbox.kopokopo.com/pay_recipients/c7f300c0-f1ef-4151-9bbe-005005aa3747',
	'Content-Type': 'application/json',
}
module.exports.location = {
	'Content-Type': 'application/json',
	location: 'https://api-sandbox.kopokopo.com/payments/c7f300c0-f1ef-4151-9bbe-005005aa3747',
}
