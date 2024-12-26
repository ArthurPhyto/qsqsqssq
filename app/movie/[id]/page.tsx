import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Movie } from '@/types/movie';

interface Props {
  params: { id: string };
}

async function getMovie(id: string): Promise<Movie | null> {
  const { data: movie } = await supabase
    .from('movies')
    .select('*')
    .eq('id', id)
    .single();
  return movie;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const movie = await getMovie(params.id);
  if (!movie) return { title: 'Film non trouvé' };

  return {
    title: movie.title_seo,
    description: movie.meta_description_seo,
  };
}

export default async function MoviePage({ params }: Props) {
  const movie = await getMovie(params.id);
  if (!movie) return <div>Film non trouvé</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[300px,1fr] gap-8">
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-lg"
          />
        </div>
        
        <div>
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          
          <div className="flex gap-4 mb-6">
            <div className="text-muted-foreground">
              {new Date(movie.release_date).toLocaleDateString()}
            </div>
            <div className="text-muted-foreground">
              {movie.runtime} minutes
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            {movie.genres.map((genre) => (
              <Link
                key={genre}
                href={`/category/${genre}`}
                className="bg-secondary px-3 py-1 rounded-full text-sm hover:bg-secondary/80"
              >
                {genre}
              </Link>
            ))}
          </div>

          <p className="text-lg mb-8">{movie.overview}</p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Casting principal</h2>
            <div className="flex flex-wrap gap-2">
              {movie.cast.map((actor, index) => (
                <span
                  key={index}
                  className="bg-muted px-3 py-1 rounded-full text-sm"
                >
                  {actor.name}
                </span>
              ))}
            </div>
          </div>

          {movie.trailer_url && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Bande annonce</h2>
              <div className="aspect-video">
                <iframe
                  src={movie.trailer_url}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}