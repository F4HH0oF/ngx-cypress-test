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

  it("Second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[data-cy="signInButton"]');
    // cy.contains("Sign In");
    cy.contains('[status="warning"]', "Sign in");

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    // cy.contains("Horizontal form")
    //   .parents("nb-card")
    //   .find('input[type="email"]');

    //Find the element nb-card that contains "Horizontal form" and from there find the child element with type="email"
    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  it("then and wrap methods", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // cy.contains("nb-card", "Using the Grid")
    //   .find('[for="inputEmail1"]')
    //   .should("contain", "Email");
    // cy.contains("nb-card", "Using the Grid")
    //   .find('[for="inputPassword2"]')
    //   .should("contain", "Password");

    // cy.contains("nb-card", "Basic form")
    //   .find('[for="exampleInputEmail1"]')
    //   .should("contain", "Email address");
    // cy.contains("nb-card", "Basic form")
    //   .find('[for="exampleInputPassword1"]')
    //   .should("contain", "Password");

    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();

      expect(emailLabelFirst).to.equal("Email");
      expect(passwordLabelFirst).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const emailLabelSecond = secondForm
          .find('[for="exampleInputEmail1"]')
          .text();
        const passwordLabelSecond = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();

        expect(passwordLabelFirst).to.equal(passwordLabelSecond);

        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should("contain", "Password");
      });
    });
  });

  it("invoke command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // //1
    // cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

    // //2
    // cy.get('[for="exampleInputEmail1"]').then((label) => {
    //   expect(label.text()).to.equal("Email address");
    // });

    // //3
    // cy.get('[for="exampleInputEmail1"]')
    //   .invoke("text")
    //   .then((text) => expect(text).to.equal("Email address"));

    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find("span.custom-checkbox")
      .invoke("attr", "class")
      // .should("contain", "checked")
      .then((classValue) => expect(classValue).to.contain("checked"));
  });

  it("radio buttons", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should("be.checked");

        cy.wrap(radioButtons).eq(1).check({ force: true }).should("be.checked");

        cy.wrap(radioButtons).first().should("not.be.checked");

        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("checkboxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    cy.get('[type="checkbox"]').eq(0).check({ force: true });
    cy.get('[type="checkbox"]').eq(1).click({ force: true });
  });
});

it("insert property", () => {
  cy.visit("/");
  cy.contains("Forms").click();
  cy.contains("Datepicker").click();

  cy.contains("nb-card", "Common Datepicker")
    .find('input[placeholder="Form Picker"]')
    .then((input) => {
      cy.wrap(input).click();
      cy.get("nb-calendar-day-picker").contains("2").click();
      cy.wrap(input).invoke("prop", "value").should("contain", "May 2, 2023");
    });
});

it("web datepicker", () => {
  cy.visit("/");
  cy.contains("Forms").click();
  cy.contains("Datepicker").click();

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
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
            .contains(futureDate)
            .click();
        }
      });
    return dateAssert;
  }

  cy.contains("nb-card", "Common Datepicker")
    .find("input")
    .then((input) => {
      cy.wrap(input).click();
      const dateAssert = selectDayFromCurrent(300);
      cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
    });
});

it.only("lsits and dropdowns", () => {
  cy.visit("/");

  //1
  // cy.get("nav nb-select").click();
  // cy.get(".options-list").contains("Dark").click();
  // cy.get("nav nb-select").should("contain", "Dark");
  // cy.get("nb-layout-header nav").should(
  //   "have.css",
  //   "background-color",
  //   "rgb(34, 43, 69)"
  // );

  //2
  cy.get("nav nb-select").then((dropdown) => {
    cy.wrap(dropdown).click();
    cy.get(".options-list nb-option").each((option, idx) => {
      const optionText = option.text().trim();

      const colors = {
        Light: "rgb(255, 255, 255)",
        Dark: "rgb(34, 43, 69)",
        Cosmic: "rgb(50, 50, 89)",
        Corporate: "rgb(255, 255, 255)",
      };

      cy.wrap(option).click();
      cy.get("nav nb-select").should("contain", optionText);
      cy.get("nb-layout-header nav").should(
        "have.css",
        "background-color",
        colors[optionText]
      );

      if (idx < 3) cy.wrap(dropdown).click();
    });
  });
});
