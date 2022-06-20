<template>
     <base-card>
          <base-dialog :show="!!error" @close="handleError" title="Error authenticating at Firebase!!!">
               <h4>{{ error }}</h4>
          </base-dialog>
          <base-dialog
               :show="isLoading && !!!error"
               @close="closeDialog"
               title="Registration"
               :fixed="!userIsLoggedIn">
               <base-spinner v-if="!userIsLoggedIn"></base-spinner>
               <h3 v-else>Successfully signed up!</h3>
          </base-dialog>
          <form @submit.prevent="submitForm">
               <div class="form-control">
                    <label for="email" :class="{ invalid: !email.isValid }">Email</label>
                    <input
                         v-model.trim="email.value"
                         type="email"
                         id="email"
                         :class="{ invalid: !email.isValid }"
                         @input="clearInvalidPrompt('email')"
                    />
               </div>
               <p v-if="!email.isValid">Please provide a valid email</p>
               <div class="form-control">
                    <label for="password" :class="{ invalid: !password.isValid }">Password</label>
                    <input v-model.trim="password.value"
                           type="password"
                           id="password"
                           :class="{ invalid: !password.isValid }"
                           @input="clearInvalidPrompt('password')"
                    />
               </div>
               <p v-if="!password.isValid">Please enter a password of minimum 6 characters</p>
               <div class="actions">
                    <base-button>{{ submitButtonCaption }}</base-button>
                    <base-button type="button" mode="outline" @click="switchAuthMode">
                         {{ switchButtonCaption }}
                    </base-button>
               </div>
          </form>
     </base-card>
</template>


<script>

import { mapActions, mapGetters } from 'vuex';

export default {
     components: {},
     
     emits: [],
     data () {
          return {
               email: { value: '', isValid: true },
               password: { value: '', isValid: true },
               mode: 'login',
               isLoading: false,
               error: null
          };
     },
     computed: {
          ...mapGetters({
               userIsLoggedIn: 'userIsLoggedIn',
               teachers: 'teachers/allTeachers',
               userId: 'userId'
          }),
          formIsValid () {
               return this.email.isValid && this.password.isValid;
          },
          submitButtonCaption () {
               return this.mode === 'login' ? 'Log In' : 'Sign Up';
          },
          switchButtonCaption () {
               return this.mode === 'login' ? 'You have no account? Sign up instead!' : 'Already registered? Log in!';
          }
     },
     methods: {
          ...mapActions({
               authorize: 'authorize',
               setUserIsTeacher: 'teachers/setUserIsTeacher'
          }),
          validateForm () {
               if (this.email.value === '') this.email.isValid = false;
               if (this.password.value.length < 6) this.password.isValid = false;
          },
          async submitForm () {
               this.validateForm();
               if (!this.formIsValid) return;
               
               const userInputData = [
                    {
                         email: this.email.value,
                         password: this.password.value
                    },
                    this.mode
               ];
               
               try {
                    if (this.mode === 'signup') this.isLoading = true;
                    await this.authorize(userInputData);
                    
                    for (let teacher of this.teachers) {
                         if (teacher.id === this.userId) this.setUserIsTeacher()
                    }
                    
                    if (this.mode === 'login') this.$router.replace('/teachers');
               } catch (error) {
                    this.error = error.message;
               }
          },
          clearInvalidPrompt (input) {
               this[input].isValid = true;
          },
          switchAuthMode () {
               if (this.mode === 'login') this.mode = 'signup';
               else this.mode = 'login';
          },
          handleError () {
               this.isLoading = false;
               this.error = null;
          },
          closeDialog () {
               this.isLoading = false;
               this.$router.replace('/teachers');
          }
     }
};
</script>


<style scoped>
form {
     margin: 1rem;
     padding: 1rem;
}

.form-control {
     margin: 1rem 0 0.2rem 0;
}

label {
     font-weight: bold;
     margin-bottom: 0.5rem;
     display: block;
}

input {
     display: block;
     width: 100%;
     font: inherit;
     border: 1px solid #ccc;
     padding: 0.15rem;
}

input:focus {
     border-color: #3d008d;
     background-color: #faf6ff;
     outline: none;
}

label.invalid {
     color: red;
}

input.invalid {
     border: 1px solid red;
}

.actions {
     display: flex;
     margin-top: 10px;
}

p {
     margin-top: 2px;
     font-size: small;
     font-weight: 100;
}


</style>