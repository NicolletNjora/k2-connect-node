module.exports = {
	id: 'cac95329-9fa5-42f1-a4fc-c08af7b868fb',
	type: 'incoming_payment',
	attributes: {
		initiation_time: '2020-02-07T11:24:54.586+03:00',
      	status: 'Failed',
		event: {
			type: 'Buygoods Transaction',
			resource: null,
			errors: [
				{
					code: '501',
					description: 'Insufficient funds',
				},
			],
		},
		meta_data: {
			customer_id: '123456789',
			reference: '123456',
			notes: 'Payment for invoice 123456',
		},
		_links: {
			self: 'http://localhost:3000/api/v1/incoming_payments/31cc56ea-0ba5-4645-a0ef-82dea8c066ec',
			callback_url: 'https://webhook.site/fa3645c6-7199-426a-8efa-98e7b754babb',
		}
	}
}
