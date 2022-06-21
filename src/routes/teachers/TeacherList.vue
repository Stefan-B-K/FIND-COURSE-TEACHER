<template>
     <div>
          <base-dialog
               :show="!!error"
               @close="handleError"
               title="Error fetching teachers!!"
          >
               <p>{{ error }}</p>
          </base-dialog>
          <section>
               <teacher-filter @change-filter="setAreas"></teacher-filter>
          </section>
          <section>
               <base-card>
                    <div class="controls">
                         <base-button @click="refreshTeachers" v-if="!isLoading" mode="outline">Refresh</base-button>
                         <base-button v-if="userIsLoggedIn && !isTeacher && !isLoading" link to="/register">Register as Teacher
                         </base-button>
                    </div>
                    <div v-if="isLoading">
                         <base-spinner></base-spinner>
                    </div>
                    <ul v-else-if="teachersLoaded">
                         <teacher-item v-for="teacher in filteredTeachers"
                                       :key="teacher.id"
                                       :teacher="teacher"
                         ></teacher-item>
                    </ul>
                    <h3 v-else>No teachers found.</h3>
               </base-card>
          </section>
     </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import TeacherItem from '@/components/teachers/TeacherItem';
import TeacherFilter from '@/components/teachers/TeacherFilter';

export default {
     components: { TeacherItem, TeacherFilter },
     data () {
          return {
               areasChecked: [],
               isLoading: false,
               error: null
          };
     },
     async created () {
          if (!this.teachersLoaded) {
               await this.refreshTeachers()
          } else {
               this.areasChecked = this.areas;
          }
     },
     computed: {
          ...mapGetters({
               teachers: 'teachers/allTeachers',
               teachersLoaded: 'teachers/teachersLoaded',
               areas: 'teachers/allAreas',
               isTeacher: 'teachers/userIsTeacher',
               userIsLoggedIn: 'userIsLoggedIn'
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
          },
          ...mapActions({
               loadTeachers: 'teachers/fetchTeachers'
          }),
          async refreshTeachers () {
               try {
                    this.isLoading = true;
                    await this.loadTeachers();
                    this.isLoading = false;
                    this.areasChecked = this.areas;
               } catch (error) {
                    this.error = error.message;
               }
          },
          handleError () {
               this.isLoading = false;
               this.error = null;
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