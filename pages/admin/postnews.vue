<template>
  <div
    class="bg-slate-300 p-10 flex justify-center items-center min-w-full min-h-screen"
  >
    <div
      class="bg-white p10 flex flex-col p-10 w-full lg:w-2/3 justify-center items-center mt-5"
    >
      <h2 class="text-2xl">Tambah Berita Baru</h2>
      <form class="flex flex-col min-w-full gap-4" @submit.prevent="addNews">
        <div class="flex flex-col">
          <label for="title" class="text-2xl">Judul:</label>
          <input
            id="title"
            v-model="news.title"
            type="text"
            class="border p-2 focus:border-blue-500"
            @focus="isFocused = true"
            @blur="isFocused = false"
          />
        </div>
        <div class="flex flex-col">
          <label for="news_category_name" class="text-2xl">Kategori:</label>
          <input
            id="news_category_name"
            v-model="news.news_category_name"
            type="text"
            class="border p-2 focus:border-blue-500"
            @focus="isFocused = true"
            @blur="isFocused = false"
          />
        </div>
        <div class="flex flex-col">
          <label for="sub_category_name" class="text-2xl">Sub Kategori:</label>
          <input
            id="sub_category_name"
            v-model="news.sub_category_name"
            type="text"
            class="border p-2 focus:border-blue-500"
            @focus="isFocused = true"
            @blur="isFocused = false"
          />
        </div>
        <div class="flex flex-col">
          <label for="content" class="text-2xl">Konten:</label>
          <textarea
            id="content"
            v-model="news.content"
            type="text"
            class="border p-2 focus:border-blue-500 h-80"
            @focus="isFocused = true"
            @blur="isFocused = false"
          ></textarea>
        </div>


        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="image"
          >Upload gambar</label
        >
        <input
          id="image"
          ref="image"
          class="block w-full text-sm  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="user_avatar_help"
          type="file"
          @change="handleFileChange"
        />
        <button type="submit" class="h-12 bg-green-400">Tambahkan</button>
      </form>
    </div>
  </div>
</template>
  
  <script>
export default {
  layout: 'member',
  data() {
    return {
      news: {
        title: '',
        content: '',
        image: '',
        news_category_name: '',
        sub_category_name:''
      },
    }
  },
  methods: {
    handleFileChange(event) {
      this.news.image = event.target.files[0]
    },

    async addNews() {
      try {
        const formData = new FormData()
        formData.append('title', this.news.title)
        formData.append('content', this.news.content)
        formData.append('image', this.news.image)
        formData.append('news_category_name', this.news.news_category_name)
        formData.append('sub_category_name', this.news.sub_category_name)

        // Kirim permintaan POST dengan Axios
        await this.$store.dispatch('addNews', formData)

        this.news.title = ''
        this.news.content = ''
        this.news.news_category_name = ''
        this.news.sub_category_name = ''
        this.$refs.image.value = null // Reset input file
        alert('Berita berhasil ditambahkan! ')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Gagal menambahkan berita:', error)
        alert('Gagal menambahkan berita. Silakan coba lagi.' + error)
      }
    },
  },
}
</script>
  