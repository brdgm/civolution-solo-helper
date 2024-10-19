<template>
  <h1>{{t('setup.title')}}</h1>

  <DifficultyLevel/>

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

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    DifficultyLevel
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

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
  ol > li {
    margin-top: 0.5rem;
  }
}
</style>
