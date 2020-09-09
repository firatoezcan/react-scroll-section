import React, { FunctionComponent, useState, useRef, useEffect, useMemo } from "react";
import cn from "classnames";
import { closeEnough } from "src/utils";

const ScrollSectionContext = React.createContext({ activeSection: 0 });

interface ScrollSectionContainer {
  (props: { startIndex?: number; children: React.ReactNodeArray | React.ReactNode }): any;
}

const ScrollSectionContainer: ScrollSectionContainer = (props) => {
  const { children, startIndex = 0 } = props;
  const sectionCount = React.Children.count(children) - 1;
  if (startIndex > sectionCount) {
    throw new Error("The start index cannot be higher than the amount of child sections");
  }
  const [activeSection, setActiveSection] = useState(startIndex);
  const moveSectionBy = (amount: number) => {
    setActiveSection((s) => {
      const nextSection = Math.min(Math.max(0, s + amount), sectionCount);
      if (nextSection !== s) disableInteraction();
      return nextSection;
    });
  };

  const setSectionTo = (index: number) => {
    setActiveSection((s) => {
      const nextSection = Math.min(Math.max(0, index), sectionCount);
      if (nextSection !== s) disableInteraction();
      return nextSection;
    });
  };

  const [interactionDisabled, setInteractionDisabled] = useState(false);
  const disableInteraction = () => setInteractionDisabled(true);
  const enableInteraction = () => setInteractionDisabled(false);

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (interactionDisabled) return;
    var value = -event.deltaY || -event.detail;
    var delta = Math.max(-1, Math.min(1, value));
    if (delta < 0) moveSectionBy(1);
    else moveSectionBy(-1);
  };

  useEffect(() => {
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      document.removeEventListener("wheel", handleWheel, false);
    };
  });

  const startTouch = useRef({ startY: 0, previousY: 0 });

  const handleTouchStart = (event: TouchEvent) => {
    event.preventDefault();
    startTouch.current.startY = event.touches[0].pageY;
  };
  const handlePointerStart = (event: PointerEvent) => {
    event.preventDefault();
    startTouch.current.startY = event.pageY;
  };

  const handleTouchAndPointerMove = (event: TouchEvent | PointerEvent, currentY: number) => {
    event.preventDefault();
    const { startY, previousY } = startTouch.current;
    if (interactionDisabled || closeEnough(previousY, currentY)) return;
    startTouch.current.previousY = currentY;
    if (Math.abs(startY - currentY) < window.innerHeight / 20) return;
    if (startY > currentY) moveSectionBy(1);
    else moveSectionBy(-1);
  };
  const handleTouchMove = (e: TouchEvent) => handleTouchAndPointerMove(e, e.touches[0].pageY);
  const handlePointerMove = (e: PointerEvent) => e.pointerType != "mouse" && handleTouchAndPointerMove(e, e.pageY);

  useEffect(() => {
    const hasTouch = window.ontouchstart || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints;
    if (!hasTouch) return;
    document.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("pointerdown", handlePointerStart, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("pointermove", handlePointerMove, { passive: false });
    return () => {
      document.removeEventListener("touchstart", handleTouchStart, false);
      document.removeEventListener("pointerdown", handlePointerStart, false);
      document.removeEventListener("touchmove", handleTouchMove, false);
      document.removeEventListener("pointermove", handlePointerMove, false);
    };
  });

  return (
    <ScrollSectionContext.Provider value={{ activeSection }}>
      <div className="h-full" onTransitionEnd={enableInteraction}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) throw new Error("Not a valid child element");
          return (
            <Section index={index} onScrollEnd={enableInteraction}>
              {React.cloneElement(child, { className: cn(child.props.className, "h-full") })}
            </Section>
          );
        })}
      </div>
    </ScrollSectionContext.Provider>
  );
};

function useScrollSectionContext() {
  const context = React.useContext(ScrollSectionContext);
  if (!context) {
    throw new Error(`ScrollSection compound components cannot be rendered outside the ScrollSectionContainer component`);
  }
  return context;
}
type Section = {
  index: number;
  onScrollEnd: () => void;
};

const Section: FunctionComponent<Section> = (props) => {
  const { index, onScrollEnd } = props;
  const { activeSection } = useScrollSectionContext();
  const isActive = useMemo(() => activeSection === index, [activeSection]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;
    const element = sectionRef.current;
    if (!element) return;
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
    let timeout: NodeJS.Timeout;
    const checkInterval = setInterval(() => {
      if (closeEnough(window.pageYOffset, element.offsetTop, 5)) {
        clearTimeout(timeout);
        clearInterval(checkInterval);
        timeout = setTimeout(() => {
          onScrollEnd();
        }, 150);
      }
    }, 50);
  }, [activeSection]);

  return (
    <div ref={sectionRef} className={cn("h-full transition-transform duration-300 opacity-50", { "opacity-100": isActive })}>
      {props.children}
    </div>
  );
};
const Index = () => {
  return (
    <ScrollSectionContainer>
      <div className="bg-red-400">Some section</div>
      <div className="bg-blue-400">Some section</div>
      <div className="bg-green-400">Some section</div>
      <div className="bg-yellow-400">Some section</div>
    </ScrollSectionContainer>
  );
};

export default Index;
