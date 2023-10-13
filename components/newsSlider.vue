<template>
  <div>
    <div class="card-carousel-wrapper">
      <button class="card-carousel--nav__left" :disabled="atHeadOfList" @click="moveCarousel(-1)"></button>
      <div class="card-carousel">
        <div class="card-carousel--overflow-container">
          <div class="card-carousel-cards" :style="{ transform: `translateX(${currentOffset}px)` }">
            <div v-for="(item, index) in items" :key="index" class="card-carousel--card">
              <img src="https://placehold.it/200x200" />
              <div class="card-carousel--card--footer">
                <p>{{ item.name }}</p>
                // eslint-disable-next-line vue/require-v-for-key, vue/require-v-for-key, vue/require-v-for-key


              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="card-carousel--nav__right" :disabled="atEndOfList" @click="moveCarousel(1)"></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    items: Array, // Menambahkan prop 'items'
  },
  data() {
    return {
      currentOffset: 0,
      windowSize: 3,
      paginationFactor: 220,
    };
  },
  computed: {
    atEndOfList() {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize);
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
  },
  methods: {
    moveCarousel(direction) {
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    },
  },
};
</script>

<!-- Style -->
<style scoped>
.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 40px;
  color: gray;
}

/* ... (your existing styles) ... */
</style>
