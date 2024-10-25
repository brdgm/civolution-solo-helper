<template>
  <ActionBox :instructionTitle="t('rules.action.performProcreation.title')" :modalSizeLg="true">
    <template #action>
      <AppIcon type="action" name="perform-procreation" class="icon"/>
      <TerritoryPriority v-if="actionItem.territoryRoll" :territoryRoll="actionItem.territoryRoll" class="mt-2"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.performProcreation.minimumRequirement')"></p>
      <p v-html="t('rules.action.performProcreation.priorityRequirement')"></p>
      <TerritoryPriority v-if="actionItem.territoryRoll" :territoryRoll="actionItem.territoryRoll" class="mb-2"/>
      <div v-html="t('rules.action.performProcreation.territoryDetermined')"></div>
      <EncampmentPriority/>
      <hr/>
      <p class="fst-italic">
        <span v-html="t('rules.action.performProcreation.migrationCheck')"></span><br/>
        <button class="btn btn-sm btn-outline-secondary mt-1" @click="performMigration()" data-bs-dismiss="modal">{{t('rules.action.performProcreation.performMigration')}}</button>
      </p>
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
import EncampmentPriority from '../EncampmentPriority.vue'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'PerformProcreation',
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
    performMigration() {
      this.$emit('addAction', { action: Action.PERFORM_MIGRATION }, false)
    }
  }

})
</script>

<style lang="scss" scoped>
.icon {
  height: 3rem;
}
</style>
