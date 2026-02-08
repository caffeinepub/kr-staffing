import { useState, useEffect } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
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
    const searchParams: { keyword?: string; city?: string } = {};
    if (keyword.trim()) searchParams.keyword = keyword.trim();
    if (city.trim()) searchParams.city = city.trim();
    navigate({ to: '/jobs', search: searchParams });
  };

  const handlePopularSearch = (searchTerm: string) => {
    navigate({ to: '/jobs', search: { keyword: searchTerm } });
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate({ to: '/jobs', search: { category: categoryId } });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {copy.hero.heading}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">{copy.hero.subheading}</p>

              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder={copy.hero.searchPlaceholder.keyword}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="flex-1 h-12"
                  />
                  <Input
                    placeholder={copy.hero.searchPlaceholder.city}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="flex-1 h-12"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto px-8">
                  <Search className="h-5 w-5 mr-2" />
                  {copy.hero.searchButton}
                </Button>
              </form>
            </div>

            <div className="hidden lg:block">
              <img
                src="/assets/generated/hero-illustration.dim_1200x600.png"
                alt="Job search illustration"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Job Searches */}
      <section className="py-16 bg-muted/20">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{copy.popularSearches.title}</h2>
          <div className="flex flex-wrap gap-3">
            {copy.popularSearches.items.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-sm py-2 px-5"
                onClick={() => handlePopularSearch(item)}
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Job Categories */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Popular Job Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-base mb-2">{category.label}</h3>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-muted/20">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured Jobs</h2>
          <FeaturedJobsSection />
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">{copy.whyChoose.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {copy.whyChoose.items.map((item, index) => {
              const icons = [CheckCircle2, Clock, MapPin, Users, Headphones];
              const Icon = icons[index];
              return (
                <Card key={item.title} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center space-y-4">
                    <Icon className="h-12 w-12 text-primary mx-auto" />
                    <h3 className="font-semibold text-base">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/20">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">{copy.testimonials.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.testimonials.items.map((testimonial) => (
              <Card key={testimonial.name} className="hover:shadow-md transition-shadow">
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
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{copy.contact.title}</h2>
              <p className="text-muted-foreground mb-6 text-lg">{copy.contact.description}</p>
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
