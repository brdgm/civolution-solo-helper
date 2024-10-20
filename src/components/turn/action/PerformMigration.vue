<template>
  <ActionBox :instructionTitle="t('rules.action.performMigration.title')">
    <template #action>
      <AppIcon type="action" name="perform-migration" class="icon"/>
      <TerritoryPriority/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.performMigration.instruction')"></p>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { ActionItem } from '@/services/BotActions'
import ActionBox from '../ActionBox.vue'
import AppIcon from '../../structure/AppIcon.vue'
import TerritoryPriority from '../TerritoryPriority.vue'

export default defineComponent({
  name: 'PerformMigration',
  components: {
    ActionBox,
    AppIcon,
    TerritoryPriority
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
