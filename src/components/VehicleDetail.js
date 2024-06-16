import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
const VehicleDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { vehicleData } = state; // Read values passed on state

  if (vehicleData === 0) return "<b> Sorry !! Couldnt find the details </b>";
  return (
    <div className="flex justify-center my-10 mx-auto max-w-3xl border-gray-200 border p-10 flex-col">
      <button
        type="button"
        onClick={() => navigate(-1)}
        class="w-full flex items-center justify-center bg-blue-700 text-white max-w-32 my-3 w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100 hover:text-black"
      >
        <svg
          class="w-5 h-5 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span>Go back</span>
      </button>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Make
            </th>
            <th scope="col" className="px-6 py-3">
              Model
            </th>
            <th scope="col" className="px-6 py-3">
              Badge
            </th>
            <th scope="col" className="px-6 py-3">
              Logbook Content
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{vehicleData.make}</td>
            <td className="px-6 py-4">{vehicleData.model}</td>
            <td className="px-6 py-4">{vehicleData.badge}</td>
            <td className="px-6 py-4">{vehicleData.logbookContent}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VehicleDetail;
