<template>
     <div>
          <base-dialog :show="!!error" @close="handleError" title="Error sending application!!!">
               <p>{{ error }}</p>
          </base-dialog>
          <form @submit.prevent="submitForm">
               <div class="form-control" :class="{ invalid: !email.isValid }">
                    <label for="email">Your E-Mail</label>
                    <input
                         v-model.trim="email.value"
                         type="email"
                         id="email"
                         @input="clearInvalidPrompt('email')"
                    />
                    <p v-if="!email.isValid">Must provide a valid e-mail!</p>
               </div>
               <div class="form-control" :class="{ invalid: !message.isValid }">
                    <label for="message">Message</label>
                    <textarea
                         v-model.trim="message.value"
                         id="message"
                         rows="5"
                         @input="clearInvalidPrompt('message')"
                    ></textarea>
                    <p v-if="!message.isValid">Enter some message to send to the teacher!</p>
               </div>
               <div class="actions">
                    <base-button>Send</base-button>
                    <h4 v-if="!formIsValid">Please provide valid data
                         in the fields marked with red!</h4>
               </div>
          </form>
     </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
     data () {
          return {
               email: { value: '', isValid: true },
               message: { value: '', isValid: true },
               error: null
          };
     },
     computed: {
          formIsValid () {
               return this.email.isValid && this.message.isValid;
          }
     },
     methods: {
          ...mapActions({ contactTeacher: 'applications/contactTeacher' }),
          validateForm () {
               if (this.email.value === '') this.email.isValid = false;
               if (this.message.value === '') this.message.isValid = false;
          },
          async submitForm () {
               this.validateForm();
               if (!this.formIsValid) return;
               try {
                    await this.contactTeacher({
                         email: this.email.value,
                         message: this.message.value,
                         teacherId: this.$route.params.id
                    });
                    this.$router.replace('/teachers');
               } catch (error) {
                    this.error = error.message;
               }
          },
          clearInvalidPrompt (input) {
               this[input].isValid = true;
          },
          handleError () {
               this.error = null;
               this.$router.replace('/teachers');
          }
     }
};
</script>

<style scoped>
form {
     margin: 1rem;
     border: 1px solid #ccc;
     border-radius: 12px;
     padding: 1rem;
}

.form-control {
     margin: 0.5rem 0;
}

label {
     font-weight: bold;
     margin-bottom: 0.5rem;
     display: block;
}

input,
textarea {
     display: block;
     width: 100%;
     font: inherit;
     border: 1px solid #ccc;
     padding: 0.15rem;
}

input:focus,
textarea:focus {
     border-color: #3d008d;
     background-color: #faf6ff;
     outline: none;
}

.invalid label {
     color: red;
}

.invalid input,
.invalid textarea {
     border: 1px solid red;
}

.actions {
     text-align: center;
}

p {
     margin-top: 2px;
     font-size: small;
     font-weight: 100;
}

base-button {
     margin: 5px;
}
</style>