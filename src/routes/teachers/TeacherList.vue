<template>
     <section>
          <teacher-filter :allAreas="areas" @change-filter="setAreas"></teacher-filter>
     </section>
     <section>
          <base-card>
               *********** TEST JENKINS ***************
               <div class="controls">
                    <base-button mode="outline">Refresh</base-button>
                    <base-button v-if="!isTeacher" link to="/register">Register as Teacher</base-button>
               </div>
               <ul v-if="hasTeachers">
                    <teacher-item v-for="teacher in filteredTeachers"
                                  :key="teacher.id"
                                  :teacher="teacher"
                    ></teacher-item>
               </ul>
               <h3 v-else>No teachers found.</h3></base-card>
     </section>
</template>


<script>
import { mapGetters } from 'vuex';
import TeacherItem from '@/components/teachers/TeacherItem';
import TeacherFilter from '@/components/teachers/TeacherFilter';

export default {
     components: { TeacherItem, TeacherFilter },
     data () {
          return {
               areasChecked: []
          };
     },
     created () {
          this.areasChecked = this.areas;
     },
     computed: {
          ...mapGetters({
               teachers: 'teachers/allTeachers',
               hasTeachers: 'teachers/teachersLoaded',
               areas: 'teachers/allAreas',
               isTeacher: 'teachers/registeredAsTeacher'
          }),
          filteredTeachers () {
               return this.teachers.filter(teacher => {
                    for (let area of this.areasChecked) {
                         if (teacher.areas.includes(area)) return true;
                    }
                    return false;
               });
          }
     },
     methods: {
          setAreas (updatedAreas) {
               this.areasChecked = updatedAreas;
          }
     }
};
</script>


<style scoped>
ul {
     list-style: none;
     margin: 0;
     padding: 0;
}

.controls {
     display: flex;
     justify-content: space-between;
}
</style>