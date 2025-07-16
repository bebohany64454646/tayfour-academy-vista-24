
import React from 'react';

const EnhancedAnimatedBackground = () => {
  return (
    <>
      {/* Enhanced Floating Neon Dots */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="neon-dot neon-dot-1"></div>
        <div className="neon-dot neon-dot-2"></div>
        <div className="neon-dot neon-dot-3"></div>
        <div className="neon-dot neon-dot-4"></div>
        <div className="neon-dot neon-dot-5"></div>
        <div className="neon-dot neon-dot-6"></div>
        <div className="neon-dot neon-dot-7"></div>
        <div className="neon-dot neon-dot-8"></div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="floating-particles">
          <div className="particle enhanced-particle"></div>
          <div className="particle enhanced-particle"></div>
          <div className="particle enhanced-particle"></div>
          <div className="particle enhanced-particle"></div>
          <div className="particle enhanced-particle"></div>
        </div>
      </div>

      {/* Enhanced Gradient Background */}
      <div className="fixed inset-0 enhanced-gradient-bg opacity-10 z-0"></div>
    </>
  );
};

export default EnhancedAnimatedBackground;
