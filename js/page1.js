            function showLogIn() {
            document.body.innerHTML= "";

            const label = document.createElement("label");
            label.textContent = "Usuario: "

            const input = document.createElement("input");
            input.type= "text";
            input.placeholder="Introduce tu nombre de usuario!";

            const error = document.createElement("p");

            document.body.appendChild(label);
            document.body.appendChild(input);
            document.body.appendChild(error);

            input.addEventListener("blur",() => { //Cuando se pierde el foco en el input lanz el evento para validar
                const valor = input.value.trim();

                const patronCorreo = /^[^@]+@[^@]+\.[^@]+$/; //He buscado el patron del correopara poder validar el valor
                if(!patronCorreo.test(valor)){
                    error.textContent = "Formato inválido. Ejemplo correcto: nombre@dominio.com";
                    return;
                }
                    error.textContent="";

                    const allUsers= JSON.parse(localStorage.getItem("allUsers")) || {};

                    if(!allUsers[valor]){//si No existe el usuario quiero crearlo y quiero guardarlo
                        //Creo el usuario nuev
                        const newUser ={
                            username:valor,
                            lastEntry: new Date().toLocaleString(),
                            preferences: { theme: "dark", language: "en" },
                            questions: []
                        };
                        allUsers[valor] = newUser;
                    }else{//si ya existe simplmnte actualizamos la ultima entrada
                        allUsers[valor].lastEntry = new Date().toLocaleString();
                    }

                    //guardamos y marcamos el que esta en sesión ahora
                    localStorage.setItem("allUsers", JSON.stringify(allUsers));
                    localStorage.setItem("nowUser",valor);
                    
                    
                    //Redirigimos si no hay ningún error al validar
                    window.location.href="page2.html";
                
            });
        }
        const temp = setTimeout(showLogIn, 5000);

        document.addEventListener("keydown", (e) =>{
            if(e.ctrlKey && e.key === "F9"){
                clearTimeout(temp);
                showLogIn();
            }
        });