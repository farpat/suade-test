<template>
    <tr>
        <td>
            <span>{{ person._id }}</span>
        </td>
        <td>
            <span v-show="!isEditing">{{ person.age }}</span>
            <input v-show="isEditing" type="number" min="0" v-model="currentPerson.age" class="form-control">
        </td>
        <td>
            <span v-show="!isEditing">{{ person.eyeColor }}</span>
            <select v-model="currentPerson.eyeColor" class="form-control" v-show="isEditing">
                <option value="blue">Blue</option>
                <option value="brown">Brown</option>
                <option value="green">Green</option>
            </select>
        </td>
        <td>
            <span v-show="!isEditing">{{ person.name }}</span>
            <input v-show="isEditing" type="text" v-model="currentPerson.name" class="form-control">
        </td>
        <td>
            <span v-show="!isEditing">{{ person.gender }}</span>
            <select v-model="currentPerson.gender" class="form-control" v-show="isEditing">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </td>
        <td>
            <ul v-show="!isEditing">
                <li>lat: {{ person.location.latitude }}</li>
                <li>lng: {{ person.location.longitude }}</li>
            </ul>

            <div class="row">
                <input v-show="isEditing" type="text" v-model="currentPerson.location.latitude"
                       class="form-control">
            </div>
            <div class="row">
                <input v-show="isEditing" type="text" v-model="currentPerson.location.longitude"
                       class="form-control">
            </div>
        </td>
        <td>
            <ul v-show="!isEditing">
                <li>pet: {{ person.preferences.pet }}</li>
                <li>fruit: {{ person.preferences.fruit }}</li>
            </ul>

            <div class="row">
                <select v-model="currentPerson.preferences.pet" class="form-control" v-show="isEditing">
                    <option value="bird">Bird</option>
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                    <option value="none">"None"</option>
                </select>
            </div>
            <div class="row">
                <select v-model="currentPerson.preferences.fruit" class="form-control" v-show="isEditing">
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="mango">Mango</option>
                    <option value="strawberry">Strawberry</option>
                </select>
            </div>
        </td>
        <td>
            <button v-show="!isEditing" @click="edit" class="btn btn-secondary">Edit</button>
            <button v-show="isEditing" @click="confirm" class="btn btn-secondary">Confirm</button>
            <button v-show="isEditing" @click="cancel" class="btn btn-link">Cancel</button>
        </td>
    </tr>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator"
    import {IPerson} from "../../../type"

    @Component
    export default class PersonRow extends Vue {
        @Prop({required: true}) readonly person!: IPerson
        isEditing = false
        currentPerson = this.person

        private edit() {
            this.isEditing = true
        }

        private cancel() {
            this.isEditing = false
            this.currentPerson = this.person
        }

        private confirm() {
            this.isEditing = false

            this.$store.commit('updatePerson', this.currentPerson)
            this.$store.commit('applyFilter', this.$store.state.currentFilters)
        }
    }
</script>