"use client";

import { useState } from "react";
import { z } from "zod";
import { Product } from "@/types";
import apiClient from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// --- 1. Define form schema using Zod ---
const createProductSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  price: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a positive number",
    }),
  category: z.string().min(2, "Category is required"),
  image: z.string().url().optional(),
});

type CreateProductFormValues = z.infer<typeof createProductSchema>;

export default function CreateProductPage() {
  const [createdProduct, setCreatedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
    },
  });

  const onSubmit = async (values: CreateProductFormValues) => {
    setLoading(true);
    setError("");

    try {
      const { data } = await apiClient.post<Product>("/products/add", {
        title: values.title,
        description: values.description,
        price: Number(values.price), // convert string to number
        category: values.category,
        images: values.image ? [values.image] : [],
      });

      setCreatedProduct(data);
      form.reset();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-background/90 border border-border rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        Create New Product
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Product Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Product Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image URL */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </Form>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {/* Created Product Preview */}
      {createdProduct && (
        <div className="mt-8 p-4 border border-border rounded-lg bg-background/80 shadow-md">
          <h2 className="text-xl font-semibold">{createdProduct.title}</h2>
          <p className="text-sm text-foreground/80 mt-1">{createdProduct.description}</p>
          <p className="mt-1 font-medium">Price: ${createdProduct.price}</p>
          <p className="mt-1 italic">Category: {createdProduct.category}</p>
          {createdProduct.images?.[0] && (
            <img
              src={createdProduct.images[0]}
              alt={createdProduct.title}
              className="mt-3 w-40 h-40 object-cover rounded-md mx-auto"
            />
          )}
        </div>
      )}
    </div>
  );
}
