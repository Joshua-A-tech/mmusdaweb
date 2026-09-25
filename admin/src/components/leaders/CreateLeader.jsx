import { useState } from "react";
import { createLeader } from "../../Features/leaders/leadersAPI";
import "./CreateLeader.css";

export default function CreateLeader({ onSuccess }) {

const [name,setName] = useState("");
const [department,setDepartment] = useState("");
const [contactInfo,setContactInfo] = useState("");
const [role,setRole] = useState("");
const [loading,setLoading] = useState(false);
const [message,setMessage] = useState("");

const handleSubmit = async (e) => {

e.preventDefault();

setLoading(true);

try{

await createLeader({
name,
department,
contactInfo,
role
});

setMessage("Leader created successfully");

setName("");
setDepartment("");
setContactInfo("");
setRole("");

if(onSuccess){
onSuccess();
}

}catch(error){
console.error("Failed to create leader:", error);
setMessage("Failed to create leader");
}

setLoading(false);

};

return(

<div className="create-leader">

<h2>Create Leader</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

<input
type="text"
placeholder="Department"
value={department}
onChange={(e)=>setDepartment(e.target.value)}
/>

<input
type="text"
placeholder="Contact Info"
value={contactInfo}
onChange={(e)=>setContactInfo(e.target.value)}
/>

<input
type="text"
placeholder="Role"
value={role}
onChange={(e)=>setRole(e.target.value)}
/>

<button type="submit" disabled={loading}>
{loading ? "Creating..." : "Create Leader"}
</button>

</form>

{message && <p className="message">{message}</p>}

</div>

);
}