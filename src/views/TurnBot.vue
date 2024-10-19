<template>
  <SideBar :navigationState="navigationState"/>

  <h1>
    <img src="@/assets/vici.webp" class="vici" alt=""/>
    {{t('turnBot.title')}}
  </h1>

  <button class="btn btn-primary btn-lg mt-4 me-2" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import { useRoute } from 'vue-router'
import SideBar from '@/components/turn/SideBar.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    SideBar
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
        return `/round/${this.round}/turn/${this.turn-1}/player`
      }
      return `/round/${this.round}/start`
    }
  },
  methods: {
    next() : void {
      this.$router.push(`/round/${this.round}/turn/${this.turn+1}/player`)
    }
  }
})
</script>

<style lang="scss" scoped>
.vici {
  height: 3rem;
  margin-top: -0.5rem;
}
</style>
