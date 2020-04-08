<template>
  <div class="game">
    <transition name="fade">
      <p v-if="titleshow"></p>
    </transition>
    <transition name="fade">
      <!--游戏环境-->
      <div
        ref="pekoland"
        style="position: relative;
            padding: 0%;
            overflow: hidden;
            max-width: 1280px;
            min-width: 1280px;
            max-height: 720px;
            min-height: 720px;
            background-color: wheat;"
        v-if="show"
      >
        <!--玩家-->
        <v-img
          :src="pekora"
          ref="pekora"
          width="75"
          height="150"
          style="position:absolute;left: 50px;bottom: 290px;z-index:11"
        ></v-img>
        <!--地面-->
        <v-img
          :src="ground"
          width="1280"
          height="300"
          style="position:absolute;left: 0px;bottom: 0px;z-index:10"
        ></v-img>
        <!--天空-->
        <v-img
          :src="sky"
          width="1280"
          height="420"
          style="position:absolute;left: 0px;top: 0px;z-index:9"
        ></v-img>
        <!--BGM指示器-->
        <transition name="fade">
          <div
            ref="BGMnow"
            style="position:absolute;left: 10px;bottom:10px;z-index:11"
            v-if="bgmshow"
          >
            <p class="white--text title font-weight-bold">🎵{{bgmnow}}</p>
          </div>
        </transition>
        <!--如何操作文本-->
        <transition name="fade">
          <div
            v-if="showhelp"
            class="white--text display-1 font-weight-bold"
            style="position:absolute;left:50%;top:50%;margin-left:-50px;margin-top:-50px;z-index:12"
          >{{$t("ui.help")}}</div>
        </transition>
        <!--章节指示器-->
        <transition name="fade">
          <div
            v-if="chaptershow"
            ref="chapter"
            class="display-2 white--text font-weight-bold"
            style="position:absolute;left:50%;top:50%;margin-left:-50px;margin-top:-50px;z-index:12"
          >{{chapter}}</div>
        </transition>
        <!--人物对话框-->
        <v-scroll-y-reverse-transition>
          <v-card
            v-if="dialogshow"
            class="pa-5"
            min-width="1260"
            min-height="200"
            style="position:absolute;left: 10px;bottom:10px;z-index:11"
          >
            <v-card-title class="font-weight-bold">{{whosaid}}</v-card-title>
            {{storytext}}
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="nextchart" fab>
                <v-icon>mdi-arrow-right-bold</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-scroll-y-reverse-transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    showhelp: false,
    chaptershow: false, //展示章节指示器
    chapter: "序章",
    movingright: false, //右移准备
    movingleft: false, //左移准备
    i: 0, //迭代器
    titleshow: false, //章节字体
    whosaid: "角色",
    storytext: "输入剧情",
    dialogshow: false,
    systemmode: true, //当前玩家是否可操控角色
    bgmnow: null, //当前BGM指示器
    bgmshow: false,
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
    director() {
      //导演
      var _this = this;
      if (this.TIME.timeline == "S00") {
        //序章00
        window.console.log("序章");
        this.chapter = this.$t("chapter.S0");
        this.chaptershow = true;
        setTimeout(function() {
          _this.chaptershow = false;
        }, 3000);
        setTimeout(function() {
          _this.show = true;
        }, 1000);
        setTimeout(function() {
          _this.bgmshow = true;
        }, 2000);
        setTimeout(function() {
          _this.dialogshow = true;
        }, 7000);
        setTimeout(function() {
          _this.bgmshow = false;
        }, 5000);
        this.COMMON.changeBgm("bgm/Distant_Thunder.mp3"); //播放BGM
        this.bgmnow = "Distant_Thunder";
        this.storyfitter(this.TIME.timeline);
      }
    },
    storyfitter(t) {
      //填充对话框
      var _this = this;
      _this.dialogshow = false;

      if (_this.i < _this.$t("story." + t).length) {
        _this.whosaid = _this.$t("story." + t)[_this.i].who;
        _this.storytext = _this.$t("story." + t)[_this.i].text;
      }
      _this.i += 1;
    },
    nextchart() {
      this.FX.changeFX("sound/click.mp3");
      var _this = this;
      this.storyfitter(this.TIME.timeline);
      if (_this.i < _this.$t("story." + this.TIME.timeline).length + 1) {
        setTimeout(function() {
          _this.dialogshow = true;
        }, 100);
      } else {
        _this.i = 0;
        this.systemmode = false;
        if (this.TIME.timeline == "S00") {
          //末尾剧情判断
          _this.showhelp = true;
          setTimeout(function() {
            _this.showhelp = false; //帮助文本
          }, 5000);
        }
      }
    },
    init() {
      var _this = this;

      this.director();

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
        if (key == 39) {
          //方向键右
          if (_this.systemmode) {
            window.console.log("剧情中");
          } else {
            _this.goright(true);
            _this.inputing = true;
          }
        } else if (key == 37) {
          //方向键左
          if (_this.systemmode) {
            //window.console.log("剧情中");
          } else {
            _this.goleft(true);
            _this.inputing = true;
          }
        } else if (key == 32) {
          //空格键
          if (_this.systemmode) {
            //window.console.log("剧情中");
          } else {
            _this.jump();
          }
        }
      };
      document.onkeyup = function() {
        //按键监听
        let key = window.event.keyCode;
        if (key == 39) {
          if (_this.systemmode) {
            window.console.log("剧情中");
          } else {
            _this.goright(false);
            _this.inputing = false;
          }
        } else if (key == 37) {
          if (_this.systemmode) {
            window.console.log("剧情中");
          } else {
            _this.goleft(false);
            _this.inputing = false;
          }
        }
      };
    },
    updateFrame() {
      //window.console.log(this.$refs.pekora.$el.style);
      var c = this.$refs.pekora.$el.style.left;
      c = parseInt(c.substr(0, c.length - 2));
      c = c + this.speed;
      var h = this.$refs.pekora.$el.style.bottom;
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
      this.speedcomptue();
      //window.console.log(this.speedY,h);
      this.$refs.pekora.$el.style.bottom = h + "px";
      this.$refs.pekora.$el.style.left = c + "px"; //更新当前位置
    },
    speedcomptue() {
      if (this.movingright) {
        //这里进行移动速度计算
        if (this.speed < 0) {
          this.speed = 0;
        } else if (this.speed < this.maxspeed) {
          this.speed += 1;
        } else {
          this.speed = this.maxspeed;
        }
      } else if (this.movingleft) {
        if (this.speed > 0) {
          this.speed = 0;
        } else if (this.speed > -this.maxspeed) {
          this.speed -= 1;
        } else {
          this.speed = -this.maxspeed;
        }
      }
    },
    goright(e) {
      //右移动
      this.movingright = e;
      //   if (this.speed < 0) {
      //     this.speed = 0;
      //   } else if (this.speed < this.maxspeed) {
      //     this.speed += 1;
      //   } else {
      //     this.speed = this.maxspeed;
      //   }
      this.inputing = false;
      //window.console.log("右"+this.$refs.pekora.$el.style.left);
    },
    goleft(e) {
      //左移动
      this.movingleft = e;
      //   if (this.speed > 0) {
      //     this.speed = 0;
      //   } else if (this.speed > -this.maxspeed) {
      //     this.speed -= 1;
      //   } else {
      //     this.speed = -this.maxspeed;
      //   }
      this.inputing = false;
      //window.console.log("左"+this.$refs.pekora.$el.style.left);
    },
    jump() {
      //跳
      var h = this.$refs.pekora.$el.style.bottom;
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