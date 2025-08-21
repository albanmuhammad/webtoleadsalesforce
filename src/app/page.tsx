'use client';

import React, { useState } from "react";

const TestDriveLeadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    country_code: "",
    state_code: "",
    test_drive: false,       // local state
    schedule_date: "",       // local state (YYYY-MM-DD)
    location: "",
    product_ext: ""          // local state
  });

  // Example product dropdown options
  const productOptions = [
    { label: "Toyota Camry 2024", value: "01tgK000004gAlRQAU" },
    { label: "Honda Civic 2024", value: "civic-2024" },
    { label: "Mazda CX-5 2024", value: "cx5-2024" },
    { label: "Nissan X-Trail 2024", value: "xtrail-2024" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DgK0000058qUn"
        method="POST"
        className="bg-zinc-900 p-10 rounded-2xl shadow-lg max-w-lg w-full space-y-5"
      >
        {/* Salesforce hidden fields */}
        <input type="hidden" name="oid" value="00DgK0000058qUn" />
        <input type="hidden" name="retURL" value="http://webtoleadsalesforce.vercel.app" />

        {/* Mirror local state to Salesforce field IDs */}
        {/* product ext -> 00NgK00001NJC6K */}
        <input type="hidden" name="00NgK00001NJC6K" value={formData.product_ext} />
        {/* test drive checkbox -> 00NgK0000167sqv (send 1 or 0) */}
        <input type="hidden" name="00NgK0000167sqv" value={formData.test_drive ? "1" : "0"} />
        {/* schedule date -> 00NgK000016V8i5 */}
        <input type="hidden" name="00NgK000016V8i5" value={formData.schedule_date} />
        {/* location -> 00NgK00001HG4oh */}
        <input type="hidden" name="00NgK00001HG4oh" value={formData.location} />

        <h1 className="text-2xl font-bold text-center mb-6">Test Drive Lead Form</h1>

        {/* First Name */}
        <div>
          <label className="block text-sm mb-1">First Name</label>
          <input
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm mb-1">Last Name</label>
          <input
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm mb-1">Company</label>
          <input
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm mb-1">City</label>
          <input
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>

        {/* Product Dropdown (bind to local state key, not SF id) */}
        <div>
          <label className="block text-sm mb-1">Select Vehicle</label>
          <select
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            name="product_ext"
            value={formData.product_ext}
            onChange={handleSelectChange}
          >
            <option value="">-- Select Vehicle --</option>
            {productOptions.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Test Drive (bind to local state key, not SF id) */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="test_drive"
            checked={formData.test_drive}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label>Test Drive Requested?</label>
        </div>

        {/* Schedule Date (bind to local state key, not SF id) */}
        <div>
          <label className="block text-sm mb-1">Schedule Date</label>
          <input
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            type="date"
            name="schedule_date"
            value={formData.schedule_date}
            onChange={handleInputChange}
          />
        </div>

        {/* Location (bind to local state) */}
        <div>
          <label className="block text-sm mb-1">Location</label>
          <input
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-3 rounded bg-white text-black font-bold hover:bg-gray-300 transition"
        >
          Submit Lead
        </button>
      </form>
    </div>
  );
};

export default TestDriveLeadForm;
