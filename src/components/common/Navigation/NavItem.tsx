import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}

const NavItem = ({ icon, label, onClick, active }: NavItemProps) => (
  <Button
    className={`flex flex-col flex-1 items-center hover:bg-transparent transition-colors duration-300 ${
      active ? "text-custom-point" : "text-white"
    }`}
    variant="ghost"
    size="lg"
    onClick={onClick}>
    <div className="w-5 h-5">{icon}</div>
    <span className="body-sm-pretendard">{label}</span>
  </Button>
);

export default NavItem;
