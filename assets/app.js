const $ = (id) => document.getElementById(id);

const setState = (input, ok, msgEl, msg = "") => {
    input.classList.remove("invalid", "valid");
    if (ok) { input.classList.add("valid"); msgEl.textContent = ""; }
    else { input.classList.add("invalid"); msgEl.textContent = msg; }
};

const form = $("signupForm");
const submitBtn = $("submitBtn");
const successBox = $("success");

const nombre = $("nombre");
const email = $("email");
const pass = $("pass");
const pass2 = $("pass2");
const nacimiento = $("nacimiento");
const cel = $("cel");
const tel = $("tel");
const terms = $("terms");

const errNombre = $("err-nombre");
const errEmail = $("err-email");
const errPass = $("err-pass");
const errPass2 = $("err-pass2");
const errNac = $("err-nacimiento");
const errCel = $("err-cel");
const errTel = $("err-tel");
const errTerms = $("err-terms");

const rePass = /(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}/;
const reCelCO = /^3\d{9}$/;
const reTel = /^\d{10,}$/;

const validateNombre = () => {
    const ok = nombre.value.trim().length >= 3;
    setState(nombre, ok, errNombre, ok ? "" : "Mínimo 3 caracteres.");
    return ok;
};

const validateEmail = () => {
    const ok = email.validity.valid;
    setState(email, ok, errEmail, ok ? "" : "Correo no válido.");
    return ok;
};

const validatePass = () => {
    const ok = rePass.test(pass.value);
    setState(pass, ok, errPass, ok ? "" : "≥8, 1 mayúscula, 1 número y 1 carácter especial.");
    return ok;
};

const validatePass2 = () => {
    const ok = pass2.value.length > 0 && pass2.value === pass.value;
    setState(pass2, ok, errPass2, ok ? "" : "Las contraseñas no coinciden.");
    return ok;
};

const getAge = (dateStr) => {
    const today = new Date();
    const dob = new Date(dateStr);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return age;
};

const validateNac = () => {
    const v = nacimiento.value;
    const ok = Boolean(v) && getAge(v) >= 18;
    setState(nacimiento, ok, errNac, ok ? "" : "Debes ser mayor de 18 años.");
    return ok;
};

const validateCel = () => {
    const ok = reCelCO.test(cel.value.trim());
    setState(cel, ok, errCel, ok ? "" : "10 dígitos iniciando con 3.");
    return ok;
};

const validateTel = () => {
    const v = tel.value.trim();
    const ok = v === "" || reTel.test(v);
    setState(tel, ok, errTel, ok ? "" : "Si lo ingresas, mínimo 10 dígitos.");
    return ok;
};

const validateTerms = () => {
    const ok = terms.checked;
    errTerms.textContent = ok ? "" : "Debes aceptar los términos.";
    return ok;
};

const validateAll = () => {
    const allOk = [
        validateNombre(),
        validateEmail(),
        validatePass(),
        validatePass2(),
        validateNac(),
        validateCel(),
        validateTel(),
        validateTerms()
    ].every(Boolean);
    submitBtn.disabled = !allOk;
    return allOk;
};

[nombre, email, pass, pass2, nacimiento, cel, tel, terms].forEach((el) => {
    el.addEventListener("input", validateAll);
    if (el.type !== "checkbox") el.addEventListener("blur", validateAll);
    if (el === terms) el.addEventListener("change", validateAll);
});

validateAll();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    successBox.classList.remove("show");
    if (validateAll()) {
        successBox.classList.add("show");
    }
});
