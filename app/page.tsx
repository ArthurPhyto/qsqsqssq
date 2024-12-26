import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import MovieGrid from '@/components/MovieGrid';
import CategoryList from '@/components/CategoryList';

export const metadata: Metadata = {
  title: 'StreamFlix - Votre plateforme de streaming',
  description: 'Découvrez les derniers films en streaming sur StreamFlix',
};

async function getLatestMovies() {
  const { data: movies } = await supabase
    .from('movies')
    .select('*')
    .order('release_date', { ascending: false })
    .limit(12);
  return movies;
}

async function getCategories() {
  const { data: categories } = await supabase
    .from('categorie')
    .select('*');
  return categories;
}

export default async function Home() {
  const [movies, categories] = await Promise.all([
    getLatestMovies(),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Les dernières sorties</h1>
        <MovieGrid movies={movies} />
        
        <h2 className="text-3xl font-bold mt-16 mb-8">Catégories</h2>
        <CategoryList categories={categories} />
      </div>
    </main>
  );
}