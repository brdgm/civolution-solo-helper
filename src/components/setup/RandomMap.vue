<template>
  <h3 class="mt-4 mb-3">{{t('setup.randomMap.title')}}</h3>

  <p v-if="!show">
    <button class="btn btn-sm btn-outline-secondary" @click="showRandomizer">{{t('setup.randomMap.show')}}</button>
  </p>
  <div v-if="show">
    <div class="map">
      <div v-for="item of tilePlacements" :key="item.tile.name"
          :style="{position:'absolute',left:`${item.x*100}px`,top:`${item.y*100}px`}">
        <div class="letter">{{item.tile.name}}</div>
        <AppIcon type="map-tile" :name="item.tile.name"
            :style="{width:'100px','transform-origin':'50px 50px',transform:getTransform(item)}"/>
      </div>
    </div>

    <div class="d-flex mt-2">
      <button class="btn btn-sm btn-outline-secondary" @click="randomizeMapTiles">{{t('setup.randomMap.randomize')}}</button>
      <div class="form-check ms-2">
        <label class="form-check-label small">
          <input class="form-check-input" type="checkbox" :value="true" v-model="state.setup.mapFirstPlay" @change="randomizeMapTiles">
          {{t('setup.randomMap.firstPlay')}}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import { useStateStore } from '@/store/state';
import MapRandomizer, { Rotation, TilePlacement } from '@/services/MapRandomizer';

export default defineComponent({
  name: 'RandomMap',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const tilePlacements = ref([] as readonly TilePlacement[])
    const randomizeMapTiles = function() {
      const mapRandomizer = new MapRandomizer(state.setup.mapFirstPlay ?? true)
      mapRandomizer.randomize()
      tilePlacements.value = mapRandomizer.tiles
    }

    return { t, state, tilePlacements, randomizeMapTiles }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    showRandomizer() : void {
      this.randomizeMapTiles()
      this.show = true
    },
    getTransform(tilePlacement: TilePlacement) : string {
      let x = 0
      let y = 0
      if (tilePlacement.rotation == Rotation.RIGHT) {
        x = 100
      }
      else if (tilePlacement.rotation == Rotation.DOWN) {
        y = 100
      }
      return `translate(${x}px,${y}px) rotate(${tilePlacement.rotation}deg)`
    }
  }
})
</script>

<style lang="scss" scoped>
.map {
  position: relative;
  border: 1px solid #aaa;
  width: 501px;
  max-width: 100%;
  height: 301px;
  overflow-x: auto;
  overflow-y: hidden;
  border-radius: 10px;
  background-color: #eee;
  .letter {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    z-index: 100;
    font-size: 20px;
    font-weight: bold;
    text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;
  }
}
</style>
