import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle2, Clock, MapPin, Users, Headphones } from 'lucide-react';
import FeaturedJobsSection from '../components/jobs/FeaturedJobsSection';
import WhatsAppButton from '../components/contact/WhatsAppButton';
import ContactForm from '../components/contact/ContactForm';
import { copy } from '../content/copy';
import { categories } from '../lib/categories';

export default function HomePage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (city) params.set('city', city);
    navigate({ to: '/jobs', search: params.toString() as any });
  };

  const handlePopularSearch = (searchTerm: string) => {
    navigate({ to: '/jobs', search: { keyword: searchTerm } as any });
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate({ to: '/jobs', search: { category: categoryId } as any });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {copy.hero.heading}
              </h1>
              <p className="text-lg text-muted-foreground">{copy.hero.subheading}</p>

              <form onSubmit={handleSearch} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder={copy.hero.searchPlaceholder.keyword}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder={copy.hero.searchPlaceholder.city}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  <Search className="h-4 w-4 mr-2" />
                  {copy.hero.searchButton}
                </Button>
              </form>
            </div>

            <div className="hidden lg:block">
              <img
                src="/assets/generated/hero-illustration.dim_1200x600.png"
                alt="Job search illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Job Searches */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-6">{copy.popularSearches.title}</h2>
          <div className="flex flex-wrap gap-3">
            {copy.popularSearches.items.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-sm py-2 px-4"
                onClick={() => handlePopularSearch(item)}
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Job Categories */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-6">Popular Job Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-1">{category.label}</h3>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-6">Featured Jobs</h2>
          <FeaturedJobsSection />
        </div>
      </section>

      {/* Why Choose KR Staffing */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8 text-center">{copy.whyChoose.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {copy.whyChoose.items.map((item, index) => {
              const icons = [CheckCircle2, Clock, MapPin, Users, Headphones];
              const Icon = icons[index];
              return (
                <Card key={item.title}>
                  <CardContent className="p-6 text-center space-y-3">
                    <Icon className="h-10 w-10 text-primary mx-auto" />
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8 text-center">{copy.testimonials.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.testimonials.items.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">{copy.contact.title}</h2>
              <p className="text-muted-foreground mb-6">{copy.contact.description}</p>
              <WhatsAppButton className="mb-6" />
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
