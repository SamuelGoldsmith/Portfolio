import { cn } from "@/lib/utils";
import { LoaderPinwheel } from "lucide-react";

export const LoadingSpinner = ({
  big = false,
  center = false,
  padding = true,
  className,
}: React.ComponentProps<"div"> & {
  big?: boolean;
  center?: boolean;
  padding?: boolean;
}) => {
  return (
    <div
      className={cn(
        `flex justify-center ${padding && "p-2"} ${center && "fixed inset-0 flex items-center justify-center"}`,
        className,
      )}
    >
      <LoaderPinwheel
        className={`animate-spin ${big ? "size-16" : "size-6"}`}
      />
    </div>
  );
};
