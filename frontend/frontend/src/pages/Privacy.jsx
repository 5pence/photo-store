import { useEffect } from "react";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 pb-12">
    <title>Privacy Policy | Spencers Studio</title>
    <meta name="description" content="Read the Privacy Policy of Spencers Studio. Learn how I collect, use, and protect your data while you browse our Ibsite and services." />

      <h1 className="text-4xl font-thin text-center mb-6 text-charcoal font-serif">Privacy Policy</h1>
      
      <div className="max-w-3xl mx-auto text-gray-700 space-y-6">
        <p>
          This Privacy Policy describes how I collect, use, and protect your personal information when you visit spencers.studio.
        </p>

        <h2 className="text-2xl font-normal mt-6 text-charcoal font-serif">1. Information I Collect</h2>
        <p>
          I may collect personal information such as your name, email, and any details you provide through our contact form or checkout process.
        </p>

        <h2 className="text-2xl font-normal mt-6 text-charcoal font-serif">2. How I Use Your Information</h2>
        <p>
          Your information is used for order processing, customer support, and site improvements. I do not sell your data to third parties.
        </p>

        <h2 className="text-2xl font-normal mt-6 text-charcoal font-serif">3. Cookies & Tracking</h2>
        <p>
          I use essential cookies for authentication and session management. No third-party tracking is used for advertising purposes.
        </p>

        <h2 className="text-2xl font-normal mt-6 text-charcoal font-serif">4. Data Security</h2>
        <p>
          I implement security measures to protect your personal data. However, no online transmission is 100% secure.
        </p>

        <h2 className="text-2xl font-normal mt-6 text-charcoal font-serif">5. Your Rights</h2>
        <p>
          You have the right to request access, correction, or deletion of your data. Contact me if you wish to exercise these rights.
        </p>

        <h2 className="text-2xl font-normal mt-6 text-charcoal font-serif">6. Changes to Policy</h2>
        <p>
          I reserve the right to update this policy. Any changes will be reflected on this page.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Privacy;
