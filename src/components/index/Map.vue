<template>
  <div class="map-container">
    <h3 class="title">We serve in the area</h3>
    <div class="map-inner">
      <gmap-map
          ref="map"
          :center="mapCenter"
          :options="{
            ...mapStyle,
          }"
          :zoom="3"
          style="height: 508px"
      >
        <gmap-polygon
            ref="poly"
            :geodisk="true"
            :options="polygonStyle"
            :paths="paths"
        ></gmap-polygon>

        <gmap-marker :clickable="true" :position="position"></gmap-marker>
      </gmap-map>
    </div>
  </div>
</template>

<script>
import { greyMapStyle } from '@/util/mapStyle'
import { paths } from '@/util/path'

export default {
  data () {
    return {
      position: this.mapPosition || {},
      address: this.mapAddress || '',
      mapCenter: this.mapPosition || {
        lat: 33.6509984,
        lng: -117.8367399,
      },
      polygonStyle: {
        geodesic: true,
        strokeColor: '#3ba535',
        strokeOpacity: 1.0,
        strokeWeight: 4,
        // fillColor: '#3ba535',
        fillOpacity: 0
      },
      paths: paths,
      mapStyle: greyMapStyle,
    }
  },
}
</script>

<style lang="scss" scoped>
.map-container {
  padding: 50px 0 70px;

  h3.title {
    font-style: normal;
    font-weight: bold;
    font-size: 60px;
    line-height: 70px;
    color: #000000;
    margin-bottom: 40px;
    text-align: center;
  }

  .map-inner {
    width: 795px;
    height: 508px;
    margin: 0 auto;
  }

  @media screen and (max-width: 767px) {
    padding: 50px 15px;
    
    h3.title {
      font-size: 45px;
      line-height: 110%;
    }

    .map-inner {
        width: 100%;
        height: 508px;
    }
  }
}
</style>