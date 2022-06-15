<template>
     <span class="badge">
          {{ text }}
     </span>
</template>


<script>
export default {
     props: ['type', 'title'],
     computed: {
          text() {
               return this.title.toUpperCase()
          }
     }
};
</script>


<style scoped>
.badge {
     background-color: #3d008d;
     color: white;
     border-radius: 30px;
     padding: 0.5rem 1.5rem;
     display: inline-block;
     margin-right: 0.5rem;
}
</style>