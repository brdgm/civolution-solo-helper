<template>
  <div class="sidebar">
    {{t('sideBar.round', {round:navigationState.round})}}
    <h6 class="mt-2">{{t('player.bot')}}</h6>
    <div class="count">
      {{botActions?.evolutionCount ?? navigationState.evolutionCount}}
      <AppIcon type="action" name="place-evolution-marker" class="icon"/>
    </div>
    <div class="count">
      {{botActions?.prosperityCount ?? navigationState.prosperityCount}}
      <AppIcon type="action" name="place-prosperity-marker" class="icon"/>
    </div>
    <div class="mt-2">
      <div class="dotCount blue">
        <template v-for="index in navigationState.blueDotCount" :key="index">■</template>
      </div>
      <div class="dotCount red">
        <template v-for="index in navigationState.redDotCount" :key="index">■</template>
      </div>
    </div>
    <div class="cards">
      {{t('sideBar.cards')}} {{ playedCards }} / {{ totalCards}}<br/>
      <span v-if="resetCount > 0">{{t('sideBar.resetCount', {count:resetCount}, resetCount)}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import AppIcon from '../structure/AppIcon.vue'
import BotActions from '@/services/BotActions'

export default defineComponent({
  name: 'SideBar',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    botActions: {
      type: BotActions,
      required: false
    }
  },
  computed: {
    playedCards() : number {
      return this.navigationState.cardDeck.discard.length
    },
    totalCards() : number {
      return this.navigationState.cardDeck.pile.length + this.navigationState.cardDeck.discard.length
    },
    resetCount() : number {
      return this.navigationState.resetCount
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 145px;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-right: -12px;
  padding: 15px 10px 15px 15px;
  background-color: #ddd;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  @media (max-width: 600px) {
    font-size: 0.9rem;
    width: 120px;
  }
}
.count {
  display: inline-block;
  margin-right: 0.5rem;
  .icon {
    max-height: 1.5rem;
    max-width: 1.75rem;
    @media (max-width: 600px) {
      max-height: 1.25rem;
      max-width: 1.5rem;
    }
  }
}
.dotCount {
  line-height: 0.9rem;
  &.blue {
    color: #00c;
  }
  &.red {
    color: #c00;
  }
}
.cards {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
}
</style>
