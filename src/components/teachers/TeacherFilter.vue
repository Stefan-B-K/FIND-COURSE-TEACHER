<template>
     <base-card>
          <h2>Find Your Teacher</h2>
          <span v-for="area in allAreas" :key="area" class="filter-option">
               <input type="checkbox" :id="area" checked @change="setFilter">
               <label :for="area">{{ area }}</label>
          </span>
     </base-card>
</template>


<script>
export default {
     emits: ['change-filter'],
     props: { allAreas: Array },
     data () {
          return {
               areasChecked: []
          };
     },
     created () {
          this.areasChecked = this.allAreas
     },
     methods: {
          setFilter (event) {
               const areaChanged = event.target.id;
               if (event.target.checked) {
                    this.areasChecked.push(areaChanged);
               } else {
                    this.areasChecked = this.areasChecked.filter(area => area !== areaChanged);
               }
               this.$emit('change-filter', this.areasChecked);
          }
     }
};
</script>


<style scoped>
h2 {
     margin: 0.5rem 0;
}

.filter-option {
     margin-right: 1rem;
}

.filter-option label,
.filter-option input {
     vertical-align: middle;
}

.filter-option label {
     margin-left: 0.25rem;
}

.filter-option.active label {
     font-weight: bold;
}
</style>