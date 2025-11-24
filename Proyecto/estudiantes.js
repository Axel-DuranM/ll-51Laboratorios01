// Cargar datos al iniciar
document.addEventListener("DOMContentLoaded", cargarEstudiantes);

// Obtener y cargar estudiantes en la tabla
async function cargarEstudiantes() {
    const { data, error } = await supabase
        .from("estudiantes")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error(error);
        return;
    }

    const tbody = document.querySelector("#tabla-estudiantes tbody");
    tbody.innerHTML = "";

    data.forEach(est => {
        tbody.innerHTML += `
            <tr>
                <td>${est.id}</td>
                <td>${est.nombre}</td>
                <td>${est.carrera}</td>
                <td>${est.correo}</td>
            </tr>
        `;
    });
}

// Registrar estudiante
document.querySelector("#form-estudiante").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.querySelector("#nombre").value;
    const carrera = document.querySelector("#carrera").value;
    const correo = document.querySelector("#correo").value;

    const { error } = await supabase.from("estudiantes").insert([
        { nombre, carrera, correo }
    ]);

    if (error) {
        alert("Error al guardar: " + error.message);
    } else {
        alert("Estudiante registrado con éxito");
        cargarEstudiantes();
        e.target.reset();
    }
});
