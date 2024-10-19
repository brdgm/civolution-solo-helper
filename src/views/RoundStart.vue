<template>
  <SideBar :navigationState="navigationState"/>

  <h1 class="mb-3">{{t('roundStart.title')}}</h1>

  <h3 v-html="t('roundStart.newCards.title')"></h3>
  <p v-html="t('roundStart.newCards.noAction')"></p>

  <h3 v-html="t('roundStart.newGoals.title')"></h3>
  <ol>
    <li v-if="isPlayerStartPlayer" v-html="t('roundStart.newGoals.playerTakeGoal')"></li>
    <li v-if="goalChip && goalChip > 4" v-html="t('roundStart.newGoals.botNoGoal')"></li>
    <li v-else-if="goalChip" v-html="t('roundStart.newGoals.botTakeGoal', {goalChip})"></li>
    <li v-else><button class="btn btn-sm btn-secondary" @click="determineGoalChip" v-html="t('roundStart.newGoals.botDetermine')"></button></li>
    <li v-if="!isPlayerStartPlayer" v-html="t('roundStart.newGoals.playerTakeGoal')"></li>
  </ol>

  <h3 v-html="t('roundStart.extraFind.title')"></h3>
  <p v-html="t('roundStart.extraFind.noAction')"></p>

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
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'
import Player from '@/services/enum/Player'

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
    const { round, startPlayer } = navigationState

    return { t, state, navigationState, round, startPlayer }
  },
  data() {
    return {
      goalChip: undefined as number|undefined
    }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.round > 1) {
        return `/round/${this.round-1}/end`
      }
      return ''
    },
    isPlayerStartPlayer() : boolean {
      return this.startPlayer == Player.PLAYER
    }
  },
  methods: {
    next() : void {
      this.$router.push(`/round/${this.round}/turn/1/${this.startPlayer}`)
    },
    determineGoalChip() : void {
      this.goalChip = rollDice(6)
    }
  }
})
</script>
