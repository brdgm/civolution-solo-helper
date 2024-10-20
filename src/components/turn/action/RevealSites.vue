<template>
  <div class="actionBox col" data-bs-toggle="modal" data-bs-target="#modalRevealSites">
    <div class="action">
      <AppIcon type="action" name="reveal-sites" class="icon"/>
    </div>
  </div>

  <ModalDialog id="modalRevealSites" :title="t('rules.action.revealSites.title')">
    <template #body>
      <p v-html="t('rules.action.revealSites.instruction')"></p>
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
  name: 'RevealSites',
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
