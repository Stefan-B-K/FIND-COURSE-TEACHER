<template>
     <div>
          <section>
               <base-card>
                    <h2>{{ fullName }}</h2>
                    <h3>{{ rate }}</h3>
                    <h4>{{ available }}</h4>
               </base-card>
          </section>
          <section>
               <base-card>
                    <header><h2>Interested? Reach out now!</h2>
                         <base-button link :to="contact">Contact</base-button>
                    </header>
                    <router-view></router-view>
               </base-card>
          </section>
          <section>
               <base-card>
                    <base-badge v-for="area in teacher.areas" :key="area" :title="area">
                    </base-badge>
                    <p>{{ teacher.description }}</p></base-card>
          </section>
     </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
     props: ['id'],                                                             // from path in main.js
     data () {
          return {
               teacher: null
          };
     },
     created () {
          this.teacher = this.teachers.find(teacher => teacher.id === this.id);
     },
     computed: {
          ...mapGetters({
               teachers: 'teachers/allTeachers'
          }),
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
               return `${this.$route.path}/contact`;
          }
     }
};
</script>