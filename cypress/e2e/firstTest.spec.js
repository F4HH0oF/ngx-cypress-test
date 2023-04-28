describe("First test suite", () => {
  it("First test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //by Tag name
    cy.get("input");

    //by Id
    cy.get("#inputEmail");

    //by Class name
    cy.get(".input-full-width");

    //by Attribute name
    cy.get("[placeholder]");

    //by Attribute name and value
    cy.get('[placeholder="Email"]');

    //by Class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by Tag name and attribute with value
    cy.get('input[placeholder="Email"]');

    //by 2 different attributes
    cy.get('[placeholder="Email"][type="email"]');

    //by tag name, attribute with value, ID and class name
    cy.get('input[placeholder="Email"]#inputEmail.input-full-width');

    //The recomended way
    cy.get('[data-cy="imputEmail1"]');
  });
});
