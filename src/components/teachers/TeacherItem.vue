<template>
     <li>
          <h3>{{ fullName }}</h3>
          <h4>{{ rate }}</h4>
          <h5> {{ available }}</h5>
          <div>
               <base-badge
                    v-for="area in teacher.areas"
                    :key="area"
                    :title="area"
               ></base-badge>
          </div>
          <div class="actions">
               <base-button link :to="contact" mode="outline">Contact</base-button>
               <base-button link :to="details">View Details</base-button>
          </div>
     </li>
</template>


<script>

export default {
     props: { teacher: Object },
     computed: {
          fullName () {
               return this.teacher.firstName + ' ' + this.teacher.lastName;
          },
          rate () {
               return this.teacher.hourlyRate + '$/hour';
          },
          available () {
               return this.teacher.available ? 'Available' : 'Not Available';
          },
          contact () {
               return `${this.$route.path}/${this.teacher.id}/contact`;
          },
          details () {
               return `${this.$route.path}/${this.teacher.id}`;
          }
     }
};
</script>


<style scoped>
li {
     margin: 1rem 0;
     border: 1px solid #424242;
     border-radius: 12px;
     padding: 1rem;
}

h3 {
     font-size: 1.5rem;
}

h3, h4, h5 {
     margin: 0.5rem 0;
}

h5 {
     font-style: italic;
}

div {
     margin: 0.5rem 0;
}

.actions {
     display: flex;
     justify-content: flex-end;
}
</style>