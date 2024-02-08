---
description: Learn the Lando basics with Lando 101
layout: page
title: Lando 101
sidebar: false
---

<script setup>
import {VPLCollectionPage, VPLCollectionPageTitle, VPLCollectionItems} from '@lando/vitepress-theme-default-plus';
import {useCollection} from '@lando/vitepress-theme-default-plus';
const {pages} = useCollection('lando101');
</script>

<VPLCollectionPage>
  <VPLCollectionPageTitle>
    <template #title>
      Lando 101
    </template>
    <template #lead>
      Learn the basics with Lando 101
    </template>
  </VPLCollectionPageTitle>
  <VPLCollectionItems :items="pages"/>
</VPLCollectionPage>
