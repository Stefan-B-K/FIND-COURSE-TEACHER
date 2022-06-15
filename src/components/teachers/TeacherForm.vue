<template>
     <form @submit.prevent="submitForm">
          <div class="form-control" :class="{ invalid: !firstName.isValid }">
               <label for="first-name">First name</label>
               <input
                    v-model.trim="firstName.value"
                    type="text"
                    id="first-name"
                    @input="clearInvalidPrompt('firstName')"
               />
               <p v-if="!firstName.isValid">The field must not be empty!</p>
          </div>
          <div class="form-control" :class="{ invalid: !lastName.isValid }">
               <label for="last-name">Last name</label>
               <input
                    v-model.trim="lastName.value"
                    type="text"
                    id="last-name"
                    @input="clearInvalidPrompt('lastName')"
               />
               <p v-if="!lastName.isValid">The field must not be empty!</p>
          </div>
          <div class="form-control" :class="{ invalid: !description.isValid }">
               <label for="description">Description</label>
               <textarea
                    v-model.trim="description.value"
                    id="description"
                    rows="5"
                    @input="clearInvalidPrompt('description')"
               ></textarea>
               <p v-if="!description.isValid">The field must not be empty!</p>
          </div>
          <div class="form-control" :class="{ invalid: !rate.isValid }">
               <label for="rate">Hourly rate</label>
               <input
                    v-model.number="rate.value"
                    type="number"
                    id="rate"
                    @input="clearInvalidPrompt('rate')"
               />
               <p v-if="!rate.isValid">The field must not be empty or negative number!</p>
          </div>
          <h3 :class="{ invalid: !areas.isValid }">Areas of Specialization</h3>
          <div class="form-control mixed-inputs" :class="{ invalid: !areas.isValid }">
               <span v-for="area in allAreas" :key="area">
                    <input
                         v-model="areas.value"
                         type="checkbox"
                         :id="area"
                         :value="area"
                         @change="clearInvalidPrompt('areas')"
                    />
                    <label :for="area">{{ area }}</label>
               </span>
               <input
                    v-model.trim="newArea.value"
                    type="text"
                    id="new-area"
                    class="new-area"
                    @input="clearInvalidPrompt('areas')"
               />
               <label for="new-area" class="new-area">other</label>
          </div>
          <span v-if="!areas.isValid">At least one specialization must be checked
               or new/custom one filled in!</span>
          <div class="form-control mixed-inputs" >
               <base-button>Register</base-button>
               <h4 v-if="!formIsValid">Please fill the missing input data
                    in the fields marked with red!</h4>
          </div>
     </form>
</template>


<script>

import BaseButton from '@/components/ui/BaseButton';

export default {
     components: { BaseButton },
     props: { allAreas: Array },
     emits: ['save-data'],
     data () {
          return {
               firstName: { value: '', isValid: true },
               lastName: { value: '', isValid: true },
               description: { value: '', isValid: true },
               rate: { value: null, isValid: true },
               areas: { value: [], isValid: true },
               newArea: { value: '', isValid: true }
          };
     },
     computed: {
          formIsValid () {
               for (let prop in this.$data) {
                    if (!this.$data[prop].isValid) return false;
               }
               return true;
          }
     },
     methods: {
          validateForm () {
               if (this.firstName.value === '') this.firstName.isValid = false;
               if (this.lastName.value === '') this.lastName.isValid = false;
               if (this.description.value === '') this.description.isValid = false;
               if (this.rate.value === null || this.rate.value < 0) this.rate.isValid = false;
               if (this.areas.value.length === 0) this.areas.isValid = false;
          },
          submitForm () {
               if (this.newArea.value.length > 0) this.areas.value.push(this.newArea.value);
               this.validateForm();
               if (!this.formIsValid) return;
               const formData = {
                    firstName: this.firstName.value,
                    lastName: this.lastName.value,
                    description: this.description.value,
                    hourlyRate: this.rate.value,
                    areas: this.areas.value,
                    available: true
               };
               this.$emit('save-data', formData);
          },
          clearInvalidPrompt(input) {
               this[input].isValid = true
          }
     }
};
</script>


<style scoped>
.form-control {
     margin: 1rem 0 0 0;
}

label, h3 {
     font-weight: bold;
     font-size: 1rem;
     display: block;
     margin: 1rem 0 0.5rem 0;
}

input[type='checkbox'] + label,
label.new-area {
     font-weight: normal;
     display: inline;
     margin: 0 0.5rem 0 0.2rem;
}

input,
textarea {
     display: block;
     width: 100%;
     border: 1px solid #ccc;
     font: inherit;
}

input:focus,
textarea:focus {
     background-color: #f0e6fd;
     outline: none;
     border-color: #3d008d;
}

input[type='checkbox'] {
     display: inline;
     width: auto;
     border: none;
     vertical-align: bottom;
}

.invalid label, h3.invalid {
     color: red;
}

.invalid input,
.invalid textarea {
     border: 1px solid red;
}

input.new-area {
     width: 150px;
     height: 20px;
     border: 1px solid #ccc;
     font: inherit;
     margin: 0 0.2rem 0 0.5rem;
}

.mixed-inputs {
     display: flex;
}

p, span {
     margin-top: 2px;
     font-size: small;
     font-weight: 100;
}

base-button {
     margin: 5px;
}

h4 {
     margin-top: 1rem;
}

</style>