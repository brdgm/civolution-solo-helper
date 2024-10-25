<template>
  <ActionBox :instructionTitle="t('rules.action.performMigration.title')">
    <template #action>
      <AppIcon type="action" name="perform-migration" class="icon"/>
      <div class="mt-1">{{t('rules.action.performMigration.initialTerritory.title')}}</div>
      <TerritoryPriority v-if="actionItem.territoryRoll" :territoryRoll="actionItem.territoryRoll" class="mt-2"/>
      <div class="mt-1">{{t('rules.action.performMigration.destinationTerritory.title')}}</div>
      <TerritoryPriority v-if="actionItem.territoryRollDestination" :territoryRoll="actionItem.territoryRollDestination" class="mt-2"/>
    </template>
    <template #instruction>
      <div class="fw-bold">{{t('rules.action.performMigration.initialTerritory.title')}}</div>
      <p v-html="t('rules.action.performMigration.initialTerritory.minimumRequirement')"></p>
      <TerritoryPriority v-if="actionItem.territoryRoll" :territoryRoll="actionItem.territoryRoll" class="mb-2"/>
      <p class="fst-italic">
        <span v-html="t('rules.action.performMigration.initialTerritory.twoTribesAvailability')"></span><br/>
        <button class="btn btn-sm btn-outline-secondary mt-1" @click="performProcreation()" data-bs-dismiss="modal">{{t('rules.action.performMigration.initialTerritory.performProcreation')}}</button>
      </p>
      <div v-html="t('rules.action.performMigration.initialTerritory.tribePriorityList.title')"></div>
      <ol>
        <li v-html="t('rules.action.performMigration.initialTerritory.tribePriorityList.wilderness')"></li>
        <li v-html="t('rules.action.performMigration.initialTerritory.tribePriorityList.fireEncampment')"></li>
        <li v-html="t('rules.action.performMigration.initialTerritory.tribePriorityList.anyEncampment')"></li>
      </ol>
      <hr/>
      <div class="fw-bold">{{t('rules.action.performMigration.destinationTerritory.title')}}</div>
      <p v-html="t('rules.action.performMigration.destinationTerritory.minimumRequirement')"></p>
      <p v-html="t('rules.action.performMigration.destinationTerritory.priorityRequirement')"></p>
      <TerritoryPriority v-if="actionItem.territoryRollDestination" :territoryRoll="actionItem.territoryRollDestination" class="mb-2"/>
      <div v-html="t('rules.action.performMigration.destinationTerritory.moveTribe')"></div>
      <EncampmentPriority/>
      <p v-html="t('rules.action.performMigration.destinationTerritory.undevelopedTerritory')"></p>
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
import Action from '@/services/enum/Action'
import EncampmentPriority from '../EncampmentPriority.vue'

export default defineComponent({
  name: 'PerformMigration',
  components: {
    ActionBox,
    AppIcon,
    TerritoryPriority,
    EncampmentPriority
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
  },
  methods: {
    performProcreation() {
      this.$emit('addAction', { action: Action.PERFORM_PROCREATION }, true)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 3rem;
}
</style>
