import { Mail, MapPin } from 'lucide-react';
import { brandConfig } from '../../config/brand';

export default function CompanyDetails() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium mb-1">Email</p>
          <a
            href={`mailto:${brandConfig.contact.officialEmail}`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {brandConfig.contact.officialEmail}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium mb-1">Address</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{brandConfig.company.address}</p>
        </div>
      </div>
    </div>
  );
}
