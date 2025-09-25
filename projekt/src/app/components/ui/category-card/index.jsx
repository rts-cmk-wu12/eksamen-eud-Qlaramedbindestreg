import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ listing }) {
  return (
      <div className="listing__card">
        <Link href={`/listing-details/${listing.id}`} className="listing__link">
      <div className="listing__image-wrapper">
        <Image
          src={listing.asset?.url || "/placeholder.jpg"}
          alt={listing.title}
          width={200} 
  height={300} 
          className="listing__image"
        />
      </div>
      <div className="listing__content">
        <h2>{listing.title}</h2>
      </div>
    </Link>
    </div>
  );
}