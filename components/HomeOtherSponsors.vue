<template>
  <div
    class="home hero"
    id="other_sponsors"
  >
    <div class="sponsor-other-block-header">
      <h4>Other Sponsors</h4>
    </div>
    <div class="sponsor-ally-block-wrapper">
      <div
        v-for="(ally, index) in allies"
        :key="index"
        class="sponsor-ally-block"
      >
        <a
          :href="ally.url"
          target="_blank"
        >
          <div class="sponsor-ally-block-image">
            <img
              :src="ally.logo"
              :alt="ally.name"
            >
          </div>
        </a>
      </div>
    </div>

    <div class="sponsor-herald-block-wrapper">
      <div class="sponsor-herald-block">
        <span
          v-for="(herald, index) in heralds"
          :key="index"
          class="sponsor-herald"
        >
          <a
            :href="herald.url"
            target="_blank">
            {{ herald.name }}
          </a>
        </span>
      </div>
    </div>

    <AutoLink
      class="action-button"
      :class="[sponsorLink.type]"
      :item="sponsorLink"
    />
  </div>
</template>

<script setup>
import AutoLink from '@theme/AutoLink.vue';
import {usePageFrontmatter} from '@vuepress/client';
import {isArray} from '@vuepress/shared';
import {computed} from 'vue';
const frontmatter = usePageFrontmatter();
const allies = computed(() => {
  if (isArray(frontmatter.value.sponsors)) {
    return frontmatter.value.sponsors.filter(sponsor => sponsor.type == 'ally');
  }
  return [];
});
const heralds = computed(() => {
  if (isArray(frontmatter.value.sponsors)) {
    return frontmatter.value.sponsors.filter(sponsor => sponsor.type == 'herald');
  }
  return [];
});
const sponsorLink = {
  text: 'Become a Sponsor',
  link: 'https://lando.dev/sponsor',
  type: 'secondary',
};
</script>

<style lang="scss">
@import './node_modules/@lando/vuepress-theme-default-plus/styles/main.scss';
.lando-home {
  #other_sponsors {
    background-color: var(--c-bg-lighter);
    padding: 3rem;
    border-top: 1px solid var(--c-border);
    border-bottom: 1px solid var(--c-border);
    text-align: center;
    .sponsor-other-block-header {
      display: block;
      color: var(--c-brand-light);
    }
    .sponsor-ally-block-wrapper {
      display: flex;
      margin: 2em 0;
      justify-content: space-evenly;
      align-content: center;
      flex-wrap: wrap;
      .sponsor-ally-block {
        min-width: 100px;
        max-width: 20%;
        vertical-align: middle;
        box-sizing: border-box;
      }
      .sponsor-ally-block-image {
        img {
          margin: 0;
          width: 75px;
          filter: grayscale(1);
          &:hover {
            filter: none;
          }
        }
      }
    }
    .sponsor-herald-block-wrapper {
      padding-top: 4em;
      padding-bottom: 4em;
      line-height: 3;
      text-align: justify;
      a {
        color: #476582;
        font-weight: 800;
        font-size: 1.2em;
        &:after {
          content: ', ';
        }
        &:hover {
          color: var(--c-brand);
        }
      }
      .sponsor-herald {
        &:last-child {
          a {
            &:after {
              content: '';
            }
          }
        }
      }
    }
  }
}
</style>
