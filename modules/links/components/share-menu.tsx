"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Share,
  Copy,
  ListFilter,
  QrCode,
  ExternalLink,
  ChevronRight,
  Check,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ShareMenu = ({ username }: { username: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const fullLink = `${origin}/${username}`;

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(fullLink);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    toast.success("Link copied to clipboard!");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="default">
          <Share className="h-4 w-4 mr-2" /> Share
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-4" align="end">
        <div className="flex items-center justify-between mb-4">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-lg font-semibold p-0">
              Share your Linktree
            </DropdownMenuLabel>
          </DropdownMenuGroup>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Get more visitors by sharing your Linktree everywhere.
        </p>

        <div className="flex w-full items-center space-x-2 mb-4">
          <Input type="text" value={fullLink} readOnly className="flex-1" />
          <Button type="button" size="icon" onClick={handleCopy}>
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        <DropdownMenuSeparator className="my-2" />


        <DropdownMenuItem className="cursor-pointer py-2 px-2 flex items-center">
          <Share className="mr-2 h-4 w-4" />
          <span>Share to...</span>
          <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer py-2 px-2 flex items-center"
          onClick={() => window.open(fullLink, "_blank")}
        >
          <Globe className="mr-2 h-4 w-4" />
          <span>Open</span>
          <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareMenu;