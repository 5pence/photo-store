import { useEffect } from "react";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
    <title>Privacy Policy | Spencers Studio</title>
    <meta name="description" content="Read the Privacy Policy of Spencers Studio. Learn how we collect, use, and protect your data while you browse our website and services." />

      <h1 className="text-4xl font-bold text-center mb-6 text-[#d64933]">Privacy Policy</h1>
      
      <div className="max-w-3xl mx-auto text-gray-700 space-y-6">
        <p>
          This Privacy Policy describes how we collect, use, and protect your personal information when you visit spencers.studio.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-[#d64933]">1. Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email, and any details you provide through our contact form or checkout process.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-[#d64933]">2. How We Use Your Information</h2>
        <p>
          Your information is used for order processing, customer support, and site improvements. We do not sell your data to third parties.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-[#d64933]">3. Cookies & Tracking</h2>
        <p>
          We use essential cookies for authentication and session management. No third-party tracking is used for advertising purposes.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-[#d64933]">4. Data Security</h2>
        <p>
          We implement security measures to protect your personal data. However, no online transmission is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-[#d64933]">5. Your Rights</h2>
        <p>
          You have the right to request access, correction, or deletion of your data. Contact us if you wish to exercise these rights.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-[#d64933]">6. Changes to Policy</h2>
        <p>
          We reserve the right to update this policy. Any changes will be reflected on this page.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Privacy;
