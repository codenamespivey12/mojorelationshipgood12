import { Link } from "@remix-run/react";
import { useUser } from "@clerk/remix";
import { Button } from "~/components/ui/Button";
import { config } from "~/lib/config";

export function Header() {
  const { isSignedIn, user } = useUser();
  
  return (
    <header className="bg-[#090040] text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/logo-light.png" 
            alt={config.app.name} 
            className="h-8 w-auto" 
          />
          <span className="font-bold text-xl">{config.app.name}</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-[#FFCC00] transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-[#FFCC00] transition-colors">
            About
          </Link>
          <Link to="/how-it-works" className="hover:text-[#FFCC00] transition-colors">
            How It Works
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#471396] flex items-center justify-center">
                    {user?.firstName?.[0] || "U"}
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">
                    Settings
                  </Link>
                  <Link to="/sign-out" className="block px-4 py-2 hover:bg-gray-100">
                    Sign Out
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/sign-in">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button variant="secondary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}