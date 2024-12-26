import Link from 'next/link';
import { Category } from '@/types/movie';

export default function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories?.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.name}`}
          className="bg-card hover:bg-card/90 transition-colors rounded-lg p-6 text-center"
        >
          <h3 className="text-xl font-semibold">{category.name}</h3>
        </Link>
      ))}
    </div>
  );
}