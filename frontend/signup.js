document.getElementById("enviar").addEventListener("click", recopilarDatos);
// Poder darle enter a cualquier parte de un input para mandar los datos
document.getElementById("enter").addEventListener("keydown", (event) => {
    if (event.key === "Enter") { 
        recopilarDatos();
    }
});
// Function para recopilar los datos de mis inputs y mi select
function recopilarDatos(){
    // recopilacion de datos
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;
    const year = document.getElementById("year").value;
    const birthday = `${year}-${month}-${day}`

    // validaciones, si hay un dato mal escrito no se creara ningun objeto dentro de user
    const nameValid = validarName(fullName);
    const emailValid = validarEmail(email)
    const passwordValid =  validarPassword(password);
    const birthdayValid = validarEdad(birthday);
    if (nameValid && emailValid && passwordValid && birthdayValid){
        const user = {
        fullName,
        email,
        password,
        birthday,
    }
    console.log(user)
}};
// validacion de email
function validarEmail(email) {
    const emailInput = document.getElementById("email");
    if (!email.includes("@") || !email.includes(".")) {
        emailInput.setAttribute("placeholder", "Introduce un Email valido");
        emailInput.classList.add("alertN")
        console.log("false email")
        return false;
    }else{
        emailInput.removeAttribute("placeholder")
        emailInput.classList.remove("alertN")
        console.log("true email")
        return true;
    }
}
// validacion de nombre
function validarName(fullName) {
    const nameInput = document.getElementById("fullName");
    const filtro = /^[A-Za-z\s]+$/;
    if (fullName === "" || !filtro.test(fullName)) {
        nameInput.setAttribute("placeholder", "Introduce nombre completo")
        nameInput.classList.add("alertN")
        console.log("false name")

        return false;
    }else {
        nameInput.removeAttribute("placeholder")
        nameInput.classList.remove("alertN")
        console.log("true name")

        return true;
    }
}
// validacion de password
function validarPassword(password) {
    const alertPass = document.getElementById("alertPass");  
    const inputPass = document.getElementById("password")  
    if (password === "" || password.length < 12 || !/\d/.test(password)) {
        alertPass.innerHTML = "";
        const alertMessage = document.createElement("p");
        alertMessage.textContent= "La password debe contener minimo 12 caracteres y al menos 1 numero";
        alertMessage.classList.add("alertP");
        inputPass.classList.add("alertN")
        alertPass.appendChild(alertMessage);
        console.log("false pass")

        return false;
    }else {
        alertPass.innerHTML = "";
        inputPass.classList.remove("alertN")
        console.log("true pass")

        return true;
    }
}
// validacion de age
    let alertCreatedDate = false;
    function validarEdad(birthday) {
        const currentDate = new Date();
        const userBirthday = new Date(birthday);
        let age = currentDate.getFullYear() - userBirthday.getFullYear();
        const currentMonth = currentDate.getMonth();
        const userMonth = userBirthday.getMonth();
        const currentDay = currentDate.getDate();
        const userDay = userBirthday.getDate();
    
        if (currentMonth < userMonth || (currentMonth === userMonth && currentDay < userDay)) {
            age--;
        }
        
        const alertDate = document.getElementById("alertDate");
    
        if (age < 18 ) {
            const alertMessage = document.createElement("p");
            alertMessage.textContent = "¡Debes ser mayor de edad para registrarte!";
            alertMessage.classList.add("alertP");
            if (!alertCreatedDate){
                alertDate.appendChild(alertMessage);
                alertCreatedDate = true;
            }
            console.log("false age")
            return false;   
        } else{
            if(alertCreatedDate){
                alertDate.innerHTML = '';
                alertCreatedDate = false;
            }
            console.log("true age")
            console.log(age);
            return true;
        }
    }

   
    // try{
    //     const response = await fetch('http://localhost:3000/crear/usuario',{
    //         method: "POST",
    //         headers: {
    //             'Content-Type':'application/json', 
    //         },
    //         body: JSON.stringify(user)
    //     });
    //     const data = await response.json();
    //     console.log(data);
    // }catch(error){
    //     console.error("Error al enviar los datos", error)
    // }