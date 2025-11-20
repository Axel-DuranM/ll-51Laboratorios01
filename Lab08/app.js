import { supabase } from "./supabaseCliente.js";
//******************
// DOM 

// *********************** */
const formu = document.getElementById("curso-form");
const inputId = document.getElementById("id");
const inputCodigo = document.getElementById("codigo");
const inputNombre = document.getElementById("nombreCurso");
const inputCreditos = document.getElementById("creditos");
const btnSave = document.getElementById("btn-save");
const btnCancel = document.getElementById("btn-cancel");
const statusDiv = document.getElementById("status");
let editando = false;

const listaCursos = document.getElementById("lista");

//******************
// Eventos

// *********************** */
formu.addEventListener("submit", async (e) => {
    e.preventDefault();
    const codigo = inputCodigo.value.trim();
    const nombreCurso = inputNombre.value.trim();
    const creditos = parseInt(inputCreditos.value.trim());
    if (editando) {}
    else {await crearCurso(codigo, nombreCurso, creditos);}
    formu.reset();
});

listaCursos.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-delete")) {
        const idCurso = e.target.getAttribute("data-id");
        await eliminarCurso(idCurso);
        cargarCursos();
    }
});
//******************
// CRUD (CREATE -READ- UPDATE- DELETE)

// *********************** */
async function cargarCursos() {
    let { data: cursos, error } = await supabase.from("Cursos").select("*");
    if (error) {
        console.error("Error al cargar los cursos:", error);
        return;
    }

    let listaCursos = document.getElementById("lista");
    listaCursos.innerHTML = "";
    cursos.forEach(curso => {
        let li = document.createElement("li");
        //li.textContent = curso.codigo + "-"+ curso.nombre;
        li.innerHTML = `${curso.codigo} - ${curso.nombreCurso} [ ${curso.creditos} creditos] <button class="btn-delete" data-id="${curso.idCurso}">Eliminar</button>`;
        listaCursos.appendChild(li);
    }
);}
//crear curso
async function crearCurso(codigo, nombreCurso, creditos) {
    const curso = { codigo, nombreCurso, creditos };
    let { error } = await supabase.from("Cursos").insert([curso]);
    if (error) {
        console.error(error);
    
    }
    cargarCursos();
}
async function eliminarCurso(idCurso) {

    let { error } = await supabase.from("Cursos").delete().eq("idCurso", idCurso);
    if (error) {
        console.error(error);
        statusDiv.textContent = "Error al eliminar el curso.";
        
    } 
}



cargarCursos();