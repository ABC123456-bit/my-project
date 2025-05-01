import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { 
  Menu, 
  BellRing,
  User,
  LogOut,
  Settings,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/" },
    { name: "Study Materials", href: "/materials" },
    { name: "Schedule", href: "/schedule" },
    { name: "Progress", href: "/progress" }
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a className="text-primary font-heading font-bold text-xl">SmartStudy</a>
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8" aria-label="Main Navigation">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={`${
                      location === item.href
                        ? "border-primary text-neutral-900 border-b-2"
                        : "border-transparent text-neutral-600 hover:text-neutral-800 hover:border-neutral-300 border-b-2"
                    } px-1 pt-1 inline-flex items-center text-sm font-medium`}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="ghost" size="icon" className="rounded-full">
              <BellRing className="h-5 w-5 text-neutral-500" />
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-3 rounded-full flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={user?.username || ""} />
                    <AvatarFallback className="bg-primary text-white">
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="ml-1 h-4 w-4 text-neutral-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  disabled={logoutMutation.isPending}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {logoutMutation.isPending ? "Signing out..." : "Sign out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100">
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-primary font-heading font-bold text-xl">SmartStudy</span>
                    </div>
                  </div>
                </div>
                
                <div className="py-2 space-y-1">
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={`${
                          location === item.href
                            ? "bg-neutral-50 border-primary text-primary"
                            : "border-transparent text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-800"
                        } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
                
                <div className="pt-4 pb-3 border-t border-neutral-200">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt={user?.username || ""} />
                        <AvatarFallback className="bg-primary text-white">
                          {user?.username?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-neutral-800">{user?.username}</div>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto rounded-full">
                      <BellRing className="h-5 w-5 text-neutral-500" />
                      <span className="sr-only">Notifications</span>
                    </Button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {logoutMutation.isPending ? "Signing out..." : "Sign out"}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
