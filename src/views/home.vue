<script setup>
import { onMounted, reactive } from "vue";
/////////////////////////
let sound = new Audio("/assets/alarm.wav");
const state = reactive({
  list: [],
  soundStatus: true,
  numberOfMoves: 40,
  timer: { minute: 2, second: 0, setInterval: 0 },
  startGame: false,
});

onMounted(() => handleShuffleAndDuplicate());

const handleShuffleAndDuplicate = () => {
  const array = [
    { id: 1, showImage: false, imageName: 1, found: false },
    { id: 2, showImage: false, imageName: 1, found: false },
    { id: 3, showImage: false, imageName: 2, found: false },
    { id: 4, showImage: false, imageName: 2, found: false },
    { id: 5, showImage: false, imageName: 3, found: false },
    { id: 6, showImage: false, imageName: 3, found: false },
    { id: 7, showImage: false, imageName: 4, found: false },
    { id: 8, showImage: false, imageName: 4, found: false },
    { id: 9, showImage: false, imageName: 5, found: false },
    { id: 10, showImage: false, imageName: 5, found: false },
    { id: 11, showImage: false, imageName: 6, found: false },
    { id: 12, showImage: false, imageName: 6, found: false },
    { id: 13, showImage: false, imageName: 7, found: false },
    { id: 14, showImage: false, imageName: 7, found: false },
    { id: 15, showImage: false, imageName: 8, found: false },
    { id: 16, showImage: false, imageName: 8, found: false },
  ];
  // Duplicate each element
  const duplicatedArray = array.map((item) => item);

  // Shuffle the array
  const shuffledArray = duplicatedArray.sort(() => Math.random() - 0.5);

  state.list = shuffledArray;
};

const handleShowImage = (item) => {
  if (!state.startGame) (state.startGame = true), handleTimer();
  if (!item.showImage) state.numberOfMoves--;
  item.showImage = !item.showImage;

  const filterList = state.list.filter(
    (filter) => filter.showImage && !filter.found
  );

  if (filterList.length === 2) {
    if (filterList[0].imageName === filterList[1].imageName) {
      filterList[0].found = true;
      filterList[1].found = true;
    } else {
      setTimeout(() => {
        state.list.forEach((changeShowImage) => {
          changeShowImage.showImage = false;
        });
      }, 2000);
    }
  }
};

const handleTimer = () => {
  state.timer.setInterval = setInterval(() => {
    state.timer.second--;

    if (state.timer.second <= 0) {
      if (state.timer.minute) {
        state.timer.minute--;
        state.timer.second = 59;
      } else {
        clearInterval(state.timer.setInterval);
      }
    }
  }, 1000);
};
</script>
<template>
  <div class="parent-game">
    <div class="parent-content">
      <div class="header">
        <div>
          <p>تعداد حرکت :</p>
          <p>{{ state.numberOfMoves }}</p>
        </div>
        <div>
          <p>زمان :</p>
          <p>{{ `${state.timer.minute}:${state.timer.second}` }}</p>
        </div>
      </div>

      <div class="main">
        <div
          :class="
            item.showImage || item.found
              ? 'bg-white box-rotate '
              : 'bg-[#DC3755]'
          "
          v-for="(item, index) in state.list"
          @click="handleShowImage(item)"
          :key="item.id"
          class="box"
        >
          <transition-fade :delay="100" group>
            <img
              :src="`src/assets/image/1/${item.imageName}.SVG`"
              v-if="item.showImage || item.found"
            />
            <p v-else>{{ index + 1 }}</p>
          </transition-fade>
        </div>
      </div>

      <div class="footer">
        <button class="btn-start">
          <p>شروع</p>
          <img src="@/assets/image/start.svg" />
        </button>

        <div @click="state.soundStatus = !state.soundStatus" class="sound">
          <img
            :src="`src/assets/image/${
              state.soundStatus ? 'sound-active' : 'sound-disable'
            }.svg`"
          />
          <p>{{ state.soundStatus ? "فعال" : "غیر فعال" }}</p>
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
.footer {
  @apply w-full flex items-center justify-between;
}
.btn-start {
  @apply flex gap-x-[10px] items-center px-[40px] py-[10px] rounded-[10px] transition-all bg-[#32BB71] hover:bg-[#47a374];
}
.btn-start p {
  @apply text-white text-[18px] font-bold;
}
.sound {
  @apply flex items-center gap-x-[10px] cursor-pointer;
}
.sound p {
  @apply text-[18px] font-bold;
}
</style>
