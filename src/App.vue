<template>
    <div>
        <Header />
        <router-view />
        <Footer />
    </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import '../public/assets/css/bootstrap.min.css';
import '../public/assets/css/style.css';
// import '../public/assets/css/datepicker.css';

export default {
    components: {Header,Footer},
}
</script>