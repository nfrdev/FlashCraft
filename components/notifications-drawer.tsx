'use client';

import * as React from 'react';
import { useUIStore } from '@/store/use-ui-store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BellIcon, CircleIcon, CheckCheckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function NotificationsDrawer() {
  const { notifications, markNotificationsAsRead } = useUIStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div data-slot="notifications-drawer">
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={`Open notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
          className="relative rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <BellIcon className="size-5" />
          {unreadCount > 0 ? (
            <Badge variant="brand" className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full px-1 text-[9px] leading-none">
              {unreadCount}
            </Badge>
          ) : null}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 border border-border/80 bg-popover/95 p-0 text-popover-foreground shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-semibold text-sm text-foreground">Notifications</p>
              <p className="text-xs text-muted-foreground">Recent product and workspace events</p>
            </div>
            {unreadCount > 0 ? (
              <Button variant="ghost" size="sm" className="gap-1 px-2 text-xs text-primary" onClick={markNotificationsAsRead}>
                <CheckCheckIcon className="size-3.5" />
                Mark read
              </Button>
            ) : null}
          </div>
          <DropdownMenuSeparator className="m-0" />
          <div className="max-h-[320px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">No notifications yet.</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted/40 ${notification.read ? 'opacity-75' : 'bg-muted/20'}`}
                >
                  <div className="mt-0.5 shrink-0">
                    <CircleIcon
                      className={`size-2 fill-current ${
                        !notification.read
                          ? notification.type === 'success'
                            ? 'text-emerald-500'
                            : notification.type === 'warning'
                              ? 'text-amber-500'
                              : notification.type === 'error'
                                ? 'text-red-500'
                                : 'text-primary'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-medium text-foreground">{notification.title}</span>
                      <span className="shrink-0 text-[10px] text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="mt-1 text-xs leading-6 text-muted-foreground">{notification.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
