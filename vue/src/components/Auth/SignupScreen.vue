<template>
  <div class="w-3/6 mx-auto text-white py-5">
    <h1 class="text-2xl font-semibold mb-3">Create an account</h1>

    <div v-if="!initialDetailsDone">
      <input
        type="text"
        placeholder="Name"
        v-model="name"
        class="w-full rounded-md bg-black p-3 border my-3 border-gray-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:placeholder:text-sky-400 focus:placeholder:text-sm"
      />

      <input
        type="text"
        placeholder="Email"
        v-model="email"
        class="w-full rounded-md bg-black p-3 border my-3 border-gray-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:placeholder:text-sky-400 focus:placeholder:text-sm"
      />

      <input
        type="text"
        placeholder="Username"
        v-model="username"
        class="w-full rounded-md bg-black p-3 border my-3 border-gray-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:placeholder:text-sky-400 focus:placeholder:text-sm"
      />
    </div>

    <div v-else>
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        class="w-full rounded-md bg-black p-3 border my-3 border-gray-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:placeholder:text-sky-400 focus:placeholder:text-sm"
      />

      <input
        type="password"
        placeholder="Confirm password"
        v-model="confirmPassword"
        class="w-full rounded-md bg-black p-3 border my-3 border-gray-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:placeholder:text-sky-400 focus:placeholder:text-sm"
      />
    </div>

    <p v-if="fillAllError" class="text-xs mb-4 text-red-500">
      Please fill all the fields!
    </p>

    <p v-if="usernameAlreadyTaken" class="text-xs mb-4 text-red-500">
      Username already taken!
    </p>

    <p v-if="passNotMatch" class="text-xs mb-4 text-red-500">
      Password doesn't match!
    </p>

    <button
      class="bg-white text-black rounded-3xl p-2 w-full my-3"
      @click.prevent="initialDetailsDone ? signup() : verifyInitialDetails()"
    >
      <span class="">Next</span>
    </button>

    <button class="border border-white rounded-3xl p-2 w-full my-3">
      <span class="">Forgot password?</span>
    </button>

    <div class="mt-7">
      <span class="text-gray-600">Already have an account?</span>
      <a
        href=""
        class="text-md text-blue-500"
        @click.prevent="$router.push('login')"
      >
        Sign in</a
      >
    </div>
  </div>
</template>

<script>
import api from "../../api";

export default {
  data() {
    return {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      initialDetailsDone: false,
      fillAllError: false,
      usernameAlreadyTaken: false,
      passNotMatch: false,
    };
  },

  methods: {
    async verifyInitialDetails() {
      if (!this.name.trim() || !this.email.trim() || !this.username.trim()) {
        this.fillAllError = true;
        return;
      }

      this.fillAllError = false;

      const obj = {
        username: this.username,
      };

      const res = await api.verifyUsernameAvailable(obj);

      // will be 0 if no record found else a +ve integer
      const usernameExist = Boolean(res.data);
      if (usernameExist) {
        this.usernameAlreadyTaken = true;
        return;
      }

      this.usernameAlreadyTaken = false;
      this.initialDetailsDone = true;
    },

    async signup() {
      if (!this.password.trim() || !this.confirmPassword.trim()) {
        this.fillAllError = true;
        return;
      }

      this.fillAllError = false;

      if (this.password.trim() !== this.confirmPassword.trim()) {
        this.passNotMatch = true;
        return;
      }

      this.passNotMatch = false;

      const obj = {
        password: this.password,
        email: this.email,
        username: this.username,
        name: this.name,
      };
      await api.signup(obj);
      console.log("singup success!!!");

      const res = await api.signin({
        username: this.username,
        password: this.password,
      });

      console.log(res);
    },
  },
};
</script>
