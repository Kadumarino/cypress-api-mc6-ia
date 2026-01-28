// Fixtures centralizada para payloads dos testes, usando faker para dados dinâmicos
const { faker } = require('@faker-js/faker');

function payloadCompleto() {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 50, max: 1000 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: faker.date.anytime().toISOString().slice(0, 10),
      checkout: faker.date.anytime().toISOString().slice(0, 10),
    },
    additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'None', 'Late checkout'])
  };
}

function payloadSemAdditionalNeeds() {
  const payload = payloadCompleto();
  delete payload.additionalneeds;
  return payload;
}

function payloadAdditionalNeedsVazio() {
  const payload = payloadCompleto();
  payload.additionalneeds = '';
  return payload;
}

module.exports = {
  payloadCompleto,
  payloadSemAdditionalNeeds,
  payloadAdditionalNeedsVazio,
};
