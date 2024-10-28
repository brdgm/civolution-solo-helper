<template>
  <h1>{{t('setup.title')}}</h1>

  <DifficultyLevel/>
  <ScoringTiles/>
  <RandomMap/>

  <button class="btn btn-primary btn-lg mt-4" @click="setupBot()">
    {{t('setupBot.title')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import ScoringTiles from '@/components/setup/ScoringTiles.vue'
import RandomMap from '@/components/setup/RandomMap.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    DifficultyLevel,
    ScoringTiles,
    RandomMap
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    return { t, state }
  },
  methods: {
    setupBot() : void {
      this.$router.push('/setupBot')
    }
  }
})
</script>
