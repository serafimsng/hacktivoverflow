<template>
  <form class="form-signin mx-auto" style="width: 30vw; height: 70vh;margin-top: 20vh;">
        <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
        <label for="inputUsername" class="sr-only">Username</label>
        <input v-model="username" type="text" id="inputUsername" class="form-control" placeholder="Username" required="" autofocus="">
        <label for="inputEmail" class="sr-only">Email address</label>
        <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
        <button class="btn btn-lg btn-primary btn-block" type="submit" v-on:click.prevent="register">Sign up</button>
        <p><router-link :to="`/login`">Login Here</router-link></p>
        <p>or</p>
        <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" ></GoogleLogin>
        <p class="mt-5 mb-3 text-muted">© 2020-2021</p>
    </form>
</template>

<script src="https://apis.google.com/js/platform.js" async defer></script>
<script>
import GoogleLogin from 'vue-google-login'
import axios from 'axios'
export default {
    name: 'registration',
    data(){
        return{
            username: '',
            email: '',
            password:'',
            params: {
                client_id: process.env.VUE_APP_GOOGLE_ID
            },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    components:{
        GoogleLogin
    },
    methods:{
        onSuccess(googleUser) {
        const profile = googleUser.getBasicProfile();
        const id_token = googleUser.getAuthResponse().id_token;
        axios({
            method: 'post',
            url: 'http://3.134.253.117:3000/user/gsignin',
            data: {
                id_token
            }
        })
        .then(({data})=>{
            console.log(data, 'hasil gsignin')
            localStorage.setItem('token', data.token)
            localStorage.setItem('email', data.payload.email)
            this.$router.push('/')
        })
        .catch(err=>{
            console.log(err)
        })
        },
        register(){
            let payload = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('registerUser', payload)
        },
        
    }
}
</script>

<style>
input{
  margin-top:2vh;
}
</style>