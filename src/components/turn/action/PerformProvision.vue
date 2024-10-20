<template>
  <div class="actionBox col" data-bs-toggle="modal" data-bs-target="#modalPerformProvision">
    <div class="action">
      <AppIcon type="action" name="perform-provision" class="icon"/>
    </div>
  </div>

  <ModalDialog id="modalPerformProvision" :title="t('rules.action.performProvision.title')">
    <template #body>
      <p v-html="t('rules.action.performProvision.instruction')"></p>
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
  name: 'PerformProvision',
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
