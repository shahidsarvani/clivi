<template>
  <div>
    <header class="header d-none d-md-block">
      <div class="container h-100">
        <div
          class="header__wrapper d-flex align-items-center justify-content-between flex-column flex-md-row"
        >
          <div class="header__wrapper__inner d-flex align-items-center">
            <div class="header__logo h-100 p-0 m-0">
              <a href="/">
                <img class="d-flex" src="../../public/assets/images/logo.svg" />
              </a>
            </div>
            <div class="header__btn__wrap d-flex">
              <a class="btn btn__wrap me-3" href="https://www.apple.com/app-store/">
                <img class="me-2" src="../../public/assets/images/apple.svg" />
                <span>App store</span>
              </a>
              <a class="btn btn__wrap" href="https://play.google.com/store">
                <img class="me-2" src="../../public/assets/images/google.svg" />
                <span>Google play</span>
              </a>
            </div>
          </div>
          <div class="header__wrapper__outter">
            <div class="header__btn__wrap d-flex" v-if="!isLoggedIn">
              >
              <router-link :to="{name: 'login.login'}" class="btn btn__wrap me-3"><span>Login</span></router-link>
              <router-link :to="{name: 'register'}" class="btn btn__wrap"><span>Sign Up</span></router-link>
              <!-- <a class="btn btn__wrap me-3" href="login">
                <span>Login</span>
              </a>
              <a class="btn btn__wrap" href="register">
                <span>Sign Up</span>
              </a> -->
            </div>
            <div class="header__btn__wrap d-flex" v-else>
              <a
                class="btn btn__wrap"
                href="javascript:void(0)"
                @click="logout"
              >
                <span>Log out</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <header class="header d-block d-md-none py-4">
      <div class="container h-100">
        <div class="row gy-4">
          <div class="col-6">
            <div
              class="header__logo h-100 p-0 m-0 justify-content-center d-flex"
            >
              <a href="#">
                <img class="d-flex" src="../../public/assets/images/logo.svg" />
              </a>
            </div>
          </div>
          <div class="col-6">
            <div class="header__btn__wrap d-flex flex-column justify-content-center">
              <a class="btn btn__wrap w-100 me-3" href="#">
                <img class="me-2" src="../../public/assets/images/apple.svg" />
                <span>App store</span>
              </a>
              <a class="btn btn__wrap w-100 mt-3" href="#">
                <img class="me-2" src="../../public/assets/images/google.svg" />
                <span>Google play</span>
              </a>
            </div>
          </div>
          <div class="col-12">
            <div class="header__btn__wrap d-flex justify-content-center" v-if="!isLoggedIn">
              <router-link :to="{name: 'login.login'}" class="btn btn__wrap me-3"><span>Login</span></router-link>
              <router-link :to="{name: 'register'}" class="btn btn__wrap"><span>Sign Up</span></router-link>
              <!-- <a class="btn btn__wrap w-50 me-3" href="#">
                <span>Login</span>
              </a>
              <a class="btn btn__wrap w-50" href="#">
                <span>Sign Up</span>
              </a> -->
            </div>
            <div class="header__btn__wrap d-flex justify-content-center" v-else>
              <a
                class="btn btn__wrap"
                href="javascript:void(0)"
                @click="logout"
              >
                <span>Log out</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn: function () {
      console.log(this.$store.getters.isLoggedIn);
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login');
      });
    },
  },
};
</script>
