import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { categories } from '../lib/categories';
import { ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate({ to: '/jobs', search: { category: categoryId } as any });
  };

  return (
    <div className="container-custom py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Categories</h1>
          <p className="text-muted-foreground">Explore jobs by category</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:border-primary group"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {category.label}
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
