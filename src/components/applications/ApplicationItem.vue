<template>
     <li>
          <div class="controls">
               <div>
                    <div>
                         <a :href="emailLink">{{ application.userEmail }}</a>
                    </div>
                    <p>{{ application.message }}</p>
               </div>
               <base-button @click="deleteApplication" mode="outline">Delete</base-button>
          </div>
     </li>
</template>


<script>

export default {
     props: { application: Object },
     emits: ['delete-app'],
     computed: {
          emailLink () {
               return 'mailto: ' + this.application.userEmail;
          }
     },
     methods: {
          deleteApplication() {
               this.$emit('delete-app', this.application.id)
          }
     }
};
</script>


<style scoped>
li {
     margin: 1rem 0;
     border: 1px solid #ccc;
     padding: 1rem;
}

a {
     color: #3d008d;
     text-decoration: none;
     font-weight: bold;
}

a:hover,
a:active {
     color: #8d007a;
}

p {
     margin: 0.5rem 0 0 0;
}

.controls {
     display: flex;
     justify-content: space-between;
}
</style>