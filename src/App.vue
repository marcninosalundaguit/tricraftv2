<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
/* Webkit Browsers */
::-webkit-scrollbar {
  width: 12px;
  height: 12px; /* for horizontal scrollbars */
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 50px;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 50px; /* Circular border */
  border: 3px solid #f1f1f1; /* Adds space around thumb */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
