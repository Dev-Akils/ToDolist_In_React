import React, { useState } from "react";

function Add_Update_Delete() {
  const [state, setState] = useState({
    items: [],
    inputValue: "",
    isEditing: false,
    currentIndex: null,
    checkedItems: [],
  });

  const handleAddOrUpdateItem = () => {
    const { inputValue, items, isEditing, currentIndex } = state;
    if (inputValue.trim()) {
      if (isEditing) {
        const updatedItems = items.map((item, index) =>
          index === currentIndex ? inputValue : item
        );

        setState({
          ...state,
          items: updatedItems,
          inputValue: "",
          isEditing: false,
          currentIdex: null,
        });
      } else {
        setState({
          ...state,
          items: [...items, inputValue],
          inputValue: "",
        });
      }
    }
  };

  const handleEditItem = (index) => {
    setState({
      ...state,
      inputValue: state.items[index],
      isEditing: true,
      currentIndex: index,
    });
  };

  const handleDeleteItem = (index) => {
    setState({
      ...state,
      items: state.items.filter((_, i) => i !== index),
    });
  };

  const handleInputChange = (e) => {
    setState({ ...state, inputValue: e.target.value });
  };

  const handleCheckboxChange = (index) => {
    setState((prev) => {
      const isChecked = prev.checkedItems.includes(index);
      const newCheckedItems = isChecked
        ? prev.checkedItems.filter((i) => i !== index)
        : [...prev.checkedItems, index];

      return { ...prev, checkedItems: newCheckedItems };
    });
  };

  const { items, inputValue, isEditing, checkedItems } = state;

  console.log(items);
  return (
    <div className="bg-[#A8B79A] w-full h-screen flex justify-center items-center py-8">
  <div className="p-5 mx-5 md:mx-10 md:p-10 text-center w-full max-w-3xl">
    <div>
      <h2 className="font-bold text-2xl mb-4">MY TODO APP</h2>
    </div>

    {/* Input Section */}
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 items-center justify-center bg-purple-50 p-4 rounded-lg shadow-md">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter Your Day Work"
        className="px-4 py-3 w-full md:w-2/3 rounded-lg border-gray-300 focus:ring-2 focus:outline-none focus:ring-purple-400"
      />
      <button
        onClick={handleAddOrUpdateItem}
        className="px-6 py-3 w-full md:w-auto rounded-lg bg-[#F5F5DC] text-gray-700 font-semibold border border-gray-300 hover:bg-[#E6E6CC] transition-colors duration-150 mt-3 md:mt-0"
      >
        {isEditing ? "Update Item" : "Add Item"}
      </button>
    </div>

    {/* List Section */}
    <div className="bg-purple-50 p-4 rounded-lg shadow-md">
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-4 py-3 px-5 bg-white rounded-lg shadow-sm"
            style={{
              textDecoration: checkedItems.includes(index) ? "line-through" : "none",
            }}
          >
            <input
              type="checkbox"
              className="h-5 w-5 cursor-pointer rounded-md border-2 border-purple-300 checked:bg-purple-500 checked:border-purple-500 hover:border-purple-400 focus:ring-2 focus:ring-purple-400 transition duration-150 ease-in-out"
              checked={checkedItems.includes(index)}
              onChange={() => handleCheckboxChange(index)}
            />
            <span className="flex-grow text-gray-800">{item}</span>
            <div className="flex gap-3">
              <button
                onClick={() => handleEditItem(index)}
                className="bg-[#F5F5DC] hover:bg-[#E6E6CC] text-gray-700 rounded px-3 py-2 border border-gray-300 transition-colors duration-150"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteItem(index)}
                className="bg-[#F5F5DC] hover:bg-[#E6E6CC] text-gray-700 rounded px-3 py-2 border border-gray-300 transition-colors duration-150"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

  );
}

export default Add_Update_Delete;
