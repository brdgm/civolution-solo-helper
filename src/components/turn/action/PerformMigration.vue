<template>
  <div class="actionBox col" data-bs-toggle="modal" data-bs-target="#modalPerformMigration">
    <div class="action">
      <AppIcon type="action" name="perform-migration" class="icon"/>
    </div>
  </div>

  <ModalDialog id="modalPerformMigration" :title="t('rules.action.performMigration.title')">
    <template #body>
      <p v-html="t('rules.action.performMigration.instruction')"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { ActionItem } from '@/services/BotActions'
import AppIcon from '../../structure/AppIcon.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'PerformMigration',
  components: {
    AppIcon,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    actionItem: {
      type: Object as PropType<ActionItem>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 3rem;
}
</style>
