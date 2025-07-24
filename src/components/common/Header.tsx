import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

interface HeaderProps {
  scrolled: boolean;
}

const Header = ({ scrolled }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        "absolute top-0 w-full z-10 transition-colors backdrop-blur-sm",
        scrolled ? "bg-custom-black/50 backdrop-blur-sm" : "bg-custom-black"
      )}>
      <div className="max-w-screen-md mx-auto flex h-14 items-center justify-between px-4 md:px-10">
        <img src={logoImg} alt="logo" className="h-8" />
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            onClick={() => navigate("/search")}
            className="hover:text-white hover:bg-transparent">
            <Search />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
