import Link from "next/link";
import { Icons } from "../Icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/NavigationMenu";
import { ListItem } from "./ListItem";
import Image from "next/image";

const DesktopNav = () => {
  return (
    <div className="hidden lg:flex gap-x-8 items-center">
      <Link href="/" className="flex space-x-2">
        {/* <Icons.logo className='h-6 w-6' aria-hidden='true' /> */}
        <Image
          src={"/images/Logo.png"}
          width={40}
          height={20}
          alt="totaltech"
        />
        <span className="hidden font-bold lg:inline-block lg:mt-4">
          Alibaba
        </span>
        <span className="sr-only">Home</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Lobby</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Image
                        src={"/images/Logo.png"}
                        width={40}
                        height={20}
                        alt="totaltech"
                        className="mr-2  "
                      />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Alibaba
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Alibaba is a pants shop{" "}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/products" title="Products">
                  All the products we have to offer
                </ListItem>
                <ListItem href="/#categories" title="Categories">
                  See all categories we have
                </ListItem>
                <ListItem href="/about" title="About">
                  Know more about us
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2">
                <ListItem
                  href="/products?category=skateboards"
                  title="Man"
                >
                  Explore the Man category
                </ListItem>
                <ListItem href="/products?category=clothing" title="Clothing">
                  Explore the clothing category
                </ListItem>
                <ListItem href="/products?category=shoes" title="Shoes">
                  Explore the shoes category
                </ListItem>
                <ListItem
                  href="/products?category=accessories"
                  title="Woman"
                >
                  Explore the woman category
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNav;
