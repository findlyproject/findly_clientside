import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

function Project() {
    
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "", link: "" });

  // Handle input change
  const handleChangeD = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  // Add Project
  const handleAddProject = () => {
    if (newProject.title && newProject.description && newProject.link) {
      setProjects([...projects, newProject]);
      setNewProject({ title: "", description: "", link: "" }); // Reset form
    }
  };

  // Remove Project
  const handleRemoveProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));

  };

  return (
    <div>
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg mt-4 w-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Projects</h2>
      
            {/* Title Input */}
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={newProject.title}
              onChange={handleChangeD}
              className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
      
            {/* Description Input */}
            <textarea
              name="description"
              placeholder="Project Description"
              value={newProject.description}
              onChange={handleChangeD}
              className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
      
            {/* Link Input */}
            <input
              type="text"
              name="link"
              placeholder="Project Link"
              value={newProject.link}
              onChange={handleChangeD}
              className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
      
            {/* Add Project Button */}
            <button
              onClick={handleAddProject}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-5"
              disabled={!newProject.title || !newProject.description || !newProject.link}
            >
              Add Project
            </button>
      
            {/* Display Added Projects */}
            {projects.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Added Projects</h3>
                <ul className="mt-2">
                  {projects.map((project, index) => (
                    <li key={index} className="bg-gray-200 p-3 rounded-md mb-2 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{project.title}</p>
                        <p className="text-sm text-gray-600">{project.description}</p>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                          {project.link}
                        </a>
                      </div>
                      <button onClick={() => handleRemoveProject(index)}>
                        <RxCross2 className="text-red-500 text-xl cursor-pointer" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
    </div>
  )
}

export default Project
