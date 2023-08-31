import ProjectForm from "../components/ProjectForm"

const CreateProject = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Create Project</h1>
      <div className='mt-10 flex justify-center'>
        <ProjectForm />
      </div>
    </>
  )
}

export default CreateProject