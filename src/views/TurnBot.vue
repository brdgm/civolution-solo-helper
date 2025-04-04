<template>
  <SideBar :navigationState="navigationState" :botActions="botActions"/>

  <h1>
    <img src="@/assets/vici.webp" class="vici" alt=""/>
    {{t('turnBot.title')}}
  </h1>

  <template v-if="isReset">
    <p class="mt-4">
      <AppIcon name="phase-indicator" class="phase-indicator"/>
      <span v-html="t('turnBot.reset')"></span>
    </p>
    <p v-html="t('turnBot.resetAdvance')"></p>
  </template>
  <template v-else>
    <BotActionsDisplay :navigationState="navigationState" :botActions="botActions"/>
  </template>

  <div v-if="botActions.isRemoveAttributeChip" class="container-fluid">
    <div class="row">
      <div class="col alert alert-warning" v-html="t('turnBot.removeAttributeChip', {chip:removeChipNumber})"></div>
    </div>
  </div>  
  <div v-if="botActions.isRemoveIncomeChip" class="container-fluid">
    <div class="row">
      <div class="col alert alert-warning" v-html="t('turnBot.removeIncomeChip', {chip:removeChipNumber})"></div>
    </div>
  </div>  

  <button class="btn btn-primary btn-lg mt-4 me-2" @click="next()">
    {{t('action.next')}}
  </button>
  <EndRoundButton :navigationState="navigationState" @endRound="endRound"/>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { Turn, useStateStore } from '@/store/state'
import { useRoute } from 'vue-router'
import SideBar from '@/components/turn/SideBar.vue'
import NavigationState from '@/util/NavigationState'
import EndRoundButton from '@/components/turn/EndRoundButton.vue'
import DebugInfo from '@/components/turn/DebugInfo.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import BotActionsDisplay from '@/components/turn/BotActionsDisplay.vue'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    SideBar,
    EndRoundButton,
    DebugInfo,
    AppIcon,
    BotActionsDisplay
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, turn, botActions } = navigationState

    return { t, state, navigationState, round, turn, botActions }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.turn > 1) {
        return `/round/${this.round}/turn/${this.turn-1}/player`
      }
      return `/round/${this.round}/start`
    },
    isReset() : boolean {
      return this.botActions.isReset
    },
    removeChipNumber() : number {
      const removeChipRoll = rollDice(6)
      return Math.ceil(removeChipRoll / 2)
    }
  },
  methods: {
    saveTurn() : void {
      const { player, cardDeck, blueDotCount, redDotCount, actionRoll } = this.navigationState
      const { evolutionCount, prosperityCount } = this.botActions
      const turn : Turn = {
        round: this.round,
        turn: this.turn,
        player,
        botPersistence: {
          cardDeck: cardDeck.toPersistence(),
          evolutionCount,
          prosperityCount,
          blueDotCount,
          redDotCount,
          actionRoll
        }
      }
      if (this.isReset && turn.botPersistence) {
        turn.botPersistence.reset = true
      }
      this.state.storeTurn(turn)
    },
    next() : void {
      this.saveTurn()
      this.$router.push(`/round/${this.round}/turn/${this.turn+1}/player`)
    },
    endRound() : void {
      this.saveTurn()
      this.$router.push(`/round/${this.round}/end`)
    }
  }
})
</script>

<style lang="scss" scoped>
.vici {
  height: 3rem;
  margin-top: -0.5rem;
}
.phase-indicator {
  width: 2.5rem;
  margin-right: 0.5rem;
}
</style>
