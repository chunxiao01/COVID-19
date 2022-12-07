<script setup lang="ts">
import { ref, onMounted } from "vue"

import { get_map_data } from "@/network/map/map_request"

import Map from "@/components/Map.vue"
import DigitalCard from "@/components/DigitalCard.vue"
import WebsiteData from "./components/WebsiteData.vue"

const mapData = ref(null)
const timeData = ref("")
onMounted(async () => {
  const res = await get_map_data()
  let data1 = []
  if (
    res &&
    res.data &&
    res.data.data &&
    res.data.data.diseaseh5Shelf &&
    res.data.data.diseaseh5Shelf.areaTree &&
    res.data.data.diseaseh5Shelf.areaTree[0] &&
    res.data.data.diseaseh5Shelf.areaTree[0].children &&
    res.data.data.diseaseh5Shelf.areaTree[0].children.length > 0
  ) {
    res.data.data.diseaseh5Shelf.areaTree[0].children.forEach((item) => {
      let name = item.name
      switch (item.name) {
        case "台湾":
          name = "台湾省"
          break
        default:
          name = item.name
      }
      data1.push({
        name: name,
        value: parseInt(item.today.confirm) + parseInt(item.today.wzz_add)
      })
    })
  }
  timeData.value = res.data.data.diseaseh5Shelf.areaTree[0].children[0].date
  mapData.value = [...data1]
})
</script>

<template>
  <div class="app">
    <Map :mapData="mapData" :timeData="timeData" />
    <DigitalCard />
    <WebsiteData />
  </div>
</template>

<style scoped>
.app {
  padding: 10px;
  overflow: auto;
}
</style>
