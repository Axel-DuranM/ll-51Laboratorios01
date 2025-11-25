document.addEventListener("DOMContentLoaded", cargarCursos);

// Leer cursos
async function cargarCursos() {
    const { data, error } = await supabase
        .from("cursos")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.log(error);
        return;
    }

    const tbody = document.querySelector("#tabla-cursos tbody");
    tbody.innerHTML = "";

    data.forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td>${c.codigo}</td>
                <td>${c.nombre}</td>
                <td>${c.creditos}</td>
                <td>${c.profesor}</td>
            </tr>
        `;
    });
}

document.querySelector("#form-curso").addEventListener("submit", async (e) => {
    e.preventDefault();

    const codigo = document.querySelector("#codigo").value;
    const nombre = document.querySelector("#nombreCurso").value;
    const creditos = document.querySelector("#creditos").value;
    const profesor = document.querySelector("#profesor").value;

    const { error } = await supabase.from("cursos").insert([
        { codigo, nombre, creditos, profesor }
    ]);

    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Curso agregado correctamente");
        cargarCursos();
        e.target.reset();
    }
});


