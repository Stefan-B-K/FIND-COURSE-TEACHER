<template>
     <base-dialog
          :show="!!error"
          @close="handleError"
          title="Error  fetching applications!!"
     >
          <p>{{ error }}</p>
     </base-dialog>
     <section>
          <base-card>
               <header>
                    <h2>Applications Received </h2>
                    <base-button @click="loadApplications" mode="outline">Refresh</base-button>
               </header>
               <div v-if="isLoading">
                    <base-spinner></base-spinner>
               </div>
               <h3 v-else-if="noApplications">No applications received!</h3>
               <ul v-else>
                    <application-item
                         v-for="application in receivedApplications"
                         :key="application.id"
                         :application="application"
                    >
                    </application-item>
               </ul>
          </base-card>
     </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ApplicationItem from '@/components/applications/ApplicationItem';
import BaseButton from '@/components/ui/BaseButton';

export default {
     components: { BaseButton, ApplicationItem },
     data () {
          return {
               isLoading: false,
               error: null
          };
     },
     async created () {
          if (!this.applicationsLoaded) {
               await this.loadApplications();
          }
     },
     computed: {
          ...mapGetters({
               receivedApplications: 'applications/applications',
               applicationsLoaded: 'applications/applicationsLoaded',
               noApplications: 'applications/noApplications'
          })
     },
     methods: {
          ...mapActions({
               fetchApplications: 'applications/fetchApplications'
          }),
          async loadApplications () {
               try {
                    this.isLoading = true;
                    await this.fetchApplications();
                    this.isLoading = false;
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
header {
     text-align: center;
}

ul {
     list-style: none;
     margin: 2rem auto;
     padding: 0;
     max-width: 30rem;
}

h3 {
     text-align: center;
}

</style>