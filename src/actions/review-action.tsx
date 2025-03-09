"use server"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getProductReviews = async (productId: string) => {
  const products = await prisma.review.findMany({
    where: {
      productId,
    },
  });
  if (!products.length) {
    return [];
  }
  return products;
};

export const createReview = async (payload: {
  productId: string;
  name: string;
  rating: number;
  content: string;
}) => {
  const newReview = await prisma.review.create({
    data: payload,
  });

  if (newReview.id) {
    revalidatePath(`/products/${payload.productId}`);
    return {
      success: true,
      message: "Thank you for your valuable feedback",
    };
  }

  return {
    success: false,
    message: "Something went wrong! Try again later",
  };
};
