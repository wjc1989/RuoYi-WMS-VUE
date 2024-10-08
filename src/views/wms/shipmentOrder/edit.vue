<template>
  <div class="shipment-order-edit-wrapper app-container">
    <div class="shipment-order-content">
      <el-form label-width="138px" :model="form" ref="form" :rules="rules">
        <el-form-item label="Outbound No." prop="shipmentOrderNo">
          <el-input class="w200" v-model="form.shipmentOrderNo" placeholder="Outbound No." disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="Outbound Type" prop="shipmentOrderType">
          <el-radio-group v-model="form.shipmentOrderType">
            <el-radio-button v-for="dict in dict.type.wms_shipment_type" :key="dict.value" :label="dict.value">{{ dict.label }} </el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Amount" prop="receivableAmount" v-show="hasCustomer">
          <el-input-number v-model="form.receivableAmount" :precision="2" :min="0" label="Please Input Amount"></el-input-number>
        </el-form-item>
        <el-form-item label="Project" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="Please Input Project"></el-input>
        </el-form-item>
        <el-form-item label="Remark" prop="remark">
          <el-input v-model="form.remark" placeholder="Remark...Maximum 100 characters" rows="3" maxlength="100" type="textarea"
                    show-word-limit="show-word-limit"></el-input>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <div class="flex-center mb8">
        <div class="flex-one large-tip bolder-font">
          <el-row class="mb8 mt10" :gutter="10">
            <el-col :span="1.5">
              <div class="flex-one large-tip bolder-font">Goods Detail</div>
            </el-col>
            <el-col :span="1.5">
              <el-button size="small" type="success" plain="plain" icon="el-icon-delete-location"
                         @click="onBatchSetInventory">
                Set Warehouse
              </el-button>
            </el-col>
          </el-row>
        </div>
        <div class="ops">
          <el-button type="primary" plain="plain" size="small" @click="showAddItem">Add Item</el-button>
        </div>
      </div>
      <div class="table">
        <WmsTable :data="form.details" @selection-change="handleSelectionChange"> 、
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="Goods Name" align="center" prop="prod.itemName"></el-table-column>
          <el-table-column label="Goods No." align="center" prop="prod.itemNo"></el-table-column>
          <el-table-column label="Category" align="center" prop="prod.itemTypeName"></el-table-column>
          <el-table-column label="Plan Count" align="center" prop="planQuantity" width="150">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.planQuantity" placeholder="Plan Count" size="mini" :min="1"
                               :max="2147483647"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="Warehouse" align="center">
            <template slot-scope="scope">
              <WmsWarehouseCascader v-model="scope.row.place" size="small"></WmsWarehouseCascader>
            </template>
          </el-table-column>
          <el-table-column label="Amount" align="center" width="150">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.money" :precision="2" @change="selectMoney" size="mini" :min="0"
                               label="Please Input Amount"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="Operate" align="center">
            <template slot-scope="scope">
              <a class="red" @click="form.details.splice(scope.$index, 1)">Delete</a>
            </template>
          </el-table-column>
        </WmsTable>
        <!-- <el-empty v-if="!form.details || form.details.length === 0" :image-size="48"></el-empty> -->
      </div>
      <div class="tc mt16">
        <el-button type="primary" plain="plain" size="small" @click="showAddItem">Add Item</el-button>
      </div>
      <div class="tc mt16">
        <el-button @click="cancel">Cancel</el-button>
        <el-button @click="submitForm" type="primary">Save</el-button>
      </div>
    </div>
    <el-dialog :visible="modalObj.show" :title="modalObj.title" :width="modalObj.width" @close="modalObj.cancel">
      <template v-if="modalObj.component === 'add-item'">
        <item-select ref="item-select" :data="this.form.details"></item-select>
      </template>
      <span slot="footer">
        <el-button v-if="modalObj.cancel" @click="modalObj.cancel">Cancel</el-button>
        <el-button v-if="modalObj.ok" type="primary" @click="modalObj.ok">OK</el-button>
      </span>
    </el-dialog>
    <BatchWarehouseDialog
      :visible.sync="batchDialogVisible"
      :form-data.sync="batchForm"
      @confirmed="onBatchDialogFinished"
    ></BatchWarehouseDialog>
  </div>
</template>

<script>
import {addOrUpdateWmsShipmentOrder, getWmsShipmentOrder} from '@/api/wms/shipmentOrder'
import {randomId} from '@/utils/RandomUtils'
import ItemSelect from '@/views/components/ItemSelect'
import BatchWarehouseDialog from "@/views/components/wms/BatchWarehouseDialog/index.vue";

export default {
  name: 'WmsShipmentOrder',
  components: {BatchWarehouseDialog, ItemSelect},
  dicts: ['wms_shipment_type'],
  data() {
    return {
      ids: [],
      // 非多个禁用
      multiple: true,
      // Set Warehouse
      batchDialogVisible: false,
      batchForm: {
        place: []
      },
      // 表Params
      form: {
        details: []
      },
      // 表校验
      rules: {},
      modalObj: {
        show: false,
        title: '',
        width: '50%',
        component: null,
        model: {},
        ok: () => {
        },
        cancel: () => {
        }
      },
      hasSupplier: false
    }
  },
  watch: {
    'form.customerId': {
      immediate: true,
      handler(value) {
        if (value) {
          this.hasCustomer = true
        } else {
          this.hasCustomer = false
        }
      }
    }
  },
  created() {
    const {id} = this.$route.query
    if (id) {
      this.loadDetail(id)
    } else {
      this.reset()
    }
  },
  methods: {
    // 多选框选中Data
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.multiple = !selection.length
    },
    /** Set Warehouse */
    onBatchSetInventory() {
      const {details} = this.form
      if (!details || details.length === 0) {
        this.$modal.msgError('Please Add Item')
        return
      }
      // 未选中
      if (!this.ids.length) {
        this.$modal.msgError('Please Select Item')
        return
      }
      this.batchDialogVisible = true
    },
    onBatchDialogFinished() {
      this.batchDialogVisible = false
      const [warehouseId, areaId, rackId] = this.batchForm.place || []
      this.form.details.forEach(it => {
        // 仅更新已选中
        if (this.ids.includes(it.id)) {
          it.place = [warehouseId, areaId, rackId].filter(Boolean)
        }
      })
    },
    /** 统计Outbound Amount */
    selectMoney() {
      let sum = 0;
      this.form.details.map(item => {
        if (!isNaN(parseFloat(item.money))) {
          sum += item.money
        }
        return item.money
      })
      this.form.receivableAmount = sum
    },
    cancel() {
      this.$tab.closeOpenPage({path: '/shipmentOrder'})
    },
    /** 提交Button */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        const details = this.form.details.map(it => {
          console.log(it.place)
          if (it.place) {
            it.prod.warehouseId = it.place[0]
            it.prod.areaId = it.place[1]
            it.prod.rackId = it.place[2]
          } else {
            it.prod.warehouseId = null
            it.prod.areaId = null
            it.prod.rackId = null
          }
          return {
            itemId: it.prod.id,
            rackId: it.prod.rackId,
            areaId: it.prod.areaId,
            money: it.money,
            warehouseId: it.prod.warehouseId,
            planQuantity: it.planQuantity,
            realQuantity: it.realQuantity,
            shipmentOrderStatus: it.shipmentOrderStatus,
            delFlag: 0
          }
        })
        const req = {...this.form, details}
        addOrUpdateWmsShipmentOrder(req).then(response => {
          this.$modal.msgSuccess(this.form.id ? 'Modify Successful' : 'Add Successful')
          this.cancel();
        })
      })
    },
    loadDetail(id) {
      getWmsShipmentOrder(id).then(response => {
        const {details, items} = response
        const map = {};
        (items || []).forEach(it => {
          map[it.id] = it
        });
        details && details.forEach(it => it.prod = map[it.itemId])
        this.form = {
          ...response,
          details
        }
      })
    },
    // 表Reset
    reset() {
      this.form = {
        id: null,
        shipmentOrderNo: 'E-' + randomId(),
        shipmentOrderType: 12,
        customerId: null,
        orderNo: null,
        shipmentOrderStatus: 11,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        details: []
      }
      this.resetForm('form')
    },
    confirmSelectItem() {
      const value = this.$refs['item-select'].getRightList()
      this.form.details = value.map(it => {
        return {
          id: it.id,
          prod: it,
          planQuantity: null,
          realQuantity: null,
          place: [],
          shipmentOrderStatus: 11,
          delFlag: 0
        }
      })
      this.closeModal()
    },
    closeModal() {
      this.modalObj.show = false
    },
    showAddItem() {
      try {
        this.$refs['item-select'].initDetailsList(this.form.details)
      } catch (err) {

      }
      const ok = () => this.confirmSelectItem()
      const cancel = () => this.closeModal()
      this.modalObj = {
        show: true,
        title: 'Add Item',
        width: '50%',
        component: 'add-item',
        model: {},
        ok,
        cancel
      }
    }
  }
}
</script>
<style lang="stylus">
.shipment-order-edit-wrapper
  .shipment-order-content
    width 80%
    min-width 900px
    margin 0 auto
</style>
