const ShimmerCard = () => {
    return (
      <div className="card w-80 bg-base-300 p-4 rounded-md flex flex-col items-center mx-3 mt-18 shadow-lg animate-pulse">
        {/* Image Placeholder */}
        <div className="w-[90%] h-50 bg-gray-600 rounded-md overflow-hidden">
          <div className="w-full h-full bg-gray-500 rounded-xl"></div>
        </div>
  
        <div className="card-body items-center text-center">
          {/* Name Placeholder */}
          <div className="w-32 h-5 bg-gray-500 rounded-md my-2"></div>
          <div className="w-24 h-4 bg-gray-500 rounded-md"></div>
  
          {/* Bio Placeholder */}
          <div className="w-64 h-10 bg-gray-500 rounded-md my-2"></div>
  
          {/* Buttons Placeholder */}
          <div className="flex gap-2">
            <div className="w-24 h-10 bg-gray-500 rounded-md"></div>
            <div className="w-24 h-10 bg-gray-500 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ShimmerCard;
  