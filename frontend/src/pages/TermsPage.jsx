import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          <div className="bg-card rounded-2xl shadow-sm border border-border/50 p-8 md:p-12 overflow-hidden relative">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground relative z-10">Terms of Service</h1>
            <p className="text-muted-foreground mb-12 relative z-10 px-0.5">Last updated: 17 Dec 2025</p>
            
            <div className="space-y-12 text-foreground/90 relative z-10">
              
              {/* Introduction */}
              <section className="prose prose-stone dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Welcome to Kumar Kosmetics. These Terms of Service govern your access to and use of our website, products, and services. By using our platform, you agree to comply with and be bound by these terms.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground mt-4 font-medium">
                  If you do not agree with any part of these terms, please discontinue use of the website.
                </p>
              </section>

              {/* 1. Use of the Website */}
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary/80">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">1</span>
                  Use of the Website
                </h2>
                <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
                    <p className="mb-4 text-muted-foreground">You agree to use Kumar Kosmetics only for lawful purposes and in a manner that does not infringe the rights of others.</p>
                    <p className="font-semibold mb-2">You must not:</p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                        {["Use the website for fraudulent activities", "Attempt unauthorized access", "Interfere with security or performance"].map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
              </section>

              {/* 2. User Accounts */}
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary/80">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">2</span>
                  User Accounts
                </h2>
                <p className="mb-4 text-muted-foreground">To access certain features, you may need to create an account. You are responsible for:</p>
                <ul className="space-y-3 mb-4">
                    {["Providing accurate information", "Maintaining login confidentiality", "All activities under your account"].map((item, i) => (
                        <li key={i} className="flex items-start text-muted-foreground">
                            <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-2 mr-3 flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
                <p className="text-sm italic text-muted-foreground">We reserve the right to suspend accounts that violate these terms.</p>
              </section>

               {/* 3. Disclaimer */}
               <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary/80">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">3</span>
                  Skin Analysis & Recommendations Disclaimer
                </h2>
                <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-xl border border-amber-200 dark:border-amber-900/50">
                    <p className="mb-4 text-foreground/80">Kumar Kosmetics provides skincare analysis for informational purposes only.</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/70 mb-4">
                        <li>Results are based on user-provided inputs</li>
                        <li>Individual skin responses may vary</li>
                        <li>Recommendations <strong>do not replace</strong> professional medical advice</li>
                    </ul>
                    <p className="font-medium text-amber-700 dark:text-amber-500">Always consult a qualified professional for medical concerns.</p>
                </div>
              </section>

              {/* 4. Orders & 5. Shipping */}
              <div className="grid md:grid-cols-2 gap-8">
                  <section>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary/80">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">4</span>
                        Orders & Payments
                    </h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start"><span className="mr-2">•</span>Prices listed in Indian Rupees (₹)</li>
                        <li className="flex items-start"><span className="mr-2">•</span>Availability subject to change</li>
                        <li className="flex items-start"><span className="mr-2">•</span>Secure processing via Razorpay</li>
                        <li className="flex items-start"><span className="mr-2">•</span>Orders confirmed after payment</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary/80">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">5</span>
                        Shipping & Returns
                    </h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start"><span className="mr-2">•</span>Timelines displayed at checkout</li>
                        <li className="flex items-start"><span className="mr-2">•</span>Eligibility varies by product</li>
                        <li className="flex items-start"><span className="mr-2">•</span>Refunds to original payment method</li>
                    </ul>
                  </section>
              </div>

               {/* 6. Product Info */}
               <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary/80">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">6</span>
                  Product Information & Usage
                </h2>
                <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
                    <p className="mb-4 text-muted-foreground">We strive for accuracy, but minor variations may occur. Results depend on skin type and consistency.</p>
                    <p className="font-semibold mb-2 text-sm">Users are advised to:</p>
                    <div className="flex flex-wrap gap-3">
                        {["Review ingredients", "Patch test new products", "Discontinue if irritated"].map((item, i) => (
                             <span key={i} className="px-3 py-1 bg-background rounded-full border border-border text-sm text-muted-foreground">{item}</span>
                        ))}
                    </div>
                </div>
              </section>

              {/* 7. IP & 8. Liability */}
              <div className="grid md:grid-cols-2 gap-8">
                 <section>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary/80">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">7</span>
                        Intellectual Property
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">All content is property of Kumar Kosmetics.</p>
                    <p className="font-semibold text-sm mb-2">You may not:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Copy or distribute content</li>
                        <li>Use branding commercially</li>
                    </ul>
                  </section>
                  <section>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary/80">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">8</span>
                        Limitation of Liability
                    </h2>
                    <p className="text-sm text-muted-foreground mb-2">To the fullest extent permitted by law:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>We are not liable for indirect damages</li>
                        <li>Not responsible for adverse reactions</li>
                    </ul>
                  </section>
              </div>


              {/* 9, 10, 11 Sections */}
              <section>
                 <div className="grid sm:grid-cols-3 gap-6">
                    <div className="bg-muted/20 p-5 rounded-xl">
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                             <span className="text- primary text-sm">9.</span> Termination
                        </h3>
                        <p className="text-xs text-muted-foreground">We reserve the right to suspend or terminate accounts for violations.</p>
                    </div>
                    <div className="bg-muted/20 p-5 rounded-xl">
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                             <span className="text-primary text-sm">10.</span> Changes
                        </h3>
                        <p className="text-xs text-muted-foreground">Updates will be posted here. Continued use implies acceptance.</p>
                    </div>
                    <div className="bg-muted/20 p-5 rounded-xl">
                         <h3 className="font-bold mb-2 flex items-center gap-2">
                             <span className="text-primary text-sm">11.</span> Governing Law
                        </h3>
                        <p className="text-xs text-muted-foreground">Governed by and interpreted in accordance with the laws of India.</p>
                    </div>
                 </div>
              </section>

              {/* 12. Contact */}
              <section className="bg-secondary/20 rounded-2xl p-8 text-center border border-secondary/20 mt-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Us</h2>
                <p className="text-muted-foreground mb-6">
                    For questions about these Terms of Service, please contact us.
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
