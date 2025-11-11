export const IconInputTypeColor: React.FC = () => {
  const css = `
    .icon-input-type-color {
      --_color-1: color(from var(--_icon-color) srgb calc(r + 0.4) calc(g + 0.4) calc(b + 0.4));
      --_color-2: color(from var(--_icon-color) srgb calc(r + 0.2) calc(g + 0.2) calc(b + 0.2));
      --_color-3: color(from var(--_icon-color) srgb calc(r + 0.0) calc(g + 0.0) calc(b + 0.0));
    }

    .icon-input-type-color {
      inline-size: 100%;
      block-size: 100%;
      background: conic-gradient(
        from 20deg,
        var(--_color-1) 0%, var(--_color-1) 33.33%,
        var(--_color-2) 0%, var(--_color-2) 66.66%,
        var(--_color-3) 0%, var(--_color-3) 100%
      );
    }
  `;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <style>{css}</style>
      <rect x="48" y="48" rx="80" ry="80" width="544" height="544" fill="none" stroke="var(--_icon-color)" strokeWidth="32" />
      <clipPath id="clip">
        <rect x="96" y="96" rx="40" ry="40" width="448" height="448" fill="var(--_icon-color)" />
      </clipPath>
      <foreignObject x="96" y="96" width="448" height="448" clipPath="url(#clip)">
        <div className='icon-input-type-color' />
      </foreignObject>
    </svg>
  );
};
