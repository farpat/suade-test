import Requestor from "@farpat/api"
import Vue from "vue"

export interface Person {
    _id: number,
    age: number,
    eyeColor: string,
    name: string,
    gender: string,
    location: { latitude: number, longitude: number },
    preferences: { pet: string, fruit: string }
}

export interface Filter {
    men: boolean,
    women: boolean
}

class ChartStore {
    state: {
        allPeople: Array<Person>,
        currentPeople: Array<Person>,
        currentFilters: Filter,
    }

    constructor() {
        this.state = {
            allPeople: [],
            currentPeople: [],
            currentFilters: {men: true, women: true}
        }
    }

    /**
     * Load people
     */
    loadPeople(): Promise<any> {
        return Requestor.newRequest()
            .get('https://updates.suade.org/files/people.json')
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    Vue.set(this.state, 'currentPeople', data)
                    Vue.set(this.state, 'allPeople', data)
                }
            })
    }

    checkFilter(filter: string) {
        if (filter !== 'men' && filter !== 'women') {
            throw `The value of << filter >> is ${filter} and it's not supported`
        }
    }

    /**
     * Add filter from state
     * @param {string} filter "men" or "women"
     */
    addInCurrentFilters(filter: string) {
        this.checkFilter(filter)
        Vue.set(this.state.currentFilters, filter, true)
    }

    /**
     * Remove filter from state
     */
    removeInCurrentFilters(filter: string) {
        this.checkFilter(filter)
        Vue.set(this.state.currentFilters, filter, false)
    }

    /**
     * Update people to display from filters
     */
    updatePeople(filter: Filter): void {
        Vue.set(this.state, 'currentPeople', this.state.allPeople.filter(person =>
            (filter.women && person.gender === 'female') || (filter.men && person.gender === 'male')
        ))
    }

    /**
     * Update a person
     */
    updatePerson(currentPerson: Person) {
        Vue.set(this.state, 'allPeople', this.state.allPeople.map(person =>
            person._id === currentPerson._id ? currentPerson : person
        ))
    }
}

export default new ChartStore()
