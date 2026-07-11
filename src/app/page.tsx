
import Heroimg from "../components/Heroimg";
import Headerproducts from "../components/Headerproducts";
import FlashDeals from "../components/FlashDeals";
import { ProductInterface } from "../interfaces/products.interface";
import Heroimg2 from "../components/Heroimg2";
import BrandsAndPromo from "@/components/BrandsAndPromo";
import ArticlesAndFeatures from "@/components/ArticlesAndFeatures";


export default async function Home() {
  const productsData: ProductInterface[]=[]
  return (
    <>
      <Heroimg />
      <Headerproducts />
      <FlashDeals />
      <Heroimg2/>
      <BrandsAndPromo/>
      <ArticlesAndFeatures/>
    </>
  );
}
