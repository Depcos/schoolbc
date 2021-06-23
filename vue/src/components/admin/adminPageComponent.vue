<template>
<login-component v-show="!logged" @logged="userLogged" > </login-component>
<div v-show="logged">
  <div  class="d-flex" id="wrapper">


    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper" :style="showMenu ? { 'margin-left':'0'} : null">
      <div class="sidebar-heading">Admin menu </div>
      <div class="list-group list-group-flush">
        <button
            v-for="tab in tabs"
            :key="tab"
            :class="['tab-button', { active: currentTab === tab }]"
            @click="toggleMenu();currentTab = tab"
        >
          {{ tab }}
        </button>

      </div>
    </div>
    <!-- Page Content -->
    <div id="page-content-wrapper">

      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button id="showMenu" class="float-left btn btn-dark" @click="toggleMenu">
          |||
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item active">

              <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container-fluid">
        <component :is="currentTabComponent">     </component>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import CategorySelectComponent from "@/components/admin/CategorySelectComponent";
import attributeseditComponent from "@/components/admin/dataHandling/attributeseditComponent";
import subcategorieseditComponent from "@/components/admin/dataHandling/subcategorieseditComponent";
import categorieseditComponent from "@/components/admin/dataHandling/categorieseditComponent";
import productseditComponent from "@/components/admin/dataHandling/productseditComponent";
import loginComponent from "@/components/admin/loginComponent";
import axios from "axios";
import router from "@/router";


export default {
  components:{
    'Guide': CategorySelectComponent,
   'Attributes': attributeseditComponent,
  'SubCategories':  subcategorieseditComponent,
  'Categories':  categorieseditComponent,
 'Products' :  productseditComponent,
    loginComponent
  },
name: "adminPageComponent",
  data() {
    return {
      currentTab: 'Products',
      tabs: ['Products', 'Categories', 'SubCategories','Attributes','Guide'],
      logged:false,
      showMenu:false
    }
  },
  methods:{
    toggleMenu(){
      this.showMenu = !this.showMenu;
    },
    logout: function () {
      axios
          .get("http://localhost:3000/api/logout")
          .then(() => {
            router.push("/")
          })
    },
    userLogged(){
      this.logged=true;
    },
  },
  computed: {
    currentTabComponent() {
      return  this.currentTab;
    }
  }

}
</script>

<style scoped>

#wrapper {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin .25s ease-out;
  -moz-transition: margin .25s ease-out;
  -o-transition: margin .25s ease-out;
  transition: margin .25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }
@media (min-width: 768px){
  #showMenu{
  display: none;
  }
}
  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}
.navbar-nav.navbar-center {
  position: absolute;
  left: 50%;
  transform: translatex(-50%);

}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
</style>