function imma_try_to_make_bullets() {

    abx = x;
    aby = y;
    if (slashPressed && prevKey === 'left') {
        while(abx+20 >0){
            ctx.beginPath();
            ctx.fillStyle = "#42f4ce";
            ctx.fillRect(abx, aby, 20, 20);
            abx -= 1
        }
    }
    else if (slashPressed && prevKey === 'right') {
        while(abx-20 < canvas.width){
            ctx.beginPath();
            ctx.fillStyle = "#42f4ce";
            ctx.fillRect(abx, aby, 20, 20);
            abx += 3
        }
    }
    else if (slashPressed && prevKey === 'up') {
        while(aby+20 >0){
            ctx.beginPath();
            ctx.fillStyle = "#42f4ce";
            ctx.fillRect(abx, aby, 20, 20);
            aby -= 3
        }
    }
    else if (slashPressed && prevKey === 'down') {
        while(aby-20 < canvas.height){
            ctx.beginPath();
            ctx.fillStyle = "#42f4ce";
            ctx.fillRect(abx, aby, 20, 20);
            aby += 3
        }
    }

}
if (slashPressed && timer % 2 === 0){
    imma_try_to_make_bullets()
}
function maketime() {
    timer +=1;
}

setInterval(maketime,1000);
