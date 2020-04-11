<template>
    <div class="d-flex justify-content-center align-items-center">
        <div id="map" style="width: 1200px; height: 675px;"></div>
    </div>
</template>

<script>
    import "leaflet";
    import "leaflet/dist/leaflet.css";
    import ChartStore from "../../store/ChartStore";

    export default {
        mounted() {
            this.mountMap();
            for (let person of ChartStore.state.currentPeople) {
                this.addCircle(person);
            }
            this.centerMap();
        },
        methods: {
            mountMap() {
                this.$map = L.map(this.$el);

                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                                     '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    id:          'mapbox/streets-v11',
                    minZoom:     3,
                }).addTo(this.$map);

                this.positions = [];
            },

            addCircle(person) {
                let position = [person.location.latitude, person.location.longitude];

                this.positions.push(position);

                L.circle(position, {
                    color:       person.gender === 'female' ? '#ff00ff' : '#0000ff',
                    fillColor:   person.gender === 'female' ? '#ff64ff' : '#6464ff',
                    fillOpacity: 0.5,
                    radius:      200000,
                })
                    .addTo(this.$map)
                    .bindPopup(`<strong>${person.name}</strong>`);
            },

            centerMap() {
                this.$map.fitBounds(this.positions);
            }
        }
    }
</script>