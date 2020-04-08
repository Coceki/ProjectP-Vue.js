<script>
const fxplayer = new Audio();
function changeFX(s) {
    fxplayer.preload=true;
    fxplayer.loop=false;
    fxplayer.src=s;
    fxplayer.play();
}
export default {
        fxplayer,
        changeFX
}
</script>
