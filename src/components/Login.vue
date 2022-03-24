<template>
  <div>
    <section class="main_section">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-5 me-auto">
            <div class="content_main_inner my-4">
              <h3>Good Coming!</h3>
              <p>join the beta & get rewards bringing your squad!</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6 col-lg-5 d-flex align-items-center">
            <div class="invite_wrap p-3">
              <h3>Invite Friends & <span>earn products</span></h3>
              <form class="mt-3" @submit.prevent="handleSubmit">
                <div class="row gy-3 gx-2">
                  <div class="col-12">
                    <div class="input_wrapper">
                      <input
                        class="input_single w-100"
                        id="email"
                        type="email"
                        placeholder="Email/username"
                        v-model="form.email"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="input_wrapper">
                      <input
                        class="input_single w-100"
                        id="password"
                        type="password"
                        placeholder="Password"
                        v-model="form.password"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form_btn">
                      <button type="submit" class="btn btn_form w-100">
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-5 ms-auto d-flex align-items-center">
            <TimerCountdown />
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="featured_gamers my-2">
              <h3>Last registered users</h3>
              <div
                class="featured_inner d-flex justify-content-start py-3 px-3 px-lg-5 flex-wrap"
              >
                <div
                  class="gamer_single d-flex align-items-center py-3 py-lg-0"
                  v-if="users.length > 0"
                  v-for:="user in users"
                >
                  <img :src="user.image_url" />
                  <div class="gamer_detail ms-3">
                    <h3 class="mb-1">{{ user.username }}</h3>
                    <span>{{ user.registered_at }}</span>
                  </div>
                </div>
                <div v-if="users.length <= 0">
                  <h5 class="text-white">No User Found</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TimerCountdown from './TimerCountdown.vue';
import axios from 'axios';
import '../axios';

const getFormData = (object) =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());

export default {
  name: 'Login',
  components: { TimerCountdown },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      users: '',
    };
  },
  async mounted() {
    let users = await this.get_users();
    this.users = users.users;
  },
  methods: {
    async handleSubmit() {
      if (!this.form.email) {
        document.getElementById('email').classList.add('invalid');
      } else {
        document.getElementById('email').classList.remove('invalid');
      }
      if (!this.form.password) {
        document.getElementById('password').classList.add('invalid');
      } else {
        document.getElementById('password').classList.remove('invalid');
      }
      var bodyFormData = getFormData(this.form);
      const response = await axios.post('/api/login', bodyFormData);
      if (response.data.status == 1) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common.Authorization =
          'Bearer ' + response.data.token;
        this.$store.dispatch('login', response.data);
        if (this.$store.getters.isLoggedIn) {
          this.$router.push('/dashboard');
        }
      } else if (response.data.status == 0) {
        alert(response.data.message);
      } else if (response.data.status == 3) {
        console.log(response.data.message);
        Object.keys(response.data.message).map((index, value) => {
          console.log(value);
          console.log(document.getElementById(index));
          document.getElementById(index).classList.add('invalid');
        });
      }
    },
    async get_users() {
      let response = await axios.get('/api/get_users');
      return response.data;
    },
  },
};
</script>
