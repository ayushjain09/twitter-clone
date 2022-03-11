<template>
  <div class="flex h-screen w-full">
    <left-navbar />
    <tweet-section />
    <trending-section />
  </div>
</template>

<script>
import LeftNavbar from "../components/HomeComponents/LeftNavbar.vue";
import TweetSection from "../components/HomeComponents/TweetSection.vue";
import TrendingSection from "../components/HomeComponents/TrendingSection.vue";

export default {
  components: {
    LeftNavbar,
    TweetSection,
    TrendingSection,
  },

  created() {
    const name = localStorage.getItem("name");
    const username = localStorage.getItem("username");
    this.$store.dispatch("setAuth", { name, username });
  },
};
</script>

<style></style>
