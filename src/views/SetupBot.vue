<template>
  <h1>
    <img src="@/assets/vici.webp" class="vici" alt=""/>
    {{t('setupBot.title')}}
  </h1>

  <div class="instructions mt-3">
    <div class="tribePlacement">
      <img src="@/assets/setup/tribe-setup.webp" alt=""/>
      <div class="label">{{t('setupBot.provisionMarker')}}</div>
    </div>
    <ul>
      <li v-html="t('setupBot.placeDisks')"></li>
      <li v-html="t('setupBot.takeTribesMarkers')"></li>
      <ul>
        <li v-html="t('setupBot.placeStartingTribes')"></li>
        <li v-html="t('setupBot.placeProvisionMarker')"></li>
      </ul>
      <li v-html="t('setupBot.takeDice')"></li>
      <ul>
        <li v-html="t('setupBot.diceNotice')"></li>
      </ul>
    </ul>
    <p v-html="t('setupBot.noOtherComponents')"></p>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'SetupBot',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  methods: {
    startGame() : void {
      this.$router.push('/round/1')
    }
  }
})
</script>

<style lang="scss" scoped>
.vici {
  height: 3rem;
  margin-top: -0.5rem;
}
.instructions {
  max-width: 1000px;
  & > ul > li {
    margin-top: 0.5rem;
  }
}
.tribePlacement {
  position: relative;
  float: right;
  margin-left: 15px;
  margin-bottom: 15px;
  img {
    border-radius: 15px;
    width: 250px;
  }
  .label {
    position: absolute;
    top: 8px;
    right: 25px;
    color: #fff;
  }
}
</style>
