<template>
  <div class="actionBox col" data-bs-toggle="modal" data-bs-target="#modalGainCoinHelp">
    <div>{{actionItem.action}}</div>
    <AppIcon type="action" name="perform-provision" class="icon"/>
  </div>

  <ModalDialog id="modalGainCoinHelp" :title="t('turnBot.action.gainCoin.help.title')">
    <template #body>
      <p v-html="t('turnBot.action.gainCoin.help.instruction')"></p>
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
</style>
