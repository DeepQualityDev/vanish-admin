"use client";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  getPairs
} from "@/store/features/pairs/pairsSlice";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function NavMenu() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    router.push("/login");
  }
  const handleRefresh = () => {
    dispatch(getPairs({ pageNumber: Number(localStorage.getItem("page_number") || 0), perPage: Number(localStorage.getItem("per_page") || "10")}));
  };
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/new_pairs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              New Pairs
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <div onClick={handleLogin} className="cursor-pointer pointer-events-none opacity-50">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Login
            </NavigationMenuLink>
          </div>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <div  onClick={handleRefresh}>
            {/* <NavigationMenuLink className={navigationMenuTriggerStyle()}> */}
              <IconButton aria-label="refresh">
                <RefreshIcon sx={{color: "white", width: "40px", height: "40px"}}/>
              </IconButton>
            {/* </NavigationMenuLink> */}
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
