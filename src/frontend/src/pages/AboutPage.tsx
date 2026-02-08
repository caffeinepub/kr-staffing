import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShieldCheck, User, FileText, Download, ExternalLink } from 'lucide-react';
import { copy } from '../content/copy';
import { brandConfig } from '../config/brand';

export default function AboutPage() {
  const handleViewSample = (path: string) => {
    window.open(path, '_blank');
  };

  const handleDownloadSample = (path: string, filename: string) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

        {/* Trust & Compliance Section */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Trust & Compliance</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{copy.trust.complianceNote}</p>
                <Badge variant="outline" className="text-xs font-mono">
                  {copy.trust.gstLine}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HR Contact Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              {copy.hrContact.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{copy.hrContact.description}</p>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-semibold text-lg">{brandConfig.team.hr.name}</p>
              <p className="text-sm text-muted-foreground">{brandConfig.team.hr.position}</p>
            </div>
          </CardContent>
        </Card>

        {/* Credibility Section - Roles & Platforms */}
        <Card>
          <CardHeader>
            <CardTitle>{copy.credibility.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{copy.credibility.description}</p>

            <div>
              <h3 className="text-sm font-semibold mb-3">Job Roles</h3>
              <div className="flex flex-wrap gap-2">
                {brandConfig.credibility.roles.map((role) => (
                  <Badge key={role.value} variant="secondary">
                    {role.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">{copy.credibility.platformsTitle}</h3>
              <div className="flex flex-wrap gap-2">
                {brandConfig.credibility.platforms.map((platform) => (
                  <Badge key={platform.name} variant="outline">
                    {platform.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents & Samples Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {copy.documents.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{copy.documents.description}</p>
              <p className="text-xs text-muted-foreground italic">{copy.documents.disclaimer}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {brandConfig.documents.samples.map((sample) => (
                <div key={sample.id} className="border rounded-lg p-4 space-y-3">
                  <div>
                    <p className="font-semibold text-sm">{sample.label}</p>
                    <p className="text-xs text-muted-foreground">{sample.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewSample(sample.path)}
                      className="flex-1"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      {copy.documents.viewButton}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDownloadSample(sample.path, `${sample.id}.png`)}
                      className="flex-1"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      {copy.documents.downloadButton}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
