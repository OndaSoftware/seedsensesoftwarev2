import type { ReactNode } from "react";

export function FeatureGrid({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
  );
}

export function Feature({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[10px] border border-sage/40 bg-white px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <h4 className="mb-1.5 flex items-center text-[0.95rem] font-bold text-primary">
        {title}
      </h4>
      <p className="text-[0.9rem] leading-relaxed text-[#4a5568]">{children}</p>
    </div>
  );
}
