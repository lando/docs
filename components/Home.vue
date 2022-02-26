<template>
  <div class="home-wrapper">
    <main class="home">
      <HomeHero />
      <HomeSpecialSponsors />
      <HomeFeatures />
      <HomeContent />
      <HomeOtherSponsors />
      <MailChimp
        action="https://dev.us12.list-manage.com/subscribe/post?u=59874b4d6910fa65e724a4648&amp;id=613837077f"
        title="Lando Newsletter"
        byline="Join our revolution to free developers from the mind forged manacled of lesser dev tools"
      />
    </main>
    <div class="footer-wrapper">
      <HomeFooter />
    </div>
  </div>
</template>

<script setup>
import HomeOtherSponsors from './HomeOtherSponsors.vue';
import HomeContent from '@theme/HomeContent.vue';
import HomeFeatures from './HomeFeatures.vue';
import HomeFooter from './HomeFooter.vue';
import HomeHero from './HomeHero.vue';
import HomeSpecialSponsors from './HomeSpecialSponsors.vue';
</script>

<style lang="scss">
@import './node_modules/@lando/vuepress-theme-default-plus/styles/main.scss';
.lando-home {
  #main-title {
    display: none;
  }
}
</style>
