<template>
  <svg width="1.5rem" height="1.5rem" class="color">
    <rect width="100%" height="100%" :style="`fill:${getColorCode(playerColor)};'`"/>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import PlayerColor from '@/services/enum/PlayerColor'
import getPlayerColorCode from '@/util/getPlayerColorCode'

export default defineComponent({
  name: 'PlayerColorDisplay',
  props: {
    playerColor: {
      type: String as PropType<PlayerColor>,
      required: true
    }
  },
  methods: {
    getColorCode(color : PlayerColor) : string {
      return getPlayerColorCode(color)
    }
  }
})
</script>

<style lang="scss" scoped>
.color {
  border: 1px solid darkgray;
  border-radius: 3px;
  margin: 0.25rem;
}
</style>
