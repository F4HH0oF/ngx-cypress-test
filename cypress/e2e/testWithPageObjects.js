const { navigateTo } = require("../support/page_objects/navigationPage");

describe("Test with page objects", () => {
  beforeEach("open app", () => {
    cy.visit("/");
  });

  it("verify navigation across the pages", () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage;
    navigateTo.toasterPage();
    navigateTo.tooltipPage();
  });
});
