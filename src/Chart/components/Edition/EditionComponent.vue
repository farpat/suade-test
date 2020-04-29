<template>
    <section>
        <h2>People table</h2>
        <table id="people-table" class="table table-striped">
            <thead>
            <tr>
                <th>#</th>
                <th>Age</th>
                <th>Eye color</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Location</th>
                <th>Preferences</th>
                <th>(actions)</th>
            </tr>
            </thead>
            <tbody>
            <PersonRow :key="person._id" :person="person" v-for="person in state.allPeople"></PersonRow>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
    import ChartStore from "../../store/ChartStore"
    import PersonRow from "./PersonRowComponent.vue"
    import {Component, Vue} from "vue-property-decorator"

    @Component({
        components: {PersonRow}
    })
    export default class EditionComponent extends Vue {
        state = ChartStore.state
    }
</script>
