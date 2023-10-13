
<template>
  <div class="flex flex-col gap-5 justify-center">
    <img
      :src="`http://localhost:8080/chelsnews/news/photo/${newsDetail.image}`"
      alt=""
    />
    <h1 class="text-3xl font-bold">{{ newsDetail.title }}</h1>
    <p class="text-xl">{{ newsDetail.content }}</p>
    <!-- Tampilkan informasi lainnya sesuai kebutuhan -->
  </div>
</template>
  
  <script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      newsDetail: (state) => state.newsDetail,
    }),
  },
  // eslint-disable-next-line vue/order-in-components
  async asyncData({ params, store }) {
    const newsId = params.id
    await store.dispatch('fetchNewsById', newsId)
  },
  methods: {
    ...mapActions(['fetchNewsById']),
  },
}
</script>
  