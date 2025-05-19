import "@testing-library/cypress";

describe("Complete mobile end-to-end flow with API and manual entries (names only + actions)", () => {
  const novos = [
    { nome: "Ana", novoNome: "Ana Paula" },
    { nome: "Bruno", novoNome: "Bruno Lima" },
    { nome: "Carla", novoNome: "Carla Mendes" },
  ];

  beforeEach(() => {
    cy.viewport("iphone-x");
    cy.clearLocalStorage("registros");
  });

  it("loads from API, registers users, edits only names, deletes them, and repopulates", () => {
    cy.visit("/list");
    ["Joao da Silva", "Maria Antonieta", "Luiz Souza"].forEach((nome) =>
      cy.contains(nome).should("be.visible")
    );

    novos.forEach(({ nome }, i) => {
      cy.visit("/");
      cy.findByLabelText(/Nome completo/i)
        .clear()
        .type(nome);
      cy.findByLabelText(/CPF/i).type(`1234567890${i}`);
      cy.findByLabelText(/Telefone/i).type(`1198765432${i}`);
      cy.findByLabelText(/E-mail/i).type(`${nome.toLowerCase()}@test.com`);
      cy.findByRole("button", { name: /Cadastrar/i }).click();
    });

    cy.visit("/list");
    [
      "Joao da Silva",
      "Maria Antonieta",
      "Luiz Souza",
      ...novos.map((n) => n.nome),
    ].forEach((nome) => cy.contains(nome).should("be.visible"));

    cy.get('button[title="Editar"]').eq(3).click();
    cy.get(".modal").should("be.visible");
    cy.get('input[name="nome"]').clear().type(novos[0].novoNome);
    cy.get(".modal").within(() => cy.contains("button", "Salvar").click());
    cy.contains(novos[0].novoNome).should("be.visible");

    novos.slice(1).forEach(({ novoNome }, i) => {
      const idx = i + 4;
      cy.get('button[title="Editar"]').eq(idx).click();
      cy.get(".modal").should("be.visible");
      cy.get('input[name="nome"]').clear().type(novoNome);
      cy.get(".modal").within(() => cy.contains("button", "Salvar").click());
      cy.contains(novoNome).should("be.visible");
    });

    const apiUsuarios = [
      { index: 0, novoNome: "Joao Editado Filho" },
      { index: 1, novoNome: "Maria Editada" },
      { index: 2, novoNome: "Luiz Editado" },
    ];
    apiUsuarios.forEach(({ index, novoNome }) => {
      cy.get('button[title="Editar"]').eq(index).click();
      cy.get(".modal").should("be.visible");
      cy.get('input[name="nome"]').clear().type(novoNome);
      cy.get(".modal").within(() => cy.contains("button", "Salvar").click());
      cy.contains(novoNome).should("be.visible");
    });

    [
      ...apiUsuarios.map((u) => u.novoNome),
      ...novos.map((n) => n.novoNome),
    ].forEach((nome) => {
      cy.contains(nome).should("be.visible");
      cy.get('button[title="Excluir"]').first().click();
      cy.contains(nome).should("not.exist");
    });

    cy.contains(/nenhum usuário encontrado/i).should("be.visible");

    cy.reload();
    ["Joao da Silva", "Maria Antonieta", "Luiz Souza"].forEach((nome) =>
      cy.contains(nome).should("be.visible")
    );
  });
});
