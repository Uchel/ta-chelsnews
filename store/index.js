// store/news.js
export const state = () => ({
  newsData: [],
  headlines:[],
  popular:[],
  newsDetail: {},
  newsPost: {},
  searchTitle: "",
  selectedCategory: "",
  categories: [],
});

export const mutations = {
  setNewsData(state, data) {
    state.newsData = data;
  },
  setNewsHeadlines(state, data) {
    state.headlines = data;
  },
  setNewsPopular(state, data) {
    state.popular = data;
  },
  setNewsDetail(state, data) {
    state.newsDetail = data;
  },
  setNewsPost(state, data) {
    state.newsPost = data
  },
  categories() {
    // Mengambil daftar kategori unik dari items
    const uniqueCategories = [...new Set(this.news.map((item) => item.news_category.name))];
    return uniqueCategories;
  },
  setCategoryNews(state, data) {
    state.categories = data
  },
  setSearchTitle(state, searchTitle) {
    state.searchTitle = searchTitle;
  },
  setSelectedCategory(state, selectedCategory) {
    state.selectedCategory = selectedCategory;
  },
};

export const actions = {
  async fetchNewsData({ commit }) {
    try {
      const response = await this.$axios.get('/chelsnews/news'); // Ganti dengan endpoint API Anda
      // eslint-disable-next-line no-console
      const headlineItems = response.data.filter((item) => item.sub_category_name === "headlines");
      const popularItems = response.data.filter((item) => item.sub_category_name === "popular");
      commit('setNewsHeadlines', headlineItems);
      commit('setNewsPopular', popularItems);
      commit('setNewsData', response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching news data:', error);
    }
  },

  async fetchNewsById({ commit }, id) {
    try {
      const response = await this.$axios.get(`/chelsnews/news/${id}`);
      commit('setNewsDetail', response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching news by ID:', error);
    }
  },
  async deleteNewsById({ commit }, id) {
    try {
      // Kirim permintaan DELETE ke backend untuk menghapus berita berdasarkan ID
      await this.$axios.delete(`/chelsnews/news/${id}`);

      // Jika berhasil, Anda dapat melakukan sesuatu di sini jika perlu
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Gagal menghapus berita:', error);
      throw error;
    }
  },
  async addNews({ commit }, newsData) {
    try {
      // eslint-disable-next-line no-console
      console.log('Mengirim permintaan POST ke server...');
      const response = await this.$axios.post(`/chelsnews/news`, newsData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // eslint-disable-next-line no-console
      console.log('Berhasil menambahkan berita:', response.data);
      commit('setNewsPost', response.data);
      // Jika berhasil, Anda dapat melakukan sesuatu di sini jika perlu
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Gagal menambahkan berita:', error);
      throw error;
    }
  },
  async updateNews({ commit, state }, newsData) {
    const newsId = state.newsDetail.id; // Mengambil id dari state.newsDetail
    try {
      // eslint-disable-next-line no-console
      console.log('Mengirim permintaan PUT ke server...'); // Ubah pesan konsol
      const response = await this.$axios.put(`/chelsnews/news/${newsId}`, newsData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // eslint-disable-next-line no-console
      console.log('Berhasil memperbarui berita:', response.data); // Ubah pesan konsol
      // Jika berhasil, Anda dapat melakukan sesuatu di sini jika perlu
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Gagal memperbarui berita:', error);
      throw error;
    }
  },
  async postCategory({ commit }, category) {
    try {
      const response = await this.$axios.post('/chelsnews/news-ctg', category);
      // Lakukan sesuatu dengan respon jika perlu
      // eslint-disable-next-line no-console
      console.log(response.data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Gagal melakukan permintaan POST:', error);
      throw error;
    }
  },
  async deleteCategory({ commit }, category) {
    try {
      const response = await this.$axios.delete(`/chelsnews/news-ctg/${category}`);
      // Lakukan sesuatu dengan respon jika perlu
      // eslint-disable-next-line no-console
      console.log(response.data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Gagal melakukan permintaan POST:', error);
      throw error;
    }
  },


  async fetchNewsCategory({ commit }) {
    try {
      const response = await this.$axios.get('/chelsnews/news-ctg'); // Ganti dengan endpoint API Anda
      // eslint-disable-next-line no-console

      commit('setCategoryNews', response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching news data:', error);
    }
  },

};


export const getters = {
  filteredItems(state) {
    // Menerapkan filter berdasarkan judul dan kategori yang dipilih
    return state.newsData.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(state.searchTitle.toLowerCase());
      const categoryMatch = state.selectedCategory === "" || item.news_category.name === state.selectedCategory;
      return titleMatch && categoryMatch;
    });
  },
};
