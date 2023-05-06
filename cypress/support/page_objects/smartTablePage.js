export class SmartTable {
  modifyAgeByFirstName(name, age) {
    cy.get("tbody")
      .contains("tr", name)
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[ng-reflect-name="age"]').clear().type(age);
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", age);
      });
  }
  createRecordWithFirstNameAndLastName(firstName, lastName) {
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName);
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName);
        cy.get(".nb-checkmark").click();
      });

    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableCol) => {
        cy.wrap(tableCol).eq(2).should("contain", "Alekzander");
      });
  }
  deleteRowByIndex(index) {
    const stub = cy.stub();
    cy.on("window:confirm", stub);
    cy.get("tbody tr").eq(index).find(".nb-trash").click();
    cy.on("window:confirm", () => true);
  }
}

export const onSmartTablePage = new SmartTable();
