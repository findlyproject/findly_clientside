export const SortBy = ({ onSetSort }) => {
  return (
    <section className="flex items-center justify-evenly text-gray-600">
      <hr className="w-3/5 my-4 border-gray-300" />
      <form className="flex justify-center">
        <label htmlFor="sortBy" className="flex items-center space-x-2">
          <span className="font-medium">Sort by:</span>
          <select
            name="sortBy"
            id="opts"
            onChange={(e) => onSetSort(e.target.value)}
            className="border-none bg-transparent text-gray-700 cursor-pointer focus:outline-none"
          >
            <option value="-1">Newest</option>
            <option value="1">Oldest</option>
          </select>
        </label>
      </form>
    </section>
  );
};
