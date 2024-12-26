import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types/movie';

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies?.map((movie) => (
        <Link
          key={movie.id}
          href={`/movie/${movie.id}`}
          className="group relative overflow-hidden rounded-lg transition-transform hover:scale-105"
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 p-4">
              <h3 className="text-white font-semibold">{movie.title}</h3>
              <p className="text-gray-200 text-sm">{new Date(movie.release_date).getFullYear()}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}