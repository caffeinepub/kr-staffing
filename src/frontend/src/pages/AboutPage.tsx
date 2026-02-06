import { Card, CardContent } from '@/components/ui/card';
import { copy } from '../content/copy';

export default function AboutPage() {
  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{copy.about.title}</h1>
        </div>

        <Card>
          <CardContent className="p-6 prose prose-sm max-w-none">
            {copy.about.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0 text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
