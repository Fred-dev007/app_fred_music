<script setup>
import { onMounted, ref, watch } from 'vue'

let Album = ref({})

transi
//les urls vers la base de données
const urlAlbum = 'http://localhost:5173/src/components/albums/albums.json'

const tab = ref('')
//recupération des données avec fetch
async function fetchAlbum() {
  const resp2 = await fetch(urlAlbum)
  Album.value = await resp2.json()
  console.log(Album.value)
}

tab.value = Album.value
//Exécuter la fonction lorsque le notre composé est monté
onMounted(() => {
  fetchAlbum()
})

const emit = defineEmits(['details'])

//Envoie de l'album a afficher au parent
function sendDetails(params) {
  emit('details', params)
  console.log(params)
}
const answer = ref('')
function deleteSong(params) {
  answer.value = window.confirm('Etes vous sur de vouloir supprimer ce album?')
  if (!answer.value) {
    return false
  } else {
    Album.value = Album.value.filter((t) => t != params)
  }
}

const search = ref('')
//Affichage de l'album en fonction de l'entrée de l'user
watch(
  () => search.value,
  () => {
    if (search.value !== '') {
      Album.value = Album.value.filter(
        (t) =>
          t.title.toUpperCase().includes(search.value.toUpperCase()) ||
          t.name.toUpperCase().includes(search.value.toUpperCase())
      )
    } else {
      fetchAlbum()
    }
  }
)

const nom = ref('')
const catégorie = ref('')
const titre = ref('')
const description = ref('')
const duree = ref('')
const newAlbum = ref({})

function addAlbum() {
  newAlbum.value = {
    id: Album.value.lenght,
    ref: catégorie.value,
    name: nom.value,
    title: titre.value,
    description: description.value,
    duration: duree.value,
    url: 'http://placehold.it/32x32',
    like: 'Much',
    tags: ['nisi', 'do', 'id', 'laborum', 'non', 'sint', 'cillum'],
    status: 'off'
  }
  
  Album.value.push(newAlbum.value)
  console.log(newAlbum.value)
  console.log(Album.value)
  nom.value = ''
  catégorie.value = ''
  titre.value = ''
  description.value = ''
  duree.value = ''
}
</script>

<template>
  <section>
    <input
      v-model="search"
      type="search"
      class="form-control w-25 position-absolute"
      style="top: 20px; left: 55%"
      placeholder="Que shouhaitez-vous écouter?"
    />
    <div v-if="answer" class="alert alert-succes m-3" role="alert">Sons supprimer avec succes</div>
    <div class="d-flex justify-content-xxl-between m-3">
      <h1 class="mx-5">New Song</h1>
      <button class="btn btn-danger fs-5" data-bs-toggle="modal" data-bs-target="#form">
        <img src="../../assets/plus-solid.svg" alt="" /> Add album
      </button>
    </div>

    <div
      class="modal fade"
      id="form"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content text-black">
          <div class="modal-header">
            <h5 class="modal-title text-center fs-3" id="exampleModalLabel">Ajoutez un album</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addAlbum()">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Catégorie</label>
                <input required v-model="catégorie" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Nom</label>
                <input v-model="nom" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Titre</label>
                <input v-model="titre" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Duration</label>
                <input v-model="duree" type="text" class="form-control" required />
              </div>
              <div class="form-floating">
                <textarea
                  v-model="description"
                  class="form-control m-1"
                  placeholder="Leave a comment here"
                  style="height: 100px"
                ></textarea>
                <label for="floatingTextarea2">Description</label>
              </div>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                Ajoutez l'album
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <article class="album">
      <nav aria-label="..." class="position-absolute">
        <!-- <ul class="pagination pagination-sm">
          <li class="page-item active" aria-current="page">
            <span class="page-link">1</span>
          </li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
        </ul> -->
      </nav>
      <div  id="alb" class="card col-3 bg-dark m-2" v-for="(song, index) in Album" :key="index">
        <h4 class="card-title">{{ song.ref }}</h4>
        <div class="play position-relative">
          <img src="../../assets/images.png" class="card-img-top" alt="..." />
          <div class="plays-div">
            <img
              @click="sendDetails(song)"
              class="btn btn-play position-absolute bottom-0 end-0 w-25"
              src="../../assets/circle-play-regular (1).svg"
              alt=""
            />
            <img
              @click="deleteSong(song)"
              class="btn btn-play position-absolute top-0 start-0 w-25"
              src="../../assets/circle-xmark-regular (1).svg"
              alt=""
            />
          </div>
        </div>
        <div class="card-body">
         <RouterLink :to="`/album/${song.id}`" class="text-decoration-none"><h4 class="card-title text-danger">{{ song.title }}</h4></RouterLink> 
          <h5 class="card-title text-white">{{ song.name }}</h5>
        </div>
      </div>
    </article>
  </section>
</template>

<style>
.album {
  max-width: 1280px;
  margin: 0 auto;
  font-weight: normal;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.plays-div {
  display: none;
  transition: display 2s linear;
}

.play:hover > .plays-div {
  display: block;
}

p {
  font-family: BreeSerif-Regular;
}

@font-face {
  font-family: BreeSerif-Regular;
  src: url(../assets/BreeSerif-Regular.ttf);
}

@font-face {
  font-family: ChakraPetch-Light;
  src: url(../../assets/ChakraPetch-Light.ttf);
}

h2,
h3,
h4 {
  font-family: ChakraPetch-Light;
}

@font-face {
  font-family: ChakraPetch-Light-Italic;
  src: url(../../assets/ChakraPetch-Italic.ttf);
}

h5 {
  font-family: ChakraPetch-Italic;
}

nav {
  top: 85px;
}
img {
  width: 20px;
}
</style>
