<script setup lang="ts">
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import { ref, onMounted, watch, onUnmounted } from "vue"
import * as echarts from "echarts/core"
import { MapChart } from "echarts/charts"
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  TransformComponent
} from "echarts/components"
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features"
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers"
import "echarts/lib/component/visualMap"
import { chinaAll } from "@/assets/china_all"

const options = defineProps({
  mapData: {
    type: Array,
    default() {
      return []
    }
  },
  timeData: {
    type: String,
    default: ""
  }
})

// 注册必须的组件
echarts.use([
  MapChart,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])
echarts.registerMap("china", { geoJSON: chinaAll })

// 接下来的使用就跟之前一样，初始化图表，设置配置项
onMounted(() => {
  mapinit()
  map.value.showLoading()
})

onUnmounted(() => {
  echarts.dispose(map.value)
  map.value = null
  map.value.hideLoading()
})

const map = ref(null)
const mapinit = () => {
  map.value = echarts.init(document.getElementById("map"))
  map.value.setOption({
    title: {
      text: "中国疫情",
      textStyle: {
        fontSize: 20,
        fontWeight: "bolder"
      },
      left: "center",
      top: 20,
      subtext: options.timeData,
      subtextStyle: {
        fontSize: 16,
        fontWeight: "bolder"
      }
    },
    tooltip: {
      trigger: "item",
      formatter: function (params: { name: string; value: unknown }) {
        return `${params.name}: ${params.value}`
      }
    },
    visualMap: [
      {
        type: "piecewise",
        min: 0,
        max: 10000,
        maxOpen: true,
        splitNumber: 10,
        itemWidth: 10,
        itemHeight: 10,
        inRange: {
          color: [
            "#FFDFDF",
            "#FFBFBF",
            "#FF9F9F",
            "#FF7F7F",
            "#FF5F5F",
            "#FF3F3F",
            "#FF1F1F",
            "#FF0000",
            "#E70000",
            "#CF0000",
            "#B80000",
            "#A00000",
            "#880000",
            "#710000",
            "#590000",
            "#420000"
          ]
        }
      }
    ],
    geo: {
      show: true,
      map: "china",
      label: {
        show: false
      },
      roam: false,
      zoom: 1.2,
      itemStyle: {
        borderWidth: 1
      }
    },
    series: {
      type: "map",
      map: "china",
      roam: false,
      zoom: 1.2,
      data: options.mapData
    }
  })
  window.addEventListener("resize", function () {
    map.value.resize()
  })
}
const mapupdate = () => {
  map.value.setOption({
    title: {
      subtext: `统计时间：${options.timeData}`
    },
    series: {
      data: options.mapData
    }
  })
}
watch(
  () => options.mapData,
  () => {
    mapupdate()
    map.value.hideLoading()
  }
)
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
@media (max-width: 1200px) {
  #map {
    margin: 0 auto;
    width: 375px;
  }
}
@media (min-width: 1201px) {
  #map {
    margin: 0 auto;
    width: 700px;
  }
}
</style>
