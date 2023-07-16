import React from 'react';
import Image from 'next/image';
import { format } from "date-fns";
import { Prisma } from '@prisma/client';
import ReactCountryFlag from 'react-country-flag';
import ptBR from 'date-fns/locale/pt-BR'
import Button from '@/components/Button';
import { toast } from "react-toastify";

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
}

const UserReservationItem = ({ reservation }: UserReservationItemProps) => {
  const { trip } = reservation;

  const handleDeleteClick = async () => {
    const res = await fetch(`/api/trips/reservation/${reservation.id}`, {
      method: "DELETE",
    });

    if(!res.ok) {
      return toast.error("Ocorreu um erro ao cancelar a reserva.");
    }

    toast.success("Reserva cancelada com sucesso!", {position: 'bottom-center'})
  }  

  return (
    <div>
      
      {/* CARD */}
      <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
          <div className="relative h-[106px] w-[124px]">
            <Image src={trip.coverImage} fill style={{ objectFit: "cover" }} className="rounded-lg" alt={trip.name} />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold">{trip.name}</h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-grayPrimary underline">{trip.location}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-5 text-primaryDarker">
          <h3 className="text-sm">Data</h3>
          <div className="flex items-center gap-1">
            <p className="text-sm">{format(new Date(reservation.startDate), "dd 'de' MMMM", {locale: ptBR})}</p>
            {" a "}
            <p className="text-sm">{format(new Date(reservation.endDate), "dd 'de' MMMM", {locale: ptBR})}</p>
          </div>

          <h3 className="mt-5 text-sm">Hóspedes</h3>
          <p className="text-sm pb-5">{reservation.guests} hóspedes</p>

          <h3 className="font-semibold text-primaryDarker mt-3 pt-5 border-t border-solid border-grayLighter">Informações sobre o preço</h3>

          <div className="flex justify-between mt-1">
            <p className="text-primaryDarker text-sm">Total</p>
            <p className="font-medium text-sm">R${Number(reservation.totalPrice)}</p>
          </div>

          <Button variant='danger' className="mt-5" onClick={handleDeleteClick}>
            Cancelar Viagem
          </Button>
        </div>
      </div>
     </div>
  );
}
 
export default UserReservationItem;