import Image from "next/image";

interface ArticleFigureProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
}

/** An article image with the shared rounded/shadow treatment and optional caption. */
export default function ArticleFigure({
  src,
  alt,
  width,
  height,
  caption,
  priority,
}: ArticleFigureProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes="(max-width: 768px) 100vw, 720px"
      className="w-full rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
    />
  );

  if (!caption) {
    return <div className="mb-12">{image}</div>;
  }

  return (
    <figure className="my-8">
      {image}
      <figcaption className="mt-3 text-center text-[0.85rem] text-[#718096]">
        {caption}
      </figcaption>
    </figure>
  );
}
