const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById("color-picker");
const fontPicker = document.getElementById("font-picker");
const clearButton = document.getElementsByClassName("clear")[0];
const saveButton = document.getElementsByClassName("save")[0];
const retrieveButton = document.getElementsByClassName("retrieve")[0];
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});

colorPicker.addEventListener("change",(e)=>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
    canvas.style.background = e.target.value; 
});

fontPicker.addEventListener("change",(e)=>{
    console.log(e.target.value);
    ctx.lineWidth = parseFloat(e.target.value);
});

clearButton.addEventListener("click",()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
});

saveButton.addEventListener("click",()=>{
    localStorage.setItem("canvasContents",canvas.toDataURL());

    let link = document.createElement('a');
    link.download = "my-canvas.png";
    link.href = canvas.toDataURL(); // Set href to the data URL
    link.click();
});

retrieveButton.addEventListener("click",()=>{
    let savedImage = localStorage.getItem('canvasContents');
    if(savedImage){
        let img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
        };
        img.src = savedImage;
    }
});
