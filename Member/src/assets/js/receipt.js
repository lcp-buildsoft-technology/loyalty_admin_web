// const form = document.querySelector("form"),
// fileInput = document.querySelector(".file-input"),
// progressArea = document.querySelector(".progress-area"),
// uploadedArea = document.querySelector(".uploaded-area");

// form.addEventListener("click", () => {
//     fileInput.click();
// });

// fileInput.onchange = ({target}) => {
//     let file = target.files[0];
//     if(file) {
//         let fileName = file.name;
//         if(fileName.length >= 12) {
//             let splitName = fileName.split('.');
//             fileName = splitName[0].substring(0, 13) + "..." + splitName[1];
//         }

//         uploadFile(fileName);
//     }
// }

// function uploadFile(name) {
//     let xhr = new XMLHttpRequest();
//     xhr.open("post", "php/upload.php");
//     xhr.upload.addEventListener;
// }

// const wrapper = document.querySelector(".wrapper");
// const fileName = document.querySelector(".file-name");
// const defaultBtn = document.querySelector("#default-btn");
// const customBtn = document.querySelector("#custom-btn");
// const cancelBtn = document.querySelector("#cancel-btn");
// const img = document.querySelector("img");

// // let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_]+$/;
// function defaultBtnActive() {
//     defaultBtn.click();
// }

// defaultBtn.addEventListener("change", function() {
//     const file = this.file[0];
//     if(file) {
//         const reader = new FileReader();
//         reader.onload = function() {
//             const result = reader.result;
//             img.src = result;
//             wrapper.classList.add("active");
//         }
//         cancelBtn.addEventListener("click", function() {
//             img.src = "";
//             wrapper.classList.remove("active");
//         })
//         reader.readAsDataURL(file);
//     }
//     if(this.value) {
//         let valueStore = this.value.match(regExp);
//         fileName.textContent = valueStore;
//     }
// });