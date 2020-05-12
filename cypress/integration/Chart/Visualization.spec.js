describe('Visualization tests', () => {
  before(() => {
    // runs once before all tests in the block
    cy.visit('/#/visualize')
  })

  it('displays all pets on first load', () => {
    cy.get('h2').eq(1).contains('Step 2 : Watch all pets')
    cy.wait(500)
    cy.window().then((win) => {
      const labels = win.petRepartitionChart.data.labels
      expect(labels).to.be.an('Array')
      expect(labels[0]).equals('bird')
      expect(labels[1]).equals('cat')
      expect(labels[2]).equals('dog')
      expect(labels[3]).equals('none')

      const data = win.petRepartitionChart.data.datasets[0].data
      expect(data).to.be.an('Array')
      expect(data[0]).equals(8)
      expect(data[1]).equals(12)
      expect(data[2]).equals(15)
      expect(data[3]).equals(15)
    })
  })

  it('display pets of woman when click on men legend', () => {
    cy.get('html').click(190, 355) //click on men legend
    cy.get('h2').eq(1).contains('Step 2 : Watch all pets of women')

    cy.window().then((win) => {
      const labels = win.petRepartitionChart.data.labels
      expect(labels).to.be.an('Array')
      expect(labels[0]).equals('bird')
      expect(labels[1]).equals('cat')
      expect(labels[2]).equals('dog')
      expect(labels[3]).equals('none')

      const data = win.petRepartitionChart.data.datasets[0].data
      expect(data).to.be.an('Array')
      expect(data[0]).equals(2)
      expect(data[1]).equals(9)
      expect(data[2]).equals(3)
      expect(data[3]).equals(8)
    })
  })

  it('display pets of men when click on women legend', () => {
    cy.get('html').click(190, 355) //click on men legend
    cy.get('html').click(270, 355) //click on women legend
    cy.get('h2').eq(1).contains('Step 2 : Watch all pets of men')

    cy.window().then((win) => {
      const labels = win.petRepartitionChart.data.labels
      expect(labels).to.be.an('Array')
      expect(labels[0]).equals('bird')
      expect(labels[1]).equals('cat')
      expect(labels[2]).equals('dog')
      expect(labels[3]).equals('none')

      const data = win.petRepartitionChart.data.datasets[0].data
      expect(data).to.be.an('Array')
      expect(data[0]).equals(6)
      expect(data[1]).equals(3)
      expect(data[2]).equals(12)
      expect(data[3]).equals(7)
    })
  })

  it('display no pets when click on men legend and women legend', () => {
    cy.get('html').click(190, 355) //click on men legend
    cy.get('h2').eq(1).contains('Step 2 : Watch no pets')

    cy.window().then((win) => {
      const labels = win.petRepartitionChart.data.labels
      expect(labels).to.be.an('Array')
      expect(labels.length).equals(0)


      const data = win.petRepartitionChart.data.datasets[0].data
      expect(data).to.be.an('Array')
      expect(data.length).equals(0)
    })
  })
})