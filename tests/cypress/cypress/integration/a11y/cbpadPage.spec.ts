describe("CBP-AD Page 508 Compliance Test", () => {
  it("Check a11y on CBPAD Page", () => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("CBP-AD");
    cy.checkA11yOfPage();
  });
});
