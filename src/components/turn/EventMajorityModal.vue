<template>
  <ModalDialog id="eventMajorityModal" :title="t('roundEnd.eventPhase.resolveEvent.majorityModal.title')">
    <template #body>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">{{t('roundEnd.eventPhase.resolveEvent.majorityModal.event')}}</th>
            <th scope="col">{{t('roundEnd.eventPhase.resolveEvent.majorityModal.achievement')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="eventAchievement of eventAchievements" :key="eventAchievement.event">
            <td>{{eventAchievement.event}}</td>
            <td>{{eventAchievement.count}}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import getEventAchievements, { EventAchievement } from '@/util/getEventAchievements'

export default defineComponent({
  name: 'EventMajorityModal',
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)

    return { t, navigationState }
  },
  props: {
    navigationState: {
      type: Object as PropType<NavigationState>,
      required: true
    }
  },
  computed: {
    eventAchievements() : EventAchievement[] {
      return getEventAchievements(this.navigationState.prosperityCount)
    }
  }
})
</script>
