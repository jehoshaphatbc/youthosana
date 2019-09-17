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
              label="Name"
              align="center"
              width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Birthday"
              align="center"
              width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.birthday }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Age"
              align="center"
              width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.age }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Gender"
              align="center"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.gender == 'Male'"><i class="el-icon-male"></i></span>
                <span v-else><i class="el-icon-female"></i></span>
              </template>
            </el-table-column>
            <el-table-column
              label="Address"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Phone"
              width="150"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Operations"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleView(scope.row)" icon="el-icon-view"></el-button>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)" icon="el-icon-edit"></el-button>
                <el-button type="success" size="mini" v-if="scope.row.status == 1" @click="onActive(scope.row, 0)"><i class="el-icon-check" :loading="loadingActive"></i> Active</el-button>
                <el-button type="info" size="mini" v-if="scope.row.status == 0" @click="onActive(scope.row, 1)" :loading="loadingActive"><i class="el-icon-close"></i> Non Active</el-button>
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
        fellow: {},
        loading: false,
        loadingActive: false
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
        this.loadingActive = false
        this.$message({
          title: 'Success',
          message: 'Data Berhasil Diubah!',
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
        this.$router.push(index.id+'/fellow-view')
        // const data = this.$store.getters.getFellowById(index.id)
        // this.fellow = data
      },
      handleEdit(index) {
        this.$router.push(index.id+'/fellow-edit')
      },
      onActive(data, active) {
        this.loadingActive = true
        data.status = active
        this.$store.dispatch('activeFellow', data)
      }
    }
  }
</script>