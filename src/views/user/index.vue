<template>
  <section class="home-page">
    <Banner />
    <Daily />
    <Store />
    <About />
    <BecomeHero />
    <Principle />
    <HowWorks />
    <Map />
    <Footer />
  </section>
</template>

<script>
import Banner from '@/components/index/Banner.vue';
import Daily from '@/components/index/Daily.vue';
import Store from '@/components/index/Store.vue';
import About from '@/components/index/About.vue';
import BecomeHero from '@/components/index/BecomeHero';
import Principle from '@/components/index/Principle';
import HowWorks from '@/components/index/HowWorks';
import Map from '@/components/index/Map';
import Footer from '@/components/shared/Footer.vue';

export default {
  name: 'HomePage',
  components: {
    Banner,
    Daily,
    Store,
    About,
    BecomeHero,
    Principle,
    HowWorks,
    Map,
    Footer,
  },
  methods: {
    track() {
      this.$gtag.pageview(this.$route);
    },
  },
  created() {
    this.track();
  },

};
</script>

<style lang="scss" scoped>
</style>
