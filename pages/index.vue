<template>
  <div class="min-h-screen flex flex-col gap-5">
    <div class="fixed right-0 bg-white w-80">
      <input
        v-model="searchTitle"
        placeholder="Cari berdasarkan judul"
        c
        class="p-2 focus:outline-none focus:border-blue-500 rounded-full"
      />
      <select
        v-model="selectedCategory"
        class="block p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Semua Kategori</option>
        <option v-for="category in categoryNews" :key="category.name">
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="flex flex-col font-bold">
      <h1 class="text-2xl">Headlines :</h1>
      <div
        class="flex flex-row flex-wrap gap-4 mt-10 justify-between item-center"
      >
        <news-cards-member
          v-for="item in headlinesNews"
          :key="item.id"
          :image="`http://localhost:8080/chelsnews/news/photo/${item.image}`"
          :title="item.title"
          :content="item.content"
          :link="`/news/${item.id}`"
          :category="item.news_category_name"
        />
      </div>
    </div>
    <div class="flex flex-col font-bold">
      <h1 class="text-2xl">Popular :</h1>
      <div
        class="flex flex-row flex-wrap gap-4 mt-10 justify-between item-center"
      >
        <news-cards-member
          v-for="item in popularNews"
          :key="item.id"
          :image="`http://localhost:8080/chelsnews/news/photo/${item.image}`"
          :title="item.title"
          :content="item.content"
          :link="`/news/${item.id}`"
          :category="item.news_category_name"
        />
      </div>
    </div>
    <div class="flex flex-col font-bold">
      <h1 class="text-2xl">Berita Terbaru :</h1>
      <div
        class="flex flex-row flex-wrap gap-4 mt-10 justify-between item-center"
      >
        <news-cards-member
          v-for="item in filteredItems"
          :key="item.id"
          :image="`http://localhost:8080/chelsnews/news/photo/${item.image}`"
          :title="item.title"
          :content="item.content"
          :link="`/news/${item.id}`"
          :category="item.news_category_name"
        />
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'IndexPage',
  layout: 'default',
  computed: {
    ...mapGetters(['filteredItems']),
    // eslint-disable-next-line no-undef
    searchTitle: {
      get() {
        return this.$store.state.searchTitle
      },
      set(value) {
        this.setSearchTitle(value) // Memanggil mutasi untuk mengubah searchTitle
      },
    },
    popularNews: {
      get() {
        return this.$store.state.popular
      },
    },
    headlinesNews: {
      get() {
        return this.$store.state.headlines
      },
    },
    categoryNews: {
      get() {
        return this.$store.state.categories
      },
    },
    selectedCategory: {
      get() {
        return this.$store.state.selectedCategory
      },
      set(value) {
        this.setSelectedCategory(value) // Memanggil mutasi untuk mengubah selectedCategory
      },
    },
  },
  methods: {
    ...mapMutations([
      'setSearchTitle',
      'setSelectedCategory',
      'setCategoryNews',
      'setNewsPopular',
      'setNewsHeadlines',
    ]),
    ...mapActions(['fetchNewsData', 'fetchNewsCategory']),
  },
  // eslint-disable-next-line vue/order-in-components
  async asyncData({ store }) {
    await store.dispatch('fetchNewsData')
    await store.dispatch('fetchNewsCategory')
  },
}
</script>
