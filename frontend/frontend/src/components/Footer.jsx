import { Link } from "react-router-dom";
import tearFooter from "/media/tear-edge-footer.png";

const Footer = () => {
  return (
    <>
      {/* Positioning wrapper */}
      <div className="relative">
        {/* Footer tear edge */}
        <div
            className="absolute -top-[40px] left-0 w-full h-[60px] bg-no-repeat bg-top bg-repeat-x bg-[length:auto_100%] pointer-events-none z-10"
            style={{ backgroundImage: "url('/media/tear-edge-footer.png')" }}
        />

        <footer className="bg-neutral text-seasalt text-sm relative z-0">
          <div className="container mx-auto flex justify-between items-center px-6 py-4">
            <p>© {new Date().getFullYear()} spencers.studio. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/terms" className="hover:underline">Terms</Link>
              <Link to="/privacy" className="hover:underline">Privacy</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
