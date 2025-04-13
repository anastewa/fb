export function checkCollision(bird, pipes) {
    return checkCeilingCollision(bird) || checkPipeCollision(bird, pipes);
}

function checkCeilingCollision(bird) {
    return bird.y - bird.hitboxHeight / 2 <= 0;
}

function checkPipeCollision(bird, pipes) {
    return pipes.some(pipe =>
        checkTopPipeCollision(bird, pipe) ||
        checkBottomPipeCollision(bird, pipe)
    );
}

function checkTopPipeCollision(bird, pipe) {
    return bird.y - bird.hitboxHeight / 2 < pipe.topHeight &&
           bird.x + bird.hitboxWidth / 2 > pipe.x &&
           bird.x - bird.hitboxWidth / 2 < pipe.x + pipe.width;
}

function checkBottomPipeCollision(bird, pipe) {
    const bottomY = pipe.topHeight + pipe.gap;
    return bird.y + bird.hitboxHeight / 2 > bottomY &&
           bird.x + bird.hitboxWidth / 2 > pipe.x &&
           bird.x - bird.hitboxWidth / 2 < pipe.x + pipe.width;
}