import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { User, Package, MapPin, CreditCard, Plus, Trash2, Edit2, Camera } from "lucide-react"
import ChangePassword from "@/components/profile/ChangePassword"
import ProfileSidebar from "@/components/profile/ProfileSidebar"

export default function Profile() {
  const { authUser, logout, updateProfile, addAddress, deleteAddress, addUPI, deleteUPI, getMyOrders } = useAuthStore()
  const [activeTab, setActiveTab] = useState("orders")
  const [orders, setOrders] = useState([])
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [isAddingUPI, setIsAddingUPI] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Form States
  const [addressForm, setAddressForm] = useState({
    fullName: "", phone: "", address: "", city: "", state: "", pincode: "", type: "Home"
  })
  const [upiForm, setUpiForm] = useState({ upiId: "" })
  const [profileForm, setProfileForm] = useState({
    name: authUser?.name || "",
    phone: authUser?.phone || "",
    avatar: authUser?.avatar || ""
  })

  useEffect(() => {
    if (activeTab === "orders") {
      getMyOrders().then(setOrders)
    }
  }, [activeTab, getMyOrders])

  const tabs = [
    { id: "orders", label: "My Orders", icon: Package },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "account", label: "Account Details", icon: User },
  ]

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm({ ...profileForm, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
      <div className="flex h-screen bg-slate-900">
      <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 rounded-l-2xl shadow-2xl my-2 mr-2">
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>

            {/* MY ORDERS */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200 shadow-sm">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-500">Start shopping to see your orders here.</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                      {/* Order Header */}
                      <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                              <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                                  <Package className="w-5 h-5 text-indigo-600" />
                              </div>
                              <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Order ID</p>
                                  <p className="font-mono font-medium text-gray-900">#{order._id.slice(-6)}</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-6">
                              <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Date Placed</p>
                                  <p className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                              </div>
                              <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Total Amount</p>
                                  <p className="font-semibold text-indigo-600">₹{order.totalAmount}</p>
                              </div>
                          </div>
                      </div>

                      {/* Order Items */}
                      <div className="p-6">
                          <div className="space-y-6">
                              {order.items.map((item, idx) => (
                                  <div key={idx} className="flex gap-4 items-start">
                                      <div className="w-20 h-20 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
                                          <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-contain p-2" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                          <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                                          <p className="text-sm text-gray-500 mt-1">Variant: {item.variant || "N/A"}</p>
                                          <div className="flex items-center gap-4 mt-2">
                                              <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium">Qty: {item.quantity}</span>
                                              <span className="text-sm font-medium text-gray-900">₹{item.price}</span>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>

                          {/* Order Footer */}
                          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-500">Status:</span>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                                      order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                      'bg-amber-100 text-amber-800'
                                  }`}>
                                      {order.status}
                                  </span>
                              </div>
                              <div className="flex gap-3">
                                  {order.status === 'Pending' && (
                                      <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                          Cancel Order
                                      </button>
                                  )}
                                  <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100">
                                      View Details
                                  </button>
                                  {order.status === 'Delivered' && (
                                      <button 
                                          onClick={() => window.location.href = `/order/${order._id}/return`}
                                          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
                                      >
                                          Return / Replace
                                      </button>
                                  )}
                              </div>
                          </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* SAVED ADDRESSES */}
            {activeTab === "addresses" && (
              <div>
                  {!isAddingAddress ? (
                      <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                              <button 
                                  onClick={() => setIsAddingAddress(true)}
                                  className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-indigo-500 hover:text-indigo-600 transition-colors h-full min-h-[180px] bg-white hover:bg-indigo-50/30"
                              >
                                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3">
                                    <Plus className="w-6 h-6" />
                                  </div>
                                  <span className="font-medium">Add New Address</span>
                              </button>
                              {authUser?.addresses?.map((addr) => (
                                  <div key={addr._id} className="bg-white border border-gray-200 rounded-xl p-6 relative group shadow-sm hover:shadow-md transition-all">
                                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <button className="p-2 text-gray-400 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                                          <button onClick={() => deleteAddress(addr._id)} className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                      </div>
                                      <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-semibold uppercase tracking-wider mb-3">{addr.type}</span>
                                      <h4 className="font-bold text-gray-900 text-lg">{addr.fullName}</h4>
                                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{addr.address}</p>
                                      <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
                                        <span className="font-medium text-gray-700">Phone:</span> {addr.phone}
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </>
                  ) : (
                      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-2xl">
                          <h2 className="text-xl font-semibold mb-6">Add New Address</h2>
                          <form onSubmit={(e) => {
                              e.preventDefault();
                              addAddress(addressForm);
                              setIsAddingAddress(false);
                              setAddressForm({ fullName: "", phone: "", address: "", city: "", state: "", pincode: "", type: "Home" });
                          }} className="space-y-6">
                              <div className="grid grid-cols-2 gap-6">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input placeholder="John Doe" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" value={addressForm.fullName} onChange={e => setAddressForm({...addressForm, fullName: e.target.value})} required />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input placeholder="+91 9876543210" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" value={addressForm.phone} onChange={e => setAddressForm({...addressForm, phone: e.target.value})} required />
                                  </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <textarea placeholder="Street address, apartment, suite, etc." className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all h-24 resize-none" value={addressForm.address} onChange={e => setAddressForm({...addressForm, address: e.target.value})} required />
                              </div>
                              <div className="grid grid-cols-3 gap-6">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input placeholder="City" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" value={addressForm.city} onChange={e => setAddressForm({...addressForm, city: e.target.value})} required />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                    <input placeholder="State" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" value={addressForm.state} onChange={e => setAddressForm({...addressForm, state: e.target.value})} required />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                    <input placeholder="123456" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" value={addressForm.pincode} onChange={e => setAddressForm({...addressForm, pincode: e.target.value})} required />
                                  </div>
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-3">Address Type</label>
                                  <div className="flex gap-4">
                                      {['Home', 'Work'].map(type => (
                                          <label key={type} className={`relative flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer transition-all ${addressForm.type === type ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500' : 'border-gray-200 hover:bg-gray-50'}`}>
                                              <input type="radio" name="type" checked={addressForm.type === type} onChange={() => setAddressForm({...addressForm, type})} className="text-indigo-600 focus:ring-indigo-500" />
                                              <span className="font-medium">{type}</span>
                                          </label>
                                      ))}
                                  </div>
                              </div>
                              <div className="flex gap-4 pt-6 border-t border-gray-100">
                                  <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm">Save Address</button>
                                  <button type="button" onClick={() => setIsAddingAddress(false)} className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                              </div>
                          </form>
                      </div>
                  )}
              </div>
            )}

            {/* PAYMENT METHODS */}
            {activeTab === "payment" && (
              <div className="max-w-2xl bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                  <div className="mb-10">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-indigo-600" />
                        Default Payment Method
                      </h3>
                      <div className="p-5 border border-indigo-100 bg-indigo-50/50 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-indigo-100 shadow-sm text-2xl">💵</div>
                              <div>
                                  <p className="font-semibold text-gray-900">Cash on Delivery</p>
                                  <p className="text-sm text-indigo-600 font-medium mt-0.5">Primary Method</p>
                              </div>
                          </div>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide">Default</span>
                      </div>
                  </div>

                  <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <div className="w-5 h-5 bg-indigo-600 text-white rounded flex items-center justify-center text-[10px] font-bold">UPI</div>
                        Saved UPI IDs
                      </h3>
                      <div className="space-y-3">
                          {authUser?.paymentMethods?.map((pm) => (
                              <div key={pm._id} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors group">
                                  <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-medium text-xs">UPI</div>
                                      <p className="font-medium text-gray-900">{pm.upiId}</p>
                                  </div>
                                  <button onClick={() => deleteUPI(pm._id)} className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                              </div>
                          ))}
                      </div>
                      
                      {!isAddingUPI ? (
                          <button onClick={() => setIsAddingUPI(true)} className="mt-6 w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-medium hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2">
                              <Plus className="w-5 h-5" /> Add New UPI ID
                          </button>
                      ) : (
                          <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                              <h4 className="font-medium text-gray-900 mb-4">Add UPI ID</h4>
                              <form onSubmit={(e) => {
                                  e.preventDefault();
                                  addUPI(upiForm);
                                  setIsAddingUPI(false);
                                  setUpiForm({ upiId: "" });
                              }} className="flex gap-3">
                                  <input 
                                      placeholder="example@upi" 
                                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                      value={upiForm.upiId}
                                      onChange={e => setUpiForm({ upiId: e.target.value })}
                                      required
                                  />
                                  <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">Add</button>
                                  <button type="button" onClick={() => setIsAddingUPI(false)} className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                              </form>
                          </div>
                      )}
                  </div>
              </div>
            )}

            {/* ACCOUNT DETAILS */}
            {activeTab === "account" && (
              <div className="max-w-2xl bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                  {!isEditingProfile ? (
                      <div className="space-y-8">
                          <div className="flex items-center gap-8 pb-8 border-b border-gray-100">
                              <div className="w-24 h-24 bg-indigo-50 rounded-full overflow-hidden border-4 border-white shadow-md relative">
                                  {authUser?.avatar ? (
                                      <img src={authUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                                  ) : (
                                      <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-indigo-300">
                                          {authUser?.name?.charAt(0)}
                                      </div>
                                  )}
                              </div>
                              <div>
                                  <h3 className="font-bold text-2xl text-gray-900">{authUser?.name}</h3>
                                  <p className="text-gray-500 font-medium">{authUser?.email}</p>
                                  <span className="inline-block mt-3 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                                    Customer
                                  </span>
                              </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div>
                                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Phone Number</label>
                                  <p className="font-medium text-lg text-gray-900">{authUser?.phone || "Not added"}</p>
                              </div>
                              <div>
                                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Email Address</label>
                                  <p className="font-medium text-lg text-gray-900">{authUser?.email}</p>
                              </div>
                          </div>

                          <div className="flex gap-4 pt-4 border-t border-gray-100">
                              <button onClick={() => setIsEditingProfile(true)} className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                                Edit Profile
                              </button>
                              <button onClick={() => setIsChangingPassword(true)} className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                Change Password
                              </button>
                          </div>
                      </div>
                  ) : (
                      <form onSubmit={(e) => {
                          e.preventDefault();
                          updateProfile(profileForm);
                          setIsEditingProfile(false);
                      }} className="space-y-6">
                          <div className="flex justify-center mb-8">
                              <div className="relative group">
                                  <div className="w-32 h-32 bg-indigo-50 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                      {profileForm.avatar ? (
                                          <img src={profileForm.avatar} alt="Preview" className="w-full h-full object-cover" />
                                      ) : (
                                          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-indigo-300">
                                              {profileForm.name?.charAt(0)}
                                          </div>
                                      )}
                                  </div>
                                  <label className="absolute bottom-1 right-1 bg-indigo-600 text-white p-2.5 rounded-full cursor-pointer hover:bg-indigo-700 shadow-md transition-all">
                                      <Camera className="w-5 h-5" />
                                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                  </label>
                              </div>
                          </div>

                          <div className="space-y-4">
                              <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                  <input 
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                      value={profileForm.name}
                                      onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                                      required
                                  />
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                  <input 
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                      value={profileForm.phone}
                                      onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                                  />
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                  <input 
                                      className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                                      value={authUser?.email}
                                      readOnly
                                  />
                                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                              </div>
                          </div>

                          <div className="flex gap-4 pt-6 border-t border-gray-100">
                              <button type="submit" className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm">Save Changes</button>
                              <button type="button" onClick={() => setIsEditingProfile(false)} className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                          </div>
                      </form>
                  )}
              </div>
            )}
          </div>
        </main>
      </div>

      {isChangingPassword && <ChangePassword onClose={() => setIsChangingPassword(false)} />}
    </div>
  )
}
