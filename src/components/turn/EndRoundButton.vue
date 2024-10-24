<template>
  <template v-if="isNotStartPlayer">
    <button class="btn btn-secondary btn mt-4 ms-2" data-bs-toggle="modal" data-bs-target="#endRoundModal">
      {{t('endRoundButton.title')}}
    </button>
    <ModalDialog id="endRoundModal" :title="t('endRoundButton.title')">
      <template #body>
        <p v-html="t('endRoundButton.confirm', {round})"></p>
      </template>
      <template #footer>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="endRound()">{{t('endRoundButton.title')}}</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
      </template>
    </ModalDialog>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'EndRoundButton',
  components: {
    ModalDialog
  },
  emits: ['endRound'],
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: Object as PropType<NavigationState>,
      required: true
    }
  },
  computed: {
    round() : number {
      return this.navigationState.round
    },
    isNotStartPlayer() : boolean {
      return this.navigationState.player != this.navigationState.startPlayer
    }
  },
  methods: {
    endRound() : void {
      this.$emit('endRound')
    }
  }
})
</script>
