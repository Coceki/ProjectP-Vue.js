<template>
  <div class="game">
      <!--说明信息-->
      <transition name="fade">
      <div v-if="show" id="opening1">
        <v-container fluid>
        <v-col min-height=720 cols="12">
          <v-row class="pt-12" align="center" justify="center">
          <p class="red--text display-1 font-weight-bold">{{$t("ui.attention")}}</p>
          </v-row>
        <v-row class="pt-12" align="center" justify="center">
              <p class="title ">{{$t("ui.attentioninfo")}}</p>
          </v-row>
        </v-col>
        </v-container>
      </div>
      </transition>
      <!--游戏首页-->
      <transition name="fade">
        <div v-if="showm" id="opening1">
            <v-container fluid>
        <v-col min-height=720 cols="12">
          <v-row class="pt-12" align="center" justify="center">
          <p class="display-1 font-weight-bold">{{$t("ui.title")}}</p>
          </v-row>
        <v-row class="pt-12" align="center" justify="center">
              <v-btn text color=secondary @click="start">{{$t("ui.gamestart")}}</v-btn>
          </v-row>
        </v-col>
        </v-container>
        </div>
    </transition>
  </div>
</template>

<script>
export default {
    data: () => ({
    show:false,
    showm:false,
  }),
    methods:{
        init(){
            var _this=this;
            window.console.log("进入游戏");
            setTimeout(function(){_this.show=true},1000);
            setTimeout(function(){_this.show=false},5000);
            setTimeout(function(){_this.showm=true},5500);
        },
        start(){
            var _this=this
            _this.showm=false;
            setTimeout(function(){_this.$router.push({path:"/pekoland",
            query:{
            t:Date.now(),
            },});},500);
            
        }
    },
    created(){
        this.init()  
    }
}
</script>

<style>
.fade-enter{
  opacity:0;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  transition:opacity .5s;
}
.fade-leave-to{
  opacity:0;
}
#opening1{
    max-width: 1280px;
    min-width: 1280px;
    max-height: 720px;
    min-height: 720px;
    background-color: white;
}
</style>