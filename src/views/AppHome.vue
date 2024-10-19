<template>

  <div class="float-end m-2 w-25">
    <a href="https://boardgamegeek.com/boardgame/400602/civolution" target="_blank" rel="noopener">
      <img src="../assets/game-civolution.webp" class="rounded shadow w-100 mb-3" alt=""/>
    </a>
  </div>

  <h1>{{t('home.title')}}</h1>

  <p v-html="t('home.play1')"></p>
  <p v-html="t('home.play2')"></p>

  <div class="row">
    <div class="col hello">
      <div class="vici">
        <img src="@/assets/vici-hello.webp" alt=""/>
        <div class="viciText" v-html="t('home.vici.hello')"></div>
      </div>
      <div class="text" v-html="t('home.vici.about')"></div>
    </div>
  </div>

<!--
  <p class="text-muted fst-italic">
    {{t('home.feedback')}}
    <a href="https://boardgamegeek.com/thread/XXX/brdgmme-civolution-solo-helper-web-application" target="_blank" rel="noopener">Board Game Geek Thread</a> |
    <a href="https://github.com/brdgm/civolution-solo-helper" target="_blank" rel="noopener">GitHub</a>
  </p>
-->

  <router-link to="/setupGame" class="btn btn-primary btn-lg mt-3">{{t('action.playGame')}}</router-link>

  <p class="disclaimer">
    This is not an official Deep Print Games product and has no affiliation with <a href="https://deep-print-games.com/" target="_blank" rel="noopener">Deep Print Games</a>.
    All art in this app is from <a href="https://deep-print-games.com/spiele/civolution/" target="_blank" rel="noopener">Civolution</a>.
    See <a href="#" data-bs-toggle="modal" data-bs-target="#creditsModal">{{t('footer.credits')}}</a>.
    <a href="https://ko-fi.com/brdgm_me" target="_blank" rel="noopener"><img class="kofi-button" src="@/assets/kofi_button_dark.png" alt="Support me on Ko-fi"/></a>
  </p>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AppHome',
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>

<style lang="scss" scoped>
.disclaimer {
  clear: both;
  margin-top: 4rem;
  font-size: smaller;
}
.kofi-button {
  height: 1.4rem;
}
.hello {
  background-color: #2e4950;
  border-radius: 15px;
  margin-right: 15px;
  margin-left: 10px;
  max-width: 600px;
  .vici {
    position: relative;
    float: right;
    width: 200px;
    margin-left: 15px;
    img {
      width: 100%;
    }
    .viciText {
      position: absolute;
      top: 32px;
      left: 115px;
      text-align: center;
      transform: rotate(5deg);
      line-height: 1.25rem;
    }
  }
  .text {
    padding: 10px;
    font-style: italic;
    color: #fff;
  }
}
</style>
