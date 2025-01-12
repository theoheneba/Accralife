import { MapPin, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-[url('https://images.unsplash.com/photo-1603488704611-c24b1b27fae4')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-6">Discover Accra</h1>
          <p className="text-xl mb-8 max-w-2xl text-center">
            Explore the best restaurants, clubs, and tourist sites in Ghana's vibrant capital
          </p>
          <div className="w-full max-w-2xl bg-white rounded-lg p-2 flex gap-2">
            <Input
              placeholder="Search locations..."
              className="flex-1"
            />
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Explore by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative h-64 rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Locations */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredLocations.map((location) => (
              <div key={location.name} className="bg-card rounded-lg overflow-hidden shadow-lg">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{location.name}</h3>
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-sm text-muted-foreground">{location.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{location.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      ({location.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const categories = [
  {
    name: 'Restaurants',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
  },
  {
    name: 'Clubs',
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2',
  },
  {
    name: 'Tourist Sites',
    image: 'https://images.unsplash.com/photo-1596627116790-af6f46dddbf1',
  },
];

const featuredLocations = [
  {
    name: 'Buka Restaurant',
    address: 'East Cantonments',
    rating: 4.8,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
  },
  {
    name: 'Bloombar',
    address: 'Airport Residential Area',
    rating: 4.6,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2',
  },
  {
    name: 'Kwame Nkrumah Memorial Park',
    address: 'Central Accra',
    rating: 4.9,
    reviews: 512,
    image: 'https://images.unsplash.com/photo-1596627116790-af6f46dddbf1',
  },
];