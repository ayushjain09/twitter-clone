<template>
  <div
    class="hidden lg:block w-3/6 h-full border-l border-slate-100 py-2 px-8 overflow-y-scroll relative"
  >
    <input
      type="text"
      class="w-full rounded-full text-sm bg-slate-100 p-2 pl-12"
      placeholder="Search Twitter"
    />
    <i
      class="fa fa-search text-sm text-slate-400 absolute left-0 top-0 mt-4 ml-12"
    ></i>

    <div class="w-full rounded-xl mt-4 bg-slate-50">
      <div class="flex items-center justify-between p-3">
        <p class="font-bold text-lg">Trends for you</p>
        <i class="fa fa-cog text-lg text-blue-400"></i>
      </div>

      <div
        v-for="trend in trending"
        :key="trend"
        class="w-full flex justify-between py-2 border-t border-slate-100 hover:bg-slate-100 p-3"
      >
        <div>
          <p class="text-sm text-slate-400 font-semibold">{{ trend.top }}</p>
          <p class="font-bold">{{ trend.title }}</p>
          <p class="text-slate-400 font-semibold">{{ trend.bottom }}</p>
        </div>
        <i class="fas fa-angle-down text-lg text-slate-800"></i>
      </div>
      <button
        class="text-blue-400 font-semibold p-3 w-full text-left hover:bg-blue-50 rounded-md"
      >
        Show More
      </button>
    </div>

    <div class="w-full rounded-xl mt-4 bg-slate-50 p-3">
      <p class="font-bold text-lg mb-2">Who to follow</p>

      <div
        v-for="friend in friends"
        :key="friend.handle"
        class="flex items-center w-full rounded-full p-2 justify-between"
      >
        <div class="flex">
          <img src="anotherUser.jpg" alt="" class="h-10 w-10 rounded-full" />

          <div class="ml-4 hidden lg:block">
            <p class="text-sm font-semibold">{{ friend.name }}</p>
            <p class="text-sm">{{ friend.username }}</p>
          </div>
        </div>
        <button
          class="px-2 bg-transparent ring-2 border-blue-400 rounded-full text-blue-400 hover:bg-blue-400 hover:text-white"
          @click="followUser(friend.username)"
        >
          Follow
        </button>
      </div>

      <button
        class="text-blue-400 font-semibold p-3 w-full text-left hover:bg-blue-50 rounded-md"
      >
        Show More
      </button>
    </div>
  </div>
</template>

<script>
import api from "../../api";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      trending: [
        {
          top: "Trending in TX",
          title: "Gigi",
          bottom: "Trending with: Rip Gigi",
        },
        { top: "Music", title: "We Won", bottom: "135K Tweets" },
        { top: "Pop", title: "Blue Ivy", bottom: "40k tweets" },
        { top: "Trending in US", title: "Denim Day", bottom: "40k tweets" },
        { top: "Trending", title: "When Beyonce", bottom: "25.4k tweets" },
      ],
      friends: [
        {
          src: "https://pbs.twimg.com/profile_images/1045396790738968576/uPzS9-he_400x400.jpg",
          name: "Elon Musk",
          handle: "@teslaBoy",
        },
        {
          src: "https://pbs.twimg.com/profile_images/1045396790738968576/uPzS9-he_400x400.jpg",
          name: "Adrian Monk",
          handle: "@detective:)",
        },
        {
          src: "https://pbs.twimg.com/profile_images/1045396790738968576/uPzS9-he_400x400.jpg",
          name: "Kevin Hart",
          handle: "@miniRock",
        },
      ],
    };
  },

  computed: {
    ...mapGetters(["userName"]),
  },

  async mounted() {
    const records = await api.getPeopleToFollow(this.userName);
    console.log("users", records);
    this.friends = records.data;
  },

  methods: {
    async followUser(followUser) {
      const obj = { username: this.userName, followUser: followUser };
      console.log(obj);
      await api.follow(obj);
    },
  },
};
</script>
