<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="120px" size="medium"
      class="ry_form">
      <el-form-item label="交易No." prop="transactionCode">
        <el-input v-model.trim="queryParams.transactionCode" placeholder="Please Input 交易No." clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="交易Type" prop="transactionType">
        <DictRadio v-model="queryParams.transactionType" @change="handleQuery" size="small"
          :radioData="dict.type.wms_customer_transaction_type" :showAll="'all'" />
      </el-form-item>
      <el-form-item label="Create Time" prop="Time">
        <el-date-picker v-model="queryParams.Time" type="datetimerange" :picker-options="pickerOptions"
          range-separator="至" size="small" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="Start time" end-placeholder="End time" :default-time="['00:00:00', '23:59:59']" align="right"
          @change="handleChange">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="flex_one tr">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">Search</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">Reset</el-button>
      </el-form-item>
    </el-form>

    <WmsTable v-loading="loading" :data="wmsCustomerTransactionList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="交易No." align="center" prop="transactionCode" v-if="columns[0].visible" />
      <el-table-column label="User " align="center" prop="customerId" v-if="columns[1].visible">
        <template slot-scope="scope">
          {{ getCustomerName(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column label="交易Type" align="center" prop="transactionType" v-if="columns[2].visible">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.wms_customer_transaction_type" :value="scope.row.transactionType" />
        </template>
      </el-table-column>
      <el-table-column label="交易Amount" align="center" prop="transactionAmount" v-if="columns[3].visible" >
        <template slot-scope="scope">
          <span style="color:red">{{scope.row.transactionType==11 ? "-":"+"}} {{scope.row.transactionAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上期余额" align="center" prop="previousBalance" v-if="columns[4].visible" />
      <el-table-column label="当前余额" align="center" prop="currentBalance" v-if="columns[5].visible" />
      <el-table-column label="Outbound No." align="center" prop="shipmentOrderId" v-if="columns[6].visible" />
      <el-table-column label="Remark" align="center" prop="remark" v-if="columns[7].visible" />
      <el-table-column label="Create Time" align="center" prop="createTime" v-if="columns[8].visible" />
      <el-table-column label="Operate" align="center" class-name="small-padding fixed-width" v-if="columns[9].visible">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['wms:wmsCustomerTransaction:edit']">Modify</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['wms:wmsCustomerTransaction:remove']">Delete</el-button>
        </template>
      </el-table-column>
    </WmsTable>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- Add或Modify客户账户流水对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="108px" inline class="dialog-form-two">
        <el-form-item label="交易No." prop="transactionCode">
          <el-input v-model="form.transactionCode" placeholder="Please Input 交易No." />
        </el-form-item>
        <el-form-item label="User No." prop="customerId">
          <el-input v-model="form.customerId" placeholder="Please Input User No." />
        </el-form-item>
        <el-form-item label="交易Type" prop="transactionType">
          <el-select v-model="form.transactionType" placeholder="Please select 交易Type">
            <el-option label="Please select Dict生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="交易Amount" prop="transactionAmount">
          <el-input v-model="form.transactionAmount" placeholder="Please Input 交易Amount" />
        </el-form-item>
        <el-form-item label="上期余额" prop="previousBalance">
          <el-input v-model="form.previousBalance" placeholder="Please Input 上期余额" />
        </el-form-item>
        <el-form-item label="当前余额" prop="currentBalance">
          <el-input v-model="form.currentBalance" placeholder="Please Input 当前余额" />
        </el-form-item>
        <el-form-item label="Outbound No." prop="shipmentOrderId">
          <el-input v-model="form.shipmentOrderId" placeholder="Please Input Outbound No." />
        </el-form-item>
        <el-form-item label="Remark" prop="remark">
          <el-input v-model="form.remark" placeholder="Please Input Remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">OK</el-button>
        <el-button @click="cancel">Cancel</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listWmsCustomerTransaction, getWmsCustomerTransaction, delWmsCustomerTransaction, addWmsCustomerTransaction, updateWmsCustomerTransaction, exportWmsCustomerTransaction } from "@/api/wms/customerTransaction";
import { mapGetters } from "vuex";

export default {
  name: "WmsCustomerTransaction",
  dicts: ["wms_customer_transaction_type"],
  computed: {
    ...mapGetters(['customerMap']),
  },
  data() {
    return {
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
      // 客户账户流水表格Data
      wmsCustomerTransactionList: [],
      // 弹出层标题
      title: "",
      // Show弹出层
      open: false,
      // SearchParams
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        transactionCode: null,
        customerId: null,
        transactionType: null,
        transactionAmount: null,
        previousBalance: null,
        currentBalance: null,
        shipmentOrderId: null,
      },
      // 表Params
      form: {},
      // 表校验
      rules: {
        transactionCode: [
          { required: true, message: "交易No. is required", trigger: "blur" }
        ],
        customerId: [
          { required: true, message: "User No. is required", trigger: "blur" }
        ],
        transactionType: [
          { required: true, message: "交易Type  1：Paid  2：Payment  is required", trigger: "change" }
        ],
        transactionAmount: [
          { required: true, message: "交易Amount is required", trigger: "blur" }
        ],
        previousBalance: [
          { required: true, message: "上期余额 is required", trigger: "blur" }
        ],
        currentBalance: [
          { required: true, message: "当前余额 is required", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "Create Time is required", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新 Time is required", trigger: "blur" }
        ]
      },
      columns: [
        { key: 1, label: "交易No.", visible: true },
        { key: 2, label: "User No.", visible: true },
        { key: 3, label: "交易Type", visible: true },
        { key: 4, label: "交易Amount", visible: true },
        { key: 5, label: "上期余额", visible: true },
        { key: 6, label: "当前余额", visible: true },
        { key: 7, label: "Outbound No.", visible: false },
        { key: 8, label: "Remark", visible: true },
        { key: 9, label: "Create Time", visible: true },
        { key: 10, label: "Operate", visible: false },
      ],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      customerId: null
    };
  },
  created() {
    const {id} = this.$route.query
    if (id) {
      this.customerId = id
      this.getList(id)
    }
  },
  methods: {
    getCustomerName(row) {
      return this.customerMap.get(Number(row.customerId))
    },
    /** Search客户账户流水列表 */
    getList() {
      if (this.queryParams.Time){
        this.queryParams.startTime = this.queryParams.Time[0]
        this.queryParams.endTime = this.queryParams.Time[1]
      }
      this.loading = true;
      const { pageNum, pageSize } = this.queryParams;
      const query = { ...this.queryParams, pageNum: undefined, pageSize: undefined,customerId:this.customerId };
      const pageReq = { page: pageNum - 1, size: pageSize };
      listWmsCustomerTransaction(query, pageReq).then(response => {
        const { content, totalElements } = response
        this.wmsCustomerTransactionList = content;
        this.total = totalElements;
        this.loading = false;
      });
    },
    // CancelButton
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表Reset
    reset() {
      this.form = {
        id: null,
        transactionCode: null,
        customerId: null,
        transactionType: null,
        transactionAmount: null,
        previousBalance: null,
        currentBalance: null,
        shipmentOrderId: null,
        remark: null,
        createTime: null,
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
      this.reset();
      this.open = true;
      this.title = "New";
    },
    /** ModifyButtonOperate */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWmsCustomerTransaction(id).then(response => {
        this.form = response;
        this.open = true;
        this.title = "Modify";
      });
    },
    /** 提交Button */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWmsCustomerTransaction(this.form).then(response => {
              this.$modal.msgSuccess("Modify Successful");
              this.open = false;
              this.getList();
            });
          } else {
            addWmsCustomerTransaction(this.form).then(response => {
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
      this.$modal.confirm(' Do you want delete 客户账户流水No."' + ids + '"？').then(function () {
        return delWmsCustomerTransaction(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("Delete Successful");
      }).catch(() => { });
    },
    /** ExportButtonOperate */
    handleExport() {
      const queryParams = this.queryParams;
      this.$modal.confirm('Export All客户账户流水？').then(() => {
        this.exportLoading = true;
        return exportWmsCustomerTransaction(queryParams);
      }).then(response => {
        this.$download.download(response);
        this.exportLoading = false;
      }).catch(() => { });
    },
    handleChange(value) {
      if (!value) {
        this.queryParams.startTime = null;
        this.queryParams.endTime = null;
      }
    }
  }
};
</script>
