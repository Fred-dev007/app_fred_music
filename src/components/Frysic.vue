<script setup>
import { ref } from 'vue';
import apmHeader from './views/apmHeader.vue';
import apmContent from './views/apmContent.vue';
import Details from './views/details.vue';
import apmProgresse from './views/apmProgresse.vue';
const song =ref('')
function recupSong(params) {
    console.log(params);
}
const songPlay =ref('')
function recupSongPlay(params) {
    console.log(params);
}
</script>


<template>
<header>
    <apmHeader  />
    <apmProgresse :songPlay="songPlay" class="m-5" />

</header>
<main >
    <Details :song="song" @jouer="(msg)=>{songPlay=msg ;recupSongPlay(songPlay)}"/>
    <apmContent @details=" (msg)=>{song=msg; recupSong(song)} "/>
</main>
<footer></footer>
</template>


<style scoped>
main{
    display: grid;
    grid-template-columns: 25% 70%
}
</style>