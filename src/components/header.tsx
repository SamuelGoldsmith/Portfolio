"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Icon } from "./icons";
import { AuthorNames, Authors } from "@/lib/constants";

export function Header() {
  return (
    <header className="top-0 z-10 border-b">
      <NavigationMenu className="p-4">
        <NavigationMenuList className="space-x-2">
          <NavigationMenuItem>
            <Link href="/">
              <Icon alt="WPI Logo" src="/wpi_logo_emb.png" size={64} />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/search" legacyBehavior passHref prefetch>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Search
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* <NavigationMenuItem> */}
          {/*   <Link href="/advocacy" legacyBehavior passHref prefetch> */}
          {/*     <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
          {/*       Advocacy */}
          {/*     </NavigationMenuLink> */}
          {/*   </Link> */}
          {/* </NavigationMenuItem> */}
          {/* <NavigationMenuItem> */}
          {/*   <Link href="/learn_more" legacyBehavior passHref prefetch> */}
          {/*     <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
          {/*       Learn More */}
          {/*     </NavigationMenuLink> */}
          {/*   </Link> */}
          {/* </NavigationMenuItem> */}
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref prefetch>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Process</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {AuthorNames.map((name) => (
                  <ListItem
                    key={name}
                    href={`/process?author=${name}`}
                    title={Authors[name].title}
                  >
                    Read {name}&apos;s paper about right to repair!
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
