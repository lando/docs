---
description: Home helpful generic tutorial and guide content for lando
layout: page
title: Guides
sidebar: false
---

<script setup>
import {VPLCollectionPage, VPLCollectionPageTitle, VPLCollectionItems} from '@lando/vitepress-theme-default-plus';
import {useCollection} from '@lando/vitepress-theme-default-plus';

const {pages} = useCollection('guide');

</script>

<VPLCollectionPage>
  <VPLCollectionPageTitle>
    <template #title>
      Guides
    </template>
    <template #lead>
      Some general purporse Lando tutorials and guides
    </template>
  </VPLCollectionPageTitle>
  <VPLCollectionItems :items="pages"/>
</VPLCollectionPage>
