import React from "react";

interface LandingLayoutProps {
  logo: React.ReactNode;
  subText: React.ReactNode;
  action: React.ReactNode;
}

const LandingLayout = ({ logo, subText, action }: LandingLayoutProps) => {
  return (
    <main className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-[rgba(64,254,164,0.2)] to-transparent overflow-hidden">
      <section className="flex flex-col items-center justify-start pb-20">
        {logo}
        <div className="h-8 flex items-center justify-center">{subText}</div>
      </section>
      <footer className="w-full flex justify-center pb-10 absolute left-0 bottom-0">
        {action}
      </footer>
    </main>
  );
};

export default LandingLayout;
