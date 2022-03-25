<template>
  <div class="days_wrap p-4">
    <div class="days_inner px-5 pb-3 deadline-format">
      <div class="day_single">
        <h3>{{ days }}</h3>
        <span>Days</span>
      </div>
      <div class="day_single">
        <h3>{{ hours }}</h3>
        <span>Hours</span>
      </div>
      <div class="day_single">
        <h3>{{ mins }}</h3>
        <span>Mins</span>
      </div>
      <div class="day_single">
        <h3>{{ secs }}</h3>
        <span>Secs</span>
      </div>
    </div>
    <div class="content_days_inner d-flex justify-content-between mt-4">
      <!-- <div class="content_single ps-3">
        <h3>10M</h3>
        <h3>app downloads</h3>
      </div>
      <div class="content_single ps-3 ms-2 ms-lg-0">
        <h3>300K</h3>
        <h3>device connections</h3>
      </div> -->
      <div class="content_single ps-3">
        <h3>{{ user_count }}</h3>
        <h3>registered users</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import '../axios';

export default {
  name: 'TimerCountdown',
  data() {
    return {
      user_count: 0,
      futureDate: new Date(2022, 4, 30),
      futureTime: null,
      today: null,
      days: null,
      hours: null,
      mins: null,
      secs: null,
      countdown: null,
    };
  },
  mounted() {
    this.futureTime = this.futureDate.getTime();
    this.countdownInterval();
    this.get_user_count();
  },
  methods: {
    async get_user_count() {
      let response = await axios.get('/api/get_user_count');
      this.user_count = response.data.users_count;

    },
    countdownTimer() {
      const t = this.futureTime - this.today;

      const oneDay = 24 * 60 * 60 * 1000;
      const oneHour = 60 * 60 * 1000;
      const oneMinute = 60 * 1000;

      let days = Math.floor(t / oneDay);
      let hours = Math.floor((t % oneDay) / oneHour);
      let minutes = Math.floor((t % oneHour) / oneMinute);
      let seconds = Math.floor((t % oneMinute) / 1000);

      function format(value) {
        if (value < 10) {
          return (value = `0${value}`);
        }
        return value;
      }

      this.days = format(days);
      this.hours = format(hours);
      this.mins = format(minutes);
      this.secs = format(seconds);

      if (t < 0) {
        clearInterval(this.countdown);
      }
    },
    countdownInterval() {
      this.countdown = setInterval(
        function () {
          this.today = new Date().getTime();
          this.countdownTimer();
        }.bind(this),
        1000
      );
    },
  },
};
</script>
