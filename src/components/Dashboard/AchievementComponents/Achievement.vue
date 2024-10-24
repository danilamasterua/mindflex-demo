<script setup lang="ts">
import type {Achievement} from "@/ts/model/Achievement";

const props = defineProps<{
  achievement: Achievement
}>()

</script>

<template>
  <div>
    <h5>{{ props.achievement.name }}</h5>
  </div>
  <div class="bg-white rounded border shadow-sm p-2">
    {{ props.achievement.description }}
  </div>
</template>

<style scoped>

</style>