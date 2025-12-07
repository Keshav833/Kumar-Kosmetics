import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { Trash2, Search, Mail, Loader, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axiosInstance.get("/contact/admin/contact-messages");
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await axiosInstance.delete(`/contact/admin/contact-messages/${id}`);
      setMessages(messages.filter((msg) => msg._id !== id));
      toast.success("Message deleted successfully");
      if (selectedMessage?._id === id) setSelectedMessage(null);
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-light text-foreground">
            <span className="font-semibold">Messages</span>
            <span className="text-lg text-muted-foreground ml-2">
              ({messages.length})
            </span>
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage inquiries from your customers
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sender</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Preview</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {filteredMessages.length === 0 ? (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan="5" className="px-6 py-16 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Mail className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No messages found</h3>
                        <p className="text-gray-500">We couldn't find any messages matching your search.</p>
                      </div>
                    </td>
                  </motion.tr>
                ) : (
                  filteredMessages.map((msg, idx) => (
                    <motion.tr 
                      key={msg._id} 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-gray-50/80 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{msg.name}</span>
                          <a href={`mailto:${msg.email}`} className="text-sm text-gray-500 hover:text-primary transition-colors">
                            {msg.email}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900 font-medium bg-gray-100 px-2.5 py-1 rounded-md">
                          {msg.subject || "No Subject"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 line-clamp-1 max-w-xs">{msg.message}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500">
                          {new Date(msg.createdAt).toLocaleDateString("en-US", {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setSelectedMessage(msg)}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(msg._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-[95%] sm:w-full sm:max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Message Details</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Sender</label>
                  <p className="text-gray-900 font-medium">{selectedMessage.name}</p>
                  <a href={`mailto:${selectedMessage.email}`} className="text-primary text-sm hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Date</label>
                  <p className="text-gray-900">
                    {new Date(selectedMessage.createdAt).toLocaleString("en-US", {
                      dateStyle: "full",
                      timeStyle: "short"
                    })}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Subject</label>
                <p className="text-gray-900 font-medium text-lg">{selectedMessage.subject || "No Subject"}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Message</label>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-6 py-2.5 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
