<template>
  <div class="actionList container-fluid m-0">
    <div class="row mt-3 mb-3" v-for="(actionItem,index) in botActions.items" :key="index">
      <component :is="actionItem.action" :actionItem="actionItem"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import BotActions from '@/services/BotActions'
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
  }
})
</script>

<style lang="scss">
.actionList {
  max-width: 30rem;
  padding-right: 10rem;
}
.actionBox {
  color: white;
  background-color: #2e4950;
  border-radius: 0.5rem;
  filter: drop-shadow(0.1rem 0.1rem 0.2rem #888);
  padding: 1rem;
  cursor: pointer;
  background-image: url('@/assets/icons/help-semi-transparent.png');
  background-repeat: no-repeat;
  background-position: right 5px top 5px;
  background-size: 1.25rem;
}
</style>
