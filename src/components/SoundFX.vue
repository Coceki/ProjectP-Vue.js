<script>
const fxplayer = new Audio();
function changeFX(s) {
    fxplayer.preload=true;
    fxplayer.loop=true;
    fxplayer.src=s;
    fxplayer.play();
}
export default {
        fxplayer,
        changeFX
}
</script>
