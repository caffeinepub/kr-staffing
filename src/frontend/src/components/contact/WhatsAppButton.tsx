import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { brandConfig } from '../../config/brand';

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
}

export default function WhatsAppButton({ message, className }: WhatsAppButtonProps) {
  const handleClick = () => {
    const { phoneNumber, defaultMessage } = brandConfig.contact.whatsapp;
    const text = encodeURIComponent(message || defaultMessage);
    const url = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button onClick={handleClick} className={className} size="lg">
      <SiWhatsapp className="h-5 w-5 mr-2" />
      WhatsApp Support
    </Button>
  );
}
