<template>
   
      <div id="game" >
          <v-btn x-large color=secondary @click="start" fab style="postion:absolute;left: 600px;top: 300px;"><v-icon>mdi-play</v-icon></v-btn>
    </div>
    
</template>

<script>

export default {
  methods: {
    start(){
        this.$router.push({path:"/S00",
        query:{
        t:Date.now(),
    },})
     }
    }
}
</script>

<style>
#game{
    max-width: 1280px;
    min-width: 1280px;
    max-height: 720px;
    min-height: 720px;
    padding: 0%;
    background-color: black;
    border:1px solid #000000;
    overflow:hidden;
}
</style>