<template>
  <h3 class="mt-4 mb-3">{{t('setup.scoringTiles.title')}}</h3>

  <div>
    <div class="finalScoring">
      <img class="board" src="@/assets/setup/final-scoring.webp" alt=""/>
      <AppIcon v-for="scoringTile in finalScoringTiles" type="scoring-tile-points" :name="scoringTile" :key="scoringTile"
          class="tile" :class="{[scoringTile]:true}"/>
    </div>
    <div class="eraScoring">
      <img class="board" src="@/assets/setup/era-scoring.webp" alt=""/>
      <AppIcon v-for="(scoringTile,index) in eraScoringTiles" type="scoring-tile" :name="scoringTile" :key="scoringTile"
          class="tile" :class="{[`item${index}`]:true}"/>
    </div>

    <button class="btn btn-sm btn-outline-secondary" @click="randomizeScoringTiles">{{t('setup.scoringTiles.randomize')}}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import ScoringCategory from '@/services/enum/ScoringCategory'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import { shuffle } from 'lodash'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'ScoringTiles',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const randomizeScoringTiles = function() {
      const allScoringTiles = shuffle(getAllEnumValues(ScoringCategory))
      state.setup.eraScoringTiles = allScoringTiles.slice(0, 4)
      state.setup.finalScoringTiles = allScoringTiles.slice(4, 7)
    }
    if (state.setup.eraScoringTiles.length === 0 || state.setup.finalScoringTiles.length === 0) {
      randomizeScoringTiles()
    }

    return { t, state, randomizeScoringTiles }
  },
  computed: {
    eraScoringTiles() {
      return this.state.setup.eraScoringTiles
    },
    finalScoringTiles() {
      return this.state.setup.finalScoringTiles
    }
  }
})
</script>

<style lang="scss" scoped>
.finalScoring {
  position: relative;
  overflow-x: auto;
  margin-bottom: 10px;
  .board {
    width: 500px;
  }
  .tile {
    position: absolute;
    top: 55px;
    &.technology {
      left: 19px;
    }
    &.prestige {      
      left: 72px;
    }
    &.knowledge {
      left: 125px;
    }
    &.construction {
      left: 179px;
    }
    &.culture {      
      left: 231px;
    }
    &.evolution {      
      left: 293px;
    }
    &.prosperity {
      left: 345px;
    }
    &.population {
      left: 398px;
    }
    &.expansion {
      left: 450px;
    }
  }
}
.eraScoring {
  position: relative;
  overflow-x: auto;
  margin-bottom: 10px;
  .board {
    width: 320px;
  }
  .tile {
    position: absolute;
    top: 30px;
    &.item0 {
      left: 71px;
    }
    &.item1 {
      left: 135px;
    }
    &.item2 {
      left: 199px;
    }
    &.item3 {
      left: 262px;
    }
  }
}
.tile {
  height: 47px;
  box-shadow: 0 0 5px 5px rgb(255 0 0 / 100%);
}
</style>
