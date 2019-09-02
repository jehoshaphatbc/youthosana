<template>
  <card class="card-user">
    <div slot="image">
      <img src="@/assets/img/background.jpg" alt="...">
    </div>
    <div>
      <div class="author">
        <img class="avatar border-white" src="@/assets/img/faces/face-2.jpg" alt="...">
        <h4 class="title">{{ profile.displayName }}
          <br>
          <a href="#">
            <small>{{ profile.email }}</small>
          </a>
        </h4>
      </div>
      <!-- <p class="description text-center">
        "I like the way you work it
        <br> No diggity
        <br> I wanna bag it up"
      </p> -->
    </div>
  </card>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      profile: {
        displayName: '',
        email: ''
      }
    };
  },
  created() {
    this.getUser();
    this.getLogin();
    
  },
  methods: {
    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return "col-lg-3 offset-lg-1";
      } else if (remainder === 2) {
        return "col-lg-4";
      } else {
        return "col-lg-3";
      }
    },
    getUser() {
    	// firebase.database().ref("users").on("value", (snapshot) => {
    	// 	this.profile.email = snapshot.val().email;
    	// 	this.profile.username = snapshot.val().username;
    	// 	this.profile.role = snapshot.val().role;
    	// })
    },
    getLogin() {
    	this.user = firebase.auth().currentUser; 
      if(this.user) { 
        this.profile.displayName = this.user.displayName; 
        this.profile.email = this.user.email; 
      }
    }
  }
};
</script>
<style>
</style>
