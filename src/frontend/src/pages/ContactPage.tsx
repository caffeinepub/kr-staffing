import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WhatsAppButton from '../components/contact/WhatsAppButton';
import ContactForm from '../components/contact/ContactForm';
import CompanyDetails from '../components/common/CompanyDetails';
import { copy } from '../content/copy';

export default function ContactPage() {
  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{copy.contact.title}</h1>
          <p className="text-muted-foreground">{copy.contact.description}</p>
        </div>

        {/* Company Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>{copy.contact.companyDetailsTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <CompanyDetails />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Quick Support</h3>
                <p className="text-sm text-muted-foreground mb-4">Get instant help through WhatsApp</p>
                <WhatsAppButton />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Send us a message</h3>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
