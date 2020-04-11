describe('Edition tests', () => {
    before(() => {
        // runs once before all tests in the block
        cy.visit('/#/edit');
    })

    it('displays all pets on first load', () => {
        cy.reload();
        cy.get('h2').contains('People table');

        cy.get('#people-table tbody tr').as('allTr').should('have.length', 50);

        cy.get('@allTr').eq(0).find('td').should('have.length', 8);
    });

    it('displays the first person at the first row', () => {
        cy.reload();
        cy.get('#people-table tbody tr:first-child td').as('allTd').should('have.length', 8);

        cy.get('@allTd').eq(0).contains('5d5d7ad6b0e83bc2d9d67dfb');
        cy.get('@allTd').eq(1).contains('28');
        cy.get('@allTd').eq(2).contains('brown');
        cy.get('@allTd').eq(3).contains('Stephens Townsend');
        cy.get('@allTd').eq(4).contains('male');
        cy.get('#people-table tbody tr:first-child td:nth-child(6) li').eq(0).contains('lat: 26.723281');
        cy.get('#people-table tbody tr:first-child td:nth-child(6) li').eq(1).contains('lng: 99.391104');
        cy.get('#people-table tbody tr:first-child td:nth-child(7) li').eq(0).contains('pet: bird');
        cy.get('#people-table tbody tr:first-child td:nth-child(7) li').eq(1).contains('fruit: apple');
    });

    it('shows edit form on the first person when we click on the button in the first row', () => {
        cy.reload();
        cy.get('#people-table tbody tr:first-child button').contains('Edit').click();

        cy.get('#people-table tbody tr:first-child td').eq(0).contains('5d5d7ad6b0e83bc2d9d67dfb');
        cy.get('#people-table tbody tr:first-child td:nth-child(2) input').should('have.value', '28');
        cy.get('#people-table tbody tr:first-child td:nth-child(3) select').should('have.value', 'brown');
        cy.get('#people-table tbody tr:first-child td:nth-child(4) input').should('have.value', 'Stephens Townsend');
        cy.get('#people-table tbody tr:first-child td:nth-child(5) select').should('have.value', 'male');
        cy.get('#people-table tbody tr:first-child td:nth-child(6) input').eq(0).should('have.value', '26.723281');
        cy.get('#people-table tbody tr:first-child td:nth-child(6) input').eq(1).should('have.value', '99.391104');
        cy.get('#people-table tbody tr:first-child td:nth-child(7) select').eq(0).should('have.value', 'bird');
        cy.get('#people-table tbody tr:first-child td:nth-child(7) select').eq(1).should('have.value', 'apple');
    });

    it('submit the updated informations when we click on confirm', () => {
        cy.reload();
        cy.get('#people-table tbody tr:first-child button').contains('Edit').click();

        cy.get('#people-table tbody tr:first-child td:nth-child(2) input').clear().type('29').should('have.value', '29');
        cy.get('#people-table tbody tr:first-child td:nth-child(3) select').select('green').should('have.value', 'green');
        cy.get('#people-table tbody tr:first-child td:nth-child(4) input').clear().type('Patricia FARRUGIA').should('have.value', 'Patricia FARRUGIA');
        cy.get('#people-table tbody tr:first-child td:nth-child(5) select').select('female').should('have.value', 'female');
        cy.get('#people-table tbody tr:first-child td:nth-child(6) input').eq(0).clear().type('10').should('have.value', '10');
        cy.get('#people-table tbody tr:first-child td:nth-child(6) input').eq(1).clear().type('20').should('have.value', '20');
        cy.get('#people-table tbody tr:first-child td:nth-child(7) select').eq(0).select('cat').should('have.value', 'cat');
        cy.get('#people-table tbody tr:first-child td:nth-child(7) select').eq(1).select('strawberry').should('have.value', 'strawberry');

        cy.get('#people-table tbody tr:first-child button').contains('Confirm').click();

        cy.get('#people-table tbody tr:first-child td').eq(0).contains('5d5d7ad6b0e83bc2d9d67dfb');
        cy.get('#people-table tbody tr:first-child td:nth-child(2) input').should('have.value', '29');
        cy.get('#people-table tbody tr:first-child td:nth-child(3) select').should('have.value', 'green');
        cy.get('#people-table tbody tr:first-child td:nth-child(4) input').should('have.value', 'Patricia FARRUGIA');
        cy.get('#people-table tbody tr:first-child td:nth-child(5) select').should('have.value', 'female');
        cy.get('#people-table tbody tr:first-child td:nth-child(6) input').eq(0).should('have.value', '10');
        cy.get('#people-table tbody tr:first-child td:nth-child(6) input').eq(1).should('have.value', '20');
        cy.get('#people-table tbody tr:first-child td:nth-child(7) select').eq(0).should('have.value', 'cat');
        cy.get('#people-table tbody tr:first-child td:nth-child(7) select').eq(1).should('have.value', 'strawberry');
    });
});