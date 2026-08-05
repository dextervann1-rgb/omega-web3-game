import React from 'react';

const VFVSealBackground = ({ children, opacity = 0.08 }) => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div
        style={{
          content: "''",
          position: 'absolute',
          inset: 0,
          background: "url('/assets/vfv_abba_seal_final.png') center/50% no-repeat",
          opacity: opacity,
          pointer-events: 'none',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default VFVSealBackground;
