'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, LogOut, Settings, Users, UserPlus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface ProfileProps {
  name?: string;
  email?: string;
  avatar?: string;
  isCollapsed?: boolean;
}

const getInitials = (fullName = '') => {
  if (!fullName) return '';
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
};

export default function ProfileMenu({ name = '', email, avatar, isCollapsed }: ProfileProps) {
  const [open, setOpen] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // implement actual logout logic if needed
    navigate('/login');
  };

  const avatarSrc = avatar || '/images/avatar.jpg';

  const Avatar = (
    <>
      {!imgError ? (
        <img
          src={avatarSrc}
          alt={name || 'User'}
          onError={() => setImgError(true)}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
          {getInitials(name)}
        </div>
      )}
    </>
  );

  // Collapsed (sidebar narrow) - avatar only (centered)
  if (isCollapsed) {
    return (
      <div className="flex items-center justify-center pt-3">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 w-10 h-10 rounded-full overflow-hidden"
              aria-expanded={open}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                {Avatar}
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 mt-2 rounded-xl shadow-lg bg-white p-1" align="end">
            <DropdownMenuItem className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer flex items-center">
              <Users size={16} className="mr-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer flex items-center">
              <Settings size={16} className="mr-4" />
              Account Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded-md cursor-pointer flex items-center"
            >
              <LogOut className="w-4 h-4 mr-4" />
              <span className="text-[#d64545]">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Expanded: avatar + name + email, chevron + small action icons on the right (matches provided design)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* keep trigger as a single child; place logout icon as a sibling */}
      <div className="flex items-center w-full justify-between px-0 py-1 rounded-md">
        <DropdownMenuTrigger asChild>
          <Button
            className="flex items-center gap-3 flex-1 bg-transparent hover:bg-white/5 rounded-md justify-start"
            aria-expanded={open}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-white/10">{Avatar}</div>

            <div className="flex-1 text-left">
              <div className="text-xs font-semibold text-white leading-tight">{name}</div>
              {email && <div className="text-[12px] text-gray-300">{email}</div>}
            </div>
            {open ? (
              <ChevronUp className="w-4 h-4 text-white/80" />
            ) : (
              <ChevronDown className="w-4 h-4 text-white/80" />
            )}
          </Button>
        </DropdownMenuTrigger>

        {/* logout action must not open the menu */}
        <div className="flex items-center gap-2 ml-2">
          <button
            type="button"
            onPointerDownCapture={(e) => {
              // intercept before DropdownMenuTrigger receives the event
              e.stopPropagation();
            }}
            onMouseDown={(e) => {
              // extra guard for mouse events
              e.stopPropagation();
            }}
            onAuxClick={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            className="p-1 rounded-md hover:bg-white/10"
            aria-label="Logout"
          >
            <UserPlus className="w-4 h-4 text-white/80" />
          </button>
        </div>
      </div>

      <DropdownMenuContent className="w-56 mt-2 rounded-xl shadow-lg bg-white p-1" align="end">
        <DropdownMenuItem className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer flex items-center">
          <Users size={16} className="mr-4" />
          Profile Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer flex items-center">
          <Settings size={16} className="mr-4" />
          Account Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded-md cursor-pointer flex items-center"
        >
          <LogOut className="w-4 h-4 mr-4" />
          <span className="text-[#d64545]">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
