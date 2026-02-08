import { SiWhatsapp } from 'react-icons/si';
import { brandConfig } from '../../config/brand';

export default function FloatingWhatsAppFab() {
  const handleClick = () => {
    const { phoneNumber, defaultMessage } = brandConfig.contact.whatsapp;
    const text = encodeURIComponent(defaultMessage);
    const url = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg transition-all hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <SiWhatsapp className="h-6 w-6" />
    </button>
  );
}
