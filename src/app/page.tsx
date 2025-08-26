'use client';

import React, { useMemo, useState } from "react";

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
    test_drive: false,
    schedule_date: "",
    location: "",
    product_ext: ""
  });

  const scheduleForSF = useMemo(() => {
    if (!formData.schedule_date) return "";
    const d = new Date(formData.schedule_date); // treated as local time
    const pad = (n: number) => n.toString().padStart(2, '0');
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const yyyy = d.getFullYear();
    let hrs = d.getHours();
    const mins = pad(d.getMinutes());
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12; if (hrs === 0) hrs = 12;
    return `${mm}/${dd}/${yyyy} ${hrs}:${mins} ${ampm}`;
  }, [formData.schedule_date]);

  const productOptions = [
    { label: 'Fortuern-GR-2024-Black-AWD', value: '01tgK000004g7u1QAA' },
    { label: 'Camry-GR-2024-Silver-AT', value: '01tgK000004gAlRQAU' },
    { label: 'Fortuner-GR-2024-White-AT', value: '01tgK000004o3QDQAY' },
    { label: 'Voxy-G-2024-Black-AT', value: '01tgK000004tGifQAE' },
    { label: 'Yaris Cross-R-2022-White-AT', value: '01tgK000004tMNNQA2' },
    { label: 'Agya-RS-2024-Red-MT', value: '01tgK000004tMOzQAM' },
    { label: 'Alphard-GR-2024-Black-AT', value: '01tgK000004u6EvQAI' },
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-gray-800 px-4">
      <form
        action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DgK0000058qUn"
        method="POST"
        className="bg-zinc-900/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-2xl w-full space-y-6 border border-zinc-800"
      >
        {/* Salesforce hidden fields */}
        <input type="hidden" name="oid" value="00DgK0000058qUn" />
        <input type="hidden" name="retURL" value="http://webtoleadsalesforce.vercel.app" />
        <input type="hidden" name="00NgK00001NJC6K" value={formData.product_ext} />
        <input type="hidden" name="00NgK0000167sqv" value={formData.test_drive ? "1" : "0"} />
        <input type="hidden" name="00NgK000016V8i5" value={scheduleForSF} />
        <input type="hidden" name="00NgK00001HG4oh" value={formData.location} />

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            GG Automotive Test Drive
          </h1>
          <p className="text-zinc-400">Fill the form below to book your exclusive test drive.</p>
        </div>

        {/* Grid Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label className="block text-sm mb-1 text-zinc-300">First Name</label>
            <input
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              placeholder="John"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm mb-1 text-zinc-300">Last Name</label>
            <input
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              placeholder="Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-zinc-300">Email</label>
            <input
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="johndoe@email.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm mb-1 text-zinc-300">Phone</label>
            <input
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+62 812 3456 7890"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm mb-1 text-zinc-300">Company</label>
            <input
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="GG Automotive"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm mb-1 text-zinc-300">City</label>
            <input
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Jakarta"
            />
          </div>
        </div>

        {/* Vehicle Select */}
        <div>
          <label className="block text-sm mb-1 text-zinc-300">Select Vehicle</label>
          <select
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
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

        {/* Test Drive */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="test_drive"
            checked={formData.test_drive}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-red-500 focus:ring-red-500 border-zinc-600 rounded"
          />
          <label className="text-zinc-300">Request Test Drive?</label>
        </div>

        {/* Schedule Date */}
        <div>
          <label className="block text-sm mb-1 text-zinc-300">Schedule Date & Time</label>
          <input
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
            type="datetime-local"
            name="schedule_date"
            value={formData.schedule_date}
            onChange={handleInputChange}
          />
          {/* Optional: debug preview */}
          {/* <p className="text-xs text-zinc-500 mt-1">SF will receive: {scheduleForSF || '—'}</p> */}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm mb-1 text-zinc-300">Location</label>
          <input
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="GG Automotive Showroom"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:from-red-600 hover:to-red-700 shadow-lg transition duration-300"
        >
          🚀 Submit Lead
        </button>
      </form>
    </div>
  );
};

export default TestDriveLeadForm;
