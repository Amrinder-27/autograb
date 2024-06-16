import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { vehicleType, quickSelects } from "../utils/dataModel";
import { API_POST_URL, ERROR_UPLOADING } from "../utils/constants";

const VehicleForm = () => {

  // Setting state of vehicles
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [badge, setBadge] = useState("");
  const [logbook, setLogbook] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

// Make event change method
  const handleMakeVehicleChange = (e) => {
    setMake(e.target.value);
    setModel("");
    setBadge("");
  };

  // Model event change method
  const handleModelVehicleChange = (e) => {
    setModel(e.target.value);
    setBadge("");
  };

  // Quick Handle select method
  const handleQuickSelect = (selection) => {
    setMake(selection.make);
    setModel(selection.model);
    setBadge(selection.badge);
  };

  const navigate = useNavigate();

  // Handle submit form - sending values to API
  const handleSubmitVehicleForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("make", make);
    formData.append("model", model);
    formData.append("badge", badge);
    formData.append("logbook", logbook);

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    try {
      const resData = await axios.post(API_POST_URL, formData, config);
      const vehicleData = resData.data;

      if (resData.status === 200) {
        navigate("/vehicle-details", { state: { vehicleData } });
      }
    } catch (err) {
      setErrorMessage(ERROR_UPLOADING + err.message);
    }
  };

  return (
    <div className="flex justify-center my-10 mx-auto max-w-3xl border-gray-200 border p-10 flex-col">
      <h3 className="text-center text-4xl bold py-2">Drill Down Form</h3>
      <form className="" onSubmit={handleSubmitVehicleForm}>
        <div className="py-3">
          <p className="text-red-600 text-sm">{errorMessage}</p>
        </div>
        <div className="py-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Make
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={make}
            onChange={handleMakeVehicleChange}
          >
            <option value="">Select Make</option>
            {Object.keys(vehicleType).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className="py-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Model
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={model}
            onChange={handleModelVehicleChange}
            disabled={!make}
          >
            <option value="">Select Model</option>
            {make &&
              Object.keys(vehicleType[make]).map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
          </select>
        </div>
        <div className="py-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Badge
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={badge}
            onChange={(e) => {
              setBadge(e.target.value);
            }}
            disabled={!model}
          >
            <option value="">Select Badge</option>
            {model &&
              vehicleType[make][model].map((badge) => (
                <option key={badge} value={badge}>
                  {badge}
                </option>
              ))}
          </select>
        </div>

        {badge.length > 0 && (
          <div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Logbook
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                onChange={(e) => setLogbook(e.target.files[0])}
              />
            </div>
            <div>
              <button
                className="bg-slate-300 hover:bg-blue-700 hover:text-white text-black font-bold py-2 px-4 my-4 mr-2 rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>

      <div>
        <h3 className="font-bold py-2 text-xl">Quick Selects</h3>
        {quickSelects.map((qs, index) => (
          <button
            className="bg-blue-700 hover:bg-blue-300 hover:text-black text-white font-bold py-2 px-4 my-2 mr-2 rounded"
            key={index}
            onClick={() => handleQuickSelect(qs)}
          >
            {qs.make} {qs.model} {qs.badge}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VehicleForm;
