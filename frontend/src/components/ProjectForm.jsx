import { useState } from "react"
import useProjects from "../hooks/useProjects"
import Alert from "./Alert"

const ProjectForm = () => {
    
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deliverDate, setDeliverDate] = useState('')
  const [client, setClient] = useState('')

  const { showAlert, alert, submitProject } = useProjects()

  const handleSubmit = async e => {
    e.preventDefault();
    
    if([name, description, deliverDate, client].includes('')) {
        showAlert({
            msg: 'All fields are required',
            error: true
        })
        return
    }

    await submitProject({ name, description, deliverDate, client })
    
    setName('')
    setDescription('')
    setDeliverDate('')
    setClient('')
  }

  const { msg } = alert

  return (
    <form 
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
        onSubmit={handleSubmit}    
    >
        <div className="mb-5">
            <label 
                className="text-gray-7000 font-bold text-sm"
                htmlFor="name"
                >Project Name</label>
            <input 
                id="name"
                type="text" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Project Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                className="text-gray-7000 font-bold text-sm"
                htmlFor="description"
                >Description</label>
            <textarea 
                id="description"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Project Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                className="text-gray-7000 font-bold text-sm"
                htmlFor="deliver-date"
                >Deliver Date</label>
            <input 
                id="deliver-date"
                type="date" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Deliver Date"
                value={deliverDate}
                onChange={e => setDeliverDate(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label 
                className="text-gray-7000 font-bold text-sm"
                htmlFor="client"
                >Client</label>
            <input 
                id="client"
                type="text" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Client Name"
                value={client}
                onChange={e => setClient(e.target.value)}
            />
        </div>

        {msg && <Alert alert={alert}/>}

        <input 
            type="submit" 
            value="Create Project"
            className="bg-sky-600 w-full p-3 font-bold text-white
            rounded cursor-pointer hover:bg-sky-700 transition-colors"
        />
    </form>
  )
}

export default ProjectForm