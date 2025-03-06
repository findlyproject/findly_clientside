import { companyData } from "@/lib/store/features/companyslice";
import { IoMdCloseCircle } from "react-icons/io";

export interface modalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setCurrentPage: (page: number) => void;
  currentPage: number;
  jobs: {
    _id: string;
    title: string;
    company: companyData;
    location: string;
    salary: { rate: string; min: number; max: number };
    jobType: string;
    applicationDeadline: string;
    experienceLevel: string;
    createdAt: string;
  }[];
  findJobPsts:(value:number)=>void
}

const Modal: React.FC<modalProps> = ({ isOpen, setIsOpen, jobs, setCurrentPage,findJobPsts, currentPage }) => {


  const handleClose = () => {
    setIsOpen(false);
  
  };

  return (
    <div className="flex justify-start items-center bg-black">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-20">
          <div className="bg-white rounded-lg shadow-lg w-3/4 max-h-[100vh] overflow-y-auto p-6 relative">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">JOBS</h2>
           
              <IoMdCloseCircle onClick={handleClose} className="text-2xl cursor-pointer" />
            </div>

            <p className="mt-2 text-gray-600">.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
              {jobs.map((job) => (
                <div key={job._id} className="shadow-md rounded-lg p-4 border">
                  <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
                  <p className="text-sm text-gray-600">{job.location}</p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Salary scale:</span> ${job.salary.min} - ${job.salary.max} {job.salary.rate}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Job Type:</span> {job.jobType}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Experience:</span> {job.experienceLevel}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Deadline:</span> {new Date(job.applicationDeadline).toDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Posted At:</span> {new Date(job.createdAt).toDateString()}
                  </p>
                </div>
              ))}
            </div>

            {/* ✅ View More Button */}
            <div className="flex justify-center">
              <button
                onClick={() => findJobPsts(currentPage+1)}
                className="text-center bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                View More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
