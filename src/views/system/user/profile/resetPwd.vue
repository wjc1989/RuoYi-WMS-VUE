<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="120px">
    <el-form-item label="旧Password" prop="oldPassword">
      <el-input v-model="user.oldPassword" placeholder="Please Input 旧Password" type="password" show-password/>
    </el-form-item>
    <el-form-item label="新Password" prop="newPassword">
      <el-input v-model="user.newPassword" placeholder="Please Input 新Password" type="password" show-password/>
    </el-form-item>
    <el-form-item label="OKPassword" prop="confirmPassword">
      <el-input v-model="user.confirmPassword" placeholder="请OK新Password" type="password" show-password/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">Add</el-button>
      <el-button type="danger" size="mini" @click="close">Close</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserPwd } from "@/api/system/user";

export default {
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.newPassword !== value) {
        callback(new Error("两次输入的PasswordNo 一致"));
      } else {
        callback();
      }
    };
    return {
      user: {
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined
      },
      // 表校验
      rules: {
        oldPassword: [
          { required: true, message: "旧Password is required", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "新Password is required", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "OKPassword is required", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateUserPwd(this.user.oldPassword, this.user.newPassword).then(response => {
            this.$modal.msgSuccess("Modify Successful");
          });
        }
      });
    },
    close() {
      this.$tab.closePage();
    }
  }
};
</script>
