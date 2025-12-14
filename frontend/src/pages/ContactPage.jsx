import { useState, useRef, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Instagram, Facebook, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";



export default function ContactPage() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post("/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
       

        <div className="max-w-5xl mx-auto px-4 py-8 -mt-8 relative z-20 ">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-20">
            {/* Contact Information Cards */}
            <div className="lg:col-span-3 h-full bg-gradient-to-b from-blue-800/60 to-blue-200 p-5 rounded-xl text-white relative overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70 pointer-events-none"
              >
                <source src="/cloud_vid.mp4" type="video/mp4" />
              </video>
              <div className="relative z-10 space-y-4">
              <div className="px-6 pt-4">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold text-white"
                >
                  Get in Touch
                </motion.h2>
                {/* <p className="text-blue-50 text-sm mt-1">We'd love to hear from you.</p> */}
              </div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="px-6 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  {/* <div className=" rounded-lg flex items-center justify-center text-white"> */}
                    <Mail className="w-5 h-5" />
                  {/* </div> */}
                  <h3 className="text-md font-semibold text-white">Email Us</h3>
                </div>
                <p className="text-blue-50 text-xs mb-1 font-medium">Our friendly team is here to help.</p>
                <a href="mailto:korplz1408@gmail.com" className="text-white font-medium hover:underline text-sm">korplz1408@gmail.com</a>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="px-6  rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5" />
                  <h3 className="text-md font-semibold text-white">Visit Us</h3>
                </div>
                <p className="text-blue-50 text-xs mb-1 font-medium">Come say hello at our office headquarters.</p>
                <p className="text-white font-medium text-sm">block 30, Serojani Nagar, New Delhi 110011</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="px-6  rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5" />
                  <h3 className="text-md font-semibold text-white">Call Us</h3>
                </div>
                <p className="text-blue-50 text-xs mb-1 font-medium">Mon - Fri: 9am - 6pm</p>
                <a href="tel:+91-8130610431" className="text-white font-medium hover:underline text-sm">+91-8130610431</a>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="px-6  rounded-xl"
              >
                <h3 className="text-md font-semibold text-white mb-3">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10  rounded-lg flex items-center justify-center text-white hover:bg-white/80 hover:text-black/20 transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-10 h-10  rounded-lg flex items-center justify-center text-white hover:bg-white/80 hover:text-black/20 transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center text-white hover:bg-white/80 hover:text-black/20 transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </motion.div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 h-full">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-blue-900 mb-1">Send us a Message</h2>
                  <p className="text-gray-600 text-sm">Fill out the form below and we'll get back to you as soon as possible.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1.5">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-gray-50 focus:bg-white text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-blue-900 mb-1.5">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-gray-50 focus:bg-white text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-medium text-blue-900 mb-1.5">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-gray-50 focus:bg-white text-sm"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-blue-900 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-gray-50 focus:bg-white resize-none text-sm"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full md:w-[220px] inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-medium rounded-full text-white bg-blue-900 hover:bg-blue-800 shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="pointer-events-none mr-8 text-sm">{loading ? "Sending..." : "Send Message"}</span>
                      <span
                        className="absolute right-2 top-1/2 -translate-y-1/2 
                                     bg-white text-blue-900 rounded-full p-2 md:p-2
                                     flex items-center justify-center overflow-hidden"
                      >
                        {loading ? (
                           <div className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
                        ) : (
                           <Send className="w-5 h-5 arrow-icon" />
                        )}
                      </span>
                    </button>
                    <style>{`
                      @keyframes arrow-slide {
                        0% { transform: translate(0, 0); opacity: 1; }
                        45% { transform: translate(100%, -100%); opacity: 0; }
                        50% { transform: translate(-100%, 100%); opacity: 0; }
                        55% { transform: translate(-100%, 100%); opacity: 0; }
                        100% { transform: translate(0, 0); opacity: 1; }
                      }
                      .group:hover .arrow-icon {
                        animation: arrow-slide 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                      }
                    `}</style>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


