---
description: Home helpful troubleshooting materials for Lando
layout: page
title: Troubleshooting
sidebar: false
---

<script setup>
import {VPLCollectionPage, VPLCollectionPageTitle, VPLCollectionItems} from '@lando/vitepress-theme-default-plus';
import {useCollection} from '@lando/vitepress-theme-default-plus';

const {pages} = useCollection('troubleshooting');

</script>

<VPLCollectionPage>
  <VPLCollectionPageTitle>
    <template #title>
      Troubleshooting
    </template>
    <template #lead>
      Home helpful troubleshooting materials for Lando
    </template>
  </VPLCollectionPageTitle>
  <VPLCollectionItems :items="pages"/>
</VPLCollectionPage>
