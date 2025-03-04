import { useEffect } from "react";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6 text-[#d64933]">Terms and Conditions</h1>
      
      <div className="max-w-3xl mx-auto text-gray-700 space-y-6">
        <p>
          Welcome to spencers.studio. By accessing our website, you agree to comply with the following terms and conditions. If you do not agree, please refrain from using our services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-[#d64933]">1. Use of Website</h2>
        <p>
          You must be at least 18 years old or have parental permission to use this website. You agree not to misuse the website for unlawful purposes.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-[#d64933]">2. Intellectual Property</h2>
        <p>
          All content, images, and materials on this website are the property of spencers.studio. Unauthorized use, reproduction, or distribution is prohibited.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-[#d64933]">3. Purchases & Payments</h2>
        <p>
          Any purchases made through our store are subject to our refund and return policies. Prices are subject to change without notice.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-[#d64933]">4. Limitation of Liability</h2>
        <p>
          We are not responsible for any indirect, incidental, or consequential damages arising from the use of our services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-[#d64933]">5. Changes to Terms</h2>
        <p>
          We reserve the right to update these terms at any time. Continued use of the site after changes are made constitutes your acceptance.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Terms;
