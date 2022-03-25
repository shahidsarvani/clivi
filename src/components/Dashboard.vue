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
              <p class="text-light">
                Share your unique link and earn points for each friend who signs
                up!
              </p>
              <form class="mt-3">
                <div class="row gy-3 gx-2">
                  <div class="col-12">
                    <div class="input_wrapper position-relative">
                      <input
                        class="copy_field w-100"
                        type="text"
                        placeholder="https://www.clivi.com/cristiano"
                        ref="clone"
                        name="email"
                        readonly
                        :value="referral_link"
                        v-on:focus="$event.target.select()"
                      />
                      <button
                        type="submit"
                        class="btn btn_form_copy"
                        @click="copy_field"
                      >
                        Copy
                      </button>
                    </div>

                    <div
                      class="social__icon d-flex justify-content-center align-items-center flex-wrap"
                    >
                      <a href="#">
                        <img src="../../public/assets/images/footer.svg" />
                      </a>
                      <a href="#">
                        <img src="../../public/assets/images/footer2.svg" />
                      </a>
                      <a href="#">
                        <img src="../../public/assets/images/footer3.svg" />
                      </a>
                      <a href="#">
                        <img src="../../public/assets/images/Instagram.svg" />
                      </a>
                      <a href="#">
                        <img src="../../public/assets/images/Twitter.svg" />
                      </a>
                      <a href="#">
                        <img src="../../public/assets/images/YouTube.svg" />
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-5 ms-auto d-flex align-items-center">
            <TimerCountdown />
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
                    v-if="referred_users.length > 0"
                    v-for:="referred_user in referred_users">
                    <img :src="referred_user.image_url" />
                    <div class="gamer_detail ms-3">
                      <h3 class="mb-1">{{ referred_user.username }}</h3>
                      <span>{{ referred_user.registered_at }}</span>
                    </div>
                  </div>
                  <div v-if="referred_users.length <= 0">
                    <h5 class="text-white">No User Found</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="rewards__sec py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="title_rewards m-auto d-flex justify-content-around">
              <h2 class="txt-reward text-light">Available rewards</h2>
              <h2 class="txt-neon">total: {{ user.points }} points</h2>
            </div>
          </div>
        </div>

        <div class="row pt-4">
          <div class="col">
            <div class="reward__card">
              <div class="reward__card__img">
                <img src="../../public/assets/images/handshake.svg" alt="" />
              </div>
              <div class="description">
                <h4 class="text-light">3 points</h4>
                <span class="text__neon">Clivi partner</span>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="reward__card">
              <div class="reward__card__img">
                <img src="../../public/assets/images/bluemark.svg" alt="" />
              </div>
              <div class="description">
                <h4 class="text-light">7 points</h4>
                <span class="text__neon"
                  >Clivi exclusive to use within the App</span
                >
              </div>
            </div>
          </div>

          <div class="col">
            <div class="reward__card">
              <div class="reward__card__img">
                <img src="../../public/assets/images/money.svg" alt="" />
              </div>
              <div class="description">
                <h4 class="text-light">16 points</h4>
                <span class="text__neon">€10 within the app</span>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="reward__card">
              <div class="reward__card__img">
                <img src="../../public/assets/images/champion.svg" alt="" />
              </div>
              <div class="description">
                <h4 class="text-light">28 points</h4>
                <span class="text__neon"
                  >participate in a €500+ tournament</span
                >
              </div>
            </div>
          </div>

          <div class="col">
            <div class="reward__card">
              <div class="reward__card__img">
                <img src="../../public/assets/images/statictics.svg" alt="" />
              </div>
              <div class="description">
                <h4 class="text-light">50 points</h4>
                <span class="text__neon">PC Gaming / Ps5 / €1,000 raffle</span>
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

export default {
  name: 'Dashboard',
  components: { TimerCountdown },
  data() {
    return {
      user: '',
      referred_users: '',
      referral_link: '',
    };
  },
  async mounted() {
    axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
    this.user = await this.get_user_data();
    this.referral_link = 'https://clivi.com/register/' + this.user.username;
    let referred_users = await this.get_users();
    this.referred_users = referred_users.users;
  },
  methods: {
    async get_user_data() {
      let response = await axios.get('/api/get_user');
      return response.data;
    },
    async get_users() {
      let response = await axios.get('/api/get_users');
      return response.data;
    },
    async get_referred_users() {
      let response = await axios.get('/api/get_referred_users');
      return response.data;
    },
    copy_field(e) {
      e.preventDefault();
      this.$refs.clone.focus();
      document.execCommand('copy');
    },
  },
};
</script>
