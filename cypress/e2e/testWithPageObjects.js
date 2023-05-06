const { onSmartTablePage } = require("../support/page_objects/smartTablePage");
const { onDatePickerPage } = require("../support/page_objects/datePickerPage");
const {
  onFormLayoutsPage,
} = require("../support/page_objects/formLayoutsPage");
const { navigateTo } = require("../support/page_objects/navigationPage");

describe("Test with page objects", () => {
  beforeEach("open app", () => {
    cy.openHomePage();
  });

  it("verify navigation across the pages", () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage;
    navigateTo.toasterPage();
    navigateTo.tooltipPage();
  });

  it.only("should submit Inline and Basic form and select tomorrow date in the calendar", () => {
    navigateTo.formLayoutsPage();
    //(name, email, checkbox)
    onFormLayoutsPage.submitInlineFormWithNameAndEmail(
      "Alekzander",
      "spamgeizer@gmail.com",
      true
    );
    onFormLayoutsPage.submitBasicFormWithNameAndEmail(
      '"spamgeizer@gmail.com"',
      "password",
      true
    );
    ///////////////////////////////////////
    navigateTo.datepickerPage();
    onDatePickerPage.selectCommonDatepickerDateFromToday(1);
    onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14);
    ///////////////////////////////////////
    navigateTo.smartTablePage();
    onSmartTablePage.modifyAgeByFirstName("Larry", "29");
    onSmartTablePage.createRecordWithFirstNameAndLastName(
      "Alekzander",
      "Ignatov"
    );
    onSmartTablePage.deleteRowByIndex(2);
  });
});
