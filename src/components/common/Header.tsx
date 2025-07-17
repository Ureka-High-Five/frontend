import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import logoImg from "@/assets/logo.png";

interface HeaderProps {
  scrolled: boolean;
}

const Header = ({ scrolled }: HeaderProps) => {
  return (
    <header
      className={cn(
        "absolute top-0 w-full z-10 transition-colors backdrop-blur-sm",
        scrolled ? "bg-custom-black/50 backdrop-blur-sm" : "bg-custom-black"
      )}>
      <div className="max-w-screen-md mx-auto flex h-14 items-center justify-between px-4 md:px-10">
        <img src={logoImg} alt="logo" className="h-8" />
        <div className="flex items-center gap-1">
          <Button variant="ghost">
            <Search />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

