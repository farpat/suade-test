describe('Simple tests', () => {
  it('works when we visit the homepage', () => {
    cy.visit('/')
    cy.contains('Suade test')
  })

  it('redirects to visualization when we visit the homepage', () => {
    cy.visit('/')
    cy.reload(true)
    cy.url().should('include', '/#/visualize')
    cy.get('a.active').contains('Go to visualization')
  })

  it('displays visualization screen when we visit visualization url', () => {
    cy.visit('/#/visualize')
    cy.reload(true)
    cy.get('a.active').contains('Go to visualization')
  })

  it('displays edition screen when we visit edition url', () => {
    cy.visit('/#/edit')
    cy.reload(true)
    cy.get('a.active').contains('Go to edition')
  })
})