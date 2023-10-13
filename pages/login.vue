<template>
  <div
    class="flex flex-row justify-center items-center min-w-full min-w-screen"
  >
    <div
      class="flex items-center justify-center my-auto flex-col w-1/2 min-h-screen"
    >
      <div class="flex flex-row gap-4">
        <img
          src="https://3.bp.blogspot.com/-TzBbwxCIDh8/XGF6dYGwN-I/AAAAAAAAD98/0s-uVBknG04vnk7BJvarX7JHRqu0Q4u2wCLcBGAs/s1600/copyright-free-98566__480.png"
          alt="Cn"
          class="w-8 h-8"
        />
        <h1 class="text-3xl">Admin Area</h1>
      </div>
      <img :src="src" :alt="src" class="w-full h-full object-fill" />
    </div>
    <div
      class="flex gap-20 items-center justify-center flex-col w-1/2 bg-gradient-to-r from-slate-300 via-white to-green100-500 min-h-screen"
    >
      <h1 class="text-3xl">Login to Manage your News</h1>

      <div
        class="w-1/2 bg-white p-10 flex flex-col border-4 border-slate-400 rounded-lg shadow-xl ring-slate-400"
      >
        <form  class="w-full p-5 flex flex-col gap-10" @submit.prevent="afterLogin" >
          <div class="flex flex-col">
            <label for="title" class="text-xl">Username</label>
            <input
              id="title"
              type="text"
              class="border rounded-full p-2 focus:outline-none focus:border-blue-500"
              placeholder=" user name"
              @focus="isFocused = true"
              @blur="isFocused = false"
            />
          </div>
          <div class="flex flex-col">
            <label for="password" class="text-xl">Password</label>
            <input
              id="password"
              type="password"
              placeholder=" ******"
              class="border p-2 focus:outline-none focus:border-blue-500 rounded-full"
              @focus="isFocused = true"
              @blur="isFocused = false"
            />
          </div>
          <p> forgot password ? <span>call your Manager</span></p>
          <div class="flex flex-col">
            <button type="submit"  class="h-12 bg-green-400 rounded-full">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'login',
  data() {
    return {
      src: 'https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp',
    }
  },
  methods:{
    afterLogin() {
      // Menggunakan this.$router.push untuk melakukan navigasi
      this.$router.push('/admin/manage')
    },
  }
}
</script>
