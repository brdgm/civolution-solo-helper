<template>
  <div class="mt-3" v-if="!show">
    <button class="btn btn-sm btn-secondary" @click.stop="determineTerritory">Determine Territory</button>
  </div>
  <template v-if="show">
    <div class="priority">
      <template v-for="(territory,index) of territoryPriority" :key="territory">
        <div v-if="index > 0" class="next">►</div>
        <div class="territory">
          <AppIcon type="territory" :name="territory" class="icon"/><br/>
          {{t(`territory.${territory}`)}}
        </div>
      </template>
    </div>
    <div class="priority">
      <template v-for="(beacon,index) of beaconPriority" :key="beacon">
        <div v-if="index > 0" class="next">►</div>
        <div class="beacon">
          <AppIcon type="beacon" :name="beacon" class="icon" :class="{[`beacon-${beacon}`]:true}"/>
        </div>
      </template>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import Territory from '@/services/enum/Territory'
import getTerritoryPriority from '@/util/getTerritoryPriority'
import getBeaconPriority from '@/util/getBeaconPriority'
import Beacon from '@/services/enum/Beacon'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'

export default defineComponent({
  name: 'TerritoryPriority',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    territoryPriority() : Territory[] {
      const territoryRoll = rollDice(6)
      return getTerritoryPriority(territoryRoll)
    },
    beaconPriority() : Beacon[] {
      const beaconRoll = rollDice(6)
      return getBeaconPriority(beaconRoll)
    }
  },
  methods: {
    determineTerritory() : void {
      this.show = true
    }
  }
})
</script>

<style lang="scss" scoped>
.priority {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  margin-top: 1rem;
}
.territory {
  text-align: center;
  font-size: 0.65rem;
  margin-top: 0.2rem;
  .icon {
    height: 1.5rem;
  }
}
.beacon {
  .icon {
    height: 1.25rem;
    &.beacon-3 {
      height: 1.9rem;
    }
  }
}
.next {
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
</style>
