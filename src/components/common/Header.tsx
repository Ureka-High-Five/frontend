import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { PATH } from "@/constants/path";
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
      <div className="max-w-screen-md mx-auto flex h-14 md:h-16 items-center justify-between px-4 md:px-10 md:pt-3">
        <button type="button" onClick={() => navigate(PATH.HOME)}>
          <img src={logoImg} alt="홈 로고" className="h-8 md:h-12" />
        </button>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            onClick={() => navigate(PATH.SEARCH)}
            className="hover:text-white hover:bg-transparent">
            <Search className="md:!h-7 md:!w-7" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
