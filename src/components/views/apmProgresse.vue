<script setup>
import { ref, watch } from 'vue';
let play = ref({})
//recupère le sons a joué
const props = defineProps({
  songPlay: Object
})
let i =ref(1);
//surveille la variable de play et lance la barre de progression
watch(() => props.songPlay, (n) => {
  console.log(play.value = n);
  play.value = play.value.tags.length;
//Execute un callBack chaque 30s
  setInterval(()=>{
 if (i.value===play.value) {
  clearInterval()
 }else{
  i.value++
 }
},30000)
})




</script>
<template>

  <div class="bar progress" :class="{ disp: !props.songPlay }">
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
      aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%">{{ i }}/{{ play }}
    </div>
  </div>

</template>
<style scoped>
.disp {
  display: none;
}

.bar {
  animation: mymove 140s ease-in;
}

@keyframes mymove {
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
}
</style>