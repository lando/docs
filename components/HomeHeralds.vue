<template>
  <div id="heralds" class="smaller-inner">
    <h4 class="strikethrough">heralds</h4>
    <div class="sponsor-herald-block">
      <span v-for="(herald, index) in heralds" :key="index" class="sponsor-herald">
        <a :href="herald.url" target="_blank">{{ herald.name }}</a>
      </span>
    </div>
  </div>
  <!-- <iframe src="https://github.com/sponsors/lando/card" title="Sponsor lando" height="225" width="600" style="border: 0;"></iframe> -->
</template>

<script setup>
import {usePageFrontmatter} from '@vuepress/client';
import {isArray} from '@vuepress/shared';
import {computed} from 'vue';
const frontmatter = usePageFrontmatter();
const heralds = computed(() => {
  if (isArray(frontmatter.value.sponsors)) {
    return frontmatter.value.sponsors.filter(sponsor => sponsor.type == 'herald');
  }
  return [];
});
</script>

<style lang="scss">
@import './node_modules/@lando/vuepress-theme-default-plus/styles/main.scss';

</style>
