describe('Edition tests', () => {
    before(() => {
        // runs once before all tests in the block
        cy.visit('/#/edit')
    })

    it('displays all pets on first load', () => {
        cy.reload()
        cy.get('h2').should('contain', 'People table')

        cy.get('#people-table tbody tr').as('allTr').should('have.length', 50)
        cy.get('@allTr').eq(0).find('td').should('have.length', 8)

        cy.get('#people-table tbody td').should('have.length', 50 * 8)
    })

    it('displays the first person at the first row', () => {
        cy.reload()
        cy.get('#people-table tbody tr:first-child td').as('allTdOfFirstRow').should('have.length', 8)

        cy.get('@allTdOfFirstRow').eq(0).should('contain', '5d5d7ad6b0e83bc2d9d67dfb')
        cy.get('@allTdOfFirstRow').eq(1).should('contain', '28')
        cy.get('@allTdOfFirstRow').eq(2).should('contain', 'brown')
        cy.get('@allTdOfFirstRow').eq(3).should('contain', 'Stephens Townsend')
        cy.get('@allTdOfFirstRow').eq(4).should('contain', 'male')
        cy.get('@allTdOfFirstRow').eq(5).should($td => {
            expect($td.find('ul li:nth-child(1)').text()).equals('lat: 26.723281')
            expect($td.find('ul li:nth-child(2)').text()).equals('lng: 99.391104')
        })
        cy.get('@allTdOfFirstRow').eq(6).should($td => {
            expect($td.find('ul li').eq(0).text()).equals('pet: bird')
            expect($td.find('ul li').eq(1).text()).equals('fruit: apple')
        })
    })

    it('shows edit form on the first person when we click on the button in the first row', () => {
        cy.reload()
        cy.get('#people-table tbody tr:first-child button').contains('Edit').click()

        cy.get('#people-table tbody tr:first-child td').as('allTdOfFirstRow')

        cy.get('@allTdOfFirstRow').eq(0).contains('5d5d7ad6b0e83bc2d9d67dfb')
        cy.get('@allTdOfFirstRow').eq(1).should($td => expect($td.find('input')).have.value('28'))
        cy.get('@allTdOfFirstRow').eq(2).should($td => expect($td.find('select')).have.value('brown'))
        cy.get('@allTdOfFirstRow').eq(3).should($td => expect($td.find('input')).have.value('Stephens Townsend'))
        cy.get('@allTdOfFirstRow').eq(4).should($td => expect($td.find('select')).have.value('male'))
        cy.get('@allTdOfFirstRow').eq(5).should($td => {
            expect($td.find('input').eq(0)).have.value('26.723281')
            expect($td.find('input').eq(1)).have.value('99.391104')
        })
        cy.get('@allTdOfFirstRow').eq(6).should($td => {
            expect($td.find('select').eq(0)).have.value('bird')
            expect($td.find('select').eq(1)).have.value('apple')
        })
    })

    it('submit the updated informations when we click on confirm', () => {
        cy.reload()
        cy.get('#people-table tbody tr:first-child button').contains('Edit').click()

        cy.get('#people-table tbody tr:first-child td').as('allTdOfFirstRow')


        cy.get('@allTdOfFirstRow').eq(0).contains('5d5d7ad6b0e83bc2d9d67dfb')
        cy.get('@allTdOfFirstRow').eq(1).within(() => cy.get('input').clear().type('29').should('have.value', '29'))
        cy.get('@allTdOfFirstRow').eq(2).within(() => cy.get('select').select('green').should('have.value', 'green'))
        cy.get('@allTdOfFirstRow').eq(3).within(() => cy.get('input').clear().type('Patricia FARRUGIA').should('have.value', 'Patricia FARRUGIA'))
        cy.get('@allTdOfFirstRow').eq(4).within(() => cy.get('select').select('female').should('have.value', 'female'))
        cy.get('@allTdOfFirstRow').eq(5).within(() => {
            cy.get('input').eq(0).clear().type('10').should('have.value', '10')
            cy.get('input').eq(1).clear().type('20').should('have.value', '20')
        })
        cy.get('@allTdOfFirstRow').eq(6).within(() => {
            cy.get('select').eq(0).select('cat').should('have.value', 'cat')
            cy.get('select').eq(1).select('strawberry').should('have.value', 'strawberry')
        })
        cy.get('@allTdOfFirstRow').eq(7).within(() => cy.contains('Confirm').click())

        cy.get('@allTdOfFirstRow').eq(0).should('contain', '5d5d7ad6b0e83bc2d9d67dfb')
        cy.get('@allTdOfFirstRow').eq(1).should('contain', '29')
        cy.get('@allTdOfFirstRow').eq(2).should('contain', 'green')
        cy.get('@allTdOfFirstRow').eq(3).should('contain', 'Patricia FARRUGIA')
        cy.get('@allTdOfFirstRow').eq(4).should('contain', 'female')
        cy.get('@allTdOfFirstRow').eq(5).should($td => {
            expect($td.find('ul li:nth-child(1)').text()).equals('lat: 10')
            expect($td.find('ul li:nth-child(2)').text()).equals('lng: 20')
        })
        cy.get('@allTdOfFirstRow').eq(6).should($td => {
            expect($td.find('ul li').eq(0).text()).equals('pet: cat')
            expect($td.find('ul li').eq(1).text()).equals('fruit: strawberry')
        })
    })
})