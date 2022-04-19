describe("CHL-AD Page 508 Compliance Test", () => {
  it("Check a11y on CHLAD Page", () => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("CHL-AD");
    cy.checkA11yOfPage();
  });
});
