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
				        <router-link  to="fellow-list"><el-button type="info" icon="el-icon-back" style="width: 100%">Back</el-button></router-link>
				      </el-col>
				    </el-row>
				</div>
				<div class="card-body">
					<el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
					  <el-form-item label="Photo Profile" prop="photoProfile">
              <label class="upload-group">
                Upload Image
                <input type="file" id="file" class="upload-group" @change="onFileSelected">
              </label>
              <el-button type="primary" icon="el-icon-back" style="width: 10%; margin-left: 20px;" @click="onUpload">Upload</el-button>
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
					    <el-button type="primary" @click="submitForm('form')" :loading="loading">Create</el-button>
					    <el-button @click="resetForm('form')">Reset</el-button>
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
        selectedFile: null,
        form: {
          photoProfile: '',
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
        console.log(this.form)
        // this.$refs[form].validate((valid) => {
        //   if (valid) {
        //     this.loading = true
        //     this.$store.dispatch('saveFellow', this.form)
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      onFileSelected(event) {
        this.form.photoProfile = event.target.files[0]
      },
      onUpload() {
        var fileName = this.selectedFile.name
        var storageRef = firebase.storage().ref('/profile/' + fileName)
        var uploadTask = storageRef.put(this.selectedFile)

        uploadTask.on('state_changed', function(snapshot) {

        }, function(error) {

        }, function() {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
          });
        })
      }
    }
  }
</script>

<style>
  label.upload-group {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #FFF !important;
    background-color: #409EFF;
    border-color: #409EFF;
  }

  label.upload-group:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #FFF;
  }

  input#file {
    width: 0.1px;
    height: 0.1px;
    position: absolute;
    z-index: -1;
  }
</style>