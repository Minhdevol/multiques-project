const quesnumb = document.querySelector(".que-numb"); //sô câu hỏi
const questext = document.querySelector(".que-text"); //câu hỏi
const quesOP = document.querySelector(".option-que");  //các đáp án cho câu hỏi
const home = document.querySelector(".home-box"); //hộp bắt đầu
const quiz = document.querySelector(".quiz-box"); //hộp câu hỏi
const resl = document.querySelector(".total-box"); //hộp kết quả
const noneEx = document.querySelector(".none-file-box"); //hộp báo lỗi tệp nhận
const Ranoe = document.querySelector(".subtitle-text"); //Khung văn bản ngẫu nhiên
const VFX = document.querySelector(".vfx-sound");//thanh chỉnh hiệu ứng nút
const FUL = document.querySelector("#fullscreen");//nút chế độ toàn màn hình
const TOG = document.querySelector(".toggle_switch");//nút chế độ sáng tối
const FCUS = document.querySelector(".background-focus-box");//nút chỉnh chế độ tập trung
const BSET = document.querySelector(".setting-option");//khung chứa nút điều chỉnh
const BFS = document.querySelector(".background-focusing");//
const ICOS = document.querySelector(".icon-setting");//

let quecount = 0; //đếm câu hỏi hiện có
let curQues;  
let avaibleQue = []; //chứa câu hỏi
let avaibleOp = []; //chứa đáp án
let core = 0; //số câu làm đúng
let atp = 0; //số câu đã làm

//tạo khung thời gian
setInterval(() => {
    const timee = new Date();
    var hou = timee.getHours();
    var mine = timee.getMinutes();
    var seccons = timee.getSeconds();
    document.querySelector(".time-line").innerHTML = hou + ":" + mine + ":" + seccons;
}, 1000)
//đẩy các câu hỏi chứa array
function SetAvailableQue(){
    const tlaQue = quesbio.length;
    for(let i=0; i<tlaQue; i++){
        avaibleQue.push(quesbio[i])
    }
}
//Hàm tạo câu hỏi
function getNewQue(){
    //đếm số câu  hiện có
    quesnumb.innerHTML = "Câu :&nbsp;" + (quecount + 1) + "&nbsp;/&nbsp;" + quesbio.length;
    //ngẫu nhiên câu hỏi
    const queIndex = avaibleQue[Math.floor(Math.random() * avaibleQue.length)];
    curQues = queIndex;
    questext.innerHTML  = curQues.q;
    //lấy vị trí của câu hỏi từ array
    const in1 = avaibleQue.indexOf(queIndex); 
    //đưa các hàm array  để tránh lặp câu  
    avaibleQue.splice(in1,1);
    const opLEN = curQues.options.length 
    //đưa các ô đáp án từ array
    for(let i=0; i<opLEN; i++){
        avaibleOp.push(i)
    }
    quesOP.innerHTML="";
    let animationDelay = 0.05; //tạo delay effect cho thanh đáp án
    //tạo các đáp án từ array
    for(let i=0; i<opLEN; i++){
        //ngẫu nhiên đáp án
        const opIndex = avaibleOp[Math.floor(Math.random() * avaibleOp.length)];
        //lấy vị trí của đáp án từ array
        const  in2 = avaibleOp.indexOf(opIndex);
        //đưa các hàm array  để tránh lặp đáo án
        avaibleOp.splice(in2,1);
        //tạo thẻ div chứa đáp án
        const op = document.createElement("div");
        op.innerHTML = curQues.options[opIndex];
        op.id =  opIndex;
        //chuyển động load đáp án
        op.style.animationDelay = animationDelay + "s";
        animationDelay = animationDelay + 0.05;
        //đặt tên để dùng áp css cho thanh đáp án
        op.className = "option";
        quesOP.appendChild(op)
        op.setAttribute("onclick", "resultCheck(this)")
    }
    quecount++ //đếm câu hỏi
}
//hàm khai báo kết quả
function resultCheck(element){
    const id = parseInt(element.id);
    //console khai báo kết quả ĐÚNG HOẶC SAI
    if(id === curQues.answer){
        //đặt class vào đáp án đúng cho hiệu ứng thanh
        element.classList.add("correct");
        core++; //đếm câu đúng
    }
    else{
        //đặt class vào đáp án sai cho hiệu ứng thanh
        element.classList.add("wrong");
        //khai báo kết quả đúng khi chọn sai
        const opLEN = quesOP.children.length;
        for(let i=0; i<opLEN; i++){
            if(parseInt(quesOP.children[i].id) === curQues.answer){
                quesOP.children[i].classList.add("correct");
            }
        }
    }
    atp++; //đếm tổng câu
    unclickOP();
}
//hàm tránh nhấp đáp án thêm
function unclickOP(){
    const opLEN = quesOP.children.length;
    for(let i=0; i<opLEN; i++){
        quesOP.children[i].classList.add("alredy-done");
    }
}
//tạo nút tiếp tục cho câu hỏi tiếp theo
function conti(){
    if(quecount ===  quesbio.length){
        //biến dẫn tới khung kết quả khi xong hết câu hỏi
        QuitDone();
    }
    else{
        //biến tạo câu hỏi mới khi vẫn còn
        getNewQue();
    }
}
//hàm cho hành động sau khi làm sau đáp án
function QuitDone(){
    //ẩn đi hộp câu hỏi
    quiz.classList.add("hide");
    //hiện hộp kết quả
    resl.classList.remove("hide");
    //thông số tổng kết
    quizRels();
}
//hàm tọa thông số cho hộp kết quả
function quizRels(){
    //biến cho kết quả đúng
    resl.querySelector(".coran").innerHTML = core + "&nbsp;&nbsp;/&nbsp;&nbsp;" + quesbio.length;
    //biến cho kết quả sai
    resl.querySelector(".wroan").innerHTML = atp - core;
    //biến tổng kết số điểm
    const scoreper = (core/quesbio.length)*10;
    resl.querySelector(".final-result").innerHTML = scoreper.toFixed(1) + "&nbsp;đ";
}
//reset lại câu hỏi
function reQuiz(){
    quecount = 0;
    core = 0; 
    atp = 0; 
}
//hàm quay lại để làm trách nghiệm
function tryAgain(){
    //ẩn hộp kết quả
    resl.classList.add("hide");
    //hiện hộp câu hỏi
    quiz.classList.remove("hide");
    reQuiz();
    stQuiz();
}
//trở lại trang
function Back(){
    resl.classList.add("hide");
    home.classList.remove("hide");
    reQuiz();
}
//trở lại trang
function BackQues(){
    quiz.classList.add("hide");
    home.classList.remove("hide");
    reQuiz();
}
//trở lại trang
function CBackfrist(){
    noneEx.classList.add("hide");
    home.classList.remove("hide");
}
//ngẫu nhiên dòng chú nhỏ

let funTe = ['"lười quá!! Bài này để sau đi."', '"Bạn có biết: các file nội dung chủ yếu lấy từ một acc."', '"Bài để sau / CODE LÀ NHẤT !!!"', '"Hãy tìm một nội dung khác đi! Cái này còn lâu mới có."', '"Chỉ là bản thử nghiệm thôi"', '"Xin lỗi nhưng hiện nội dung này chưa được tạo ra."', '"Hãy tôn trọng người làm ra nội dung vì họ muốn vậy"', '"KHÔNG THẤY BÀI SAO!!! Dĩ nhiên là vậy rồi!!"', '"Hãy nằm một lát đi, ai biết chừng nó sẽ có??"','"Hiện nội dung chưa được làm nhỉ?"','"Được làm bởi javascript, html và css"', '"Tần suất để tạo ra một nội dung trách nghiệm chỉ mất 30 phút"', '"Thử lại xem !!"', '"Hãy chờ một khoảng thời gian để viết nội dung nào !!"', '"Liên lạc với &#9993; email hoặc các tài khoản ở dưới dòng footer"', '"Bạn có biết: đây chỉ bản thử nghiệm cho một dự án lớn hơn trong một tương lai gần."'];

function RanTe(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let Ranoe = Math.floor(step2) + min;
    return Ranoe
}
//Hiệu ứng background parallax
const position = document.querySelector(".background-parallax");

position.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(e) {
  position.style.setProperty("--x", e.clientX + "px");
}

//hệ thống lựa chọn nội dung chủ đề cho câu hỏi
function func() {
    var type = document.getElementsByName("type");
    textInfo = "";
    if(type[0].checked){
        var val = type[0].value;
        console.log(val + " đã được chọn");
        quesbio = lichsukthk1;
        textInfo = "Đề cương sử hk1";
    }
    else if(type[1].checked){
        var val = type[1].value;
        console.log(val + " đã được chọn");
        quesbio = sinh1v2;
        textInfo = "sinh bài 1 - 2";
    }
    else if(type[2].checked){
        var val = type[2].value;
        console.log(val + " đã được chọn");
        quesbio = sinh3;
        textInfo = "sinh bài 3";
    }
    else if(type[3].checked){
        var val = type[3].value;
        console.log(val + " đã được chọn");
        quesbio = sinh4;
        textInfo = "sinh bài 4";
    }
    else if(type[4].checked){
        var val = type[4].value;
        console.log(val + " đã được chọn");
        quesbio = sinh5;
        textInfo = "sinh bài 5";
    }
    else if(type[5].checked){
        var val = type[5].value;
        console.log(val + " đã được chọn");
        quesbio = sinh6;
        textInfo = "sinh bài 6";
    }
    else if(type[6].checked){
        var val = type[6].value;
        console.log(val + " đã được chọn");
        quesbio = sinh8;
        textInfo = "sinh bài 8";
    }
    else if(type[7].checked){
        var val = type[7].value;
        console.log(val + " đã được chọn");
        textInfo = "none excist file";
        let indRan = RanTe(0, funTe.length-1);
        Ranoe.innerText = funTe[indRan];
        home.classList.add("hide");
        noneEx.classList.remove("hide");

    }
    else if(type[8].checked){
        var val = type[8].value;
        console.log(val + " đã được chọn");
        textInfo = "none excist file";
        let indRan = RanTe(0, funTe.length-1);
        Ranoe.innerText = funTe[indRan];
        home.classList.add("hide");
        noneEx.classList.remove("hide");
    }
    else if(type[9].checked){
        var val = type[9].value;
        console.log(val + " đã được chọn");
        textInfo = "none excist file";
        let indRan = RanTe(0, funTe.length-1);
        Ranoe.innerText = funTe[indRan];
        home.classList.add("hide");
        noneEx.classList.remove("hide");
    }
    document.querySelector(".chosing-que-box").innerHTML = textInfo;
};
// function FullscRE() {
//     return document.fullscreenElement
//         || document.webkitFullscreenElement
//         || document.mozFullscreenElement
//         || document.msFullscreenElement;
// }
// function FullTog() {
//     if (FullscRE()) {
//         document.exitFullscreen();
//     } else {
//         document.documentElement.requestFullscreen().catch(console.log);
//     }
// }
// document.getElementById("fullscreen").addEventListener("click", () => {
//     FullTog();
// });


window.onload = func();
//âm thanh nháp chọn nội dung câu hỏi
const au = new Audio();
au.src = "../assets/button.mp3";
const aubruh = new Audio();
aubruh.src = "../assets/button2.mp3"
//Điều chỉnh âm lượng
// let volume_slider = document.querySelector('.volume_slider');
// var progressBar = document.getElementById("progressbar");
// function setVolume(){
//     au.volume = volume_slider.value / 70;
//     aubruh.volume = volume_slider.value / 70;
// }
// volume_slider.oninput = function(){
//     progressBar.style.left = this.value - "%";
//     progressBar.style.width = this.value + "%";
// };
//Mode sáng tối
document.querySelector('.box-ui-contain').addEventListener("click", () => {
    document.body.classList.toggle('light');
});

// //
// function ReSetting() {
//     VFX.classList.remove('hide');
//     FUL.classList.remove('hide');
//     TOG.classList.remove('hide');
//     FCUS.classList.remove('hide');
//     BSET.classList.remove('hide');
//     BFS.classList.remove('hide');
//     VFX.classList.add('effect');
//     FUL.classList.add('effect');
//     TOG.classList.add('effect');
//     FCUS.classList.add('effect');
//     VFX.classList.remove('endef');
//     FUL.classList.remove('endef');
//     TOG.classList.remove('endef');
//     FCUS.classList.remove('endef');
//     ICOS.classList.remove("Btn-setting-open");
//     ICOS.classList.add("Btn-setting-close");
// };
// function HideSetting() {
//     VFX.classList.add('endef');
//     FUL.classList.add('endef');
//     TOG.classList.add('endef');
//     FCUS.classList.add('endef');
//     VFX.classList.add('hide');
//     FUL.classList.add('hide');
//     TOG.classList.add('hide');
//     FCUS.classList.add('hide');
//     BSET.classList.add('hide');
//     BFS.classList.add('hide');
//     VFX.classList.remove('effect');
//     FUL.classList.remove('effect');
//     TOG.classList.remove('effect');
//     FCUS.classList.remove('effect');
//     ICOS.classList.remove("Btn-setting-close");
//     ICOS.classList.add("Btn-setting-open");
// }
// // document.getElementById('Btn-setting-open').addEventListener("click", () => {
// //     ReSetting();
// // });
// // document.getElementById('Btn-setting-close').addEventListener("click", () => {
// //     HideSetting()
// // });
// document.querySelector(".Btn-setting-open").addEventListener("click", () => {
//     ReSetting();
// });
// document.querySelector(".Btn-setting-close").addEventListener("click", () => {
//     HideSetting();
// });


//khởi động
function stQuiz(){
    home.classList.add("hide");
    quiz.classList.remove("hide");
    //khởi động các hàm câu hỏi có trong array
    SetAvailableQue();
    getNewQue();
}