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
    <p v-html="t('rules.priority.encampment.notWeakened')"></p>
    <p>
      <span v-html="t('rules.priority.encampment.migrationCheck')"></span><br/>
      <button class="btn btn-sm btn-secondary mt-1" @click="performMigration()" data-bs-dismiss="modal">{{t('rules.priority.encampment.performMigration')}}</button>
    </p>
  </div>
</template>

<script lang="ts">
import { ActionItem } from '@/services/BotActions'
import Action from '@/services/enum/Action'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'EncampmentPriority',
  emits: {
    addAction: (_actionItem: ActionItem) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  methods: {
    performMigration() {
      this.$emit('addAction', { action: Action.PERFORM_MIGRATION })
    }
  }
})
</script>
