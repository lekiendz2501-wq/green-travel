document.getElementById("france").addEventListener("click", () => {
    openLogre("lichtrinh france .html");
});
document.getElementById("belgium").addEventListener("click", () => {
    openLogre("lichtrinh belgium .html");
});
document.getElementById("england").addEventListener("click", () => {
    openLogre("lichtrinh england .html");
});
document.getElementById("germany").addEventListener("click", () => {
    openLogre("lichtrinh germany .html");
});
document.getElementById("netherland").addEventListener("click", () => {
    openLogre("lichtrinh netherland .html");
});
document.getElementById("switzerland").addEventListener("click", () => {
    openLogre("lichtrinh switzerland.html");
});

const modal = document.getElementById("LogreModal");
const frame = document.getElementById("LogreFrame");
function openLogre(path){
    frame.src = path;
    modal.classList.add("show");
    
    frame.onload = function() {
        try {
            const win = frame.contentWindow;
            const doc = win.document;

            win.scrollTo({
                top: doc.documentElement.scrollHeight,
                left: doc.documentElement.scrollWidth,
                behavior: 'auto'
            });

        } catch (e) {
            console.log("Không thể thao tác do giới hạn bảo mật (CORS)");
        }
    };
}



function closeLogre(){
    modal.classList.remove("show");
    frame.src = "";
}
document.getElementById("closeGame").addEventListener("click", closeLogre);