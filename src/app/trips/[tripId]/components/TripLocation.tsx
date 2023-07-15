import Button from '@/components/Button';
import Image from 'next/image';
import React from 'react';

interface TripDescriptionProps {
  location: string;
  locationDescription: string;
}

const TripLocation = ({ location, locationDescription }: TripDescriptionProps) => {
  return (
    <div className="p-5">
      <h2 className="font-semibold text-primaryDarker mb-3">Localização</h2>
      <div className="relative w-full h-[280px]">
        <Image 
          src="/map-mobile.png" 
          alt={location}
          fill
          style={{
            objectFit: "cover",
          }}
          className="rounded-lg shadow-md"
        />
      </div>

      <h3 className="text-primaryDarker text-sm font-semibold mt-3 ">{location}</h3>
      <p className="text-xs text-primaryDarker mt-2 leading-5 text-justify">{locationDescription}</p>
      <Button variant="outlined" className="w-full mt-5">Ver no Google Maps</Button>
    </div>
  );
}
 
export default TripLocation;