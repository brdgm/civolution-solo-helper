<template>
  <ActionBox :instructionTitle="t('rules.action.gainVp.title')">
    <template #action>
      <div class="action">
        <AppIcon type="action" name="gain-vp" class="icon"/>
        <div class="plus">+</div>
        <div class="value">{{actionItem.count}}</div>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.gainVp.instruction')"></p>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { ActionItem } from '@/services/BotActions'
import ActionBox from '../ActionBox.vue'
import AppIcon from '../../structure/AppIcon.vue'

export default defineComponent({
  name: 'GainVp',
  components: {
    ActionBox,
    AppIcon
  },
  emits: {
    addAction: (_actionItem: ActionItem) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
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
