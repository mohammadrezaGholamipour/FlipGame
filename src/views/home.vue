<script setup>
import { reactive } from "vue";
/////////////////////////
const state = reactive({
  list: [
    { id: 1, showImage: false },
    { id: 2, showImage: false },
    { id: 3, showImage: false },
    { id: 4, showImage: false },
    { id: 5, showImage: false },
    { id: 6, showImage: false },
    { id: 7, showImage: false },
    { id: 8, showImage: false },
    { id: 2, showImage: false },
    { id: 4, showImage: false },
    { id: 7, showImage: false },
    { id: 1, showImage: false },
    { id: 8, showImage: false },
    { id: 3, showImage: false },
    { id: 4, showImage: false },
    { id: 5, showImage: false },
  ],
});
//////////////////////
</script>
<template>
  <div class="parent-game">
    <div class="parent-content">
      <div class="header">
        <div>
          <p>تعداد حرکت :</p>
          <p>40</p>
        </div>
        <div>
          <p>زمان :</p>
          <p>2:00</p>
        </div>
      </div>

      <div class="main">
        <div
          :class="item.showImage ? 'bg-white box-rotate ' : 'bg-[#DC3755]'"
          @click="item.showImage = !item.showImage"
          v-for="(item, index) in state.list"
          :key="item.id"
          class="box"
        >
          <transition-fade delay="100" group>
            <img
              :src="`src/assets/image/1/${item.id}.SVG`"
              v-if="item.showImage"
            />
            <p v-else>{{ index + 1 }}</p>
          </transition-fade>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.parent-game {
  @apply w-screen h-screen flex justify-start md:justify-center overflow-x-auto items-center;
}
.parent-content {
  @apply flex flex-col justify-center items-center bg-white p-[60px] gap-y-[30px];
  min-width: 600px;
  width: 600px;
}
.header {
  @apply w-full flex items-center justify-between;
}
.header > div {
  @apply flex items-center gap-x-[10px];
}
.header > div > p {
  @apply font-bold text-[20px];
}
.main {
  @apply w-full flex flex-wrap justify-center items-center gap-[25px];
}
.box {
  @apply w-[100px] h-[100px] cursor-pointer rounded-[10px] flex justify-center items-center duration-700;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.25);
}
.box p {
  @apply text-white text-[16px];
}
.box img {
  transform: rotateX(180deg);
}
.box-rotate {
  transform: rotateX(180deg);
}
</style>
