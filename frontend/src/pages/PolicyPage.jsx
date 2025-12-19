import React from 'react';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl shadow-sm border border-border/50 p-8 md:p-12 overflow-hidden relative">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground relative z-10">Privacy Policy</h1>
            <p className="text-muted-foreground mb-12 relative z-10 px-0.5">Last updated: 17 Dec 2025</p>
            
            <div className="space-y-12 text-foreground/90 relative z-10">
              {/* Introduction */}
              <section className="prose prose-stone dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  At Kumar Kosmetics, we value your trust and are committed to protecting your personal information. This Privacy Policy explains what data we collect, why we collect it, and how we use and safeguard it when you use our website and services.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                  By accessing or using Kumar Kosmetics, you agree to the practices described in this policy.
                </p>
              </section>

              {/* 1. Information We Collect */}
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary/80">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">1</span>
                  Information We Collect
                </h2>
                <p className="mb-6 text-muted-foreground">We collect information to provide a better, more personalized skincare experience.</p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-muted/30 p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-colors">
                    <h3 className="font-semibold text-lg mb-3">a) Personal Information</h3>
                    <p className="text-sm text-muted-foreground mb-2">When you create an account or place an order:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground/90">
                      <li>Full name</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Shipping and billing address</li>
                    </ul>
                  </div>

                  <div className="bg-muted/30 p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-colors">
                    <h3 className="font-semibold text-lg mb-3">b) Account & Authentication Data</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground/90">
                      <li>Login credentials (stored securely in encrypted form)</li>
                      <li>Google OAuth profile details (name, email, profile image)</li>
                    </ul>
                  </div>

                  <div className="bg-muted/30 p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-colors">
                    <h3 className="font-semibold text-lg mb-3">c) Payment Information</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground/90">
                      <li>Payment transactions are processed securely via Razorpay</li>
                      <li>We <strong>do not</strong> store card, UPI, or bank details on our servers</li>
                    </ul>
                  </div>

                  <div className="bg-muted/30 p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-colors">
                    <h3 className="font-semibold text-lg mb-3">d) Skin Analysis Data</h3>
                    <p className="text-sm text-muted-foreground mb-2">To provide personalized recommendations:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground/90">
                      <li>Skin type (e.g., oily, dry, sensitive)</li>
                      <li>Skin concerns (e.g., acne, pigmentation)</li>
                      <li>Product preferences and sensitivities</li>
                    </ul>
                  </div>

                  <div className="md:col-span-2 bg-muted/30 p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-colors">
                    <h3 className="font-semibold text-lg mb-3">e) Usage & Technical Data</h3>
                    <div className="flex flex-wrap gap-2">
                        {["Pages visited", "Device type", "Browser type", "IP address", "Interaction data"].map((tag, i) => (
                             <span key={i} className="px-3 py-1 bg-background rounded-full border border-border text-sm text-muted-foreground">{tag}</span>
                        ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. How We Use */}
              <section>
                 <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary/80">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">2</span>
                  How We Use Your Information
                </h2>
                <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                    <p className="text-muted-foreground mb-6">Your information is used to improve both functionality and experience.</p>
                    <ul className="grid sm:grid-cols-2 gap-4">
                        {[
                          "Create and manage your user account",
                          "Process orders, payments, and deliveries",
                          "Provide personalized skincare analysis",
                          "Save your preferences and past results",
                          "Improve website performance and usability",
                          "Communicate order updates and offers",
                          "Prevent fraud and ensure platform security"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                                <span className="text-muted-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 pt-6 border-t border-primary/10 font-medium text-foreground text-center">We never sell your personal data to third parties.</p>
                </div>
              </section>

              {/* 3. Cookies */}
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary/80">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">3</span>
                  Cookies & Tracking Technologies
                </h2>
                <p className="mb-4 text-muted-foreground">Cookies help us:</p>
                <div className="flex flex-wrap gap-3 mb-4">
                  {["Keep you logged in securely", "Remember your preferences", "Analyze traffic", "Improve site speed"].map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-muted rounded-lg border border-border text-sm text-foreground/80 font-medium">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">You can control cookies in browser settings. Disabling them may affect some features.</p>
              </section>

              {/* 4. Data Security */}
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary/80">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">4</span>
                  Data Security
                </h2>
                <div className="grid sm:grid-cols-4 gap-4 mb-4">
                    {["Encrypted Tokens (JWT)", "Secure HTTPS", "Restricted Access", "Industry Standards"].map((item, i) => (
                        <div key={i} className="bg-card border border-border p-4 rounded-xl text-center text-sm font-medium text-foreground">
                            {item}
                        </div>
                    ))}
                </div>
                <p className="text-muted-foreground text-sm">All payment transactions are handled by trusted third-party providers.</p>
              </section>

              {/* 5. Third Party Services */}
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary/80">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">5</span>
                  Third-Party Services
                </h2>
                <div className="overflow-hidden rounded-xl border border-border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="p-4 font-semibold text-foreground">Service</th>
                                <th className="p-4 font-semibold text-foreground">Purpose</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {[
                                { service: "Razorpay", purpose: "Secure payment processing" },
                                { service: "Google OAuth", purpose: "Easy and secure login" },
                                { service: "Cloudinary", purpose: "Product and user image hosting" },
                                { service: "Analytics Tools", purpose: "Improve site performance" }
                            ].map((row, i) => (
                                <tr key={i} className="group hover:bg-muted/50 transition-colors">
                                    <td className="p-4 font-medium text-foreground">{row.service}</td>
                                    <td className="p-4 text-muted-foreground">{row.purpose}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">These services have their own privacy policies and handle data according to their standards.</p>
              </section>

              {/* 6. Your Rights */}
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary/80">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">6</span>
                  Your Rights & Choices
                </h2>
                <p className="mb-4 text-muted-foreground">You have full control over your data. You may:</p>
                <ul className="space-y-3 mb-4">
                    {[
                        "Access and review your personal information",
                        "Update your account details at any time",
                        "Request deletion of your account and associated data",
                        "Opt out of non-essential communications"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-2 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                </ul>
              </section>

              {/* 7. Retention & 8. Changes */}
              <div className="grid md:grid-cols-2 gap-12">
                  <section>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary/80">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">7</span>
                        Data Retention
                    </h2>
                    <p className="text-muted-foreground mb-2">We retain personal data only as long as:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Your account remains active</li>
                        <li>It is required to provide services</li>
                        <li>It is needed to comply with legal obligations</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary/80">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">8</span>
                        Changes to Policy
                    </h2>
                    <p className="text-muted-foreground">
                         We may update this policy for feature updates, legal changes, or service improvements. 
                         Updates will be posted here with a revised date.
                    </p>
                  </section>
              </div>

              {/* 9. Contact */}
              <section className="bg-secondary/20 rounded-2xl p-8 text-center border border-secondary/20 mt-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Us</h2>
                <p className="text-muted-foreground mb-6">
                    If you have questions, concerns, or requests related to this Privacy Policy, we’re always happy to help.
                </p>
                <a 
                  href="mailto:support@kumarkosmetics.com" 
                  className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 border-2 border-primary/20 text-primary font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg hover:shadow-primary/25"
                >
                  📧 support@kumarkosmetics.com
                </a>
              </section>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
