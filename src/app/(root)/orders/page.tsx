import { getOrders } from "@/actions/order-actions";
import { Card } from "@/components/ui/card";
import { TProduct } from "@/types/product-type";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

type TOrder = {
  id: string;
  shippingAddress: Object;
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

const Orders = async () => {
  const { userId } = await auth();
  const orders = await getOrders(userId as string);
  console.log(orders, "server order");
  return (
    <div className="px-10 py-5 max-sm:px-3">
      <p className="text-heading3 font-bold my-10">Your Orders</p>
      {!orders ||
        (orders.length === 0 && (
          <p className="text-body font-bold my-5">You have no orders yet.</p>
        ))}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {orders?.map((order: TOrder) => (
          <Card
            key={order.id}
            className="flex flex-col gap-8 p-4 hover:bg-gray-1"
          >
            <div className="flex flex-col gap-5">
              {order?.products?.map((orderItem: TProductOrder) => (
                <div className="flex items-center gap-4">
                  <Image
                    src={orderItem.product.media[0]}
                    alt={orderItem.product.title}
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-base font-bold">Order ID: {order.id}</p>
                    <p className="text-small font-medium">
                      Title:{" "}
                      <span className="text-small font-bold">
                        {orderItem.product.title}
                      </span>
                    </p>
                    {orderItem.color && (
                      <p className="text-small font-medium">
                        Color:{" "}
                        <span className="text-small font-bold">
                          {orderItem.color}
                        </span>
                      </p>
                    )}
                    {orderItem.size && (
                      <p className="text-small font-medium">
                        Size:{" "}
                        <span className="text-small font-bold">
                          {orderItem.size}
                        </span>
                      </p>
                    )}
                    <p className="text-small font-medium">
                      Unit price:{" "}
                      <span className="text-small font-bold">
                        {orderItem.product.price}
                      </span>
                    </p>
                    <p className="text-small font-medium">
                      Quantity:{" "}
                      <span className="text-small font-bold">
                        {orderItem.quantity}
                      </span>
                    </p>
                    <p className="text-base font-bold">
                      Total Amount: ${order.totalAmount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
