import { getOrders } from "@/actions/order-actions";
import { auth } from "@/auth";
import { Section } from "@/components/responsive-section";
import { Card } from "@/components/ui/card";
import { TProduct } from "@/types/product-type";
import Image from "next/image";
import SectionBanner from "../_components/section-banner";
import OrderTable from "./order-table";

const Orders = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const orders = await getOrders(userId as string);
  console.log(orders, "server order");
  return (
    <>
      <SectionBanner title="Orders" />
      <Section className="responsive-section-bottom">
        {!orders ||
          (orders.length === 0 && (
            <p className="text-body font-bold my-5 text-center">
              You have no orders yet.
            </p>
          ))}

        <OrderTable orders={orders} />
      </Section>
    </>
  );
};

export default Orders;
