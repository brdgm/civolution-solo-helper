<template>
  <div>
    <ol>
      <li v-html="t('rules.priority.encampment.freeFire')"></li>
      <li v-html="t('rules.priority.encampment.freeAny')"></li>
      <li v-html="t('rules.priority.encampment.playerFire')"></li>
      <li v-html="t('rules.priority.encampment.playerWeakAny')"></li>
      <li v-html="t('rules.priority.encampment.playerStrongAny')"></li>
      <li v-html="t('rules.priority.encampment.botStrongFire')"></li>
      <li v-html="t('rules.priority.encampment.botStrongAny')"></li>
      <li v-html="t('rules.priority.encampment.botWeakFire')"></li>
      <li v-html="t('rules.priority.encampment.botWeakAny')"></li>
    </ol>
    <p class="fst-italic" v-html="t('rules.priority.encampment.notWeakened')"></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'EncampmentPriority',
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
