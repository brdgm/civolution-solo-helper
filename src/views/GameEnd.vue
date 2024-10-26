<template>
  <SideBar :navigationState="navigationState"/>

  <h1 class="mb-3">{{t('gameEnd.title')}}</h1>

  <h3 v-html="t('gameEnd.finalScoring.title')"></h3>
  <ul>
    <li v-html="t('gameEnd.finalScoring.categories')"></li>
    <li v-html="t('gameEnd.finalScoring.consoleStages')"></li>
    <li v-html="t('gameEnd.finalScoring.consoleResearchCards')"></li>
  </ul>

  <p v-html="t('gameEnd.winCondition')"></p>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
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
  name: 'GameEnd',
  components: {
    FooterButtons,
    SideBar
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)

    return { t, state, navigationState }
  },
  computed: {
    backButtonRouteTo() : string {
      return '/round/4/end'
    }
  }
})
</script>
