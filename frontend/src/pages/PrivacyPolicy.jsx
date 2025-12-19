import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Privacy Policy</h1>
        
        <div className="space-y-8 text-foreground/80">
          <section>
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              At Kumar Kosmetics, your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">Information We Collect</h2>
            <p className="mb-2">We may collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Name, email, phone number</li>
              <li>Account login details</li>
              <li>Shipping and billing address</li>
              <li>Payment details (processed securely via Razorpay)</li>
              <li>Skin analysis responses and preferences</li>
              <li>Usage data (pages visited, interactions)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">How We Use Your Information</h2>
            <p className="mb-2">We use your data to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Create and manage your account</li>
              <li>Process orders and payments</li>
              <li>Provide personalized skincare recommendations</li>
              <li>Improve our products and user experience</li>
              <li>Communicate important updates and offers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">Cookies & Tracking</h2>
            <p className="mb-2">We use cookies to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Keep you logged in</li>
              <li>Improve site performance</li>
              <li>Understand user behavior</li>
            </ul>
            <p className="mt-2">You can control cookies through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. Payment information is handled securely by trusted third-party payment providers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">Third-Party Services</h2>
            <p className="mb-2">We may use trusted services such as:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Razorpay (payments)</li>
              <li>Google OAuth (login)</li>
              <li>Cloudinary (image hosting)</li>
            </ul>
            <p className="mt-2">These services follow their own privacy policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access your data</li>
              <li>Update your information</li>
              <li>Request deletion of your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Changes will be reflected on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, contact us at: <br />
              <a href="mailto:support@kumarkosmetics.com" className="text-primary hover:underline">support@kumarkosmetics.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
