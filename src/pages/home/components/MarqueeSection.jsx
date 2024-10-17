import Marquee from "react-fast-marquee";
import "./MarqueeSection.css"; // Assuming you have an external CSS file
import Container from "@/components/Container";

function MarqueeSection() {
  const logosGoingToLeft = [
    "/images/coca_cola.png",
    "/images/open_ai.png",
    "/images/pallet.png",
    "/images/causal.png",
    "/images/plain.png",
    "/images/passion_front.png",
  ];
  const logosGoingToRight = [
    "/images/dopt.png",
    "/images/hyperlane.png",
    "/images/on_deck.png",
    "/images/bravado.png",
    "/images/beacons.png",
  ];

  return (
   <Container>
     <section className="my-8 sm:my-16">
      <div className="my-20">
        <h2 className="text-center text-2xl md:text-4xl font-bold leading-8 text-slate-800 pb-5">
          Trusted by
          <span className="text-blue-800"> the world’s </span>
          most innovative teams
        </h2>
        <p className="text-center text-sm text-slate-800">
          Over 10,000 customers in 100+ countries use our software to build
          products their users love.
        </p>
      </div>

      {/* TOP SIDE */}
      <Marquee
        direction="left"
        gradient
        autoFill
        speed={20}
        pauseOnHover
        pauseOnClick
      >
        {logosGoingToLeft.map((item, index) => (
          <div key={index} className="logo-container mr-[89px]">
            <img src={item} alt="logo" className="logo-image" />
          </div>
        ))}
      </Marquee>

      {/* BOTTOM SIDE */}
      <Marquee
        direction="right"
        className="mt-8"
        gradient
        autoFill
        speed={20}
        pauseOnHover
        pauseOnClick
      >
        {logosGoingToRight.map((item, index) => (
          <div key={index} className="logo-container mr-[89px]">
            <img src={item} alt="logo" className="logo-image" />
          </div>
        ))}
      </Marquee>
    </section>
   </Container>
  );
}

export default MarqueeSection;
