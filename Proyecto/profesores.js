document.addEventListener("DOMContentLoaded", cargarProfesores);

async function cargarProfesores() {
    const { data, error } = await supabase
        .from("profesores")
        .select("*");

    if (error) return;

    const tbody = document.querySelector("#tabla-profesores tbody");
    tbody.innerHTML = "";

    data.forEach(p => {
        tbody.innerHTML += `
            <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.departamento}</td>
            <td>${p.correo}</td>
            </tr>
        `;
    });
}

document.querySelector("#form-profesor").addEventListener("submit", async (e) => {
e.preventDefault();

const nombre = document.querySelector("#nombre").value;
const departamento = document.querySelector("#departamento").value;
const correo = document.querySelector("#correo").value;

const { error } = await supabase.from("profesores").insert([
    { nombre, departamento, correo }
]);

if (error) {
    alert("Error: " + error.message);
} else {
    alert("Profesor registrado");
    cargarProfesores();
    e.target.reset();
}
});
