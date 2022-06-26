<template>
   <the-header></the-header>
   <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
         <component :is="slotProps.Component"></component>
      </transition>
   </router-view>
</template>


<script>
import TheHeader from './components/layout/TheHeader.vue'

export default {
   components: { TheHeader },
   created () {
      this.$store.dispatch('keepLogin')
      this.$store.dispatch('teachers/fetchTeachers')
   },
   computed: {
      userIsLoggedIn () {
         return this.$store.getters.userIsLoggedIn
      }
   },
   watch: {
      userIsLoggedIn (newValue) {
         if (!newValue) this.$router.replace('/teachers')
      }
   }
}
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
   box-sizing: border-box;
}

html {
   font-family: "Roboto", sans-serif;
}

body {
   margin: 0;
}

.route-enter-active {
   animation: fade-in 0.3s ease-out;
}

.route-leave-active {
   animation: fade-in 0.3s ease-in reverse;
}


@keyframes fade-in {
   from {
      opacity: 0
   }
   to {
      opacity: 1;
   }
}

</style>