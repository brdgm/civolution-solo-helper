<template>
  <div class="actionList container-fluid m-0">
    <div class="row mt-3 mb-3" v-for="(actionItem,index) in botActions.items" :key="index">
      <component :is="actionItem.action" :actionItem="actionItem"
          @addAction="(actionItem:ActionItem,before:boolean)=>addAction(actionItem,index,before)"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import BotActions, { ActionItem } from '@/services/BotActions'
import AdvanceFavor from './action/AdvanceFavor.vue'
import AdvanceScoringCategory from './action/AdvanceScoringCategory.vue'
import GainActivationDie from './action/GainActivationDie.vue'
import GainFateDie from './action/GainFateDie.vue'
import GainVp from './action/GainVp.vue'
import PerformMigration from './action/PerformMigration.vue'
import PerformProcreation from './action/PerformProcreation.vue'
import PerformProvision from './action/PerformProvision.vue'
import PlaceEvolutionMarker from './action/PlaceEvolutionMarker.vue'
import PlaceHuntingToken from './action/PlaceHuntingToken.vue'
import PlaceProsperityMarker from './action/PlaceProsperityMarker.vue'
import PlaceStatue from './action/PlaceStatue.vue'
import RemoveCard from './action/RemoveCard.vue'
import RevealSites from './action/RevealSites.vue'

export default defineComponent({
  name: 'BotActionsDisplay',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  components: {
    AdvanceFavor,
    AdvanceScoringCategory,
    GainActivationDie,
    GainFateDie,
    GainVp,
    PerformMigration,
    PerformProcreation,
    PerformProvision,
    PlaceEvolutionMarker,
    PlaceHuntingToken,
    PlaceProsperityMarker,
    PlaceStatue,
    RemoveCard,
    RevealSites
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    botActions: {
      type: BotActions,
      required: true
    }
  },
  methods: {
    addAction(actionItem: ActionItem, currentIndex: number, before: boolean) {
      this.botActions.addAction(actionItem, currentIndex, before)
    }
  }
})
</script>

<style lang="scss" scoped>
.actionList {
  max-width: 38rem;
  padding-right: 10rem;
}
</style>
