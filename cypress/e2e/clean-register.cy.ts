import "@testing-library/cypress";

describe("Complete end-to-end flow with API and manual entries", () => {
  const novos = [
    {
      nome: "Ana",
      novoNome: "Ana Paula",
      novoCpf: "98765432100",
      novoTelefone: "11999990000",
      novoEmail: "ana.paula@teste.com",
    },
    {
      nome: "Bruno",
      novoNome: "Bruno Lima",
    },
    {
      nome: "Carla",
      novoNome: "Carla Mendes",
    },
  ];

  beforeEach(() => {
    cy.clearLocalStorage("registros");
  });

  it("loads from API, registers new users, edits all entries, deletes them, and repopulates", () => {
    cy.visit("/list");
    cy.contains("Joao da Silva").should("be.visible");
    cy.contains("Maria Antonieta").should("be.visible");
    cy.contains("Luiz Souza").should("be.visible");

    novos.forEach(({ nome }, index) => {
      cy.visit("/");
      cy.findByLabelText(/Nome completo/i)
        .clear()
        .type(nome);
      cy.findByLabelText(/CPF/i).clear().type(`1234567890${index}`);
      cy.findByLabelText(/Telefone/i)
        .clear()
        .type(`1198765432${index}`);
      cy.findByLabelText(/E-mail/i)
        .clear()
        .type(`${nome.toLowerCase()}@test.com`);
      cy.findByRole("button", { name: /Cadastrar/i }).click();
    });

    cy.visit("/list");
    [
      "Joao da Silva",
      "Maria Antonieta",
      "Luiz Souza",
      ...novos.map((n) => n.nome),
    ].forEach((nome) => {
      cy.contains(nome).should("be.visible");
    });

    const primeiro = novos[0];
    cy.get('button[title="Editar"]').eq(3).click();
    cy.get(".modal").should("be.visible");
    cy.get('input[name="nome"]').clear().type(primeiro.novoNome);
    cy.get(".modal").within(() =>
      cy.contains("button", "Salvar").should("be.enabled").click()
    );
    cy.contains(primeiro.novoNome).should("be.visible");

    cy.get('button[title="Editar"]').eq(3).click();
    cy.get('input[name="cpf"]')
      .clear()
      .type(primeiro.novoCpf ?? "");
    cy.get(".modal").within(() =>
      cy.contains("button", "Salvar").should("be.enabled").click()
    );
    cy.contains(primeiro.novoCpf ?? "").should("be.visible");

    cy.get('button[title="Editar"]').eq(3).click();
    cy.get('input[name="telefone"]')
      .clear()
      .type(primeiro.novoTelefone ?? "");
    cy.get(".modal").within(() =>
      cy.contains("button", "Salvar").should("be.enabled").click()
    );
    cy.contains(primeiro.novoTelefone ?? "").should("be.visible");

    cy.get('button[title="Editar"]').eq(3).click();
    cy.get('input[name="email"]')
      .clear()
      .type(primeiro.novoEmail ?? "");
    cy.get(".modal").within(() =>
      cy.contains("button", "Salvar").should("be.enabled").click()
    );
    cy.contains(primeiro.novoEmail ?? "").should("be.visible");

    novos.slice(1).forEach(({ novoNome }, i) => {
      const idx = i + 4;
      cy.get('button[title="Editar"]').eq(idx).click();
      cy.get(".modal").should("be.visible");
      cy.get('input[name="nome"]').clear().type(novoNome);
      cy.get(".modal").within(() =>
        cy.contains("button", "Salvar").should("be.enabled").click()
      );
      cy.contains(novoNome).should("be.visible");
    });

    const apiUsuarios = [
      { index: 0, nomeAntigo: "Joao da Silva", novoNome: "Joao Editado Filho" },
      { index: 1, nomeAntigo: "Maria Antonieta", novoNome: "Maria Editada" },
      { index: 2, nomeAntigo: "Luiz Souza", novoNome: "Luiz Editado" },
    ];

    apiUsuarios.forEach(({ index, nomeAntigo, novoNome }) => {
      cy.get('button[title="Editar"]').eq(index).click();
      cy.get(".modal").should("be.visible");
      cy.get('input[name="nome"]').clear().type(novoNome);
      cy.get(".modal").within(() =>
        cy.contains("button", "Salvar").should("be.enabled").click()
      );
      cy.contains(novoNome).should("be.visible");
      cy.contains(nomeAntigo).should("not.exist");
    });

    const nomesParaExcluir = [
      "Joao Editado Filho",
      "Maria Editada",
      "Luiz Editado",
      primeiro.novoNome,
      novos[1].novoNome,
      novos[2].novoNome,
    ];

    nomesParaExcluir.forEach((nome) => {
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
