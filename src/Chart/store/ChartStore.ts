import Vuex from 'vuex'
import {IFilter, IPerson} from "../../type"
import Vue from "vue"
import Requestor from "@farpat/api"

Vue.use(Vuex)

interface IState {
    allPeople: Array<IPerson>,
    currentPeople: Array<IPerson>,
    currentFilters: IFilter
}

const state: IState = {
    allPeople: [],
    currentPeople: [],
    currentFilters: {women: true, men: true}
}

export default new Vuex.Store({
    strict: true,
    state,
    actions: {
        async loadApplication(context) {
            context.commit('loadApplication', await Requestor.newRequest().get('https://updates.suade.org/files/people.json'))
        }
    },
    getters: {
        isTheFilterActivated(state: IState) {
            return (filter: string) => {
                return state.currentFilters[filter]
            }
        }
    },
    mutations: {
        loadApplication(state: IState, people: IPerson[]) {
            state.allPeople = people
            state.currentPeople = people
            state.currentFilters = {women: true, men: true}
        },
        addFilter(state: IState, filter: string) {
            state.currentFilters[filter] = true
        },
        removeFilter(state: IState, filter: string) {
            state.currentFilters[filter] = false
        },
        applyFilter(state: IState, filter: IFilter) {
            state.currentPeople = state.allPeople.filter(person => (filter.women && person.gender === 'female') || (filter.men && person.gender === 'male'))
        },
        updatePerson(state: IState, currentPerson: IPerson) {
            state.allPeople = state.allPeople.map(person => person._id === currentPerson._id ? currentPerson : person)
        }
    }
})