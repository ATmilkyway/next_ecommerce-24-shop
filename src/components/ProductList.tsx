"use client";
import useProducts from "@/hooks/useProducts";

export default function ProductList() {
  const { products } = useProducts();
  return (
    <div>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </div>
  );
}
