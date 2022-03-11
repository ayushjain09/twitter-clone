<template>
  <div class="h-3/4 min-w-1/5 w-2/5 bg-black rounded-xl dialog">
    <div class="p-6 text-white flex">
      <i class="fa-solid fa-xmark fa-lg w-11/12 cursor-pointer"></i>
      <i class="fa-brands fa-twitter fa-2xl w-full"></i>
    </div>
    <slot> </slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.dialog {
  width: 600px;
  height: 650px;
}
</style>
