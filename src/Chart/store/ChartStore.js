import Requestor from "@farpat/api";
import Vue from "vue";

/**
 * @property {Object} state
 * @property {Person[]} state.currentPeople
 * @property {Object} state.currentFilters ({men: true, women: true})
 */
class ChartStore {
    constructor() {
        this.state = {
            allPeople:      [],
            currentPeople:  [],
            currentFilters: {men: true, women: true},
        };
    }

    /**
     * Load people
     * @returns {Promise<Any>}
     */
    loadPeople() {
        return Requestor.newRequest()
            .get('https://updates.suade.org/files/people.json')
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    Vue.set(this.state, 'currentPeople', data);
                    Vue.set(this.state, 'allPeople', data);
                }
            });
    }

    checkFilter(filter) {
        if (filter !== 'men' && filter !== 'women') {
            throw `The value of << filter >> is ${filter} and it's not supported`;
        }
    }

    /**
     * Add filter from state
     * @param {String} filter "men" or "women"
     */
    addInCurrentFilters(filter) {
        this.checkFilter(filter);
        Vue.set(this.state.currentFilters, filter, true);
    }

    /**
     * Remove filter from state
     * @param {String} filter "men" or "women"
     */
    removeInCurrentFilters(filter) {
        this.checkFilter(filter);
        Vue.set(this.state.currentFilters, filter, false);
    }

    /**
     * Update people to display from filters
     * @param {Object} filters
     */
    updatePeople(filters) {
        Vue.set(this.state, 'currentPeople', this.state.allPeople.filter(person => {
            return (filters.women === true && person.gender === 'female') || (filters.men === true && person.gender === 'male');
        }));
    }

    /**
     * Update a person
     * @param currentPerson
     */
    updatePerson(currentPerson) {
        Vue.set(this.state, 'allPeople', this.state.allPeople.map(person => {
            return person._id === currentPerson.id ? currentPerson : person;
        }));
    }
}

export default new ChartStore();
