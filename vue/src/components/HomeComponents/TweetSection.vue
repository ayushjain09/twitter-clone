<template>
  <div class="w-full h-full overflow-y-scroll">
    <div class="flex justify-between p-4 text-xl bg-white items-center">
      <span class="font-bold">Home</span>
      <i class="far fa-star"></i>
    </div>

    <!-- post tweet -->
    <div class="px-5 py-3 border-b-2 border-slate-100 flex">
      <div class="flex-none">
        <img src="user.png" alt="" class="mr-4 h-14 w-14 rounded-full" />
      </div>
      <form action="" class="w-full px-4">
        <textarea
          placeholder="What's happening?"
          class="w-full focus:outline-none mb-3"
          v-model="newTweet"
        ></textarea>
        <div class="flex justify-between">
          <div class="flex items-center">
            <i class="text-lg text-blue-400 mr-4 far fa-image"></i>
            <i class="text-lg text-blue-400 mr-4 fas fa-film"></i>
            <i class="text-lg text-blue-400 mr-4 far fa-chart-bar"></i>
            <i class="text-lg text-blue-400 mr-4 far fa-smile"></i>
          </div>
          <button
            class="text-white bg-blue-400 hover:bg-blue-500 font-semibold px-4 py-1 rounded-full"
            type="button"
            @click="addTweet"
          >
            Tweet
          </button>
        </div>
      </form>
    </div>

    <div
      v-for="follow in following"
      :key="follow"
      class="w-full p-4 border-b hover:bg-slate-50 flex"
    >
      <div class="mr-4">
        <img
          :src="`anotherUser.jpg`"
          alt=""
          class="h12 w-12 rounded-full flex-none"
        />
      </div>
      <div class="w-full">
        <div class="flex items-center w-full">
          <p class="font-semibold">{{ follow.name }}</p>
          <p class="font-light text-sm ml-2 text-slate-500">
            {{ follow.handle }}
          </p>
          <p class="font-light text-sm ml-2 text-slate-500">
            .{{ follow.time }}
          </p>
          <i class="fas fa-ellipsis-h ml-auto text-slate-500"></i>
        </div>

        <p class="py-2">
          {{ follow.tweet }}
        </p>

        <div class="flex items-center space-x-28 text-sm text-slate-500">
          <div class="flex items-center">
            <i class="far fa-comment mr-2"></i>
            <p>{{ follow.comments }}</p>
          </div>

          <div class="flex items-center">
            <i class="fa-solid fa-retweet mr-2"></i>
            <p>{{ follow.retweets }}</p>
          </div>

          <div class="flex items-center">
            <i class="fa-regular fa-heart mr-2"></i>
            <p>{{ follow.like }}</p>
          </div>

          <div class="flex items-center">
            <i class="fa-solid fa-upload"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      following: [
        {
          src: "elon.jpg",
          name: "Elon Musk",
          handle: "@teslaBoy",
          time: "20 min",
          tweet: "Should I just quarantine on mars??",
          comments: "1,000",
          retweets: "550",
          like: "1,000,003",
        },
        {
          src: "kevin.jpg",
          name: "Kevin Hart",
          handle: "@miniRock",
          time: "55 min",
          tweet: "Should me and the rock do another sub-par movie together????",
          comments: "2,030",
          retweets: "50",
          like: "20,003",
        },
        {
          src: "elon.jpg",
          name: "Elon Musk",
          handle: "@teslaBoy",
          time: "1.4 hr",
          tweet: "Haha just made a flame thrower. Shld I sell them?",
          comments: "100,000",
          retweets: "1,000,002",
          like: "5,000,003",
        },
        {
          src: "elon.jpg",
          name: "Elon Musk",
          handle: "@teslaBoy",
          time: "1.4 hr",
          tweet: "Just did something crazyyyyyyy",
          comments: "100,500",
          retweets: "1,000,032",
          like: "5,000,103",
        },
      ],
      newTweet: "",
    };
  },
  computed: {
    ...mapGetters(["userName"]),
  },

  async mounted() {
    const res = await api.getTweets(this.userName);
    // this.following = res.data;
    console.log("tweets", res.data);
  },

  methods: {
    addTweet() {
      if (!this.newTweet) return;

      const obj = {
        username: this.userName,
        tweet: this.newTweet,
      };

      api.addTweet(obj).then((res) => console.log(res));
      this.newTweet = "";
    },
  },
};
</script>
