import Accessories from "@/components/Accessories/Accessories";
import LandingInsta from "@/components/Instagram/LandingInsta";

async function getProducts() {
  try {
    const res = await fetch("https://sweetstitches-backend.vercel.app/allProducts", {
      next: { revalidate: 120 },
    });

    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen container mx-auto -mt-24 md:-mt-26 z-0 mb-20">
    
        <>
          {/* <BannerFirstPage settings={settings} /> */}
          <div className="text-center" style={{ marginTop: "280px" }}>
            <p className="font-semibold font-sans text-2xl">
              Sweet Stitches stands for Elegance, Versatility, Reflection
              of Personality.
            </p>
            <p className="font-semibold font-sans text-2xl">
              To design Sweet Stitches products that would make women feel empowered
              and men feel confident in their life.
            </p>
          </div>
          {/* {best.length > 0 && <SelectedFavor best={best} settings={settings} />} */}
          {/* <Compromising /> */}
          {/* <SecondBanner /> */}
          {/* {promote1.length > 0 && (
            <SelectedSuede promote1={promote1} settings={settings} />
          )} */}
          {/* <CrossbodyBags /> */}
          {/* <Forside /> */}
          {/* {promote2.length > 0 && ( */}
            <Accessories  products={products} />
          {/* )} */}
          <LandingInsta />
        </>
      {/* )}/ */}
    </div>
  );
}
