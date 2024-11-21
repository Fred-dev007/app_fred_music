<script setup>
import router from '@/routes'
import { ref, onMounted } from 'vue'
const mailtext = ref('')
const password = ref('')
const user = ref('')
const data = ref('')
function submitform() {
  connectUser()
  console.log(mailtext.value);
  console.log(password.value); 
}
async function fetchUser() {
  const resp = await fetch('http://localhost:5173/src/assets/user-data (1).json')
  data.value = await resp.json()
  console.log(data.value)
}

function connectUser() {
  user.value = data.value.filter((us) => us.email == mailtext.value)
  if (user.value.length > 0) {
    if (password.value == user.value[0].password) {
     router.push("/home")
    } else {
        router.push("/login") 
        mailtext.value=''
        password.value=''
        alert("Mot de passe incorrect");
    }
  }else {
        console.log('My gee tape des infos corrects');
        router.push('/')
         mailtext.value=''
         password.value=''
         alert("Identifiants incorrect");
    }
}
onMounted(() => {
  fetchUser()
})
</script>

<template>
    
  <form @submit.prevent="submitform()" class="d-flex justify-content-center align-items-center mt-5">
    <div class="card col-3 text-dark p-3">
        <h2 class="text-center">Connexion</h2>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
        v-model="mailtext"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          required
        />
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" required />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>

<style scoped>

</style>
