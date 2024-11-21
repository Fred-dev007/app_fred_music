<script setup>
import apmChrono from './apmChrono.vue';
</script>
<template>
    <section class="header">
        <div class="fs-2 col-6"><img class="logo w-25" src="../../assets/logo.png" alt="">
        </div>
        
        <div class="d-flex col6">
            <apmChrono />
            <RouterLink :to="`/login`" replace href="" class="btn btn-danger fs-4"><img src="../../assets/right-from-bracket-solid (1).svg" alt="" class="sing"> Log out</RouterLink>
        </div>
    </section>
</template>
<style>
.logo {
    width: 25px;
}

.sing {
    width: 50px;
}

.header {
    padding: 0.8rem;
    font-weight: normal;
    display: flex;
    justify-content: space-between;
    background-color: #575757;
}
li{
    list-style: none;
}


</style>