import React, { useEffect, useState } from "react";

type Contact = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  budget: string;
  description: string;
};

const Formdata: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch("https://yourdomain.com/api/get-contacts.php")
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  const handleDelete = (id: number) => {
    // Delete action logic (API call to delete record)
    if (window.confirm("Are you sure you want to delete this contact?")) {
      fetch(`https://yourdomain.com/api/delete-contact.php?id=${id}`, {
        method: "DELETE",
      }).then(() => {
        setContacts(contacts.filter((contact) => contact.id !== id));
      });
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
            <th className="p-3 text-left">Mobile</th>
            <th className="p-3 text-left">Budget</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{contact.name}</td>
              <td className="p-3">{contact.email}</td>
              <td className="p-3">{contact.mobile}</td>
              <td className="p-3">{contact.budget}</td>
              <td className="p-3">{contact.description}</td>
              <td className="p-3 flex gap-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600">
                  View
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
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
