<template>
  <img :src="imageUrl" draggable="false" alt=""/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppIcon',
  props: {
    type: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    extension: {
      type: String,
      default: 'png'
    }
  },
  computed: {
    imageUrl() : string {
      if (this.type) {
        return new URL(`/src/assets/icons/${this.type}/${this.name}.${this.extension}`, import.meta.url).toString()
      }
      else {
        return new URL(`/src/assets/icons/${this.name}.${this.extension}`, import.meta.url).toString()
      }
    }
  }
})
</script>
