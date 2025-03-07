import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface CollectionCardProps {
  id: string
  title: string
  imageUrl: string
  productCount: number
  href?: string
}

export function CollectionCard({
  id,
  title,
  imageUrl,
  productCount,
  href = `/collections/${id}`,
}: CollectionCardProps) {
  return (
    <Link href={href} className="block h-full">
      <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md py-0">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg?height=225&width=400"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {productCount} {productCount === 1 ? "product" : "products"}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}