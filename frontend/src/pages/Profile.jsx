import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { User, Package, MapPin, CreditCard, LogOut, Plus, Trash2, Edit2, Camera } from "lucide-react"
import ChangePassword from "@/components/profile/ChangePassword"

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
    <main className="min-h-screen bg-background">
      <Header />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 border border-border sticky top-24">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-lg overflow-hidden">
                    {authUser?.avatar ? (
                        <img src={authUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        authUser?.name?.charAt(0) || "U"
                    )}
                    </div>
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">{authUser?.name || "User"}</h2>
                  <p className="text-sm text-muted-foreground w-1/2">{authUser?.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  Log Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-8 border border-border min-h-[500px]">
              <h1 className="text-2xl font-semibold text-foreground mb-6">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h1>

              {/* MY ORDERS */}
              {activeTab === "orders" && (
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed border-border">
                      <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No orders yet</h3>
                      <p className="text-muted-foreground">Start shopping to see your orders here.</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order._id} className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
                        {/* Order Header */}
                        <div className="bg-muted/30 px-6 py-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-white p-2 rounded-lg border border-border">
                                    <Package className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Order ID</p>
                                    <p className="font-mono font-medium text-foreground">#{order._id.slice(-6)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div>
                                    <p className="text-sm text-muted-foreground">Date Placed</p>
                                    <p className="font-medium text-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Amount</p>
                                    <p className="font-semibold text-primary">₹{order.totalAmount}</p>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-6">
                            <div className="space-y-6">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <div className="w-20 h-20 bg-muted/30 rounded-lg border border-border overflow-hidden flex-shrink-0">
                                            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-contain p-2" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                                            <p className="text-sm text-muted-foreground mt-1">Variant: {item.variant || "N/A"}</p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="text-sm bg-muted px-2 py-1 rounded text-muted-foreground">Qty: {item.quantity}</span>
                                                <span className="text-sm font-medium">₹{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Footer */}
                            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Status:</span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
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
                                    <button className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors border border-transparent hover:border-primary/20">
                                        View Details
                                    </button>
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
                                    className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors h-full min-h-[150px]"
                                >
                                    <Plus className="w-8 h-8 mb-2" />
                                    <span>Add New Address</span>
                                </button>
                                {authUser?.addresses?.map((addr) => (
                                    <div key={addr._id} className="border border-border rounded-lg p-6 relative group">
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-muted-foreground hover:text-primary"><Edit2 className="w-4 h-4" /></button>
                                            <button onClick={() => deleteAddress(addr._id)} className="p-2 text-muted-foreground hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                        <span className="inline-block px-2 py-1 bg-muted rounded text-xs font-medium mb-2">{addr.type}</span>
                                        <h4 className="font-medium">{addr.fullName}</h4>
                                        <p className="text-sm text-muted-foreground mt-1">{addr.address}</p>
                                        <p className="text-sm text-muted-foreground">{addr.city}, {addr.state} - {addr.pincode}</p>
                                        <p className="text-sm text-muted-foreground mt-2">Phone: {addr.phone}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            addAddress(addressForm);
                            setIsAddingAddress(false);
                            setAddressForm({ fullName: "", phone: "", address: "", city: "", state: "", pincode: "", type: "Home" });
                        }} className="max-w-lg space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input placeholder="Full Name" className="p-3 border rounded-lg" value={addressForm.fullName} onChange={e => setAddressForm({...addressForm, fullName: e.target.value})} required />
                                <input placeholder="Phone Number" className="p-3 border rounded-lg" value={addressForm.phone} onChange={e => setAddressForm({...addressForm, phone: e.target.value})} required />
                            </div>
                            <textarea placeholder="Address" className="w-full p-3 border rounded-lg" value={addressForm.address} onChange={e => setAddressForm({...addressForm, address: e.target.value})} required />
                            <div className="grid grid-cols-3 gap-4">
                                <input placeholder="City" className="p-3 border rounded-lg" value={addressForm.city} onChange={e => setAddressForm({...addressForm, city: e.target.value})} required />
                                <input placeholder="State" className="p-3 border rounded-lg" value={addressForm.state} onChange={e => setAddressForm({...addressForm, state: e.target.value})} required />
                                <input placeholder="Pincode" className="p-3 border rounded-lg" value={addressForm.pincode} onChange={e => setAddressForm({...addressForm, pincode: e.target.value})} required />
                            </div>
                            <div className="flex gap-4">
                                {['Home', 'Work'].map(type => (
                                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="type" checked={addressForm.type === type} onChange={() => setAddressForm({...addressForm, type})} />
                                        {type}
                                    </label>
                                ))}
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg">Save Address</button>
                                <button type="button" onClick={() => setIsAddingAddress(false)} className="px-6 py-2 rounded-lg border hover:bg-muted">Cancel</button>
                            </div>
                        </form>
                    )}
                </div>
              )}

              {/* PAYMENT METHODS */}
              {activeTab === "payment" && (
                <div className="max-w-xl">
                    <div className="mb-8">
                        <h3 className="font-medium mb-4">Default Payment Method</h3>
                        <div className="p-4 border border-primary bg-primary/5 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border">💵</div>
                                <div>
                                    <p className="font-medium">Cash on Delivery</p>
                                    <p className="text-xs text-muted-foreground">Default</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Saved UPI IDs</h3>
                        <div className="space-y-3">
                            {authUser?.paymentMethods?.map((pm) => (
                                <div key={pm._id} className="p-4 border rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">UPI</div>
                                        <p className="font-medium">{pm.upiId}</p>
                                    </div>
                                    <button onClick={() => deleteUPI(pm._id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            ))}
                        </div>
                        
                        {!isAddingUPI ? (
                            <button onClick={() => setIsAddingUPI(true)} className="mt-4 text-primary flex items-center gap-2 hover:underline">
                                <Plus className="w-4 h-4" /> Add New UPI ID
                            </button>
                        ) : (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                addUPI(upiForm);
                                setIsAddingUPI(false);
                                setUpiForm({ upiId: "" });
                            }} className="mt-4 flex gap-2">
                                <input 
                                    placeholder="example@upi" 
                                    className="flex-1 p-2 border rounded-lg"
                                    value={upiForm.upiId}
                                    onChange={e => setUpiForm({ upiId: e.target.value })}
                                    required
                                />
                                <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">Add</button>
                                <button type="button" onClick={() => setIsAddingUPI(false)} className="border px-4 py-2 rounded-lg">Cancel</button>
                            </form>
                        )}
                    </div>
                </div>
              )}

              {/* ACCOUNT DETAILS */}
              {activeTab === "account" && (
                <div className="max-w-md">
                    {!isEditingProfile ? (
                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-muted rounded-full overflow-hidden">
                                    {authUser?.avatar ? (
                                        <img src={authUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                                            {authUser?.name?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-medium text-lg">{authUser?.name}</h3>
                                    <p className="text-muted-foreground">{authUser?.email}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-muted-foreground">Phone Number</label>
                                    <p className="font-medium">{authUser?.phone || "Not added"}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-muted-foreground">Email</label>
                                    <p className="font-medium">{authUser?.email}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button onClick={() => setIsEditingProfile(true)} className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg">Edit Profile</button>
                                <button onClick={() => setIsChangingPassword(true)} className="flex-1 border border-border py-2 rounded-lg hover:bg-muted">Change Password</button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            updateProfile(profileForm);
                            setIsEditingProfile(false);
                        }} className="space-y-4">
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <div className="w-24 h-24 bg-muted rounded-full overflow-hidden">
                                        {profileForm.avatar ? (
                                            <img src={profileForm.avatar} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                                                {profileForm.name?.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:opacity-90">
                                        <Camera className="w-4 h-4" />
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input 
                                    className="w-full p-3 border rounded-lg"
                                    value={profileForm.name}
                                    onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone Number</label>
                                <input 
                                    className="w-full p-3 border rounded-lg"
                                    value={profileForm.phone}
                                    onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input 
                                    className="w-full p-3 border rounded-lg bg-muted text-muted-foreground"
                                    value={authUser?.email}
                                    readOnly
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg">Save Changes</button>
                                <button type="button" onClick={() => setIsEditingProfile(false)} className="flex-1 border border-border py-2 rounded-lg hover:bg-muted">Cancel</button>
                            </div>
                        </form>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {isChangingPassword && <ChangePassword onClose={() => setIsChangingPassword(false)} />}
    </main>
  )
}
