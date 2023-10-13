<template>
  <div
    class="w-80 h-95 bg-green-400 flex flex-col justify-start align-center item start m-3 p-2 border-lg rounded-lg overflow-hidden"
  >
    <nuxt-link
      :to="`${link}`"

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
    </nuxt-link>
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

