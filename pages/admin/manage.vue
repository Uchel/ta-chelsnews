
<template>
  <div class="min-w-full pt-20 px-5 min-h-screen flex flex-row">
    <div class="flex flex-col gap-10 w-3/4">
      <div class="fixed bg-white">
        <input v-model="searchTitle" placeholder="Cari berdasarkan judul" />
        <select v-model="selectedCategory" class="p-2">
          <option value="">Semua Kategori</option>
          <option v-for="category in categoryNews" :key="category.name">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div>
        <div
          class="flex flex-row flex-wrap justify-around gap-5 mt-10 item-center"
        >
          <div v-for="item in filteredItems" :key="item.id">
            <news-cards-member
              :image="`http://localhost:8080/chelsnews/news/photo/${item.image}`"
              :title="item.title"
              :content="item.content"
              :category="item.news_category.name"
            />
            <div class="flex flex-row justify-between bg-white px-10 mx-3 mb-5">
              <button
                class="bg-green-400 rounded-lg py-3 my-2 w-20"
                @click="toUpdate(item.id)"
              >
                edit
              </button>
              <button
                class="bg-red-400 rounded-lg py-3 my-2 w-20"
                @click="deleteNewsById(item.id)"
              >
                hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="fixed top-16 right-0 bottom-16 p-5 gap-5 flex flex-col justify-around bg-slate-200 w-1/4 min-h-screen"
    >
      <div class="bg-slate-200 gap-10 p-5 min-w-full min-h-screen rounded-lg">
        <div class="flex flex-col gap-10">
          <div class="flex flex-row justify-between">
            <h1 class="text-2xl">Kategori</h1>
            <button
              class="bg-green-600 px-3 rounded-md py-1"
              @click="openCategory"
            >
              +
            </button>
          </div>
          <div
            :class="` ${
              isHidden ? 'hidden' : 'flex flex-col gap-2'
            } border p-2 focus:border-blue-500`"
          >
            <label for="category_name">masukkan kategory:</label>
            <input
              id="category_name"
              v-model="name"
              type="text"
              @focus="isFocused = true"
              @blur="isFocused = false"
            />
            <div>
              <button
                class="bg-green-600 px-3 rounded-md py-1"
                @click="postCategory"
              >
                tambahkan
              </button>
              <button
                class="bg-red-600 px-3 rounded-md py-1"
                @click="batalPostCtg"
              >
                batal
              </button>
            </div>
          </div>
          <div class="flex flex-col">
            <div
              v-for="category in categoryNews"
              :key="category.name"
              class="flex flex-row mb-3 justify-between items-center p-1 rounded-lg bg-white"
            >
              <p>{{ category.name.toUpperCase() }}</p>
              <div class="flex flex-row gap-5">
                <button class="bg-yellow-600 px-3 rounded-md py-1">edit</button>
                <button class="bg-red-600 px-3 rounded-md py-1" @click="deleteCategoryNews(category.name)">hapus</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  layout: 'member',
  data() {
    return {
      isHidden: true,
      name: '',
    }
  },
  computed: {
    ...mapGetters(['filteredItems']),
    ...mapActions(['fetchNewsData', 'fetchNewsCategory']),
    // eslint-disable-next-line no-undef
    searchTitle: {
      get() {
        return this.$store.state.searchTitle
      },
      set(value) {
        this.setSearchTitle(value) // Memanggil mutasi untuk mengubah searchTitle
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
    ]),
    openCategory() {
      this.isHidden = false
    },
    batalPostCtg() {
      this.isHidden = true
    },
    async postCategory() {
      const userData = {
        name: this.name, // Ganti dengan nama yang sesuai
      }

      try {
        await this.$store.dispatch('postCategory', userData)
        await this.$store.dispatch('fetchNewsCategory')
        alert('berhasil menambahkan kategory')
        // Setelah berhasil melakukan POST, Anda dapat melakukan tindakan selanjutnya
      } catch (error) {
        alert(error)
      }
    },

    async deleteNewsById(newsId) {
      try {
        await this.$store.dispatch('deleteNewsById', newsId)
        await this.$store.dispatch('fetchNewsData')
      } catch (error) {
        // eslint-disable-next-line no-console
        alert('gagal menghapus berita')
      }
    },
    async deleteCategoryNews(ctgId) {
      try {
        await this.$store.dispatch('deleteCategory', ctgId)
        await this.$store.dispatch('fetchNewsCategory')
      } catch (error) {
        // eslint-disable-next-line no-console
        alert('gagal menghapus berita')
      }
    },
    toUpdate(id) {
      this.$router.push(`/admin/${id}`)
    },
  },
  // eslint-disable-next-line vue/order-in-components
  async asyncData({ store }) {
    await store.dispatch('fetchNewsData')
    await store.dispatch('fetchNewsCategory')
  },
}
</script>
