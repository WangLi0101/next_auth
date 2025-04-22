import { products } from "@/util/product";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: {
    id: string;
  };
}

const ProductDetailPage = ({ params: { id } }: Props) => {
  const product = products.find((el) => el.id === id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold text-gray-800">产品未找到</h2>
        <Link
          href="/product"
          className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回产品列表
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/product"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> 返回产品列表
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          {/* 产品图片 */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.imageSrc}
              width={600}
              height={600}
              alt={product.imageAlt}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 产品信息 */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <p className="mt-3 text-2xl font-semibold text-gray-900">
              {product.price}
            </p>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">产品描述</h3>
              <p className="mt-2 text-base text-gray-700">{product.imageAlt}</p>
            </div>

            <div className="mt-10 flex items-center gap-x-4">
              <button
                type="button"
                className="flex-1 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                加入购物车
              </button>
              <button
                type="button"
                className="flex-1 rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                立即购买
              </button>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-gray-900">产品特点</h3>
              <ul className="mt-2 space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>高品质材料</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>精致做工</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>时尚设计</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
