describe('Registration test', function () {
  it('Finds the content Register button and clicks it', function () {
    cy.visit('http://localhost:3000/#/home')
    cy.contains('Register').click()
    cy.get(':nth-child(1) > :nth-child(1) > .MuiFormControl-root-102 > .MuiInputBase-root-137 > .MuiInputBase-input-147').type('1086420')
    cy.get(':nth-child(2) > .MuiFormControl-root-102 > .MuiInputBase-root-137 > .MuiInputBase-input-147').type('Walter')
    cy.get(':nth-child(3) > .MuiFormControl-root-102 > .MuiInputBase-root-137 > .MuiInputBase-input-147').type('Benson')
    cy.get(':nth-child(4) > .MuiFormControl-root-102 > .MuiInputBase-root-137 > .MuiInputBase-input-147').type('BensonFarm')
    cy.get(':nth-child(5) > .MuiFormControl-root-102 > .MuiInputBase-root-137 > .MuiInputBase-input-147').type('BensonFarm')
    cy.get(':nth-child(6) > .MuiFormControl-root-102 > .MuiInputBase-root-137 > .MuiInputBase-input-147').type('waltkbenson@gmail.com')
    cy.get(':nth-child(7) > :nth-child(1) > .MuiFormControl-root-102 > .MuiInputBase-root-137 > .MuiInputBase-input-147').type('Benson Farm')
    cy.get(':nth-child(8) > :nth-child(1) > .MuiFormControl-root-102 > .MuiInputBase-root-137 > .MuiInputBase-input-147').type('Some Road')
    cy.get(':nth-child(9) > :nth-child(1) > .MuiFormControl-root-102 > .MuiInputBase-root-137 > .MuiInputBase-input-147').type('Somewhere')
    cy.get(':nth-child(10) > :nth-child(1) > .MuiFormControl-root-102 > .MuiInputBase-root-137 > .MuiInputBase-input-147').type('Ohio')
    cy.get(':nth-child(11) > :nth-child(1) > .MuiFormControl-root-102 > .MuiInputBase-root-137 > .MuiInputBase-input-147').type('55555')
    cy.contains('Register').click()




  })
})