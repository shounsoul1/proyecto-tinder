// Function para recopilar los datos de mis inputs y mi select con el objetivo de mandarlos a mi base de datos
document.getElementById("enviar").addEventListener("click", recopilarDatos)
async function recopilarDatos(){
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;
    const year = document.getElementById("year").value;
    const birthday = `${year}-${month}-${day}`

    const user = {
        fullName,
        email,
        password,
        birthday,
    }
    console.log(user);
    try{
        const response = await fetch('http://localhost:3000/crear/usuario',{
            method: "POST",
            headers: {
                'Content-Type':'application/json', 
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        console.log(data);
    }catch(error){
        console.error("Error al enviar los datos", error)
    }
}