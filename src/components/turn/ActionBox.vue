<template>
  <div class="actionBox col" @click="showInstructions">
    <slot name="action"></slot>
  </div>

  <ModalDialog :id="modalId" :title="instructionTitle">
    <template #body>
      <slot name="instruction"></slot>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import showModal from '@brdgm/brdgm-commons/src/util/modal/showModal';

export default defineComponent({
  name: 'ActionBox',
  components: {
    ModalDialog
  },
  setup() {
    const modalId = `modal-${crypto.randomUUID()}`
    return { modalId }
  },
  props: {
    instructionTitle: {
      type: String,
      required: true
    }
  },
  methods: {
    showInstructions() {
      showModal(this.modalId)
    }
  }
})
</script>
