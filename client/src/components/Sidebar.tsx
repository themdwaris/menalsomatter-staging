import React from 'react';
import { Heart, MessageCircle, BookOpen, Calendar, Users, HelpCircle } from 'lucide-react';
import RaffleButton from './RaffleButton';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false }) => {
  return (
    <a 
      href="#" 
      className={`flex items-center py-2 px-4 rounded-md transition-all duration-200
        ${isActive 
          ? 'bg-navy-700 text-white' 
          : 'text-gray-700 hover:bg-navy-50'
        }`}
    >
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="w-full md:w-64 flex-shrink-0 bg-white h-full border-r border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-center md:justify-start mb-8">
          <Heart className="text-navy-700 mr-2" />
          <h1 className="text-xl font-bold text-navy-900">MenAlsoMatter</h1>
        </div>
        
        <nav className="mb-8">
          <ul className="space-y-1">
            <li><NavItem icon={<Heart size={18} />} label="Wellness" isActive /></li>
            <li><NavItem icon={<MessageCircle size={18} />} label="Community" /></li>
            <li><NavItem icon={<BookOpen size={18} />} label="Resources" /></li>
            <li><NavItem icon={<Calendar size={18} />} label="Events" /></li>
            <li><NavItem icon={<Users size={18} />} label="Support Groups" /></li>
            <li><NavItem icon={<HelpCircle size={18} />} label="Get Help" /></li>
          </ul>
        </nav>
        
        <div className="mb-6">
          <RaffleButton />
        </div>
        
        <div className="p-4 bg-navy-50 rounded-lg">
          <h3 className="text-sm font-bold text-navy-900 mb-2">Need immediate support?</h3>
          <p className="text-xs text-gray-700 mb-3">
            Our helpline is available 24/7 for men in crisis or those who need someone to talk to.
          </p>
          <a 
            href="tel:1-800-273-8255" 
            className="text-teal-600 font-medium text-sm hover:text-teal-800 transition-colors block"
          >
            Call 1-800-273-8255
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;