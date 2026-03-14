import { Eye, LifeBuoy, Pen, Star, Zap } from "lucide-react";

export const navItems = [
  {
    name: "Sketch",
    icon: <Zap size={18} />,
    href: "/dashboard/",
    badge: "Hot",
  },
  { name: "Previewer", icon: <Eye size={18} />, href: "/dashboard/preview" },
  { name: "Rater", icon: <Star size={18} />, href: "#" },
  { name: "Support", icon: <LifeBuoy size={18} />, href: "#" },
];
export const dashboardNavItem = [
  { name: "Sketch", icon: <Pen size={18} />, href: "/dashboard/sketch", badge: "Hot" },
  { name: "Previewer", icon: <Eye size={18} />, href: "/dashboard/preview" },
  { name: "Rater", icon: <Star size={18} />, href: "#" },
  { name: "Support", icon: <LifeBuoy size={18} />, href: "#" },
];
