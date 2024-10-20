<template>
  <div class="actionBox col" data-bs-toggle="modal" data-bs-target="#modalAdvanceScoringCategory">
    <div class="action">
      <div class="plus">+</div>
      <div class="value">{{actionItem.count}}</div>
      <AppIcon v-if="actionItem.scoringCategory" type="advance-track" :name="actionItem.scoringCategory" class="icon"/>
      {{ actionItem.scoringCategory }}
    </div>
  </div>

  <ModalDialog id="modalAdvanceScoringCategory" :title="t('rules.action.advanceScoringCategory.title')">
    <template #body>
      <p v-html="t('rules.action.advanceScoringCategory.instruction')"></p>
      <p v-html="t('rules.action.advanceScoringCategory.threshold')"></p>
      <p v-html="t('rules.action.advanceScoringCategory.exceedTrack')"></p>
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
  name: 'AdvanceScoringCategory',
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
  display: flex;
  align-items: center;
  .plus, .value {
    display: inline-block;
    color: #000;
    font-weight: bold;
    text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
  }
  .plus {
    font-size: 1.5rem;
  }
  .value {
    font-size: 2.2rem;
  }
  .icon {
    height: 3rem;
  }
}
</style>
