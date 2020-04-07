<template>
  <div class="game">
    <transition name="fade">
      <div id="pekoland" v-if="show">
        <v-img
          :src="pekora"
          id="pekora"
          width="75"
          height="150"
          style="position:absolute;left: 50px;bottom: 290px;z-index:11"
        ></v-img>
        <v-img
          :src="ground"
          width="1280"
          height="300"
          style="position:absolute;left: 0px;bottom: 0px;z-index:10"
        ></v-img>
        <v-img
          :src="sky"
          width="1280"
          height="420"
          style="position:absolute;left: 0px;top: 0px;z-index:9"
        ></v-img>
        <transition name="fade">
        <div id="BGMnow" style="position:absolute;left: 10px;bottom:10px;z-index:11" v-if="bgmshow">
          <p class="white--text title font-weight-bold">🎵{{bgmnow}}</p>
        </div>
        </transition>
      </div>
      
    </transition>
    
  </div>
</template>

<script>
export default {
  data: () => ({
    systemmode:true,//当前玩家是否可操控角色
    bgmnow:null,//当前BGM指示器
    bgmshow:false,
    inputing: false, //判断是否按键
    show: false,
    speed: 0, //X轴加速度，正右负左
    maxspeed: 10, //最大速度（像素每帧）
    minheight: 290, //地面海拔
    jumpvalue: 50, //弹跳加速度
    g: 8, //重力系数
    speedY: 0, //Y轴加速度，正上负下
    pekora: require("../assets/character/pekora.png"), //人物
    ground: require("../assets/scene/ground.png"), //地面
    sky: require("../assets/scene/sky.png") //背景
  }),
  methods: {
    init() {
      var _this = this;
      window.console.log("序章");
      this.COMMON.changeBgm("bgm/Distant_Thunder.mp3");//播放BGM
      this.bgmnow="Distant_Thunder";
      setTimeout(function() {
        _this.show = true;
      }, 1000);
      setTimeout(function() {
        _this.bgmshow = true;
      }, 2000);
      setTimeout(function() {
        _this.bgmshow = false;
      }, 5000);
      setInterval(this.updateFrame, 17); //约60FPS
      document.onkeydown = function(event) {
        //按键监听
        var e = window.event || event;
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          window.event.returnValue = false; //阻止默认的按键行为
        }
        let key = window.event.keyCode;
        if (key == 39) {//方向键右
        if(_this.systemmode){
            window.console.log("剧情中")
        }else{
            _this.goright();
            _this.inputing = true;
          }
        } else if (key == 37) {//方向键左
          _this.goleft();
          _this.inputing = true;
        } else if (key == 32) {//空格键
          _this.jump();
        }
      };
      document.onkeyup = function() {
        //按键监听
        let key = window.event.keyCode;
        if (key == 39) {
          _this.inputing = false;
        } else if (key == 37) {
          _this.inputing = false;
        }
      };
    },
    updateFrame() {
      var c = document.getElementById("pekora").style.left;
      c = parseInt(c.substr(0, c.length - 2));
      c = c + this.speed;
      var h = document.getElementById("pekora").style.bottom;
      h = parseInt(h.substr(0, h.length - 2));
      h = h + this.speedY;

      if (c <= 0) {
        //当前X速度
        c = 0;
        this.speed = 0;
      } else if (c >= 1200) {
        c = 1200;
        this.speed = 0;
      } else {
        if (this.speed > 0 && !this.inputing) {
          this.speed -= 1;
        } else if (this.speed < 0 && !this.inputing) {
          this.speed += 1;
        }
      }
      if (this.speedY > -this.g) {
        this.speedY -= this.g;
      } else {
        this.speedY = -this.g;
      }
      if (h < this.minheight) {
        h = this.minheight;
        this.speedY = 0;
      }
      //window.console.log(this.speedY,h);
      document.getElementById("pekora").style.bottom = h + "px";
      document.getElementById("pekora").style.left = c + "px"; //更新当前位置
    },
    goright() {
      //右移动
      if (this.speed < 0) {
        this.speed = 0;
      } else if (this.speed < this.maxspeed) {
        this.speed += 1;
      } else {
        this.speed = this.maxspeed;
      }
      this.inputing = false;
      //window.console.log("右"+document.getElementById("pekora").style.left);
    },
    goleft() {
      //左移动

      if (this.speed > 0) {
        this.speed = 0;
      } else if (this.speed > -this.maxspeed) {
        this.speed -= 1;
      } else {
        this.speed = -this.maxspeed;
      }
      this.inputing = false;
      //window.console.log("左"+document.getElementById("pekora").style.left);
    },
    jump() {
      //跳
      var h = document.getElementById("pekora").style.bottom;
      h = parseInt(h.substr(0, h.length - 2));
      if (h == 290) {
        this.speedY = this.jumpvalue;
      }
    },
    start() {
      var _this = this;
      _this.showm = false;
      setTimeout(function() {
        _this.$router.push({
          path: "/pekoland",
          query: {
            t: Date.now()
          }
        });
      }, 500);
    }
  },
  created() {
    this.init();
  }
};
</script>

<style>
#pekoland {
  position: relative;
  padding: 0%;
  overflow: hidden;
  max-width: 1280px;
  min-width: 1280px;
  max-height: 720px;
  min-height: 720px;
  background-color: wheat;
}
</style>