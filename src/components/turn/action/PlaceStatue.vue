<template>
  <ActionBox :instructionTitle="t('rules.action.placeStatue.title')">
    <template #action>
      <AppIcon type="action" name="place-statue" class="icon"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.placeStatue.instruction')"></p>
      <p v-html="t('rules.action.placeStatue.unlimited')"></p>
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
  name: 'PlaceStatue',
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
.icon {
  height: 3.5rem;
}
</style>
