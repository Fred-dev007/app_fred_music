<script setup>
import { onMounted, ref} from 'vue'
import { useRoute } from 'vue-router';
let Album = ref({});
const sons = useRoute();
let albumId = ref();
//l'url vers la base de données
const urlAlbum = 'http://localhost:5173/src/components/albums/albums.json';

//recupération des données avec fetch
async function fetchAlbum(id) {
  let resp2 = await fetch(urlAlbum)
  let data = await resp2.json()
  Album.value = data.filter(t => t.id == id)
  console.log(Album.value)
}
onMounted(
    ()=>{
        albumId.value=sons.params.id;
        fetchAlbum(albumId.value)
    }
)
</script>
<template>
<h2>Titre: {{ Album[0]?.title }}</h2>
<h3>Auteur: {{ Album[0]?.name }}</h3>
<p class="fs-3">{{ Album[0]?.description }}</p>
<img src="https://unsplash.it/300/300" alt="" class="w-50">
</template>
<style scoped>


</style>