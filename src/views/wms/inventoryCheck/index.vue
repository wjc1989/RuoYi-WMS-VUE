<template>
  <div class="app-container" v-if="show">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="120px" size="medium"
             class="ry_form">
      <el-form-item label="InventoryCountNo." prop="inventoryCheckNo">
        <el-input
          v-model="queryParams.inventoryCheckNo"
          placeholder="Please Input InventoryCountNo."
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="CountStatus" prop="inventoryCheckStatus">

        <DictRadio v-model="queryParams.inventoryCheckStatus" @change="handleQuery" size="small"
                   :radioData="dict.type.wms_check_status" :showAll="'all'"/>

      </el-form-item>

      <el-form-item label="Warehouse" prop="warehouseId">
        <wms-warehouse-cascader v-model="queryParams.warehouseArr" size="small"></wms-warehouse-cascader>
      </el-form-item>

      <el-form-item class="flex_one tr">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">Search</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">Reset</el-button>
        <el-button :icon="showMoreCondition ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" size="mini"
                   @click="showMoreCondition = !showMoreCondition">{{ showMoreCondition ? 'Collapse' : 'Expand' }}
        </el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['wms:inventoryCheck:add']"
        >New
        </el-button>
      </el-col>

      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['wms:inventoryCheck:export']"
        >Export
        </el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
    </el-row>

    <WmsTable v-loading="loading" :data="wmsInventoryCheckList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="InventoryCountNo." align="center" prop="inventoryCheckNo"
                       v-if="columns[0].visible"/>
      <!--      <el-table-column label="InventoryCountType" align="center" prop="inventoryCheckType" v-if="columns[1].visible"/>-->

      <el-table-column label="Change" align="center" prop="inventoryCheckTotal" v-if="columns[3].visible"/>
      <!--      <el-table-column label=" Review Status" align="center" prop="checkStatus" v-if="columns[4].visible"/>
            <el-table-column label=" Review 人" align="center" prop="checkUserId" v-if="columns[5].visible"/>
            <el-table-column label=" Review  Time" align="center" prop="checkTime" width="180" v-if="columns[6].visible">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.checkTime, '') }}</span>
              </template>
            </el-table-column>-->
      <!--      <el-table-column label="Warehouse" align="center" prop="warehouseId" v-if="columns[7].visible"/>
            <el-table-column label="Area" align="center" prop="areaId" v-if="columns[8].visible"/>-->
      <el-table-column label="Warehouse" align="center" prop="rackId" v-if="columns[4].visible">
        <template v-slot="{ row }"><span>{{ row.warehouseName }}</span><span
          v-if="row.areaName">/{{ row.areaName }}</span><span v-if="row.rackName">/{{ row.rackName }}</span></template>
      </el-table-column>
      <el-table-column label="InventoryCountStatus" align="center" prop="inventoryCheckStatus" v-if="columns[2].visible">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.wms_check_status" :value="scope.row.inventoryCheckStatus"/>
        </template>

      </el-table-column>

      <el-table-column label="Remark" align="center" prop="remark" v-if="columns[11].visible"/>
      <el-table-column label="Operate" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleView(scope.row)"
            v-hasPermi="['wms:inventoryCheck:edit']"
          >View
          </el-button>
          <el-button
            size="mini"
            type="text"
            v-if="scope.row.inventoryCheckStatus == '11'"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['wms:inventoryCheck:edit']"
          >继续Count
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            v-if="scope.row.inventoryCheckStatus == '11'"
            @click="handleDelete(scope.row)"
            v-hasPermi="['wms:inventoryCheck:remove']"
          >Delete
          </el-button>
        </template>
      </el-table-column>
    </WmsTable>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import {
  addWmsInventoryCheck,
  delWmsInventoryCheck,
  exportWmsInventoryCheck,
  listWmsInventoryCheck,
  updateWmsInventoryCheck
} from "@/api/wms/inventoryCheck";
import {randomId} from "@/utils/RandomUtils";
import { mapGetters } from 'vuex'
import { isStarRepo } from '@/utils/is-star-plugin'

export default {
  name: "WmsInventoryCheck",
  dicts: ["wms_check_status"],
  computed: {
    ...mapGetters(['userId']),
  },
  data() {
    return {
      show: false,
      // 遮罩层
      loading: true,
      // Export遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // ShowSearch
      showSearch: true,
      // 总条数
      total: 0,
      // InventoryCount据表格Data
      wmsInventoryCheckList: [],
      // Show弹出层
      open: false,
      // SearchParams
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        inventoryCheckNo: null,
        inventoryCheckType: null,
        inventoryCheckStatus: null,
        inventoryCheckTotal: null,
        checkStatus: null,
        checkUserId: null,
        checkTime: null,
        warehouseId: null,
        areaId: null,
        rackId: null,
        attachment: null,
      },
      // 表Params
      form: {},
      // 表校验
      rules: {},
      columns: [
        {key: 1, label: "InventoryCount No.", visible: true},
        {key: 2, label: "InventoryCountType", visible: true},
        {key: 3, label: "InventoryCountStatus", visible: true},
        {key: 4, label: "Change", visible: true},
        {key: 5, label: "Review Status", visible: true},
        {key: 6, label: "Reviewer", visible: true},
        {key: 7, label: "Review Time", visible: true},
        {key: 8, label: "Warehouse", visible: true},
        {key: 9, label: "Area", visible: true},
        {key: 10, label: "Rack", visible: false},
        {key: 11, label: "Attachment", visible: false},
        {key: 12, label: "Remark", visible: false},
      ],
      showMoreCondition: false
    };
  },
  async created() {
    this.show = true;
    this.getList()
  },
  methods: {
    /** SearchInventoryCount据列表 */
    getList() {
      this.loading = true;
      const {pageNum, pageSize, warehouseArr} = this.queryParams;
      const [warehouseId, areaId, rackId] = warehouseArr || [];
      const query = {...this.queryParams, pageNum: undefined, pageSize: undefined, warehouseId, areaId, rackId};
      const pageReq = {page: pageNum - 1, size: pageSize};
      listWmsInventoryCheck(query, pageReq).then(response => {
        const {content, totalElements} = response
        this.wmsInventoryCheckList = content;
        this.total = totalElements;
        this.loading = false;
      });
    },
    // 表Reset
    reset() {
      this.form = {
        id: null,
        inventoryCheckNo: 'IV-' + randomId(),
        inventoryCheckType: null,
        inventoryCheckStatus: 0,
        inventoryCheckTotal: null,
        checkStatus: 0,
        checkUserId: null,
        checkTime: null,
        warehouseId: null,
        areaId: null,
        rackId: null,
        attachment: null,
        remark: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** SearchButtonOperate */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** ResetButtonOperate */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中Data
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** AddButtonOperate */
    handleAdd() {
      this.$router.push({path: '/check/edit'})
    },
    /** ModifyButtonOperate */
    handleUpdate(row) {
      const id = row.id || this.ids
      this.$router.push({path: '/check/edit', query: {id}})
    },
    /** ViewButtonOperate */
    handleView(row) {
      const id = row.id || this.ids
      this.$router.push({path: '/check/status', query: {id}})
    },
    /** 提交Button */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const {warehouseArr} = this.form
          const [warehouseId, areaId, rackId] = warehouseArr || [];
          this.form.warehouseId = warehouseId
          this.form.areaId = areaId
          this.form.rackId = rackId

          if (this.form.id != null) {
            updateWmsInventoryCheck(this.form).then(response => {
              this.$modal.msgSuccess("Modify Successful");
              this.open = false;
              this.getList();
            });
          } else {
            addWmsInventoryCheck(this.form).then(response => {
              this.$modal.msgSuccess("Add Successful");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** DeleteButtonOperate */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm(' Do you want delete InventoryCount据No."' + ids + '"？').then(function () {
        return delWmsInventoryCheck(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("Delete Successful");
      }).catch(() => {
      });
    },
    /** ExportButtonOperate */
    handleExport() {
      const queryParams = this.queryParams;
      this.$modal.confirm('Export All？').then(() => {
        this.exportLoading = true;
        return exportWmsInventoryCheck(queryParams);
      }).then(response => {
        this.$download.download(response);
        this.exportLoading = false;
      }).catch(() => {
      });
    }
  }
};
</script>
