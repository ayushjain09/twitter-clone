<template>
  <div
    class="lg:w-1/5 border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between"
  >
    <!-- upper buttons -->
    <div>
      <button
        class="h-12 w-12 text-blue-400 text-3xl hover:bg-sky-100 rounded-full"
      >
        <i class="fa-brands fa-twitter w-full"></i>
      </button>
      <div>
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="flex items-center px-4 py-2 hover:bg-sky-100 hover:text-blue-400 rounded-full mr-auto mb-3"
          :class="`${id === tab.id ? 'text-blue-400' : ''}`"
          @click="id = tab.id"
        >
          <i :class="`${tab.icon} mr-4 text-2xl`"></i>
          <p class="text-lg hidden lg:block">{{ tab.title }}</p>
        </button>
      </div>

      <button
        class="w-12 h-12 lg:w-full bg-blue-400 text-white font-semibold px-4 py-3 rounded-full mt-2 hover:bg-blue-500"
      >
        <p class="hidden lg:block">Tweet</p>
        <i class="fas fa-plus lg:hidden"></i>
      </button>
    </div>

    <!-- lower button/profile btn -->
    <div class="lg:w-full relative">
      <button
        class="flex items-center w-full hover:bg-sky-100 rounded-full p-2"
        @click="dropdown = !dropdown"
      >
        <img src="user.png" alt="" class="h-10 w-10 rounded-full" />
        <div class="ml-4 hidden lg:block">
          <p class="text-sm font-semibold">{{ name }}</p>
          <p class="text-sm">@{{ userName }}</p>
        </div>
        <i class="fas fa-ellipsis-h ml-auto hidden lg:block"></i>
      </button>

      <!-- dropdown -->
      <div
        class="absolute bottom-0 left-0 w-64 shadow-md mb-16 rounded-md divide-y bg-white"
        v-if="dropdown"
      >
        <button class="flex items-center w-full p-2 mb-2">
          <img src="user.png" alt="" class="h-10 w-10 rounded-full" />
          <div class="ml-4">
            <p class="text-sm font-semibold">{{ name }}</p>
            <p class="text-sm">@{{ userName }}</p>
          </div>
          <i class="fas fa-check ml-auto text-blue-400"></i>
        </button>
        <div>
          <button
            class="hover:bg-slate-100 w-full text-left p-3"
            @click="dropdown = false"
          >
            Add an existing account
          </button>

          <button
            class="hover:bg-slate-100 w-full text-left p-3"
            @click="logout"
          >
            Logout @{{ userName }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      tabs: [
        { icon: "fas fa-home", title: "Home", id: "home" },
        { icon: "fas fa-hashtag", title: "Explore", id: "explore" },
        { icon: "far fa-bell", title: "Notifications", id: "notifications" },
        { icon: "far fa-envelope", title: "Messages", id: "messages" },
        { icon: "far fa-bookmark", title: "Bookmarks", id: "bookmarks" },
        { icon: "fas fa-clipboard-list", title: "Lists", id: "lists" },
        { icon: "far fa-user", title: "Profile", id: "profile" },
        { icon: "fas fa-ellipsis-h", title: "More", id: "more" },
      ],
      id: "home",
      dropdown: false,
    };
  },

  computed: {
    ...mapGetters(["name", "userName"]),
  },

  methods: {
    logout() {
      this.dropdown = false;
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("username");
      this.$router.push("/auth");
    },
  },
};
</script>
