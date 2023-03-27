import { useEffect, useState } from 'react';

function ImageLoader({ src }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setLoaded(true);
    image.src = src;
  }, [src]);

  return (
    <div>
      {!loaded && <p>Loading image...</p>}
      {/* <img src={src} style={{ display: loaded ? 'block' : 'none' }} /> */}
    </div>
  );
}

export default ImageLoader;