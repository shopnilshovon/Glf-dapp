import { FaTelegramPlane, FaTwitter } from 'react-icons/fa';

export default function SocialLinks() {
  return (
    <div className="mt-8 flex flex-col items-center space-y-4 text-white">
      <h2 className="text-xl font-semibold">Connect with GreenLeaf</h2>
      <div className="flex space-x-4">
        <a
          href="https://x.com/GreenLeafDApp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl shadow transition"
        >
          <FaTwitter />
          <span>Follow us on Twitter</span>
        </a>
        <a
          href="https://t.me/GreenLeafDapp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-2xl shadow transition"
        >
          <FaTelegramPlane />
          <span>Join our Telegram</span>
        </a>
      </div>
    </div>
  );
}