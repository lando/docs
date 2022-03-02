<template>
  <div
    v-if="features.length"
    class="features"
  >
    <div
      v-for="feature in features"
      :key="feature.title"
      class="feature"
    >
      <h2>{{ feature.title }}</h2>
      <p>{{ feature.details }}</p>
    </div>
  </div>
</template>

<script setup>
import {usePageFrontmatter} from '@vuepress/client';
import {isArray} from '@vuepress/shared';
import {computed} from 'vue';
const frontmatter = usePageFrontmatter();
const features = computed(() => {
  if (isArray(frontmatter.value.features)) {
    return frontmatter.value.features;
  }
  return [];
});
</script>

<style lang="scss" scoped>
@import './node_modules/@lando/vuepress-theme-default-plus/styles/main.scss';
.home {
  .features {
    margin-bottom: 4.2rem;
    border-bottom: 1px solid var(--c-border);
  }
  .feature {
    text-align: center;
  }
}
</style>
