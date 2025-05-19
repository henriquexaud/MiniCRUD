/// <reference types="cypress" />

describe("CustomForm – Validation and submit button state", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });

  const fields = [
    {
      selector: "#nome",
      invalidValue: "Jo",
      invalidMsg: "Nome deve ter pelo menos 3 caracteres",
      validValue: "João da Silva",
    },
    {
      selector: "#cpf",
      invalidValue: "1234567",
      invalidMsg: "CPF deve conter exatamente 11 números",
      validValue: "12345678901",
    },
    {
      selector: "#telefone",
      invalidValue: "987",
      invalidMsg: "Telefone deve conter 10 ou 11 dígitos",
      validValue: "11999999999",
    },
    {
      selector: "#email",
      invalidValue: "email_errado",
      invalidMsg: "Email inválido",
      validValue: "joao@teste.com",
    },
  ];

  it("disables the submit button and shows an error for each invalid field", () => {
    fields.forEach(({ selector, invalidValue, invalidMsg }) => {
      fields.forEach((f) => {
        if (f.selector !== selector) {
          cy.get(f.selector).clear();
        }
      });
      cy.get(selector).clear().type(invalidValue).blur();
      cy.contains(invalidMsg).should("be.visible");
      cy.get("button[type=submit]").should("be.disabled");
    });
  });

  it("disables the submit button when fields are empty", () => {
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("enables the submit button when all fields are valid", () => {
    fields.forEach(({ selector, validValue }) => {
      cy.get(selector).clear().type(validValue).blur();
    });
    fields.forEach(({ invalidMsg }) => {
      cy.contains(invalidMsg).should("not.exist");
    });
    cy.get("button[type=submit]").should("be.enabled");
  });
});
