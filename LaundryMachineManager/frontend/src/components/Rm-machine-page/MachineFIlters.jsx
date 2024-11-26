import { useState } from "react";
import ButtonSmall from "../global/ButtonSmall";

export default function MachineFilters({ onApplyFilters }) {
  const [filters, setFilters] = useState({
    selectedColumns: {
      lid: true,
      buildingName: true,
      brand: true,
      model: true,
      buildingAddress: true,
      washingStatus: true,
    },
  });

  const handleColumnChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedColumns: {
        ...prevFilters.selectedColumns,
        [name]: checked,
      },
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters.selectedColumns);
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-widget rounded-3xl my-5">
      <h2 className="text-xl font-bold">Choose Columns to Display</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(filters.selectedColumns).map((column) => (
          <label key={column} className="flex items-center gap-2 text-small-xl">
            <input
              type="checkbox"
              name={column}
              checked={filters.selectedColumns[column]}
              onChange={handleColumnChange}
              className="h-4 w-4"
            />
            {column
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}{" "}
          </label>
        ))}
      </div>
      <div className="w-[100px] ml-auto">
        <ButtonSmall name="Apply" onClick={handleApplyFilters} />
      </div>
    </div>
  );
}
