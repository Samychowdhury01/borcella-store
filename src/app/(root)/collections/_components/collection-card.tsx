import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface CollectionCardProps {
  id: string;
  title: string;
  imageUrl: string;
  productCount: number;

  description: string;
  href?: string;
}

export function CollectionCard({
  id,
  title,
  imageUrl,
  productCount,
  description,
  href = `/collections/${id}`,
}: CollectionCardProps) {
  return (
    <Link href={href}>
      <div className="group overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg?height=400&width=600"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
            {productCount} {productCount === 1 ? "product" : "products"}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg font-lora capitalize">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
