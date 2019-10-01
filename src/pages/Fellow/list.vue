<template>
  <div class="row">
    <div class="col-12">
      <div class="card" style="padding-bottom: 20px;">
        <div class="card-header">
          <el-row>
            <el-col :span="4" style="text-align: left;">
              <h3>List Fellow</h3>
            </el-col>
            <el-col :span="20">
              <div class="menu-right">
                <el-date-picker
                  v-model="searchMonth"
                  style="margin-right: 10px; width: 200px;"
                  type="month"
                  format="MMMM"
                  value-format="MM"
                  size="small"
                  @change="changeDate"
                  placeholder="Pick a month">
                </el-date-picker>
                <el-input
                  placeholder="Name"
                  suffix-icon="el-icon-search"
                  style="margin-right: 10px; width: 200px;"
                  v-model="search"
                  size="small"
                  clearable>
                </el-input>
                <router-link to="fellow-create"><el-button class="btn-create" type="primary" size="small" icon="el-icon-plus">Create</el-button></router-link>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="card-body">
          <el-table
            :data="filterFellows"
            v-loading.body="loading"
            element-loading-text="Loading"
            style="width: 100%; margin-top: 10px;">
            <el-table-column
              label="Name"
              align="center"
              prop="name"
              sortable
              width="200">
            </el-table-column>
            <el-table-column
              label="Birthday"
              sortable
              prop="birthday"
              align="center"
              width="120">
            </el-table-column>
            <el-table-column
              label="Age"
              sortable
              align="center"
              prop="age"
              width="80">
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
          <div style="padding: 10px;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        pageSize: 0,
        total: 0,
        currentPage: 0,
        search: '',
        searchMonth: '',
        fellows: [],
        fellow: {},
        loading: false,
        loadingActive: false
      }
    },
    created() {
      this.loadData()
    },
    computed: {
      ...mapGetters({
        getFellows: 'getFellows',
        failed: 'getFailed',
        success: 'getSuccess'
      }),
      filterFellows() {
        if (this.searchMonth) {
          return this.fellows.filter(fellow => {
            return fellow.birthday.slice(5, 7).includes(this.searchMonth)
          })
        } else if(this.search) {
          return this.fellows.filter(fellow => {
            return fellow.name.toLowerCase().includes(this.search.toLowerCase())
          })
        } else {
          return this.fellows
        }
      }
    },
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
      handleCurrentChange() {
      },
      handleSizeChange() {
      },
      changeDate() {
        return this.fellows.filter(fellow => {
          return fellow.birthday.slice(5, 7).includes(this.searchMonth)
        })
      },
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