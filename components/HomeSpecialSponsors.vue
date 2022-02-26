<template>
  <div id="sponsors">
    <div class="sponsor-special-block-header">
      <h4>Special Sponsors</h4>
    </div>
    <div class="sponsor-special-block-wrapper">
      <div
        v-for="(patriot, index) in patriots"
        :key="index"
        class="sponsor-special-block"
      >
        <a
          :href="patriot.url"
          target="_blank"
        >
          <div class="sponsor-special-block-image">
            <img
              :src="patriot.logo"
              :alt="patriot.name"
            >
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import {usePageFrontmatter} from '@vuepress/client';
import {isArray} from '@vuepress/shared';
import {computed} from 'vue';
const frontmatter = usePageFrontmatter();
const patriots = computed(() => {
  if (isArray(frontmatter.value.sponsors)) {
    return frontmatter.value.sponsors.filter(sponsor => sponsor.type == 'patriot');
  }
  return [];
});
</script>

<style lang="scss" scoped>
@import './node_modules/@lando/vuepress-theme-default-plus/styles/main.scss';
.lando-home {
  #sponsors {
    border-top: 1px solid var(--c-border);
    text-align: center;
    .sponsor-special-block-wrapper {
      display: flex;
      flex-wrap: wrap;
    }
    .sponsor-special-block-header {
      display: block;
      color: var(--c-brand-light);
    }
    .sponsor-special-block {
      display: inline-flex;
      box-sizing: border-box;
      padding: 2em 1em;
      flex: 3;
      align-items: center;
      justify-content: center;
      .sponsor-special-block-image {
        img {
          margin: 0;
          max-height: 150px;
        }
      }
    }
  }
}
</style>
