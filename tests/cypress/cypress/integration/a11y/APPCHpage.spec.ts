describe("APP-CH Page 508 Compliance Test", () => {
  it("Check a11y on APP-CH Page", () => {
    cy.login();
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("APP-CH");
    cy.checkA11yOfPage();
  });
});
