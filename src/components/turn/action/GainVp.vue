<template>
  <div class="actionBox col" data-bs-toggle="modal" data-bs-target="#modalGainVp">
    <div class="action">
      <AppIcon type="action" name="gain-vp" class="icon"/>
      <div class="plus">+</div>
      <div class="value">{{actionItem.count}}</div>
    </div>
  </div>

  <ModalDialog id="modalGainVp" :title="t('rules.action.gainVp.title')">
    <template #body>
      <p v-html="t('rules.action.gainVp.instruction')"></p>
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
  name: 'GainVp',
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
.action {
  position: relative;
  .icon {
    height: 3.5rem;
  }
  .plus, .value {
    position: absolute;
    color: #fedf12;
    font-weight: bold;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }
  .plus {
    top: 6px;
    left: 0px;
    font-size: 1.25rem;
  }
  .value {
    top: -6px;
    left: 15px;
    font-size: 2.2rem;
  }
}
</style>
