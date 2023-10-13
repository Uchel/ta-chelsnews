<template>
  <div>
    <!-- Form untuk menambahkan data baru -->
    <form class="flex flex-col gap-3 p-10 mt-3" @submit.prevent="addItem">
      <input v-model="newItem.title" placeholder="Judul" />
      <input v-model="newItem.category" placeholder="Kategori" />

      <label for="content" class="text-2xl">Konten:</label>
          <textarea
            id="content"
            v-model="newItem.content"
            type="text"
            class="border p-2 focus:border-blue-500 h-80"
            @focus="isFocused = true"
            @blur="isFocused = false"
          ></textarea>
      <button type="submit" class="p-10 bg-green-400" >Tambahkan</button>
    </form>

    <input v-model="searchTitle" placeholder="Cari berdasarkan judul" />
    <select v-model="selectedCategory">
      <option value="">Semua Kategori</option>
      <option v-for="category in categories" :key="category">
        {{ category }}
      </option>
    </select>

    <div class="flex flex-col font-bold">
      <h1 class="text-2xl">Berita Terbaru :</h1>
      <div
        class="flex flex-row flex-wrap gap-4 mt-10 justify-between item-center"
      >
        <news-cards-member
          v-for="item in filteredItems"
          :key="item.id"
          image="https://png.pngtree.com/png-clipart/20220119/ourlarge/pngtree-cartoon-sketch-hand-drawn-line-drawing-line-draft-png-image_4233207.png"
          :title="item.title"
          :content="item.content"
          :link="`/news/${item.id}`"
          :category="item.category"
        />
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          title: 'Judul 1',
          category: 'Kategori A',
          content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 150',
        },
        {
          id: 2,
          title: 'Judul 2',
          category: 'Kategori B',
          content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 150',
        },
        {
          id: 3,
          title: 'Judul 3',
          category: 'Kategori C',
          content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 150',
        },
        // Tambahkan data objek lainnya di sini
      ],
      searchTitle: '',
      selectedCategory: '',
      newItem: {
        title: '',
        category: '',
        content: '',
      },
    }
  },
  computed: {
    categories() {
      // Mengambil daftar kategori unik dari items
      const uniqueCategories = [
        ...new Set(this.items.map((item) => item.category)),
      ]
      return uniqueCategories
    },
    filteredItems() {
      // Menerapkan filter berdasarkan judul dan kategori yang dipilih
      return this.items.filter((item) => {
        const titleMatch = item.title
          .toLowerCase()
          .includes(this.searchTitle.toLowerCase())
        const categoryMatch =
          this.selectedCategory === '' ||
          item.category === this.selectedCategory
        return titleMatch && categoryMatch
      })
    },
  },
  methods: {
    addItem() {
      // Menghasilkan ID unik untuk item baru
      const newItemId = this.items.length + 1
      // Menambahkan item baru ke dalam array items
      this.items.push({
        id: newItemId,
        title: this.newItem.title,
        category: this.newItem.category,
        content: this.newItem.content,
      })
      // Mengosongkan input setelah menambahkan item baru
      this.newItem.title = ''
      this.newItem.category = ''
      this.newItem.content = ''
    },
  },
}
</script>
  