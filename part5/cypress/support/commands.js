// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/api/login",
    body: {
      username: username,
      password: password,
    },
    failOnStatusCode: false,
  }).then((response) => {
    window.localStorage.setItem("user", JSON.stringify(response.body))
    cy.visit("http://localhost:3000")
  })
})

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.contains("create new blog").click()
  cy.get(".input-title").type(title)
  cy.get(".input-author").type(author)
  cy.get(".input-url").type(url)
  cy.get(".btn-submit").click()
})
