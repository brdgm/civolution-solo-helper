<template>
  <SideBar :navigationState="navigationState"/>

  <h1>
    {{t('turnPlayer.title')}}
  </h1>

  <p v-html="t('turnPlayer.takeTurn')" class="mt-4 mb-4"></p>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>
  <EndRoundButton :navigationState="navigationState" @endRound="endRound"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { Turn, useStateStore } from '@/store/state'
import SideBar from '@/components/turn/SideBar.vue'
import NavigationState from '@/util/NavigationState'
import EndRoundButton from '@/components/turn/EndRoundButton.vue'

export default defineComponent({
  name: 'TurnPlayer',
  components: {
    FooterButtons,
    SideBar,
    EndRoundButton
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, turn } = navigationState

    return { t, state, navigationState, round, turn }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.turn > 1) {
        return `/round/${this.round}/turn/${this.turn-1}/bot`
      }
      return `/round/${this.round}/start`
    }
  },
  methods: {
    saveTurn() : void {
      const turn : Turn = {
        round: this.round,
        turn: this.turn,
        player: this.navigationState.player
      }
      this.state.storeTurn(turn)
    },
    next() : void {
      this.saveTurn()
      this.$router.push(`/round/${this.round}/turn/${this.turn+1}/bot`)
    },
    endRound() : void {
      this.saveTurn()
      this.$router.push(`/round/${this.round}/end`)
    }
  }
})
</script>
