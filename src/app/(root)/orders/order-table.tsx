"use client"

import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TProduct } from "@/types/product-type";

type TOrder = {
  id: string;
  shippingAddress: Record<string, unknown>;
  customerClerkId: string;
  products: TProductOrder[];
  shippingRate: string;
  totalAmount: number;
};

type TProductOrder = {
  product: TProduct;
  color: string;
  size: string;
  quantity: number;
  id: string;
};

// Sample data - replace with your actual data
const orders: TOrder[] = []

export default function OrderTable({ orders }: { orders?: TOrder[] }) {
  if (!orders || orders.length === 0) {
    return <div className="text-center py-10">No orders found</div>
  }

  return (
    <div className="container mx-auto py-6">
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) =>
              order.products.map((orderItem, productIndex) => (
                <TableRow key={`${order.id}-${orderItem.id}`}>
                  <TableCell>
                    <div className="relative w-[130px] h-[130px]">
                      <Image
                        src={orderItem.product.media[0] || "/placeholder.svg"}
                        alt={orderItem.product.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell className="font-medium">{orderItem.product.title}</TableCell>
                  <TableCell>{orderItem.color ? orderItem.color : "N/A"}</TableCell>
                  <TableCell>{orderItem.size ? orderItem.size : "N/A"}</TableCell>
                  <TableCell>{orderItem.product.price}</TableCell>
                  <TableCell>{orderItem.quantity}</TableCell>
                  <TableCell className="font-bold">
                    {/* Show total amount only for the first product of each order */}
                    {productIndex === 0 ? `$${order.totalAmount}` : ""}
                  </TableCell>
                </TableRow>
              )),
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

