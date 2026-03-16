import Image from "next/image";

interface ContactCardProps {
  title: string;
  description: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}

const ContactCard = ({ title, description, value, href, icon }: ContactCardProps) => (
  <div className="relative flex flex-col items-center gap-8 rounded-3xl border-[0.6px] border-border-tertiary bg-surface-secondary px-6 pb-8 pt-11 transition-all hover:border-text-brand-primary/50">
    <div className="absolute top-[-24px] flex size-12 items-center justify-center rounded-xl border-[0.5px] border-border-tertiary bg-surface-tertiary p-3 shadow-inner">
      {icon}
    </div>
    <div className="flex flex-col items-center gap-1 text-center">
      <p className="text-base font-medium text-text-primary">{title}</p>
      <p className="text-sm text-text-tertiary">{description}</p>
    </div>
    <a href={href} className="text-sm font-semibold text-text-brand-primary transition-opacity hover:opacity-80">
      {value}
    </a>
  </div>
);

const Header = () => (
  <div className="mb-4">
    <div className="flex items-center gap-1">
      <span className="text-3xl font-semibold tracking-tight text-white">LoopX</span>
    </div>
    <p className="mt-1 text-xs font-medium text-text-tertiary">
      by <span className="text-red-500">redstring</span>
    </p>
  </div>
);

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-surface-primary text-text-primary">
      {/* Background Mask Effect */}
      <div 
        className="absolute inset-0 z-0 opacity-70 blur-[46px]"
        style={{ 
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(135,91,247,1) 0%, rgba(101,68,185,0.75) 25%, rgba(68,46,124,0.5) 50%, rgba(34,23,62,0.25) 75%, rgba(0,0,0,0) 100%)",
          transform: "scale(1.5)"
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center gap-16 px-8 pt-16 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:pt-24 xl:px-12">
        {/* Left Side: Content */}
        <div className="flex flex-1 flex-col items-start gap-12 lg:max-w-[560px]">
          <Header />

          {/* Heading and Supporting Text */}
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl font-semibold leading-[1.1] tracking-[-0.02em] text-white md:text-6xl lg:text-7xl">
              We&apos;re rebuilding something better!
            </h1>
            <p className="max-w-[480px] text-lg leading-relaxed text-text-secondary md:text-xl">
              We&apos;re crafting a better experience to help startups{" "}
              <span className="text-text-brand-primary">hire faster</span> and talent{" "}
              <span className="text-text-brand-primary">discover the right opportunities</span>.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
            <ContactCard
              title="Email"
              description="Our friendly team is here to help."
              value="founders@redstring.co.in"
              href="mailto:founders@redstring.co.in"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
            <ContactCard
              title="Phone"
              description="Anytime from 8am to 7pm."
              value="+91 95025 75169"
              href="tel:+919502575169"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92C11.84 20.92 4.08 13.16 4.08 4C4.08 3.45 4.53 3 5.08 3H8.08C8.63 3 9.08 3.45 9.17 3.99L9.8 7.54C9.88 8.01 9.74 8.5 9.4 8.84L7.15 11.09C8.36 13.31 10.19 15.14 12.41 16.35L14.66 14.1C15 13.76 15.49 13.62 15.96 13.7L19.51 14.33C20.05 14.42 20.5 14.87 20.5 15.42V16.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
          </div>
        </div>

        {/* Right Side: Mockup Illustration */}
        <div className="relative mt-8 flex flex-1 items-center justify-center lg:mt-0">
          <div className="relative w-full max-w-[600px] overflow-hidden rounded-[32px] border-[0.8px] border-border-secondary bg-surface-primary p-2 shadow-2xl">
            <div className="relative overflow-hidden rounded-2xl border-[1.5px] border-border-secondary bg-surface-primary">
              <Image
                src="http://localhost:3845/assets/0e0ca5efa83bc83d7c0d66897345b067f0f2be87.svg"
                alt="App Mockup"
                width={1000}
                height={600}
                className="w-full object-contain opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
