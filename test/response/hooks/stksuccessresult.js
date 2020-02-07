module.exports = {
	id: 'cac95329-9fa5-42f1-a4fc-c08af7b868fb',
	type: 'incoming_payment',
	attributes: {
		initiation_time: '2020-02-07T11:24:54.586+03:00',
      	status: 'Received',
		event: {
			type: 'Buygoods Transaction',
			resource: {
				transaction_reference: 'KKPPLLMMNN',
				origination_time: '2017-01-20T22:45:12.790Z',
				sender_msisdn: '+2549703119050',
				amount: 20000,
				currency: 'KES',
				till_identifier: '111222',
				system: 'Lipa Na M-PESA',
				status: 'Received',
				sender_first_name: 'Nicollet',
				sender_middle_name: 'N',
				sender_last_name: 'Njora',
			},
			errors: [],
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
