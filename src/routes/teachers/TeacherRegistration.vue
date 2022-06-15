<template>
  <section>
       <base-card><h2>Register as a teacher now!</h2>
            <teacher-form :allAreas="allAreas" @save-data="registerTeacher"></teacher-form>
       </base-card>
  </section>
</template>


<script>
import TeacherForm from '@/components/teachers/TeacherForm';
import BaseCard from '@/components/ui/BaseCard';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { BaseCard, TeacherForm },
  data () { return {}; },
  computed: {
       ...mapGetters({
            allAreas: 'teachers/allAreas',
       })
  },
  methods: {
       ...mapActions({
            addTeacher: 'teachers/addTeacher'
       }),
       registerTeacher(newOne) {
            console.log(newOne);
            this.addTeacher(newOne)
            this.$router.replace('/teachers')
       }
  }
};
</script>


<style scoped>
</style>