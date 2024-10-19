<template>
  <SideBar :navigationState="navigationState"/>

  <h1 class="mb-3">{{t('roundEnd.title')}}</h1>

  <h3 v-html="t('roundEnd.sitePhase.title')"></h3>
  <p v-html="t('roundEnd.sitePhase.botNotAffected')"></p>

  <h3 v-html="t('roundEnd.feedingPhase.title')"></h3>
  <ul>
    <li v-html="t('roundEnd.feedingPhase.feedTribes.title')"></li>
    <ul>
      <li class="fst-italic">TODO: Perform 1 provision action.</li>
      <li class="fst-italic">TODO: Feed/weaken tribes.</li>
    </ul>
    <li v-html="t('roundEnd.feedingPhase.scoreStrongTribes')"></li>
  </ul>

  <h3 v-html="t('roundEnd.eventPhase.title')"></h3>
  <ul>
    <li v-html="t('roundEnd.eventPhase.adjustWeather')"></li>
    <li v-html="t('roundEnd.eventPhase.resolveEvent.title')"></li>
    <ul>
      <li class="fst-italic">TODO: Take V.I.C.I into accounts for determining your bonus.</li>
    </ul>
    <li v-html="t('roundEnd.eventPhase.scoreCategory')"></li>
    <template v-if="!isLastRound">
      <li v-html="t('roundEnd.eventPhase.startingCivilization.title')"></li>
      <ul>
        <li>
          <span class="me-2 fw-bold">
            Next start player:
          </span>
          <div class="form-check form-check-inline" v-for="player in playerOptions" :key="player">
            <label class="form-check-label fw-bold">
              <input class="form-check-input" type="radio" :value="player" v-model="nextStartPlayer" name="nextStartPlayer">
              {{t(`player.${player}`)}}
            </label>
          </div>
        </li>
      </ul>
    </template>
  </ul>

  <h3 v-html="t('roundEnd.incomePhase.title')"></h3>
  <ul>
    <li v-html="t('roundEnd.incomePhase.scoreStatues')"></li>
  </ul>

  <div v-if="nextStartPlayerMissing" class="container-fluid">
    <div class="row">
      <div class="col alert alert-info">
        {{t('roundEnd.noNextStartPlayer')}}
      </div>
    </div>
  </div>  
  <button v-else class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { Round, useStateStore } from '@/store/state'
import SideBar from '@/components/turn/SideBar.vue'
import NavigationState from '@/util/NavigationState'
import Player from '@/services/enum/Player'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

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
  data() {
    return {
      nextStartPlayer: undefined as Player|undefined
    }
  },
  computed: {
    backButtonRouteTo() : string {
      const roundData = this.state.rounds.find(item => item.round === this.round)
      if (roundData) {
        const lastTurn = roundData.turns.toSorted((a,b) => b.turn - a.turn)[0]
        if (lastTurn) {
          return `/round/${lastTurn.round}/turn/${lastTurn.turn}/${lastTurn.player}`
        }
      }
      return ''
    },
    isLastRound() : boolean {
      return this.round == 4
    },
    nextStartPlayerMissing() : boolean {
      return this.nextStartPlayer === undefined && !this.isLastRound
    },
    playerOptions() : Player[] {
      return getAllEnumValues(Player)
    }
  },
  methods: {
    next() : void {
      if (this.isLastRound) {
        this.$router.push(`/gameEnd`)
      }
      else {
        const round : Round = {
          round: this.round+1,
          startPlayer: this.nextStartPlayer ?? Player.PLAYER,
          turns: []
        }
        this.state.storeRound(round)
        this.$router.push(`/round/${this.round+1}/start`)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
ul > li {
  margin-top: 0.5rem;
}
ul > ul > li {
  margin-top: 0;
}
</style>
