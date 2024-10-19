<template>
  <SideBar :navigationState="navigationState"/>

  <h1 class="mb-3">{{t('roundEnd.title')}}</h1>

  <h3>5) Site phase</h3>

  <h3>6) Feeding phase</h3>

  <h3>7) Event phase</h3>

  <h3>8) Income phase</h3>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import SideBar from '@/components/turn/SideBar.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'RoundStart',
  components: {
    FooterButtons,
    SideBar
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round } = navigationState

    return { t, state, navigationState, round }
  },
  computed: {
    backButtonRouteTo() : string {
      const roundData = this.state.rounds.find(item => item.round === this.round)
      if (roundData) {
        const lastTurn = roundData.turns.toSorted((a,b) => a.turn - b.turn)[0]
        if (lastTurn) {
          return `/round/${lastTurn.round}/turn/${lastTurn.turn}/${lastTurn.player}`
        }
      }
      return ''
    }
  },
  methods: {
    next() : void {
      if (this.round < 4) {
        this.$router.push(`/round/${this.round+1}/start`)
      }
      else {
        this.$router.push(`/gameEnd`)
      }
    }
  }
})
</script>
