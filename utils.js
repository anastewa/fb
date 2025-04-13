export function loadImage(img, src){
    return new Promise((resolve, reject)=> { //промис будет выполняться после загрузки полной картинки
 img.onload = resolve; //онлоад используем для загрузки 
 img.onerror = reject; 
    img.src = src;
});
}