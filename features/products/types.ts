export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  brand: string;
  warrantyInformation: string;
  rating: number;
  stock: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  availabilityStatus: string;
  shippingInformation: string;
  minimumOrderQuantity: number;
  reviews: [
    {
      rating: number;
      comment: string;
      date: string;
      reviewerName: string;
      reviewerEmail: string;
    }
  ];
  returnPolicy: string;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
};
