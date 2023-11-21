<template>
  <div class="app-container">
    <el-tabs v-model="activeName" >
      <el-tab-pane label="Receipt Order" name="first"></el-tab-pane>
      <el-tab-pane label="Batch Inbound" name="second"></el-tab-pane>
    </el-tabs>
    <Dashboard v-if="activeName === 'first'" @switchTab="activeName = 'second'"></Dashboard>
    <wave v-if="activeName === 'second'" ></wave>
  </div>
</template>

<script>
import wave from '@/views/wms/wave/receipt/index.vue'
import Dashboard from '@/views/wms/receiptOrder/dashboard.vue'

export default {
  components: { Dashboard, wave},
  data() {
    return {
      activeName: 'first',
    }
  },
}
</script>
