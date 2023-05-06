export class FormLayoutsPage {
  submitInlineFormWithNameAndEmail(name, email, checkRememberMeBox) {
    cy.contains("nb-card", "Inline form")
      .find("form")
      .then((form) => {
        cy.wrap(form).find('[placeholder="Jane Doe"]').type(name);
        cy.wrap(form).find('[placeholder="Email"]').type(email);

        if (checkRememberMeBox) {
          cy.wrap(form).find('[type="checkbox"]').check({ force: true });
        }
        cy.wrap(form).submit();
      });
  }

  submitBasicFormWithNameAndEmail(email, password, checkMeOutBox) {
    cy.contains("nb-card", "Basic form")
      .find("form")
      .then((form) => {
        cy.wrap(form).find('[placeholder="Email"]').type(email);
        cy.wrap(form).find('[placeholder="Password"]').type(password);

        if (checkMeOutBox) {
          cy.wrap(form).find('[type="checkbox"]').check({ force: true });
        }
        cy.wrap(form).submit();
      });
  }
}

export const onFormLayoutsPage = new FormLayoutsPage();
