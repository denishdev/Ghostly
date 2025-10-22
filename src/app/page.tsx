import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="">
        <div className="w-2xl mx-auto my-2">
          <Navbar />
        </div>
        <Hero />
        <Footer />
      </div>
    </>
  );
}
