import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const NavItem = ({ icon, label, onClick }: NavItemProps) => (
  <Button
    className="flex flex-col flex-1 items-center hover:bg-transparent"
    variant="ghost"
    size="lg"
    onClick={onClick}>
    {icon}
    <span className="text-body-sm-pretendard text-white">{label}</span>
  </Button>
);

export default NavItem;
