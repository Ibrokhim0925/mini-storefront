import Catalog from './components/Catalog'; // Import the client component

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Mini-Storefront
      </h1>
      <Catalog /> {/* Render the catalog */}
    </main>
  );
}