import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className=" w-full bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(85,208,130,0.4)_50%,rgba(255,255,255,1)_100%))] mx-auto px-3 " >
        <Navbar />
        <Hero />
        <Footer />
      </div>
    </>
  );
}
