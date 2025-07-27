import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import config from "../../../config";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "pending" | "completed";
};

const Formdata: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const location = useLocation();

  const fetchContacts = () => {
    fetch(`${config.API_BASE_URL}/get_appointments.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setContacts(data.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchContacts();
  }, [location]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      const res = await fetch(
        `${config.API_BASE_URL}/delete_appointment.php?id=${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        alert("Failed to delete (network error)");
        return;
      }

      // Read JSON if present
      let result: { success?: boolean } = {};
      const ct = res.headers.get("Content-Type") || "";
      if (ct.includes("application/json")) {
        result = await res.json();
      }

      if (result.success === false) {
        alert("Failed to delete (server issue)");
      }

      // Remove row regardless, since backend executed the deletion
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong");
    }
  };

  const handleStatusUpdate = async (
    id: number,
    currentStatus: "pending" | "completed"
  ) => {
    if (currentStatus === "completed") return;

    if (!window.confirm("Mark this contact as completed?")) return;

    try {
      const res = await fetch(
        `${config.API_BASE_URL}/update_status.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: "completed" }),
        }
      );
      const result = await res.json();
      if (result.success) {
        setContacts((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, status: "completed" } : c
          )
        );
      } else {
        alert("Status update failed");
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("Error updating status");
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Contact Submissions</h2>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Message</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.email}</td>
              <td className="p-3">{c.phone}</td>
              <td className="p-3">{c.message}</td>
              <td className="p-3">
                {c.status === "pending" ? (
                  <button
                    onClick={() => handleStatusUpdate(c.id, c.status)}
                    className="cursor-pointer bg-yellow-400 text-black px-3 py-1 rounded text-xs"
                  >
                    Pending
                  </button>
                ) : (
                  <span className="bg-green-500 text-white px-3 py-1 rounded text-xs">
                    Completed
                  </span>
                )}
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {contacts.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No contacts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Formdata;
