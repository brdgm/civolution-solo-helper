<template>
  <div class="actionBox col" data-bs-toggle="modal" data-bs-target="#modalRemoveCard">
    <div class="action">
      <AppIcon v-if="actionItem.scoringCategory" type="remove-card" :name="actionItem.scoringCategory" class="icon"/>
    </div>
  </div>

  <ModalDialog id="modalRemoveCard" :title="t('rules.action.removeCard.title')">
    <template #body>
      <p v-html="t('rules.action.removeCard.instruction')"></p>
      <p v-html="t('rules.action.removeCard.refill')"></p>
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
  name: 'RemoveCard',
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
  height: 3.5rem;
}
</style>
