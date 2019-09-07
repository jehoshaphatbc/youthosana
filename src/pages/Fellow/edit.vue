<template>
	<div class="row">
		<div class="col-12">
			<div class="card">
				<div class="card-header">
					<el-row :gutter="20">
				      <el-col :span="20" style="text-align: left;">
				      	<h3>Edit Fellow</h3>
				      </el-col>
				      <el-col :span="4" style="text-align: right;">
				        <router-link  to="/fellow/fellow-list"><el-button type="info" icon="el-icon-back" style="width: 100%">Back</el-button></router-link>
				      </el-col>
				    </el-row>
				</div>
				<div class="card-body">
					<el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
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
					    <el-button type="primary" @click="submitForm('form')" :loading="loading">Update</el-button>
					    <el-button @click="resetForm('form')">Reset</el-button>
					  </el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        form: {
          id: '',
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
    created() {
      this.getData(this.$route.params.id)
    },
    computed: mapGetters({
      failed: 'getFailed',
      data: 'getFellow',
      success: 'getSuccess'
    }),
    watch: {
      data: function(val) {
        this.form.id = val.id
        this.form.name = val.name
        this.form.email = val.email
        this.form.birthday = val.birthday
        this.form.address = val.address
        this.form.phone = val.phone
        this.form.gender = val.gender
      },
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
      getData(id) {
        this.$store.dispatch('getFellowId', id)
      },
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('updateFellow', this.form)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>