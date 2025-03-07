import { Loader2 } from "lucide-react";

export function PageLoader() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

export function ButtonLoader() {
  return <Loader2 className="h-4 w-4 animate-spin" />;
}

export function CardLoader() {
  return (
    <div className="space-y-4 p-4">
      <div className="h-8 w-3/4 bg-muted animate-pulse rounded" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-muted animate-pulse rounded" />
        <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
      </div>
    </div>
  );
}

export function TableLoader() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-4 p-4">
          <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
          <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
          <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
          <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ 
  title, 
  message, 
  icon: Icon 
}: { 
  title: string; 
  message: string; 
  icon: React.ElementType;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Icon className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2">{message}</p>
    </div>
  );
}
