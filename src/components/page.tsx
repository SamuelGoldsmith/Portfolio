import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

export const Page = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("space-y-6 p-10 pb-16", className)} {...props} />;
};

export const PageHeader = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <>
      <div className={cn("space-y-0.5", className)} {...props}>
        {children}
      </div>
      <Separator className="my-6" />
    </>
  );
};

export const PageTitle = ({
  className,
  ...props
}: React.ComponentProps<"h2">) => {
  return (
    <h2
      className={cn("text-2xl font-bold tracking-tight", className)}
      {...props}
    />
  );
};

export const PageDescription = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return <p className={cn("text-muted-foreground", className)} {...props} />;
};

export const PageContent = ({
  className,
  center = false,
  ...props
}: React.ComponentProps<"div"> & { center?: boolean }) => {
  return (
    <div
      className={cn(
        "z-0 p-2",
        center && "flex items-center justify-center",
        className,
      )}
      {...props}
    />
  );
};
