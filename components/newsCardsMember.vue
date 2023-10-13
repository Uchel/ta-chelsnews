<template>
  <!-- <div
    class="w-80 h-95 bg-green-400 flex flex-col justify-start align-center item start mx-3 p-2 border-lg rounded-lg overflow-hidden"
  >
    <div
      
      target="_blank"
      class="flex justify-center flex-col"
    >
      <img
        :src="`${image}`"
        :alt="`${image}`"
        class="w-min-full h-44 border-2 border-slate-500"
      />
    
      <h1 class="text-xl font-bold h-13 mb-3 overflow-hidden">{{ title }}</h1>
      <p class="font-thin">{{ category }}</p>
      <p class="overflow-ellipsis">{{ content }}</p>
    </div>
  </div> -->

  <div
    class="max-w-sm bg-white border flex flex-col justify-start border-gray-200 rounded-lg h-97 shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
  >
    <nuxt-link :to="`${link}`">
      <img
        class="rounded-t-lg h-52 min-w-full"
        :src="`${image}`"
        :alt="`${image}`"
      />
    </nuxt-link>
    <div class="p-5">
      <h5
        class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden"
      >
        {{ title }}
      </h5>
      <p class="font-bold text-blue-300">{{ category }}</p>
      <p
        class="mb-3 font-normal text-gray-700 dark:text-gray-400 h-24 overflow-hidden"
      >
        {{ content }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    // eslint-disable-next-line vue/require-prop-types
    link: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: '',
    },
  },
}
</script>

