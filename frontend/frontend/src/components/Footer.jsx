import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black-bean text-white text-sm py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
            <p>© {new Date().getFullYear()} spencers.studio. All rights reserved.</p>
            <div className="flex space-x-6">
            <Link to="/terms" className="hover:underline">Terms</Link>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
