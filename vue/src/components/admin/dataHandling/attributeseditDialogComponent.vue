<template>

  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-body">
            <slot name="description">

              Název attributu:    <input  v-model="nameref"  :placeholder="attribute.name"><br>
              <div v-show="attribute.unit!==null">
              Jednotka Attributu  <input  v-model="unitref" :placeholder="attribute.unit">
              </div>
              <div v-show="attribute.Description!==null">
                Popis vlastnosti Attributu  <textarea v-model="descref" :placeholder="attribute.Description"/>
              </div>

            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                zpět
              </button>
              <button class="modal-default-button" @click="edit">
                edit and save
              </button>

            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import axios from "axios";

export default {
  name: "attributeseditDialogComponent",
  props:['attribute'],
  setup(){

    return{

    }
  },
  data(){
    return {
     nameref : this.attribute.name,
       unitref: this.attribute.unit,
      descref : this.attribute.Description
    }
  },
  methods:{
    edit() {

      let update = {
        idAttribute: this.attribute.idAttribute,
        name: this.nameref,
        unit: this.unitref==="" ? null:this.unitref,
        Description: this.descref
      }

      if (this.nameref !== "") {

        axios.put(`http://localhost:3000/attributes`, update)
            .then(res => {
              console.log(res);
              this.$emit('close');
            })
            .catch((error) => {
              // Error
              if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                alert("Error occured");
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received, `error.request`
                console.log(error.request);
              } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
            })
      }else{
        alert("Nevyplněné jméno");

      }
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 65%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  word-wrap: break-word;
}
img{width: 100px;height: 100px;}
.modal-default-button {
  display: block;
  margin-top: 1rem;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>