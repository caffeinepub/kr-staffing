import { Link } from '@tanstack/react-router';
import { SiInstagram, SiWhatsapp } from 'react-icons/si';
import { Heart } from 'lucide-react';
import { brandConfig } from '../../config/brand';
import { copy } from '../../content/copy';
import CompanyDetails from '../common/CompanyDetails';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <img
              src="/assets/generated/brand-logo.dim_512x128.png"
              alt={brandConfig.company.name}
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-muted-foreground max-w-md">{copy.footer.about}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{copy.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="font-semibold mb-4">{copy.footer.legal}</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>

            <h3 className="font-semibold mb-4">{copy.footer.followUs}</h3>
            <div className="flex gap-3">
              <a
                href={brandConfig.contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href={brandConfig.contact.social.whatsappChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiWhatsapp className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="border-t mt-8 pt-8">
          <h3 className="font-semibold mb-4">{copy.footer.contactTitle}</h3>
          <CompanyDetails />
        </div>

        {/* Trust & GST Line */}
        <div className="border-t mt-8 pt-6">
          <p className="text-sm text-muted-foreground text-center mb-2">{copy.trust.gstLine}</p>
        </div>

        <div className="border-t mt-6 pt-6 text-center text-sm text-muted-foreground">
          <p className="mb-2">{copy.footer.copyright}</p>
          <p className="flex items-center justify-center gap-1">
            {copy.footer.builtWith} <Heart className="h-3 w-3 fill-primary text-primary" /> <span>using</span>{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {copy.footer.caffeine}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
