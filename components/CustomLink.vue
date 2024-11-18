<template>
    <div class="link">
      <a :href="link">
        <Icon :name="icon" style="color: white" />
      </a>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    default: 'logos:youtube-icon', // Default currency is BTC
  },
  link: {
    type: String,
    default: 'https://chatgpt.com/', // Default currency is BTC
  },
});

</script>

<style scoped>
.link {
  padding: 5px;
}
</style>