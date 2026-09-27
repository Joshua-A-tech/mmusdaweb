import React,{useEffect,useState} from "react";
import { DepartmentsAPI } from "../../Features/departments/departmentsAPI";
import CreateDepartment from "./CreateDepartment";
import UpdateDepartment from "./UpdateDepartment";
import { FaTrash,FaEdit } from "react-icons/fa";
import "./Departments.css";

const Departments = ()=>{

  const [departments,setDepartments] = useState([]);
  const [loading,setLoading] = useState(true);

  const [showCreate,setShowCreate] = useState(false);
  const [editingDepartment,setEditingDepartment] = useState(null);

  const fetchDepartments = async()=>{

    const data = await DepartmentsAPI.getAllDepartments();

    setDepartments(data);

    setLoading(false);
  };

  useEffect(()=>{
    fetchDepartments();
  },[]);

  const handleDelete = async(id)=>{

    if(!window.confirm("Delete this department?")) return;

    await DepartmentsAPI.deleteDepartment(id);

    setDepartments(prev =>
      prev.filter(d=>d.departmentId !== id)
    );
  };

  const handleCreated = (dept)=>{
    setDepartments(prev=>[dept,...prev]);
    setShowCreate(false);
  };

  const handleUpdated = (updatedDept)=>{

    setDepartments(prev =>
      prev.map(d =>
        d.departmentId === updatedDept.departmentId
          ? updatedDept
          : d
      )
    );

    setEditingDepartment(null);
  };

  return(

    <div className="departments-container">

      <div className="departments-header">

        <h2 className="departments-title">Departments</h2>

        <button
          className={`create-btn ${showCreate ? "btn-loading" : ""}`}
          onClick={()=>setShowCreate(!showCreate)}
        >
          {showCreate ? "Close" : "Create Department"}
        </button>

      </div>

      {showCreate && (
        <CreateDepartment
          onCreated={handleCreated}
          onCancel={()=>setShowCreate(false)}
        />
      )}

      {editingDepartment && (
        <UpdateDepartment
          department={editingDepartment}
          onUpdated={handleUpdated}
          onCancel={()=>setEditingDepartment(null)}
        />
      )}

      {loading ? (

        <p className="loading-text">Loading departments...</p>

      ) : (

        <div className="table-container">
          <table className="departments-table">

            <thead>

              <tr>
                <th>Name</th>
                <th>Leader</th>
                <th>Assistant</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {departments.map(dept =>(

                <tr key={dept.departmentId} className="departments-row">

                  <td>{dept.name}</td>
                  <td>{dept.adminLeader}</td>
                  <td>{dept.assistant}</td>
                  <td>{dept.adminContact}</td>

                  <td className="actions">

                    <FaEdit
                      className="icon edit-icon"
                      onClick={()=>setEditingDepartment(dept)}
                    />

                    <FaTrash
                      className="icon delete-icon"
                      onClick={()=>handleDelete(dept.departmentId)}
                    />

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        </div>

      )}

    </div>

  );
};

export default Departments;