import Categories from "@/components/Categories";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Footer from "@/components/layouts/Footer";
import Products from "@/components/Products";

export default function Lobby() {
  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto over">
        <Categories />
        <Products />
        <Gallery />
      </div>
    </div>
  );
}
