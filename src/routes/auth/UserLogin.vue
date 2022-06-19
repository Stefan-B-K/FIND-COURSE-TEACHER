<template>
     <base-card>
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
                    <base-button>{{submitButtonCaption }}</base-button>
                    <base-button type="button" mode="outline" @click="switchAuthMode">
                         {{ switchButtonCaption }}
                    </base-button>
               </div>
          </form>
     </base-card>
</template>


<script>

export default {
     emits: [],
     data () {
          return {
               email: { value: '', isValid: true },
               password: { value: '', isValid: true },
               mode: 'login'
          };
     },
     computed: {
          formIsValid () {
               return this.email.isValid && this.message.isValid;
          },
          submitButtonCaption() {
               return this.mode === 'login' ? 'Log In' : 'Sign Up'
          },
          switchButtonCaption() {
               return this.mode === 'login' ? 'You have no account? Sign up instead!' : 'Already registered? Log in!'
          }
     },
     methods: {
          validateForm () {
               if (this.email.value === '') this.email.isValid = false;
               if (this.password.value.length < 6) this.password.isValid = false;
          },
          submitForm () {
               this.validateForm();
               if (!this.formIsValid) return
               // const newUser = {
               //      userEmail: this.email,
               //      userPassword: this.password
               // };
          },
          clearInvalidPrompt (input) {
               this[input].isValid = true;
          },
          switchAuthMode () {
               if (this.mode === 'login') this.mode = 'signup';
               else this.mode = 'login';
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