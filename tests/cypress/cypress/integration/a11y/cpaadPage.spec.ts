describe("CPA-AD Page 508 Compliance Test", () => {
  it("Check a11y on CPAAD Page", () => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("CPA-AD");
    cy.checkA11yOfPage();
  });
});
