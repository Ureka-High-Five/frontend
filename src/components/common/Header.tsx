import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <h2 className="text-heading-h2 font-bold">리드:미</h2>
        <div className="flex items-center gap-1">
          <Button variant="ghost">
            <Search />
          </Button>
          <Avatar className="w-6 h-6">
            <AvatarImage src="/images/user.svg" alt="사용자 이미지" />
            <AvatarFallback className="body-sm-pretendard text-white">
              나
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;

