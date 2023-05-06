function selectDayFromCurrent(days) {
  let date = new Date();
  date.setDate(date.getDate() + days);
  const futureDate = date.getDate();
  const futureMonth = date.toLocaleString("default", { month: "short" });
  const dateAssert = `${futureMonth} ${futureDate}, ${date.getFullYear()}`;

  cy.get("nb-calendar-navigation")
    .invoke("attr", "ng-reflect-date")
    .then((dateAttr) => {
      if (!dateAttr.includes(futureMonth)) {
        cy.get('[data-name="chevron-right"]').click();
        selectDayFromCurrent(days);
      } else {
        cy.get(".day-cell").not(".bounding-month").contains(futureDate).click();
      }
    });
  return dateAssert;
}
export class DatePickerPage {
  selectCommonDatepickerDateFromToday(daysFromToday) {
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        const dateAssert = selectDayFromCurrent(daysFromToday);
        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
      });
  }

  selectDatepickerWithRangeFromToday(firstDay, secondDay) {
    cy.contains("nb-card", "Datepicker With Range")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        const dateAssertFirst = selectDayFromCurrent(firstDay);
        const dateAssertSecond = selectDayFromCurrent(secondDay);
        const range = `${dateAssertFirst} - ${dateAssertSecond}`;
        cy.wrap(input).invoke("prop", "value").should("contain", range);
      });
  }
}

export const onDatePickerPage = new DatePickerPage();
