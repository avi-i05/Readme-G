import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import * as math from "mathjs";

const DEFAULT_CONFIG = {
  position: "bottom",
  strength: 2,
  height: "6rem",
  divCount: 5,
  exponential: true,
  zIndex: 40,
  animated: false,
  duration: "0.3s",
  easing: "ease-out",
  opacity: 1,
  curve: "bezier",
  responsive: false,
  target: "page",
  className: "",
  style: {},
};

const PRESETS = {
  top: { position: "top", height: "6rem" },
  bottom: { position: "bottom", height: "6rem" },
  left: { position: "left", height: "6rem" },
  right: { position: "right", height: "6rem" },
  subtle: { height: "4rem", strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: "10rem", strength: 4, divCount: 8, exponential: true },
  smooth: { height: "8rem", curve: "bezier", divCount: 10 },
  sharp: { height: "5rem", curve: "linear", divCount: 4 },
  header: { position: "top", height: "8rem", curve: "ease-out" },
  footer: { position: "bottom", height: "8rem", curve: "ease-out" },
  sidebar: { position: "left", height: "6rem", strength: 2.5 },
  "page-header": {
    position: "top",
    height: "10rem",
    target: "page",
    strength: 3,
  },
  "page-footer": {
    position: "bottom",
    height: "10rem",
    target: "page",
    strength: 3,
  },
};

const CURVE_FUNCTIONS = {
  linear: (progress) => progress,
  bezier: (progress) => progress * progress * (3 - 2 * progress),
  "ease-in": (progress) => progress * progress,
  "ease-out": (progress) => 1 - Math.pow(1 - progress, 2),
  "ease-in-out": (progress) =>
    progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2,
};

const mergeConfigs = (...configs) => {
  return configs.reduce((acc, config) => ({ ...acc, ...config }), {});
};

const getGradientDirection = (position) => {
  const directions = {
    top: "to top",
    bottom: "to bottom",
    left: "to left",
    right: "to right",
  };
  return directions[position] || "to bottom";
};

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const useResponsiveDimension = (responsive, config, dimension, defaultValue) => {
  const [value, setValue] = useState(config[dimension]);

  const updateDimension = useCallback(
    debounce(() => {
      if (!responsive) return;

      const screenWidth = window.innerWidth;
      let newValue = config[dimension];

      if (screenWidth <= 480 && config[`mobile${dimension}`]) {
        newValue = config[`mobile${dimension}`];
      } else if (screenWidth <= 768 && config[`tablet${dimension}`]) {
        newValue = config[`tablet${dimension}`];
      } else if (screenWidth <= 1024 && config[`desktop${dimension}`]) {
        newValue = config[`desktop${dimension}`];
      }

      setValue(newValue);
    }, 100),
    [responsive, config, dimension]
  );

  useEffect(() => {
    if (!responsive) return;

    updateDimension();
    window.addEventListener("resize", updateDimension);
    return () => window.removeEventListener("resize", updateDimension);
  }, [responsive, updateDimension]);

  return responsive ? value : config[dimension] || defaultValue;
};

const useIntersectionObserver = (ref, shouldObserve = false) => {
  const [isVisible, setIsVisible] = useState(!shouldObserve);

  useEffect(() => {
    if (!shouldObserve || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, shouldObserve]);

  return isVisible;
};

const GradualBlur = (props) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const config = useMemo(() => {
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props);
  }, [props]);

  const responsiveHeight = useResponsiveDimension(config.responsive, config, 'height', '6rem');
  const responsiveWidth = useResponsiveDimension(config.responsive, config, 'width', '100%');
  const isVisible = useIntersectionObserver(containerRef, config.animated === "scroll");

  const blurDivs = useMemo(() => {
    const divs = [];
    const increment = 100 / config.divCount;
    const currentStrength =
      isHovered && config.hoverIntensity
        ? config.strength * config.hoverIntensity
        : config.strength;

    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curveFunc(progress);

      let blurValue;
      if (config.exponential) {
        blurValue = math.pow(2, progress * 4) * 0.0625 * currentStrength;
      } else {
        blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;
      }

      const p1 = math.round((increment * i - increment) * 10) / 10;
      const p2 = math.round(increment * i * 10) / 10;
      const p3 = math.round((increment * i + increment) * 10) / 10;
      const p4 = math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      const direction = getGradientDirection(config.position);

      const divStyle = {
        position: "absolute",
        inset: "0",
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: config.opacity,
        transition:
          config.animated && config.animated !== "scroll"
            ? `backdrop-filter ${config.duration} ${config.easing}`
            : undefined,
      };

      divs.push(<div key={i} style={divStyle} />);
    }

    return divs;
  }, [config, isHovered]);

  const handleMouseEnter = useCallback(() => {
    if (config.hoverIntensity) {
      setIsHovered(true);
    }
  }, [config.hoverIntensity]);

  const handleMouseLeave = useCallback(() => {
    if (config.hoverIntensity) {
      setIsHovered(false);
    }
  }, [config.hoverIntensity]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${config.target === "page" ? "fixed" : "absolute"} ${config.className}`}
      style={{
        pointerEvents: config.hoverIntensity ? "auto" : "none",
        opacity: isVisible ? 1 : 0,
        transition: config.animated
          ? `opacity ${config.duration} ${config.easing}`
          : undefined,
        zIndex: config.target === "page" ? config.zIndex + 100 : config.zIndex,
        ...(config.position === "top" && {
          top: 0,
          left: 0,
          right: 0,
          height: responsiveHeight,
          width: responsiveWidth,
        }),
        ...(config.position === "bottom" && {
          bottom: 0,
          left: 0,
          right: 0,
          height: responsiveHeight,
          width: responsiveWidth,
        }),
        ...(config.position === "left" && {
          left: 0,
          top: 0,
          bottom: 0,
          width: responsiveWidth || responsiveHeight,
          height: "100%",
        }),
        ...(config.position === "right" && {
          right: 0,
          top: 0,
          bottom: 0,
          width: responsiveWidth || responsiveHeight,
          height: "100%",
        }),
        ...config.style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full pointer-events-none">
        {blurDivs}
      </div>
      {props.children}
    </div>
  );
};

export const createPageBlur = (props = {}) => {
  return <GradualBlur {...props} target="page" />;
};

export const createParentBlur = (props = {}) => {
  return <GradualBlur {...props} target="parent" />;
};

export { PRESETS, CURVE_FUNCTIONS };

export default React.memo(GradualBlur);
