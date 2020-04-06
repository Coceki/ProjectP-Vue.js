<template>
  <v-app id="app">
    <Topbar></Topbar>
    <v-content app>
      <v-container fluid class="mt-10">
      <v-fab-transition>
        <v-btn
          class=" "
          v-show="gotop"
          color="primary"
          fab
          dark
          fixed
          bottom
          right
          @click="toTop"
        >
          <v-icon>mdi-arrow-up</v-icon>
          
        </v-btn>
      
      </v-fab-transition>
      <v-container>
      <v-row class="mt-5" align="center" justify="center">
      <div class="text-center display-1 font-weight-bold">{{$t("ui.title")}}</div>
    </v-row>
    <v-row class="mt-5" align="center" justify="center">
      <div class="text-center title">{{$t("ui.info")}}</div>
    </v-row>
    <v-row class="mt-5" align="center" justify="center">
      <router-view :key="$route.path + $route.query.t"></router-view>
       </v-row>
  </v-container>
      </v-container>
      </v-content>
        <v-footer style="postition:absolute;bottom:0;" class="py-4" dark height="auto">
          <v-container mx-auto>
            <v-layout wrap>
              <v-flex xs10>
                <v-container>
                  <v-row align="end">
                    {{$t("ui.developer")}}
                    <v-btn icon @click="See('https://github.com/Coceki/ProjectP-Vue.js')"><v-icon>mdi-github</v-icon></v-btn>
                  </v-row>
                  <v-row>
                    {{$t("ui.developerinfo")}}
                  </v-row>
                </v-container>
              </v-flex>
              <v-spacer />
              <base-btn class="mr-0" square title="Go to top" @click="$vuetify.goTo(0)">
                <v-icon>mdi-chevron-up</v-icon>
              </base-btn>
            </v-layout>
          </v-container>
        </v-footer>
      
    
    
  </v-app>
</template>

<script>
import Topbar from "./components/Topbar.vue"
export default {
  name: 'App',

  components: {
    Topbar,
  },

  data: () => ({
    gotop:false,
    //
  }),
  mounted(){
    window.addEventListener("scroll", this.handleScroll, true);
    if (this.$cookies.isKey("Lang")){
      this.$i18n.locale=this.$cookies.get("Lang");
    
    }
  },
  methods: {
    handleScroll() {
      let scrolltop =
        document.documentElement.scrollTop || document.body.scrollTop;
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false);
    },
    toTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },
    See (e) {
        window.location.href = e
      }
    }
  
};
</script>
