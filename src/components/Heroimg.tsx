import Image from "next/image";

export default function Heroimg() {
  return (
    <div className="flex justify-center my-10">
      <Image
      src="/images/hero 2.png"
      alt="Hero image"
      width={1400}
      height={700}
      quality={100}
      priority
    />
    </div>
    
  );
}
