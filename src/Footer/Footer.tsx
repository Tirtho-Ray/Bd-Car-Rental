import { FaPhone, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import "./footer.css";

const Footer = () => {
  return (
    <div className="bg-slate-900 text-white py-20 px-4 md:px-6 lg:px-12 relative">
      <div className="container mx-auto px-5 md:px-0">
        <div className="md:flex justify-between gap-12 mb-8">
          {/* Contact Information */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 md:h-14 md:w-14 lg:h-20 lg:w-20 bg-yellow-400 rounded-full flex justify-center items-center">
                <FaPhone className="text-xl md:text-2xl lg:text-3xl" />
              </div>
              <div>
                <p className="text-sm md:text-base lg:text-xl">Call us</p>
                <p className="mt-1 text-sm md:text-base lg:text-lg">+8801812345678</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 md:h-14 md:w-14 lg:h-20 lg:w-20 bg-yellow-400 rounded-full flex justify-center items-center">
                <AiOutlineMail className="text-xl md:text-2xl lg:text-3xl" />
              </div>
              <div>
                <p className="text-sm md:text-base lg:text-xl">Email us</p>
                <p className="mt-1 text-sm md:text-base lg:text-lg">info@example.com</p>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold">Follow Us</p>
            <div className="flex gap-4">
              <a href="#" className="text-yellow-400 hover:text-yellow-300">
                <FaFacebookF className="text-xl md:text-2xl" />
              </a>
              <a href="#" className="text-yellow-400 hover:text-yellow-300">
                <FaTwitter className="text-xl md:text-2xl" />
              </a>
              <a href="#" className="text-yellow-400 hover:text-yellow-300">
                <FaInstagram className="text-xl md:text-2xl" />
              </a>
              <a href="#" className="text-yellow-400 hover:text-yellow-300">
                <FaLinkedinIn className="text-xl md:text-2xl" />
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold">Subscribe to our Newsletter</p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your Email Address"
                className="px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Team and Terms */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-700 pt-4 max-w-7xl mx-auto">
          <p className="text-sm md:text-base">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/team" className="hover:text-yellow-400">Our Team</a>
            <a href="/terms" className="hover:text-yellow-400">Terms and Conditions</a>
          </div>
        </div>
      </div>
      <p className="text-center mt-4 md:mt-8">Devloper: <span className="hover:underline cursor-pointer">Tirtho Ray</span></p>
    </div>
  );
};

export default Footer;
