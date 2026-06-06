import { useEffect, useState } from "react";
import supabase from "./supabase-client";

function App() {
  const [empleados, setEmpleados] = useState([]);
  const [nombre, setNombre] = useState("");
  const [puesto, setPuesto] = useState("");
  const [salario, setSalario] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  // READ
  const fetchEmpleados = async () => {
    const { data, error } = await supabase.from("empleados").select("*");
    if (error) console.log("Error al leer:", error);
    else setEmpleados(data);
  };

  // CREATE
  const agregarEmpleado = async () => {
    if (!nombre.trim() || !puesto.trim() || !salario) return;
    const { data, error } = await supabase
      .from("empleados")
      .insert([{ nombre, puesto, salario: parseFloat(salario) }])
      .select();
    if (error) console.log("Error al agregar:", error);
    else {
      setEmpleados((prev) => [...prev, data[0]]);
      setNombre(""); setPuesto(""); setSalario("");
    }
  };

  // UPDATE - cargar datos al formulario
  const cargarEdicion = (emp) => {
    setEditandoId(emp.id);
    setNombre(emp.nombre);
    setPuesto(emp.puesto);
    setSalario(emp.salario);
  };

  // UPDATE - guardar cambios
  const guardarEdicion = async () => {
    const { error } = await supabase
      .from("empleados")
      .update({ nombre, puesto, salario: parseFloat(salario) })
      .eq("id", editandoId);
    if (error) console.log("Error al editar:", error);
    else {
      setEmpleados((prev) =>
        prev.map((e) =>
          e.id === editandoId ? { ...e, nombre, puesto, salario } : e
        )
      );
      setEditandoId(null);
      setNombre(""); setPuesto(""); setSalario("");
    }
  };

  // DELETE
  const eliminarEmpleado = async (id) => {
    const { error } = await supabase.from("empleados").delete().eq("id", id);
    if (error) console.log("Error al eliminar:", error);
    else setEmpleados((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>CRUD Empleados - Supabase</h1>

      {/* Formulario */}
      <div style={{ marginBottom: "20px", padding: "16px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>{editandoId ? "Editar Empleado" : "Agregar Empleado"}</h2>
        <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}
          style={{ display: "block", marginBottom: "8px", padding: "8px", width: "100%" }} />
        <input placeholder="Puesto" value={puesto} onChange={(e) => setPuesto(e.target.value)}
          style={{ display: "block", marginBottom: "8px", padding: "8px", width: "100%" }} />
        <input placeholder="Salario" type="number" value={salario} onChange={(e) => setSalario(e.target.value)}
          style={{ display: "block", marginBottom: "8px", padding: "8px", width: "100%" }} />
        {editandoId ? (
          <button onClick={guardarEdicion} style={{ padding: "8px 16px", background: "orange", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Guardar Cambios
          </button>
        ) : (
          <button onClick={agregarEmpleado} style={{ padding: "8px 16px", background: "green", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Agregar
          </button>
        )}
      </div>

      {/* Lista */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Nombre</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Puesto</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Salario</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp.id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{emp.nombre}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{emp.puesto}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>${emp.salario}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <button onClick={() => cargarEdicion(emp)}
                  style={{ marginRight: "8px", padding: "4px 10px", background: "#f0a500", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Editar
                </button>
                <button onClick={() => eliminarEmpleado(emp.id)}
                  style={{ padding: "4px 10px", background: "red", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;