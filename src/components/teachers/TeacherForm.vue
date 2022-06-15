<template>
     <form @submit.prevent="submitForm">
          <div class="form-control">
               <label for="first-name">First name</label>
               <input v-model.trim="firstName" type="text" id="first-name" />
          </div>
          <div class="form-control">
               <label for="last-name">Last name</label>
               <input v-model.trim="lastName" type="text" id="last-name" />
          </div>
          <div class="form-control">
               <label for="description">Description</label>
               <textarea v-model.trim="description" id="description" rows="5"></textarea>
          </div>
          <div class="form-control">
               <label for="rate">Hourly rate</label>
               <input v-model.number="rate" type="number" id="rate" />
          </div>
          <h3>Areas of Specialization</h3>
          <div class="form-control mixed-inputs">
               <span v-for="area in allAreas" :key="area">
                    <input v-model="areas" type="checkbox" :id="area" :value="area" />
                    <label :for="area">{{ area }}</label>
               </span>
               <input v-model.trim="newArea" type="text" id="new-area" class="new-area" />
               <label for="new-area" class="new-area">other</label>
          </div>
          <base-button>Register</base-button>
     </form>
</template>


<script>
export default {
     props: { allAreas: Array },
     emits: ['save-data'],
     data () {
          return {
               firstName: '',
               lastName: '',
               description: '',
               rate: null,
               areas: [],
               newArea: ''
          };
     },
     methods: {
          submitForm () {
               if (this.newArea.length > 0) this.areas.push(this.newArea)
               const formData = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    description: this.description,
                    hourlyRate: this.rate,
                    areas: this.areas,
                    available: true
               };
               this.$emit('save-data', formData)
          }
     }
};
</script>


<style scoped>
.form-control {
     margin: 0.5rem 0;
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

.invalid label {
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

</style>