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

    <button class="btn btn-sm btn-outline-secondary me-2" data-bs-toggle="modal" data-bs-target="#scoringTilesModal">{{t('setup.scoringTiles.select')}}</button>
    <button class="btn btn-sm btn-outline-secondary me-2" @click="randomizeScoringTiles">{{t('setup.scoringTiles.randomize')}}</button>
  </div>

  <ModalDialog id="scoringTilesModal" :title="t('setup.scoringTiles.title')" :size-lg="true">
    <template #body>
      {{t('setup.scoringTiles.available')}}<br/>
      <AppIcon v-for="tile of scoringTilesAllWithoutSelection" :key="tile" type="scoring-tile" :name="tile"
          class="tile select" @click="selectScoringTile(tile)"/>
      <hr/>
      {{t('setup.scoringTiles.selected')}}<br/>
      <template v-for="(tile,index) of scoringTilesSelection" :key="tile">
        <span v-if="index == 3" class="separator">|</span>
        <AppIcon  type="scoring-tile" :name="tile" class="tile select" @click="deselectScoringTile(tile)"/>
      </template>
      <p v-if="scoringTilesSelection.length == 0" class="fst-italic">
        {{t('setup.scoringTiles.none')}}
      </p>
    </template>
    <template #footer>
      <button class="btn btn-outline-secondary" @click="scoringTilesSelection=[]">{{t('action.reset')}}</button>
      <button class="btn btn-success" data-bs-dismiss="modal" :disabled="scoringTilesSelection.length != 7" @click="setScoringRoundTileSelection">{{t('setup.scoringTiles.select')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import ScoringCategory from '@/services/enum/ScoringCategory'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import { shuffle } from 'lodash'
import AppIcon from '../structure/AppIcon.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'ScoringTiles',
  components: {
    AppIcon,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const allScoringTiles = getAllEnumValues(ScoringCategory)
    const scoringTilesSelection = ref([] as ScoringCategory[])

    const randomizeScoringTiles = function() {
      const allScoringTilesShuffled = shuffle(allScoringTiles)
      state.setup.finalScoringTiles = allScoringTilesShuffled.slice(0, 3)
      state.setup.eraScoringTiles = allScoringTilesShuffled.slice(3, 7)
      scoringTilesSelection.value = []
    }
    if (state.setup.eraScoringTiles.length === 0 || state.setup.finalScoringTiles.length === 0) {
      randomizeScoringTiles()
    }

    return { t, state, allScoringTiles, scoringTilesSelection, randomizeScoringTiles }
  },
  computed: {
    eraScoringTiles() {
      return this.state.setup.eraScoringTiles
    },
    finalScoringTiles() {
      return this.state.setup.finalScoringTiles
    },
    scoringTilesAllWithoutSelection() : ScoringCategory[] {
      return this.allScoringTiles.filter(tile => !this.scoringTilesSelection.includes(tile))
    }
  },
  methods: {
    selectScoringTile(tile: ScoringCategory) : void {
      if (this.scoringTilesSelection.length < 7) {
        this.scoringTilesSelection.push(tile)
      }
    },
    deselectScoringTile(tile: ScoringCategory) : void {
      this.scoringTilesSelection = this.scoringTilesSelection.filter(t => t != tile)
    },
    setScoringRoundTileSelection() : void {
      this.state.setup.finalScoringTiles = this.scoringTilesSelection.slice(0, 3)
      this.state.setup.eraScoringTiles = this.scoringTilesSelection.slice(3, 7)
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
#scoringTilesModal {
  .tile {
    box-shadow: unset;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    filter: drop-shadow(2px 2px 2px #888);
    &.select {
      cursor: pointer;
    }
  }
  .separator {
    font-size: 30px;
    margin-left: 0.5rem;
    margin-right: 1rem;
  }
}
</style>
