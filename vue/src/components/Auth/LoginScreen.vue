<template>
  <div class="w-3/6 mx-auto text-white py-5">
    <h1 class="text-2xl font-semibold mb-3">Sign in to Twitter</h1>
    <button class="bg-white text-gray-800 rounded-3xl p-2 w-full my-3">
      <i class="fa-brands fa-google mr-2"></i>
      <span class="">Sign in with Google</span>
    </button>
    <button class="bg-white text-black rounded-3xl p-2 w-full my-3">
      <i class="fa-brands fa-apple mr-2"></i>
      <span class="">Sign in with Apple</span>
    </button>

    <div class="flex items-center">
      <hr class="inline w-full" />
      <span class="px-3">or</span>
      <hr class="inline w-full" />
    </div>

    <input
      type="text"
      placeholder="Email"
      v-model.trim="username"
      class="w-full rounded-md bg-black p-3 border my-3 border-gray-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:placeholder:text-sky-400 focus:placeholder:text-sm"
    />

    <p v-if="usernameError" class="text-xs mb-4 text-red-500">
      Seems like you have entered a wrong username!
    </p>

    <p v-if="passwordError" class="text-xs mb-4 text-red-500">
      Seems like you have entered a wrong password!
    </p>

    <input
      v-if="usernameVerified"
      type="password"
      placeholder="Password"
      v-model.trim="password"
      class="w-full rounded-md bg-black p-3 border my-3 border-gray-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:placeholder:text-sky-400 focus:placeholder:text-sm"
    />

    <button
      class="bg-white text-black rounded-3xl p-2 w-full my-3"
      @click="verifyLogin"
    >
      <span class="">Next</span>
    </button>

    <button class="border border-white rounded-3xl p-2 w-full my-3">
      <span class="">Forgot password?</span>
    </button>

    <div class="mt-7">
      <span class="text-gray-600">Don't have an account?</span>
      <a
        href=""
        class="text-md text-blue-500"
        @click.prevent="$router.push('signup')"
      >
        Sign up</a
      >
    </div>
  </div>
</template>

<script>
import api from "../../api";

export default {
  data() {
    return {
      username: "",
      password: "",
      usernameVerified: false,
      usernameError: false,
      passwordError: false,
    };
  },

  methods: {
    async verifyLogin() {
      if (!this.usernameVerified) {
        if (!this.username.trim()) return;

        const obj = {
          username: this.username,
        };
        const res = await api.verifyUsernameAvailable(obj);
        const usernameExist = Boolean(res.data);

        if (!usernameExist) {
          this.usernameError = true;
          return;
        }

        this.usernameError = false;
        this.usernameVerified = true;
      } else {
        if (!this.password.trim()) return;

        const obj = {
          username: this.username,
          password: this.password,
        };

        let res;
        try {
          res = await api.signin(obj);
          console.log("signin token", res.data);
          const { token, name, username } = res.data;

          localStorage.setItem("token", token);
          localStorage.setItem("name", name);
          localStorage.setItem("username", username);

          document.cookie = `token=${token}`;
          this.$store.dispatch("setAuth", { name, username });
          this.$router.push("/home");
        } catch (error) {
          this.passwordError = true;
        }

        this.passwordError = false;
        console.log(res);
      }
    },
  },
};
</script>
