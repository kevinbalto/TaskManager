import useProjects from "../hooks/useProjects"
import PreviewProject from "../components/PreviewProject";

const Projects = () => {

  const { projects } = useProjects()
  
  return (
    <>
      <h1 className="text-4xl font-black">Projects</h1>
      <div className="bg-white shadow mt-10 rounded-lg">
        { projects.length ? 
          projects.map(project => (
            <PreviewProject 
              key={project._id}
              project={project}
            />
          )) : 
        <p className="text-center text-gray-600 p-5">No projects</p>}
      </div>
    </>
  )
}

export default Projects