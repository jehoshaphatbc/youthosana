<template>
  <div class="row">
    <div class="col-12">
      <div class="card" style="padding-bottom: 20px;">
        <div class="card-header">
          <el-row :gutter="20">
            <el-col :span="20" style="text-align: left;">
              <h3>List Fellow</h3>
            </el-col>
            <el-col :span="4" style="text-align: right;">
              <router-link  to="fellow-create"><el-button type="primary" icon="el-icon-plus" style="width: 100%">Create</el-button></router-link>
            </el-col>
          </el-row>
        </div>
        <div class="card-body">
          <el-table
            :data="fellows"
            v-loading.body="loading"
            element-loading-text="Loading"
            style="width: 100%; margin-top: 10px;">
            <el-table-column
              label="Name">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Birthday"
              width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.birthday }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Age"
              width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.age }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Gender"
              width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.gender }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Email"
              width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.email }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Address"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Phone"
              width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Operations">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleView(scope.row)" icon="el-icon-view"></el-button>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)" icon="el-icon-edit"></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)" icon="el-icon-delete"></el-button>
              </template>
            </el-table-column>
          </el-table>
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
        fellows: [{}],
        loading: false
      }
    },
    created() {
      this.loadData()
    },
    computed: mapGetters({
      getFellows: 'getFellows',
      failed: 'getFailed',
      success: 'getSuccess'
    }),
    watch: {
      getFellows: function(val) {
        // console.log(val)
        this.fellows = val
        this.loading = false
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
          message: 'Data Berhasil Dihapus!',
          type: 'success'
        })
      }
    },
    methods: {
      loadData() {
        this.loading = true
        this.$store.dispatch('loadFellows')
      },
      handleView(index) {
        console.log(index);
      },
      handleEdit(index) {
        console.log(index.id);
        this.$router.push(index.id+'/fellow-edit')
      },
      handleDelete(index) {
        this.$store.dispatch('deleteFellow', index);
      }
    }
  }
</script>