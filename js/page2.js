        const saludo = document.getElementById("saludo");
        const entrada =document.getElementById("ultimaEntrada");
        const preguntas = document.getElementById("preguntas");

        //sacamos datos del localStorage
        const allUsers = JSON.parse(localStorage.getItem("allUsers"));
        const nowUser= localStorage.getItem("nowUser");

        const user = allUsers[nowUser];

        saludo.textContent = `Hola ${user.username}`;
        entrada.textContent = `La última vez que entraste fue el ${user.lastEntry}`;

        // redirigimos
        preguntas.addEventListener("click", () => {
            window.location.href="page3.html";
        });