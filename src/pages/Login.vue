<template>
  <div id="app" class="login">
    <img alt="Vue logo" src="../assets/img/youthosana-logo.png" />
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email" /><br />
    <input type="password" v-model="password" placeholder="Password" /><br />
    <el-button type="primary" round @click="login">Login</el-button>
    <p>
      Or sign in with others <br />
      <button class="social-button" @click="googleLogin">
        <img alt="Google Logo" src="../assets/img/google-logo.png" />
      </button>
      <button class="social-button btn-facebook" @click="facebookLogin">
        <img alt="Facebook Logo" src="../assets/img/facebook-logo.png" />
      </button>
    </p>
    <p>
      You don't have an account? You can
      <router-link to="/signup">create one</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace("profile");
          },
          err => {
            alert("Ops." + err.message);
          }
        );
    },
    googleLogin: function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.$router.replace("profile");
        })
        .catch(err => {
          alert("Ops!" + err.message);
        });
    },
    facebookLogin: function() {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.$router.replace("profile");
        })
        .catch(err => {
          alert("Ops!" + err.message);
        });
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.login {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 10px;
  width: 10%;
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
.social-button {
  width: 50px;
  background: #fff;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  outline: 0;
  border: 0;
}
.social-button:active {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.social-button img {
  width: 100%;
}
.btn-facebook {
  background: #3a559f;
  margin-left: 10px;
}
</style>