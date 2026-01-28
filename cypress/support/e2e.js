
Cypress.Commands.add('criarBooking', (payload, options = {}) => {
	return cy.request({
		method: 'POST',
		url: '/booking',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			...options.headers,
		},
		body: payload,
		...options
	});
});

Cypress.Commands.add('criarBookingSemHeader', (payload, options = {}) => {
	return cy.request({
		method: 'POST',
		url: '/booking',
		body: payload,
		...options
	});
});
