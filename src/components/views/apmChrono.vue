<script setup>
import { ref,onMounted } from 'vue';
//Innitialisation de la seconde la minute et l'heures
let sec = ref('0');
let min = ref('0');
let heures = ref('0')

//Cette fonction gère le chrono 
function starCompt() {
    let compts = 1
    let comptm = 1
    let compth = 1
   
    setInterval(() => {
         //Incrémentation de la seconde chaque 1000ms
        sec.value = compts++ + 's'
        //Incrémentation de la min chaque 60s
        if (compts == 60) {
            compts = 0
            min.value = comptm++ + 'min'
        }
         //Incrémentation de l'heure chaque 60min
        if (comptm == 60) {
            comptm = 0
            heures.value = compth++ + 'h'
        }
    }, 1000);
}
onMounted(() => {
  starCompt()
})
</script>
<template>
    <p class="m-2 fs-4">{{ heures }} : {{ min }} : {{ sec }}</p>
</template>
<style>

</style>