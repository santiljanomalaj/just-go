<template>
  <div>
    <gmap-map
        ref="map"
        :center="mapCenter"
        :options="{
        ...mapStyle,
        ...userViewOptions
        }"
        :zoom="3"
        style="height: 300px"
    >
      <gmap-polygon
          ref="poly"
          :geodisk="true"
          :options="polygonStyle"
          :paths="paths"
      ></gmap-polygon>

      <gmap-marker :clickable="true" :position="position"></gmap-marker>
    </gmap-map>
    <gmap-autocomplete
        v-if="autocomplete"
        class="input"
        placeholder="Enter your delivery address"
        type="text"
        :value="mapAddress"
        @place_changed="updatePlace"

    ></gmap-autocomplete>
  </div>
</template>

<script>
import { mapStyle } from '@/util/mapStyle'
import { paths } from '@/util/path'

export default {
  props: {
    autocomplete: Boolean,
    mapPosition: Object,
    mapAddress: String,
    userView: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      position: this.mapPosition || {},
      address: this.mapAddress || '',
      mapCenter: this.mapPosition || {
        lat: 33.6509984,
        lng: -117.8367399,
      },
      userViewOptions: this.userView ? {
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUI: false,
        zoomControl: false
      } : {},
      polygonStyle: {
        geodesic: true,
        strokeColor: '#3ba535',
        strokeOpacity: 1.0,
        strokeWeight: 4,
        // fillColor: '#3ba535',
        fillOpacity: 0
      },
      paths: paths,
      mapStyle: mapStyle,
    }
  },
  watch: {
    mapPosition(newVal){
      this.position = newVal
      this.mapCenter =  newVal
    },
    mapAddress(newVal){
      this.mapAddress = newVal
    }
  },
  methods: {
    updatePlace (place) {
      const polygon = new google.maps.Polygon({
        path: this.paths,
      })

      if (
          google.maps.geometry.poly.containsLocation(
              place.geometry.location,
              polygon,
          )
      ) {
        this.address = place.formatted_address
        this.updateCenter(place.geometry.location)
      } else {
        this.address = ''
      }
      this.$emit('addressUpdate', {
        address: this.address,
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        place: place,
      })
    },
    updateCenter (location) {
      this.position = {
        lat: location.lat(),
        lng: location.lng(),
      }
      this.mapCenter = {
        lat: location.lat(),
        lng: location.lng(),
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.input {
  font-size: 1.2rem;
  width: 100%;
  max-width: 768px;
  border: none;
  transition: all 0.3s;
  box-sizing: border-box;
  background: #fff;
  display: block;
  margin-inline: auto;
  padding: 1rem;
  margin-top: -80px;
  margin-bottom: 10px;
  border-radius: 8px;
  position: relative;
  z-index: 1;
  &:focus {
    outline: none;
  }

  @media (max-width: 500px) {
    padding: 1rem;
    font-size: 1.2rem;
    width: 90%;
  }
}
</style>
