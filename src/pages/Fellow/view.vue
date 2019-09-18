<template>
	<div class="row">
		<div class="col-12">
			<card class="card-user">
        <div slot="image">
          <img src="@/assets/img/youthosana.jpg" alt="...">
        </div>
        <div>
          <div class="author">
            <img class="avatar border-white" :src="profile.url" alt="...">
            <h4 class="title">{{ profile.name }}
              <br>
              <a href="#">
                <small>{{ profile.email }}</small>
              </a>
            </h4>
          </div>
        </div>
          <router-link  to="/fellow/fellow-list"><el-button size="small" type="danger" icon="el-icon-back">Back</el-button></router-link>
      </card>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        profile: {
          id: '',
          url: '',
          name: '',
          email: '',
          birthday: '',
          address: '',
          phone: '',
          status: '',
          gender: ''
        }
      };
    },
    created() {
      this.getData(this.$route.params.id)
    },
    computed: mapGetters({
      data: 'getFellow',
    }),
    watch: {
      data: function(val) {
        this.profile.id = val.id
        this.profile.name = val.name
        this.profile.email = val.email
        this.profile.birthday = val.birthday
        this.profile.address = val.address
        this.profile.phone = val.phone
        this.profile.gender = val.gender
        this.profile.status = val.status
        this.profile.url = val.url
      }
    },
    methods: {
      getData(id) {
        this.$store.dispatch('getFellowId', id)
      }
    }
  }
</script>