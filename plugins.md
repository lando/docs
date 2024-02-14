---
title: Plugins
description: Browse, filter, sort, search and vibe all the plugins in the Lando ecosystem
layout: page
sidebar: false
aside: false
---
<VPLCollectionPage>
  <VPLCollectionPageTitle>
    <template #title>
      Plugins
    </template>
    <template #lead>
      Helpful tutorial-like content!
    </template>
  </VPLCollectionPageTitle>
  <VPLCollectionPageTags v-model="selectedTags" />
  <VPLPluginItems :items="pages" :tags="selectedTags"/>
</VPLCollectionPage>

<script setup>
import {useCollection} from '@lando/vitepress-theme-default-plus';
import {VPLCollectionPage, VPLCollectionPageTags, VPLCollectionPageTitle} from '@lando/vitepress-theme-default-plus';
import VPLPluginItems from '.vitepress/theme/VPLPluginItems.vue';

const {pages, selectedTags} = useCollection('plugins');
</script>
