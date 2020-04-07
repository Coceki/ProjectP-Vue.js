
<script>
const bgmplayer = new Audio();
function changeBgm(s) {
    bgmplayer.preload=true;
    bgmplayer.loop=true;
    bgmplayer.src=s;
    bgmplayer.play();
}
export default {
        bgmplayer,
        changeBgm
}
</script>
