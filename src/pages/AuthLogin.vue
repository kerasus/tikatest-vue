<template>
  <div id="q-app ">
    <div class="row justify-center items-center fullscreen q-px-lg">
      <div class="col-5" >
        <q-card v-if="!userLogin" class="my-card q-mt-auto shadow-6">
          <q-card-section class="row bg-light-blue-6 text-white justify-between">
            <div class="row justify-center items-center text-h6">
              <q-img v-if="false" src="https://www.matiaan.com/wp-content/uploads/2017/09/logoNormal-01.png" alt="matiaan-logo" width="20px" />
              <p class="q-ml-md q-mb-none">ورود</p>
            </div>
            <img src="https://www.matiaan.com/wp-content/uploads/2017/09/logoNormal-01.png" alt="logo">
          </q-card-section>
          <q-linear-progress v-if="loadingList" color="warning" class="q-mt-sm" />
          <q-separator></q-separator>
          <div class="q-pa-lg">
            <q-input
              bottom-slots
              color="blue-8"
              ref="userName"
              name="userName"
              v-model="username"
              label="شماره همراه"
              @keydown="getEnter"
            >
              <template v-slot:before>
                <q-icon name="person"></q-icon>
              </template>
            </q-input>
            <q-input
              color="blue-8"
              bottom-slots
              ref="pass"
              name="pass"
              v-model="password"
              label="رمز"
              @keydown="getEnter"
              type="password">
              <template v-slot:before>
                <q-icon name="lock"></q-icon>
              </template>
            </q-input>
            <q-card-actions align="left">
              <q-btn  style="width: 80px" color="blue-8" label="ورود" @click="login"/>
            </q-card-actions>
          </div>
        </q-card>
      </div>
    </div>
  </div>

</template>

<script>
// import { mixinAuth } from 'src/mixin/Mixins'
export default {
  name: 'AuthLogin',
  // mixins: [mixinAuth],
  data: () => ({
    userLogin: false,
    loadingList: false,
    username: null,
    password: null
  }),
  created () {
    if (this.getToken()) {
      this.getUserData(() => { this.redirectTo() })
    }
  },
  methods: {
    getToken () {
      return this.$store.getters['Auth/accessToken']
    },

    getEnter (e) {
      const actions = {
        pass: () => this.login(),
        userName: () => this.$refs.pass.focus()
      }
      if (e.keyCode === 13) actions[e.originalTarget.name].call()
    },

    redirectTo () {
      let redirectTo = window.localStorage.getItem('redirectTo')
      if (!redirectTo) {
        redirectTo = 'Dashboard'
      }
      this.$router.push({ name: redirectTo })
    },

    getUserData (callbasck) {
      const that = this
      // this.user.getUserData()
      // this.$axios.get(API_ADDRESS.user.show_user)
      //   .then((response) => {
      //     that.$store.commit('Auth/updateUser', response.data.data)
      //     if (typeof callbasck === 'function') {
      //       callbasck()
      //     }
      //   })
    },
    handleErr (err) {
      this.loadingList = false
      const messages = []
      for (const key in err.data.errors) {
        err.data.errors[key].forEach(message => {
          this.$q.notify({
            type: 'negative',
            message: message,
            position: 'top'
          })
        })
      }
      if (!err.data.errors) {
        if (err.data.message) messages.push(err.data.message)
        else messages.push(err.statusText)
        this.$q.notify({
          type: 'negative',
          message: messages,
          position: 'top'
        })
      }
    },

    login () {
      this.loadingList = true
      this.$store.dispatch('Auth/login', {
        username: this.username,
        password: this.password
      })
        .then(() => {
          this.loadingList = false
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
          this.redirectTo()
        })
        .catch(err => {
          console.log('in auth :', err)
          this.handleErr(err.response)
        })
    }
  }
}
</script>

<style scoped>

</style>
