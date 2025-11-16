        const form = document.getElementById("crearPreguntas");
        const tablaCuerpo = document.getElementById("tablaCuerpo");
        const btnAtras = document.getElementById("atras");
        const btnGrabar = document.getElementById("grabar");
        const cargarPreg = document.getElementById("cargarPreg");

        const nowUser = localStorage.getItem("nowUser"); //clave de page1
        let allUsers = JSON.parse(localStorage.getItem("allUsers")) || {};
        const user = allUsers[nowUser] || { questions: [] }; //para poder meter las preguntas

            function cargarPreguntas(conRetraso = false) {

            function cargar() {

                // Ocultar texto de carga
                cargarPreg.style.display = "none";

                tablaCuerpo.innerHTML = "";
                user.questions.forEach(p => {
                    const row = document.createElement("tr");
                    row.innerHTML =
                        `<td>${p.pregunta}</td>
                        <td>${p.respuesta}</td>
                        <td>${p.puntuacion}</td>
                        <td>${p.estado}</td>`;
                    tablaCuerpo.appendChild(row);
                });
                 //deshabilitar Atrás si hay preguntas guardando
                btnAtras.disabled = user.questions.some(q => q.estado === "Guardando...");
            }

            if (conRetraso) {
                 cargarPreg.style.display = "block"; // asegurarse de mostrar el texto mientras espera
                setTimeout(cargar, 5000);
            } else {
                cargar();
            }
        }
        cargarPreguntas(true);

        // Habilitar el botón Grabar solo si todos los campos tienen valor
        function validarCampos() {
            const pregunta = document.getElementById("pregunta").value.trim();
            const respuestaRadio = document.querySelector("input[name='respuesta']:checked");
            const puntuacion = document.getElementById("puntuacion").value;

            btnGrabar.disabled = !(pregunta && respuestaRadio && puntuacion);
        }
        form.addEventListener("input", validarCampos);
        form.addEventListener("change", validarCampos);

        // Guardar nueva pregunta
        form.addEventListener("submit", e => {
            e.preventDefault();
            const pregunta = document.getElementById("pregunta").value.trim();
            const respuestaRadio = document.querySelector("input[name='respuesta']:checked");
            const puntuacion = document.getElementById("puntuacion").value;

            const nuevaPregunta = {
                pregunta: pregunta,
                respuesta: respuestaRadio.value,
                puntuacion: puntuacion,
                estado: "Guardando..."
            };

            user.questions.push(nuevaPregunta);
            cargarPreguntas(false);
            validarCampos();

            //guardado en 5 segundos
            setTimeout(() => {
                nuevaPregunta.estado = "OK";
                allUsers[nowUser] = user;
                localStorage.setItem("allUsers", JSON.stringify(allUsers));
                cargarPreguntas(false); // Actualizar tabla
            }, 5000);

            form.reset();
        });

        btnAtras.addEventListener("click", () => {
            window.location.href = "page2.html";
        });