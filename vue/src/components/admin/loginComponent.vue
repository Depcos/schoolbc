<template>
  <div>
    <h2>Login</h2>
    <form v-on:submit="login">
      <input type="text" name="email" /><br>
      <input type="password" name="password" /><br>
      <input type="submit" value="Login" />
    </form>
  </div>

</template>

<script>
//import router from "../router"



import axios from "axios"

export default {
name: "loginComponent",
  emits:['logged'],
components:{

},

  methods: {
islogged(){
  this.$emit('logged');
},

    login(e) {
 const self = this;
      e.preventDefault();
      let email = e.target.elements.email.value
      let password = e.target.elements.password.value
      let login = () => {
        let data = {
          email: email,
          password: password
        }

        axios.post("http://localhost:3000/api/login", data)
            .then((response) => {
              console.log(response);
              console.log("Logged in")
              self.islogged();

             // router.push("/admin")
            })
            .catch((errors) => {
              console.log(errors);
              console.log("Cannot log in")
            })
      }
      login()
    }

  }

}


</script>

<style scoped>

</style>