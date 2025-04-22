"use client";
import { products } from "@/util/product";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { use } from "react";
import { useRouter } from "next/navigation";
interface Params {
  id: string;
}
interface Props {
  params: Promise<Params>;
}

const ProductModal = ({ params }: Props) => {
  const { id } = use(params);
  const product = products.find((el) => el.id === id);
  const router = useRouter();
  if (!product) {
    return null;
  }
  const onChange = (flag: boolean) => {
    if (!flag) {
      router.back();
    }
  };
  return (
    <Dialog open={true} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[425px]" aria-description="">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center">
            <Image
              src={product.imageSrc}
              width={300}
              height={300}
              alt={product.imageAlt}
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium text-gray-900">{product.price}</p>
            <p className="text-sm text-gray-500">{product.imageAlt}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
