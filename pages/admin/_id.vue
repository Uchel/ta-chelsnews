<template>
  <div class="bg-slate-300 p-10 flex justify-center items-center min-w-full min-h-screen">
    <div class="bg-white p10 flex flex-col p-10 w-full lg:w-2/3 justify-center items-center mt-5">
      <h2 class="text-2xl">Edit Berita</h2>
      <form class="flex flex-col min-w-full gap-4" @submit.prevent="updateNews()">
        <div class="flex flex-col">
          <label for="title" class="text-2xl">Judul:</label>
          <input
            id="title"
            v-model="news.title"
            type="text"
            class="border p-2 focus:border-blue-500"
          />
        </div>
        <div class="flex flex-col">
          <label for="news_category_name" class="text-2xl">Kategori:</label>
          <input
            id="news_category_name"
            v-model="news.news_category_name"
            type="text"
            class="border p-2 focus:border-blue-500"
          />
        </div>
        <div class="flex flex-col">
          <label for="sub_category_name" class="text-2xl">Sub Kategori:</label>
          <input
            id="sub_category_name"
            v-model="news.sub_category_name"
            type="text"
            class="border p-2 focus:border-blue-500"
          />
        </div>
        <div class="flex flex-col">
          <label for="content" class="text-2xl">Konten:</label>
          <textarea
            id="content"
            v-model="news.content"
            class="border p-2 focus:border-blue-500 h-80"
          ></textarea>
        </div>

        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="image">Upload gambar</label>
        <input
          id="image"
          ref="image"
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="user_avatar_help"
          type="file"
          @change="handleFileChange"
        />
        <button type="submit" class="h-12 bg-green-400">Simpan</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'member',
  async asyncData({ params, store }) {
    const newsId = params.id
    await store.dispatch('fetchNewsById', newsId)

    // Mengisi input dengan data yang diambil dari fetchNewsById
    const newsDetail = store.state.newsDetail

    return {
      newsId, // Assign newsId to the data property
      news: {
        title: newsDetail.title || '',
        content: newsDetail.content || '',
        news_category_name: newsDetail.news_category_name || '',
        sub_category_name: newsDetail.sub_category_name || '',
      },
    }
  },
  data() {
    return {
      news: {
        title: '',
        content: '',
        image: null, // Ubah ke null daripada string kosong
        news_category_name: '',
        sub_category_name: '',
      },
      newsId: null, // Initialize newsId
    }
  },
  methods: {
    handleFileChange(event) {
      this.news.image = event.target.files[0]
    },
    
    async updateNews() {
      try {
        const formData = new FormData();
        formData.append('title', this.news.title);
        formData.append('content', this.news.content);
        formData.append('image', this.news.image);
        formData.append('news_category_name', this.news.news_category_name);
        formData.append('sub_category_name', this.news.sub_category_name);

        // Kirim permintaan PUT atau PATCH dengan Axios sesuai dengan kebutuhan Anda
        await this.$store.dispatch('updateNews', formData);

        // Reset input setelah berhasil
        this.news.title = '';
        this.news.content = '';
        this.news.news_category_name = '';
        this.news.sub_category_name = '';
        this.news.image = null; // Reset input file

        alert('Berita berhasil diperbarui!');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Gagal memperbarui berita:', error);
        alert('Gagal memperbarui berita. Silakan coba lagi.' + error);
      }
    },

    ...mapActions(['fetchNewsById']),
  },
}
</script>
