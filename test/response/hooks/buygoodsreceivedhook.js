module.exports = {
	id: 'cac95329-9fa5-42f1-a4fc-c08af7b868fb',
	topic: 'buygoods_transaction_received',
	created_at: '2017-01-20T22:45:12.790Z',
	event: {
		type: 'Buygoods Transaction',
		resource: {
			id: "ResourceID",
			reference: 'KKPPLLMMNN',
			origination_time: '2017-01-20T22:45:12.790Z',
			sender_msisdn: '+2549703119050',
			amount: 3000,
			currency: 'KES',
			till_number: '111222',
			system: 'Lipa Na M-PESA',
			status: 'Received',
			sender_first_name: 'John',
			sender_middle_name: 'O',
			sender_last_name: 'Doe',
		},
	},
	_links: {
		self: 'https://api-sandbox.kopokopo.com/events/cac95329-9fa5-42f1-a4fc-c08af7b868fb',
		resource: 'https://api-sandbox.kopokopo.com/buygoods_transaction/cdb5f11f-62df-e611-80ee-0aa34a9b2388',
	},
}
