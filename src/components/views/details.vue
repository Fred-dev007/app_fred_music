<script setup>
import { ref, watch } from 'vue';
//recupération du message envoyer par le parent avec props
const props = defineProps({
    song: Object
})
let sons = ref({})
//Réafectation du sons chaquefois que sa valeur change
watch(() => props.song, (n) => sons.value = n)

const emits =defineEmits(['jouer'])
//Envoie le sons a play
function plays(p) {
    emits('jouer',p)
}

</script>
<template>
    <section :class="{ dis : props.song.id }">
        
    </section>
    <section class="details" :class="{ dis : !props.song.id }">
        <h2>{{ sons.title }}</h2>
        <div class="clearfix position-relative">
            <img src="../../assets/The_Sounds_of_Earth_-_GPN-2000-001976.jpg" class="w-50 float-start m-2" alt="">
            <p class="p-3 fs-5 fw-bold ">Genre: {{ sons.ref }}</p>
            <img @click="plays(sons)" class="rounded-circle btn btn-play position-absolute bottom-0 end-0 w-25 "
                    src="../../assets/circle-play-regular (1).svg" alt="">
        </div>
        <div >
            <h4>{{ sons.name }} </h4>
            <span class="fw-bold fs-4">Environs {{sons.duration}}minutes</span>
            <h3>Playlist</h3>
            <ul class="list-group list-group-numbered  p-2">
                <li class="list-group-item list-group-item-action list-group-item-secondary"
                    v-for="(tag, index) in sons.tags" :key="index">{{ tag }}</li>
            </ul>
        </div>

    </section>
</template>
<style scoped>
div>img {
    width: 15px;
}

.details{
    background-color: #2c2c2c;
}

.dis{
    display: none;
}
</style>