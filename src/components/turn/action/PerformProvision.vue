<template>
  <ActionBox :instructionTitle="t('rules.action.performProvision.title')">
    <template #action>
      <AppIcon type="action" name="perform-provision" class="icon"/>
      <TerritoryPriority v-if="actionItem.territoryRoll" :territoryRoll="actionItem.territoryRoll" class="mt-2"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.performProvision.minimumRequirement')"></p>
      <p v-html="t('rules.action.performProvision.priorityRequirement')"></p>
      <TerritoryPriority v-if="actionItem.territoryRoll" :territoryRoll="actionItem.territoryRoll" class="mb-3"/>
      <p v-html="t('rules.action.performProvision.placeMarker')"></p>
      <p v-html="t('rules.action.performProvision.blockFarmSpace')"></p>
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
  name: 'PerformProvision',
  components: {
    ActionBox,
    AppIcon,
    TerritoryPriority
  },
  emits: {
    addAction: (_actionItem: ActionItem, _before: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
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
