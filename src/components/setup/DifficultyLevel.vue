<template>
  <h3 class="mt-4 mb-3">{{t('setup.difficultyLevel.title')}}</h3>

  <div class="row">
    <div class="col-3 col-sm-2 col-md-1 text-end">
      <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.easy')}}</label>
    </div>
    <div class="col-6 col-sm-8 col-md-5">
      <input type="range" class="form-range" min="1" max="5" id="difficultyLevel"
          :value="difficultyLevel" @input="updateDifficultyLevel($event)">
    </div>
    <div class="col-3 col-sm-2 col-md-1">
      <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.hard')}}</label>
    </div>
  </div>  
  <div class="row">
    <div class="col-6 offset-3 col-sm-8 offset-sm-2 col-md-5 offset-md-1">
      <i>
        {{t(`difficultyLevel.${difficultyLevel}`)}}
      </i>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'DifficultyLevel',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const difficultyLevel = ref(state.setup.difficultyLevel)

    return { t, state, difficultyLevel }
  },
  methods: {
    updateDifficultyLevel(event: Event) {
      this.difficultyLevel = Number.parseInt((event.target as HTMLInputElement).value)
      this.state.setup.difficultyLevel = this.difficultyLevel
    }
  }
})
</script>
