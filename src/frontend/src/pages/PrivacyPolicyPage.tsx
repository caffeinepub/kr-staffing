import { Card, CardContent } from '@/components/ui/card';
import { copy } from '../content/copy';

export default function PrivacyPolicyPage() {
  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{copy.privacy.title}</h1>
        </div>

        <Card>
          <CardContent className="p-6 prose prose-sm max-w-none">
            {copy.privacy.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={index} className="font-semibold text-lg mt-6 mb-3">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              return (
                <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
