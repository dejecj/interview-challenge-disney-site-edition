import Image from "next/image";
import { SyntheticEvent, useEffect, useState } from "react";

interface ImageWithFallbackProps {
    fallback: string
    alt: string
    src: string,
    width: number,
    height: number,
    className?: string
  }

export function ImageWithFallback({
    fallback,
    alt,
    src,
    width,
    height,
    className
  }:ImageWithFallbackProps) {
    const [error, setError] = useState<SyntheticEvent<HTMLImageElement, Event>|null>(null);
  
    useEffect(() => {
      setError(null)
    }, [src])
  
    return (
      <Image
        alt={alt}
        onError={e=>setError(e)}
        src={error ? fallback : (src || fallback)}
        width={width}
        height={height}
        className={className}
      />
    )
  }