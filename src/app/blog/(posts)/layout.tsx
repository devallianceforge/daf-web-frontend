export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-[160px]">
      <div className="mx-auto max-w-[760px] px-6 pb-[120px]">{children}</div>
    </div>
  );
}
