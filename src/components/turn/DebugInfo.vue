<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <p class="debug">
      <b>cardDeck</b>: {{cardDeck.toPersistence()}}<br/>
      <b>currentCard</b>: {{cardDeck.currentCard}}<br/>
      <b>rolls</b>: action={{navigationState.actionRoll}}, territory={{navigationState.territoryRoll}}, beacon={{navigationState.beaconRoll}}, removeChip={{navigationState.removeChipRoll}},
        <b>difficultyLevel</b>: {{navigationState.difficultyLevel}}<br/>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStateStore } from '@/store/state'
import CardDeck from '@/services/CardDeck'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'DebugInfo',
  setup() {
    const state = useStateStore()
    return { state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    cardDeck() : CardDeck {
      return this.navigationState.cardDeck
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
p.debug, ul.debug {
  margin: 0;
}
</style>
