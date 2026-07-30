import Nav from "@/components/site/Nav";
import SkipLink from "@/components/site/SkipLink";
import ScrollManager from "@/components/site/ScrollManager";
import FloatingMark from "@/components/site/FloatingMark";
import FiberConnector from "@/components/ui/FiberConnector";
import HeroLifecycle from "@/components/hero/HeroLifecycle";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Capabilities from "@/components/sections/Capabilities";
import Industries from "@/components/sections/Industries";
import Work from "@/components/sections/Work";
import Board from "@/components/sections/Board";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <ScrollManager />
      <SkipLink />
      <span id="top" />
      <Nav />
      <FloatingMark />
      <main>
        <HeroLifecycle />
        <div className="relative flex justify-center border-t border-line/60 pt-14">
          <FiberConnector />
        </div>
        <About />
        <Services />
        <Capabilities />
        <Industries />
        <Work />
        <Board />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
