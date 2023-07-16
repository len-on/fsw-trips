import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { isBefore } from "date-fns"

export async function POST(request: Request) {
  const req = await request.json();

  const trip = await prisma.trip.findUnique({
    where: {
      id: req.tripId,
    },
  });

  if (!trip) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_NOT_FOUND",
        },
      })
    );
  }

  if (isBefore(new Date(req.startDate), new Date(trip.startDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INVALID_START_DATE"
        },
      }),
      {
        status: 400,
      }
    )
  }

  if (isBefore(new Date(req.endDate), new Date(trip.endDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INVALID_END_DATE"
        },
      }),
      {
        status: 400,
      }
    )
  }

  const reservation = await prisma.tripReservation.findMany({
    where: {
      tripId: req.tripId,
      // VERIFICA SE EXISTIR RESERVAENTRE AS DATAS
      startDate: {
        lte: new Date(req.endDate),
      },
      endDate: {
        gte: new Date(req.startDate)
      },
    },
  })

  if (reservation.length > 0) {
    return new NextResponse (
      JSON.stringify({
        error: {
          code: "TRIP_ALREADY_RESERVED",
        },
      })
    );
  }

  return new NextResponse(
    JSON.stringify({
      succsses: true,
    })
  );

}