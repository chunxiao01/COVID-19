<script setup lang="ts">
import { ref, onMounted } from "vue"
const websiteiframeREF = ref(null)
const srcurl = ref("")
onMounted(() => {
  srcurl.value =
    "https://feiyan.wecity.qq.com/wuhan/dist/index.html#/index?tab=local"
})
</script>

<template>
  <div class="website-data">
    <div>
      <h4>腾讯疫情统计</h4>
    </div>
    <div>
      <iframe
        ref="websiteiframeREF"
        :src="srcurl"
        width="100%"
        height="1080"
        frameborder="0"
        border="0"
        marginwidth="0"
        marginheight="0"
        allowTransparency="true"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
h4 {
  font-size: 20px;
  font-weight: bolder;
  text-align: center;
  margin: 30px 0 10px 0;
}
@media (max-width: 1200px) {
  .website-data {
    margin: 0 auto;
    width: 375px;
  }
}
@media (min-width: 1201px) {
  .website-data {
    margin: 0 auto;
    width: 700px;
  }
}
</style>
