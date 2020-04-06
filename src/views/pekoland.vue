<template>
    <div id="game" >
        <transition name="fade">
        <div id="pekoland" v-if="show">
            <v-img :src="pekora" id="pekora" width=75 height=150 style="position:absolute;left: 50px;bottom: 290px;z-index:11"></v-img>
            <v-img :src="ground" width=1280 height=300 style="position:absolute;left: 0px;bottom: 0px;z-index:10"></v-img>
            <v-img :src="sky" width=1280 height=420 style="position:absolute;left: 0px;top: 0px;z-index:9"></v-img>
        </div>
        </transition>
    </div>
</template>

<script>
export default {
    data: () => ({
    show:false,
    pekora:require("../assets/character/pekora.png"),
    ground:require("../assets/scene/ground.png"),
    sky:require("../assets/scene/sky.png"),
  }),
    methods:{
        init(){
            var _this=this;
            window.console.log("序章");
            setTimeout(function(){_this.show=true},1000);
			document.onkeydown = function() {
					let key = window.event.keyCode;
					if (key == 39) {
					_this.goright();
				}else if(key == 37){
                    _this.goleft();
                }
			};
        },
        goright(){
            var c=document.getElementById("pekora").style.left;
            c=parseInt(c.substr(0,c.length-2));
            if(c<1200){
                c=c+10;
            }else{
                c=1200;
            }
            document.getElementById("pekora").style.left=c+'px'
            window.console.log("右"+document.getElementById("pekora").style.left);
        },
        goleft(){
            
            var c=document.getElementById("pekora").style.left;
            c=parseInt(c.substr(0,c.length-2));
            if(c>0){
                c=c-10;
            }else{
                c=0;
            }
            document.getElementById("pekora").style.left=c+'px'
            window.console.log("左"+document.getElementById("pekora").style.left);
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
#pekoland{
    position: relative;
    padding: 0%;
    overflow:hidden;
    max-width: 1280px;
    min-width: 1280px;
    max-height: 720px;
    min-height: 720px;
    background-color: wheat;
}
</style>