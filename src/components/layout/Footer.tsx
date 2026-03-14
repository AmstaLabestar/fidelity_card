import { CreditCard, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content border-t border-base-300">
      <aside>
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter mb-4">
          <div className="bg-primary text-primary-content p-2 rounded-xl">
            <CreditCard size={24} />
          </div>
          <span>SmartCard</span>
        </div>
        <p>SmartCard RFID Network.<br/>Revolutionizing local commerce since 2024.</p>
      </aside> 
      <nav>
        <h6 className="footer-title">Product</h6> 
        <a className="link link-hover">How it works</a>
        <a className="link link-hover">Benefits</a>
        <a className="link link-hover">Pricing</a>
        <a className="link link-hover">FAQ</a>
      </nav> 
      <nav>
        <h6 className="footer-title">Company</h6> 
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Partners</a>
      </nav> 
      <nav>
        <h6 className="footer-title">Legal</h6> 
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
      <div className="flex gap-4 mt-4">
        <Twitter className="cursor-pointer hover:text-primary transition-colors" size={20} />
        <Instagram className="cursor-pointer hover:text-primary transition-colors" size={20} />
        <Github className="cursor-pointer hover:text-primary transition-colors" size={20} />
      </div>
    </footer>
  );
}
