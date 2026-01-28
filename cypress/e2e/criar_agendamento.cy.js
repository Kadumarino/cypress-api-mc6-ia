const { payloadCompleto, payloadSemAdditionalNeeds, payloadAdditionalNeedsVazio } = require('../fixtures/bookingPayloads');

describe("Booking API - POST /booking", () => {
  it("deve criar um agendamento com sucesso (payload completo)", () => {
    const payload = payloadCompleto();
    cy.criarBooking(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("bookingid");
      expect(response.body).to.have.property("booking");
      expect(response.body.booking).to.include({
        firstname: payload.firstname,
        lastname: payload.lastname,
        totalprice: payload.totalprice,
        depositpaid: payload.depositpaid,
        additionalneeds: payload.additionalneeds,
      });
      expect(response.body.booking.bookingdates).to.deep.equal(payload.bookingdates);
    });
  });

  it("deve criar agendamento com additionalneeds vazio", () => {
    const payload = payloadAdditionalNeedsVazio();
    cy.criarBooking(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.booking.additionalneeds).to.eq("");
    });
  });

  it("deve criar agendamento sem additionalneeds", () => {
    const payload = payloadSemAdditionalNeeds();
    cy.criarBooking(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.booking).to.not.have.property("additionalneeds");
    });
  });

  it("deve retornar erro ao omitir firstname", () => {
    const { firstname, ...payload } = payloadCompleto();
    cy.criarBooking(payload, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });

  it("deve retornar erro ao omitir lastname", () => {
    const { lastname, ...payload } = payloadCompleto();
    cy.criarBooking(payload, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });

  it("deve retornar erro ao enviar totalprice como string", () => {
    const payload = { ...payloadCompleto(), totalprice: "cem" };
    cy.criarBooking(payload, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });

  it("deve retornar erro ao enviar depositpaid como string", () => {
    const payload = { ...payloadCompleto(), depositpaid: "true" };
    cy.criarBooking(payload, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });

  it("deve retornar erro ao enviar datas inválidas", () => {
    const payload = {
      ...payloadCompleto(),
      bookingdates: { checkin: "data-invalida", checkout: "outra-invalida" },
    };
    cy.criarBooking(payload, { failOnStatusCode: false }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
    });
  });


  it("deve validar tipos dos campos na resposta", () => {
    cy.criarBooking(payloadCompleto()).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.bookingid).to.be.a("number");
      expect(response.body.booking).to.be.an("object");
      expect(response.body.booking.firstname).to.be.a("string");
      expect(response.body.booking.lastname).to.be.a("string");
      expect(response.body.booking.totalprice).to.be.a("number");
      expect(response.body.booking.depositpaid).to.be.a("boolean");
      expect(response.body.booking.bookingdates).to.be.an("object");
      expect(response.body.booking.bookingdates.checkin).to.be.a("string");
      expect(response.body.booking.bookingdates.checkout).to.be.a("string");
    });
  });

  it("deve criar um agendamento válido com dados aleatórios", () => {
    const payload = payloadCompleto();
    cy.criarBooking(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("bookingid");
      expect(response.body).to.have.property("booking");
      expect(response.body.booking).to.include({
        firstname: payload.firstname,
        lastname: payload.lastname,
        totalprice: payload.totalprice,
        depositpaid: payload.depositpaid,
        additionalneeds: payload.additionalneeds,
      });
      expect(response.body.booking.bookingdates).to.deep.equal(payload.bookingdates);
    });
  });
  // Exemplo de uso do custom command para request sem header (caso queira testar sem Content-Type)
  // it("deve retornar erro ao omitir Content-Type", () => {
  //   cy.criarBookingSemHeader(defaultPayload, { failOnStatusCode: false }).then((response) => {
  //     expect(response.status).to.be.oneOf([400, 415, 500]); //
  //   });
  // });
});
