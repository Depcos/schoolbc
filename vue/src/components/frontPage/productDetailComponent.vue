<template>

  <!-- template for the modal component -->

    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                {{ product.productname}}
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">

                <img  class="img-fluid"  alt="Responsive image"  :src="product.imgLink">
              <div v-for="(item,index) in product.list" :key="`item-${index}`">

                <div v-if="item.unit!==null">
                  {{item.name}} -  {{item.value}} {{item.unit}}
                </div>

                <div v-else-if="item.unit===null && item.attDesc===null">
                  {{item.name}} :  {{item.value}}
                </div>

                <div v-else class="tooltip">
                  {{item.name}}
                  <span class="tooltiptext">{{item.attDesc}}</span>
                </div>


              </div>
              </slot>
              <br>
              {{product.Description}}

            </div>








            <div class="modal-footer">
              <slot name="footer">

              <a :href="product.link">Odkaz produktu</a>
                <button class="modal-default-button btn btn-light" @click="$emit('close')">
                  Zpět
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
import {ref} from "vue";
export default {
  props:['id'],
  name: "productDetailComponent",
  options:{

  },setup(props){
   // console.log("productDetailComponent");
    const product = ref([]);
    axios.get(`http://localhost:3000/products/${props.id}`)
        .then(response =>
            { //console.log(response.data);
             // product.value=response.data;
           // console.log(JSON.stringify(response.data));
          //  console.log(JSON.parse(response.data));



             var x  = JSON.stringify(response.data);
              x = x.replace(/}{/g,"},{");
              x =  x.replace(/\\/g, '');
              x = x.replace(/"\["/g,'[');
              x = x.replace(/"\]"/g,']');
              x = x.replace(/'"\['/g,'[');

           // console.log(x);
           //  console.log(JSON.parse(x));
              product.value=JSON.parse(x);

let attrlist = [];
//let obj=[];
//let Mystring="";
for(let i=0;i<product.value.list.length;i+=4){

  let obj = {
    ...product.value.list[i],
   ... product.value.list[i+1],
   ... product.value.list[i+2],
    ... product.value.list[i+3]

  }
  attrlist.push(obj);


}
            product.value.list=attrlist;

            }

        );
    return{
      product
    }
  },emits:["close"]
}
</script>

<style scoped>

@media(max-width: 1024px){
  .modal-container{
    width:90% !important;
  }
}

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
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}

img{width: 100px;height: 100px;}
.modal-default-button {
  display: block;
  margin-top: 1rem;
}

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
img{width: 20%;height: 30%;}


.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  opacity: 1;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: -5px;
  left: 105%;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}


</style>