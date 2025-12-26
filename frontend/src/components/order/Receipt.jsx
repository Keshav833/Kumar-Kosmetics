import { useRef } from "react";
import { Download, Share2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-hot-toast";

export default function Receipt({ order, skinAnalysis }) {
  const receiptRef = useRef();

  const handleDownload = () => {
    const doc = new jsPDF();

    // Brand
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229); // Indigo
    doc.text("Kumar Kosmetics", 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Order Receipt", 14, 28);

    // Order Details
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(`Order ID: #${order._id}`, 140, 22);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 140, 28);

    // Line
    doc.setDrawColor(200);
    doc.line(14, 35, 196, 35);

    // Customer & Payment
    doc.setFontSize(12);
    doc.text("Customer Details", 14, 45);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(filterText(order.address.fullName), 14, 52);
    doc.text(filterText(order.user?.email || "N/A"), 14, 57);
    doc.text(filterText(order.address.phone), 14, 62);
    doc.text(filterText(`${order.address.address}, ${order.address.city}`), 14, 67);
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Payment Details", 120, 45);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Method: ${order.paymentMethod}`, 120, 52);
    doc.text(`Status: ${order.paymentStatus}`, 120, 57);
    if(order.razorpayPaymentId) {
        doc.text(`Txn ID: ${order.razorpayPaymentId}`, 120, 62);
    }

    // Items Table
    const tableColumn = ["Product", "Qty", "Price", "Total"];
    const tableRows = [];

    order.items.forEach(item => {
      const itemData = [
        item.name + (item.variant ? ` (${item.variant})` : ""),
        item.quantity,
        `Rs. ${item.price}`,
        `Rs. ${item.price * item.quantity}`
      ];
      tableRows.push(itemData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 80,
      theme: 'grid',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [79, 70, 229] }
    });

    // Totals
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Subtotal: Rs. ${order.totalAmount + (order.discountAmount || 0) - (order.totalAmount > 1500 ? 0 : 50)}`, 140, finalY);
    if(order.discountAmount > 0) {
        doc.text(`Discount: -Rs. ${order.discountAmount}`, 140, finalY + 5);
    }
    doc.text(`Shipping: ${order.totalAmount > 1500 ? 'Free' : 'Rs. 50'}`, 140, finalY + 10);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Total: Rs. ${order.totalAmount}`, 140, finalY + 18);

    // Skin Context
    if(skinAnalysis) {
         doc.setFontSize(11);
         doc.setTextColor(79, 70, 229);
         doc.text("Skin Analysis Context:", 14, finalY + 30);
         doc.setFontSize(10);
         doc.setTextColor(100);
         doc.text(`Type: ${skinAnalysis.skinType}`, 14, finalY + 36);
         doc.text(`Concerns: ${skinAnalysis.concerns?.join(", ") || "N/A"}`, 14, finalY + 41);
    }

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Thank you for shopping with Kumar Kosmetics.", 14, 280);

    doc.save(`Receipt_${order._id}.pdf`);
  };

  const filterText = (str) => str || "";

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Receipt link copied to clipboard!");
  };

  if (!order) return null;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 my-8">
      {/* Receipt Content - Display Only */}
      <div ref={receiptRef} className="p-8 md:p-12 bg-white">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-gray-100 pb-8 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Kumar Kosmetics</h1>
            <p className="text-sm text-gray-500 mt-1">Order Receipt</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-2">
              <CheckCircle className="w-4 h-4" />
              {order.paymentStatus === 'Paid' ? 'Payment Successful' : 'Order Confirmed'}
            </div>
            <p className="text-xs text-gray-400">Order ID: #{order._id}</p>
            <p className="text-xs text-gray-400">Date: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Customer & Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Customer Details</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p className="font-semibold text-gray-900">{order.address.fullName}</p>
              <p>{order.user?.email || "N/A"}</p>
              <p>{order.address.phone}</p>
              <p className="mt-2 text-gray-500 w-3/4">{order.address.address}, {order.address.city}, {order.address.state} - {order.address.pincode}</p>
            </div>
          </div>
          <div className="md:pl-8 md:border-l border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Payment Details</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Method:</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className={`font-medium ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-amber-600'}`}>
                    {order.paymentStatus}
                </span>
              </div>
              {order.razorpayPaymentId && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Transaction ID:</span>
                    <span className="font-mono text-xs">{order.razorpayPaymentId}</span>
                  </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-10">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Order Summary</h3>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Product</th>
                <th className="px-4 py-3 text-center">Qty</th>
                <th className="px-4 py-3 text-right rounded-r-lg">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                           <img src={item.image} alt="" className="w-full h-full object-cover" />
                       </div>
                       <div>
                           <p className="font-medium text-gray-900">{item.name}</p>
                           {item.variant && <p className="text-xs text-gray-500">{item.variant}</p>}
                       </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center text-gray-600">{item.quantity}</td>
                  <td className="px-4 py-4 text-right font-medium text-gray-900">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="mt-4 border-t border-gray-100 pt-4 flex flex-col items-end gap-2 text-sm">
             <div className="flex justify-between w-48 text-gray-500">
                 <span>Subtotal</span>
                 <span>₹{order.totalAmount + (order.discountAmount || 0) - (order.totalAmount > 1500 ? 0 : 50)}</span>
             </div>
             {order.discountAmount > 0 && (
                 <div className="flex justify-between w-48 text-green-600">
                     <span>Discount</span>
                     <span>-₹{order.discountAmount}</span>
                 </div>
             )}
             <div className="flex justify-between w-48 text-gray-500">
                 <span>Shipping</span>
                 <span>{order.totalAmount > 1500 ? 'Free' : '₹50'}</span>
             </div>
             <div className="flex justify-between w-48 pt-2 border-t border-gray-100 text-base font-bold text-gray-900 mt-2">
                 <span>Total</span>
                 <span>₹{order.totalAmount}</span>
             </div>
          </div>
        </div>

        {/* Skin Context (Optional) */}
        {skinAnalysis && (
            <div className="bg-indigo-50/50 rounded-xl p-6 mb-10 border border-indigo-100">
                <h3 className="text-indigo-800 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-lg">✨</span> Recommended for your skin
                </h3>
                <p className="text-sm text-indigo-900/70 mb-3">
                    Your analysis identified <strong>{skinAnalysis.skinType}</strong> skin type. 
                    These products were selected to address <strong>{skinAnalysis.concerns?.join(", ") || "your skin concerns"}</strong>.
                </p>
                <div className="text-xs text-indigo-400">
                    *Based on your skin analysis profile
                </div>
            </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-12 pt-8 border-t border-gray-100">
            <p className="mb-2">Questions? Email us at support@kumarkosmetics.com</p>
            <p>This is a computer-generated receipt.</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <Link to="/products" className="text-gray-600 hover:text-gray-900 font-medium text-sm flex items-center gap-2">
            ← Continue Shopping
        </Link>
        <div className="flex gap-3 w-full sm:w-auto">
            <button onClick={handleShare} className="flex-1 sm:flex-none items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors shadow-sm flex">
                <Share2 className="w-4 h-4" /> Share
            </button>
            <button onClick={handleDownload} className="flex-1 sm:flex-none items-center justify-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-black font-medium transition-colors shadow-lg flex">
                <Download className="w-4 h-4" /> Download PDF
            </button>
        </div>
      </div>
    </div>
  );
}
