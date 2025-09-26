import { Heart, HelpCircle, MessageCircle, FileText, Mail, Phone, Shield, ExternalLink } from 'lucide-react';

function Footer(){

    return(
        <footer className="bg-gray-900 text-white min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Black Vendors</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Empowering users with innovative solutions and exceptional experiences since 2024.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Heart className="w-4 h-4 text-red-500" />
                Made with love
              </div>
            </div>

            {/* Customer Care */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Care</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#help" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                    <HelpCircle className="w-4 h-4" />
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                    <MessageCircle className="w-4 h-4" />
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4" />
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="mailto:support@blackvendors.com" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    support@blackvendor.com
                  </a>
                </li>
                <li>
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    +1 (234) 567-890
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#careers" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#privacy" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4" />
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#gdpr" className="text-gray-400 hover:text-white transition-colors text-sm">
                    GDPR Compliance
                  </a>
                </li>
                <li>
                  <a href="#licenses" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                    <ExternalLink className="w-4 h-4" />
                    Open Source
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 Black Vendors Inc. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#twitter" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Twitter
                </a>
                <a href="#facebook" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Facebook
                </a>
                <a href="#linkedin" className="text-gray-400 hover:text-white transition-colors text-sm">
                  LinkedIn
                </a>
                <a href="#github" className="text-gray-400 hover:text-white transition-colors text-sm">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;