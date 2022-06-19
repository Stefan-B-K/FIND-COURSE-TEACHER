<template>
     <div>
          <base-dialog
               :show="!!error"
               @close="handleError"
               title="Error sending registration request!!!"
          >
               <p>{{ error }}</p>
          </base-dialog>
          <section>
               <base-card><h2>Register as a teacher now!</h2>
                    <div v-if="isLoading">
                         <base-spinner></base-spinner>
                    </div>
                    <teacher-form v-else :allAreas="allAreas" @save-data="registerTeacher"></teacher-form>
               </base-card>
          </section>
     </div>
</template>


<script>
import TeacherForm from '@/components/teachers/TeacherForm';
import { mapActions, mapGetters } from 'vuex';

export default {
     components: { TeacherForm },
     data () {
          return {
               isLoading: false,
               error: null
          };
     },
     computed: {
          ...mapGetters({
               allAreas: 'teachers/allAreas',
               userId: 'userId'
          })
     },
     methods: {
          ...mapActions({
               addTeacher: 'teachers/addTeacher'
          }),
          async registerTeacher (newOne) {
               try {
                    this.isLoading = true;
                    await this.addTeacher(newOne);
                    this.isLoading = false;
                    this.$router.replace('/teachers');
               } catch (error) {
                    this.error = error.message;
               }
          },
          handleError () {
               this.isLoading = false;
               this.error = null;
               this.$router.replace('/teachers');
          }
     }
};
</script>


<style scoped>
</style>