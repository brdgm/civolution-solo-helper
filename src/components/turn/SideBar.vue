<template>
  <div class="sidebar">
    {{t('sideBar.round', {round:navigationState.round})}}
    <h6 class="mt-2">V.I.C.I</h6>
    <div class="count">
      {{navigationState.evolutionCount + (botActions?.evolutionCount ?? 0)}}
      <AppIcon type="action" name="advance-evolution" class="icon"/>
    </div>
    <div class="count">
      {{navigationState.prosperityCount + (botActions?.prosperityCount ?? 0)}}
      <AppIcon type="action" name="advance-prosperity" class="icon"/>
    </div>
    <div class="mt-2">
      <div class="dotCount blue">
        <template v-for="index in navigationState.blueDotCount" :key="index">■</template>
      </div>
      <div class="dotCount red">
        <template v-for="index in navigationState.redDotCount" :key="index">■</template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import AppIcon from '../structure/AppIcon.vue';
import BotActions from '@/services/BotActions';

export default defineComponent({
  name: 'SideBar',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    botActions: {
      type: BotActions,
      required: false
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 145px;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-right: -12px;
  padding: 15px 10px 15px 15px;
  background-color: #ddd;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  @media (max-width: 600px) {
    font-size: 0.8rem;
    width: 120px;
  }
}
.count {
  display: inline-block;
  margin-right: 0.5rem;
  .icon {
    max-height: 1.5rem;
    max-width: 1.75rem;
    @media (max-width: 600px) {
      max-height: 1.25rem;
      max-width: 1.5rem;
    }
  }
}
.dotCount {
  line-height: 0.9rem;
  &.blue {
    color: #00c;
  }
  &.red {
    color: #c00;
  }
}
</style>
