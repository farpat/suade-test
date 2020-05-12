<template>
    <div class="d-flex justify-content-center align-items-center">
        <div id="map" style="width: 1200px; height: 675px;"></div>
    </div>
</template>

<script lang="ts">
    import * as L from "leaflet"
    import "leaflet/dist/leaflet.css"
    import {Component, Vue} from "vue-property-decorator"
    import {IPerson} from "../../../type"

    @Component
    export default class MapComponent extends Vue {
        $positions?: Array<[number, number]>
        $map?: L.Map

        private mounted() {
            this.mountMap()
            this.$positions = []
            for (let person of this.$store.state.currentPeople) {
                this.addCircle(person)
            }
            this.centerMap()
        }

        private mountMap(): void {
            this.$map = L.map(<HTMLElement>this.$el.querySelector('#map'))

            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox/streets-v11',
                minZoom: 3
            }).addTo(this.$map)
        }

        private addCircle(person: IPerson) {
            let position: [number, number] = [person.location.latitude, person.location.longitude]

            if (this.$positions) {
                this.$positions.push(position)
            }

            L.circle(position, {
                color: person.gender === 'female' ? '#ff00ff' : '#0000ff',
                fillColor: person.gender === 'female' ? '#ff64ff' : '#6464ff',
                fillOpacity: 0.5,
                radius: 200000
            })
                .addTo(<L.Map>this.$map)
                .bindPopup(`<strong>${person.name}</strong>`)
        }

        private centerMap() {
            if (this.$map && this.$positions) {
                this.$map.fitBounds(this.$positions)
            }
        }
    }
</script>