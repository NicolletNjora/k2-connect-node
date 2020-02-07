module.exports = {
	data: {
	  id: "2a6ff2e2-cc5a-4ae1-824d-9491acb80a0d",
	  type: "transfer",
	  attributes: {
		transaction_reference: "1581063500",
		destination: "b966dfbf-0084-4ee0-bd25-0a5909f5ce09",
		status: "Sent",
		origination_time: "2020-02-07T11:18:20.783+03:00",
		initiation_time: "2020-02-07T11:18:20.768+03:00",
		amount: {
		  currency: "KES",
		  value: "20000.0"
		},
		meta_data: {
		  notes: "Salary payment for May 2018",
		  customerId: "8675309",
		  something_else: "Something else"
		},
		_links: {
		  callback_url: "https://webhook.site/fa3645c6-7199-426a-8efa-98e7b754babb",
		  self: "http://localhost:3000/api/v1/transfers/2a6ff2e2-cc5a-4ae1-824d-9491acb80a0d"
		}
	  }
	}
}
