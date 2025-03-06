


interface modalProps{
    isOpenPosts:boolean;
    setIsOpenPosts:(open:boolean)=>void
  }
  const PostModal:React.FC<modalProps>= ({isOpenPosts,setIsOpenPosts}) => {
  console.log("modal",isOpenPosts);
  
  
    return (
      <div className="flex justify-start items-center  bg-gray-100">
     
  
  
  
        {isOpenPosts && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto p-6 relative">
              <h2 className="text-xl font-bold">Scrollable Modal</h2>
              <p className="mt-2 text-gray-600">This modal supports scrolling.</p>
             
  
              <button
                onClick={() => setIsOpenPosts(false)}
                className="sticky bottom-0 left-0 right-0 mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default PostModal;
  