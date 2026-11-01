import { CaricatureDefs } from "@/components/wedding/caricatures";
import { Album, Effects } from "@/components/wedding/client-islands";
import { Countdown } from "@/components/wedding/countdown";
import { Couple } from "@/components/wedding/couple";
import { Envelope } from "@/components/wedding/envelope";
import { Events } from "@/components/wedding/events";
import { Footer } from "@/components/wedding/footer";
import { Hero } from "@/components/wedding/hero";
import { RevealObserver } from "@/components/wedding/reveal-observer";
import { Venue } from "@/components/wedding/venue";

/**
 * Static shell: envelope, hero and all text sections are pre-rendered HTML
 * (instant first paint). Only small islands hydrate; decorative effects and
 * the album are dynamically imported with ssr:false.
 */
export default function Page() {
  return (
    <>
      <CaricatureDefs />
      <Envelope />
      <main>
        <Hero />
        <Couple />
        <Countdown />
        <Venue />
        <Events />
        <Album />
      </main>
      <Footer />
      <RevealObserver />
      <Effects />
    </>
  );
}
