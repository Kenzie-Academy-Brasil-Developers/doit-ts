context("Register", () => {
  it("Creates a new user", () => {
    cy.viewport(1440, 900);

    cy.visit("http://localhost:3000/signup");

    cy.contains("Crie sua conta");

    cy.get("#name").type("Ivan");
    cy.get("#email").type("ivan@kenzie.com");
    cy.get("#password").type("123456");
    cy.get("#confirm_password").type("123456");

    cy.intercept("POST", "/register", {
      statusCode: 201,
      body: {
        name: "Ivan",
        email: "ivan@kenzie.com",
        id: 1,
      },
    }).as("new-user");

    cy.get(".chakra-button").click();

    cy.get(".chakra-modal__footer > .chakra-button").click();
  });
});

context("Login", () => {
  it("Login with the created user", () => {
    cy.viewport(1440, 900);
    cy.get("#email").type("ivan@kenzie.com");
    cy.get("#password").type("123456");

    cy.intercept("POST", "/login", {
      statusCode: 200,
      body: {
        user: {
          name: "Ivan",
          email: "ivan@kenzie.com",
          id: 10,
        },
        accessToken: "TokenDeAcessoLegalzão",
      },
    }).as("login");

    cy.get(".css-1be3ipm").click();

    cy.intercept("GET", "/tasks?userId=10", {
      statusCode: 200,
      body: [],
    }).as("tasks");
  });
});

context("New task", () => {
  it("Creates a new task", () => {
    cy.viewport(1440, 900);

    cy.get(".chakra-button").click();

    cy.get("#title").type("Criar testes com o cypress");
    cy.get("#description").type(
      "Devo criar uma bateria de testes com o cypress que irá percorrer nossa aplicação."
    );

    cy.intercept("POST", "/tasks", {
      statusCode: 200,
      body: {
        title: "Criar testes com o cypress",
        description:
          "Devo criar uma bateria de testes com o cypress que irá percorrer nossa aplicação.",
        userId: 1,
        completed: false,
        id: 2,
      },
    }).as("new-task");

    cy.get(".chakra-modal__footer > .chakra-button").click();

    cy.contains("Criar testes com o cypress").should("exist");
  });
});

context("Handle task", () => {
  it("Mark our task as finished", () => {
    cy.viewport(1440, 900);

    cy.intercept("PATCH", "/tasks/2", {
      statusCode: 200,
      body: {
        title: "Criar testes com o cypress",
        description:
          "Devo criar uma bateria de testes com o cypress que irá percorrer nossa aplicação.",
        userId: 1,
        completed: true,
        id: 2,
      },
    }).as("finish-task");

    cy.get(".chakra-stack > :nth-child(2)").click();

    cy.wait("@finish-task");
  });

  it("Delete our task", () => {
    cy.viewport(1440, 900);

    cy.intercept("DELETE", "/tasks/2", {
      statusCode: 200,
    }).as("delete-task");

    cy.get(".chakra-stack > :nth-child(1)").click();

    cy.contains("Criar testes com o cypress").should("not.exist");
  });
});

context("Logout", () => {
  it("Logout from the application", () => {
    cy.viewport(1440, 900);

    cy.get(".css-1r8tu9u").click();

    cy.get(".css-i3omck").click();

    cy.contains("Bem vindo de volta!").should("exist");
  });
});
