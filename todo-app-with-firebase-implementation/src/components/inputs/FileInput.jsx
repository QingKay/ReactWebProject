import React from "react";

const FileInput = ({ input, setInput, name }) => {
  return (
    <div className="rounded bg-white py-1 mb-2">
      <label
        htmlFor="profilePic"
        className="text-white bg-red-500 bottom-2 right-2 p-2 rounded cursor-pointer mr-2"
      >
        Add Image
      </label>
      <input
        type="file"
        id="profilePic"
        size="20"
        className="hidden"
        onChange={(e) => setInput(e.target.files[0])}
        required
      />
      {input ? input.name : "Select an image"}
    </div>
  );
};

export default React.memo(FileInput);
