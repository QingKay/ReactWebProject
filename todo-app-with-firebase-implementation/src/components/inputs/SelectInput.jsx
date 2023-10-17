import React from "react";

const SelectInput = ({ input, setInput, name }) => {
  return (
    <div className="shadow rounded bg-white py-1 mt-2">
      <label
        htmlFor="accessType"
        className="font-bold px-3 text-gray-600 text-sm"
      >
        {name}
      </label>
      <select
        name="accessType"
        id="accessType"
        className="px-3 text-gray-500 w-full focus:outline-none"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        required
      >
        <option value="">Select Priority</option>
        <option value="A">A - Must do</option>
        <option value="B">B - Quite Important</option>
        <option value="C">C - Not Important</option>
      </select>
    </div>
  );
};

export default React.memo(SelectInput);
