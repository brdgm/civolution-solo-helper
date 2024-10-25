<template>
  <SideBar :navigationState="navigationState"/>

  <h1 class="mb-3">{{t('roundEnd.title')}}</h1>

  <h3 v-html="t('roundEnd.sitePhase.title')"></h3>
  <p v-html="t('roundEnd.sitePhase.botNotAffected')"></p>

  <h3 v-html="t('roundEnd.feedingPhase.title')"></h3>
  <ul>
    <li v-html="t('roundEnd.feedingPhase.feedTribes.title')"></li>
    <ul>
      <li class="actionList">
        <PerformProvision :actionItem="provisionActionItem"/>
      </li>
      <li v-html="t('roundEnd.feedingPhase.feedTribes.oneProvisioningMarker')"></li>
      <EncampmentPriority :feedingPriority="true"/>
      <li v-html="t('roundEnd.feedingPhase.feedTribes.twoProvisioningMarkers')"></li>
      <li v-html="t('roundEnd.feedingPhase.feedTribes.weakenTribes')"></li>
    </ul>
    <li v-html="t('roundEnd.feedingPhase.scoreStrongTribes')"></li>
  </ul>

  <h3 v-html="t('roundEnd.eventPhase.title')"></h3>
  <ul>
    <li v-html="t('roundEnd.eventPhase.adjustWeather')"></li>
    <li v-html="t('roundEnd.eventPhase.resolveEvent.title')"></li>
    <ul>
      <li>
        <span v-html="t('roundEnd.eventPhase.resolveEvent.compareBot')"></span><br/>
        <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#eventMajorityModal">{{t('roundEnd.eventPhase.resolveEvent.eventsDetails')}}</button>
      </li>
    </ul>
    <li v-html="t('roundEnd.eventPhase.scoreCategory')"></li>
    <template v-if="!isLastRound">
      <li v-html="t('roundEnd.eventPhase.startingCivilization.title')"></li>
      <ul>
        <li>
          <span class="me-2 fw-bold">{{t('roundEnd.eventPhase.startingCivilization.nextStartPlayer')}}</span>
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

  <ModalDialog id="eventMajorityModal" :title="t('roundEnd.eventPhase.resolveEvent.majorityModal.title')">
    <template #body>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">{{t('roundEnd.eventPhase.resolveEvent.majorityModal.event')}}</th>
            <th scope="col">{{t('roundEnd.eventPhase.resolveEvent.majorityModal.achievement')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="eventAchievement of eventAchievements" :key="eventAchievement.event">
            <td>{{eventAchievement.event}}</td>
            <td>{{eventAchievement.count}}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </ModalDialog>

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
import { ActionItem } from '@/services/BotActions'
import Action from '@/services/enum/Action'
import { createTerritoryRoll } from '@/util/TerritoryRoll'
import PerformProvision from '@/components/turn/action/PerformProvision.vue'
import EncampmentPriority from '@/components/turn/EncampmentPriority.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import getEventAchievements, { EventAchievement } from '@/util/getEventAchievements'

export default defineComponent({
  name: 'RoundStart',
  components: {
    FooterButtons,
    SideBar,
    PerformProvision,
    EncampmentPriority,
    ModalDialog
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
    },
    provisionActionItem() : ActionItem {
      return {
        action: Action.PERFORM_PROVISION,
        territoryRoll: createTerritoryRoll()
      }
    },
    eventAchievements() : EventAchievement[] {
      return getEventAchievements(this.navigationState.prosperityCount)
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
.actionList {
  max-width: 38rem;
  padding-right: 10rem;
  list-style: none;
  margin-left: -20px;
  margin-top: 5px;
  margin-bottom: 5px;
  @media (max-width: 600px) {
    padding-right: 2rem;
  }
}
</style>
