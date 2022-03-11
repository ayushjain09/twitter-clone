<template>
  <div class="bg-gray-800" style="height: 100vh; width: 100vw">
    <div class="grid place-items-center h-screen">
      <AuthDialog>
        <router-view></router-view>
      </AuthDialog>
    </div>
  </div>
</template>

<script>
import AuthDialog from "../components/Auth/AuthDialog.vue";

export default {
  components: {
    AuthDialog,
  },
};
</script>

<style></style>
