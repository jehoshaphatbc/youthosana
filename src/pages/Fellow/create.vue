<template>
	<div class="row">
		<div class="col-12">
			<div class="card">
				<div class="card-header">
					<el-row :gutter="20">
				      <el-col :span="20" style="text-align: left;">
				      	<h3>Create Fellow</h3>
				      </el-col>
				      <el-col :span="4" style="text-align: right;">
				        <router-link  to="fellow-list"><el-button type="danger" size="small" icon="el-icon-back">Back</el-button></router-link>
				      </el-col>
				    </el-row>
				</div>
				<div class="card-body">
					<el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
					  <el-form-item label="Photo Profile" prop="url">
              <div class="demo-image">
                <label class="upload-group">
                  <div class="avatar-uploader" key="cover">
                    <el-image
                      v-if="photoProfile"
                      style="width: 200px; height: 200px; border-radius: 5px;"
                      :src="photoProfile"
                      class="avatar"
                      fit="cover"></el-image>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </div>
                  <input type="file" id="file" class="upload-group" @change="onFileSelected">
                </label>
              </div>
            </el-form-item>
            <el-form-item label="Name" prop="name">
					    <el-input v-model="form.name"></el-input>
					  </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
					  <el-form-item label="Birthday" required>
					      <el-form-item prop="birthday">
					        <el-date-picker type="date" placeholder="Pick a date" v-model="form.birthday" format="yyyy/MM/dd"
                  value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
					      </el-form-item>
					  </el-form-item>
					  <el-form-item label="Gender" prop="gender">
					    <el-radio-group v-model="form.gender">
					      <el-radio label="Male"></el-radio>
					      <el-radio label="Female"></el-radio>
					    </el-radio-group>
					  </el-form-item>
            <el-form-item label="Phone" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
					  <el-form-item label="Address" prop="address">
					    <el-input type="textarea" v-model="form.address"></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="submitForm('form')" :loading="loading" size="small">Create</el-button>
					    <el-button @click="resetForm('form')" size="small">Reset</el-button>
					  </el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        photoProfile: '',
        selectedFile: null,
        form: {
          url: '',
          name: '',
          email: '',
          birthday: '',
          address: '',
          phone: '',
          gender: ''
        },
        loading: false,
        rules: {
          name: [
            { required: true, message: 'Please input name', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Please select email', trigger: 'change' }
          ],
          birthday: [
            { required: true, message: 'Tanggal Bergabung tidak boleh kosong', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: 'Please select gender', trigger: 'change' }
          ],
          Address: [
            { required: true, message: 'Please input address', trigger: 'blur' }
          ]
        }
      };
    },
    computed: mapGetters({
      failed: 'getFailed',
      success: 'getSuccess'
    }),
    watch: {
      failed() {
        this.loading = false
        const error = this.$store.getters('getFailed')
        this.$message({
          title: 'Error',
          message: error,
          type: 'error'
        })
      },
      success: function(val) {
        this.loading = false
        this.$message({
          title: 'Success',
          message: 'Data Berhasil Disimpan!',
          type: 'success'
        })
        this.$router.push('/fellow/fellow-list')
      }
    },
    methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('saveFellow', this.form)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      onFileSelected(event) {
        this.form.url = event.target.files[0]
        this.photoProfile = URL.createObjectURL(this.form.url);
      }
    }
  }
</script>

<style>
  input#file {
    width: 0.1px;
    height: 0.1px;
    position: absolute;
    z-index: -1;
  }
  .avatar-uploader {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    width: 200px;
    height: 200px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px !important;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>