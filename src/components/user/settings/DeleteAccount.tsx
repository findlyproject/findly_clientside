import { companyData } from '@/lib/store/features/companyslice';
import { UserProfile } from '@/lib/store/features/userSlice';
import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";


interface DeletaAccountProps {
  user: UserProfile | companyData | null
  showPick: boolean
  setShowPick: (value: boolean) => void
  selectedReasons: number[]
  handleClickReason: (index: number, value: string) => void
  onClose: () => void
  onDelete: () => void
  reasons: string[]

}
const DeleteAccount: React.FC<DeletaAccountProps> = ({ user, showPick, setShowPick, selectedReasons, handleClickReason, onClose, onDelete, reasons }) => {


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className=" items-center mb-4">
          <div className="p-2 rounded-full bg-red-100 w-14 h-14 flex justify-center items-center">
            <span className="text-red-500  text-3xl"><RiDeleteBin5Line /></span>
          </div>
          <h2 className="ml-2 text-lg font-extrabold">Delete Account</h2>
        </div>
        <p className="text-gray-700 text-md font-semibold mb-4">
          Are you sure you want to delete the account linked to <br /> <span className='text-red-500'>{user?.email}</span>?
        </p>
        <label className="flex items-center text-sm text-gray-700 mb-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={showPick}
            onChange={() => setShowPick(!showPick)}
          />
          I understand that I won’t be able to recover my account.
        </label>
        {showPick && (
          <div className='  flex flex-col items-start'>
            <h3 className='mb-5'>what is the reason of delete your account</h3>
            {

              reasons.map((item, index) => (
                <label key={index} className="flex items-center text-xs text-gray-700 mb-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedReasons.includes(index)}
                    onChange={() => handleClickReason(index, item)}
                  />
                  {item}
                </label>
              ))
            }

          </div>

        )}

        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 text-white rounded-md ${selectedReasons.length > 0 && showPick ? "bg-red-500 hover:bg-red-600" : "bg-red-300 cursor-not-allowed"}`}
            disabled={!(selectedReasons.length && showPick)}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccount
