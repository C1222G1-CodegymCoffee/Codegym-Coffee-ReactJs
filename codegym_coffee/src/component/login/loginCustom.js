const eye = document.querySelector(".bi");
const formPw = document.querySelector(".form-pw");


eye.onclick = () => {
    console.dir();
    if(eye.classList.contains("bi-eye-slash")) {
        eye.classList.remove("bi-eye-slash");
        eye.classList.add("bi-eye");
        formPw.setAttribute("type", "text");
    } else {
        eye.classList.remove("bi-eye");
        eye.classList.add("bi-eye-slash");
        formPw.setAttribute("type", "password");
    };
    
}