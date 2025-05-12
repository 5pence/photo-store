import { useEffect } from "react";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 pb-12">
    <title>Terms & Conditions | Spencers Studio</title>
    <meta name="description" content="Read the Terms & Conditions of Spencers Studio. Understand the rules, policies, and guidelines for using my website, services, and purchasing products." />

      <h1 className="text-4xl font-thin text-center mb-6 text-charcol font-serif">Terms and Conditions</h1>
      
      <div className="max-w-3xl mx-auto text-charcoal2 space-y-6">
        <p>
          Welcome to spencers.studio. By accessing our website, you agree to comply with the following terms and conditions. If you do not agree, please refrain from using my services.
        </p>

        <h2 className="text-2xl font-normal mt-6 text-charcoal font-serif">1. Use of Website</h2>
        <p>
          You must be at least 18 years old or have parental permission to use this website. You agree not to misuse the website for unlawful purposes.
        </p>

        <h2 className="text-2xl font-normal mt-6 text-charcoal font-serif">2. Intellectual Property</h2>
        <p>
          All content, images, and materials on this website are the property of spencers.studio. Unauthorized use, reproduction, or distribution is prohibited.
        </p>

        <h2 className="text-2xl font-normal mt-6 text-charcoal font-serif">3. Purchases & Payments</h2>
        <p>
          Any purchases made through my store are subject to my refund and return policies. Prices are subject to change without notice.
        </p>

        <h2 className="text-2xl font-normal mt-6 text-charcoal font-serif">4. Limitation of Liability</h2>
        <p>
          I am not responsible for any indirect, incidental, or consequential damages arising from the use of my services.
        </p>

        <h2 className="text-2xl font-normal mt-6 text-charcoal font-serif">5. Changes to Terms</h2>
        <p>
          I reserve the right to update these terms at any time. Continued use of the site after changes are made constitutes your acceptance.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Terms;
