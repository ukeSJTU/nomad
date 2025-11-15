import { and, desc, eq, isNull } from "drizzle-orm";

import { db } from "@/lib/db";
import { orders } from "@/lib/schema/orders";

/**
 * 订单列表项类型
 */
export interface OrderListItem {
  id: string;
  orderNumber: string;
  status: "PENDING_PAYMENT" | "CONFIRMED" | "CANCELLED" | "REFUNDED";
  createdAt: string;
  totalAmount: string;
  passengerCount: number;

  // 去程航班信息
  outboundFlight: {
    flightNumber: string;
    airlineName: string;
    airlineIataCode: string;
    airlineLogoUrl: string | null;
    departureAirportName: string;
    departureAirportIataCode: string;
    departureCityName: string;
    arrivalAirportName: string;
    arrivalAirportIataCode: string;
    arrivalCityName: string;
    departureDatetime: string;
    arrivalDatetime: string;
    seatClassType: string;
  };

  // 返程航班信息（往返订单）
  inboundFlight: {
    flightNumber: string;
    airlineName: string;
    airlineIataCode: string;
    airlineLogoUrl: string | null;
    departureAirportName: string;
    departureAirportIataCode: string;
    departureCityName: string;
    arrivalAirportName: string;
    arrivalAirportIataCode: string;
    arrivalCityName: string;
    departureDatetime: string;
    arrivalDatetime: string;
    seatClassType: string;
  } | null;

  // 乘客姓名列表
  passengerNames: string[];
}

/**
 * 获取用户的所有订单列表（排除已删除）
 */
export async function getUserOrders(userId: string): Promise<OrderListItem[]> {
  const result = await db.query.orders.findMany({
    where: and(eq(orders.userId, userId), isNull(orders.deletedAt)),
    orderBy: [desc(orders.createdAt)],
    with: {
      orderPassengers: true,
      outboundFlightSeatClass: {
        with: {
          flight: {
            with: {
              airline: true,
              departureAirport: {
                with: {
                  city: true,
                },
              },
              arrivalAirport: {
                with: {
                  city: true,
                },
              },
            },
          },
        },
      },
      inboundFlightSeatClass: {
        with: {
          flight: {
            with: {
              airline: true,
              departureAirport: {
                with: {
                  city: true,
                },
              },
              arrivalAirport: {
                with: {
                  city: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return result.map(order => ({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
    totalAmount: order.totalAmount,
    passengerCount: order.passengerCount,

    outboundFlight: {
      flightNumber: order.outboundFlightSeatClass.flight.flightNumber,
      airlineName: order.outboundFlightSeatClass.flight.airline.name,
      airlineIataCode: order.outboundFlightSeatClass.flight.airline.iataCode,
      airlineLogoUrl: order.outboundFlightSeatClass.flight.airline.logoUrl,
      departureAirportName:
        order.outboundFlightSeatClass.flight.departureAirport.name,
      departureAirportIataCode:
        order.outboundFlightSeatClass.flight.departureAirport.iataCode,
      departureCityName:
        order.outboundFlightSeatClass.flight.departureAirport.city.name,
      arrivalAirportName:
        order.outboundFlightSeatClass.flight.arrivalAirport.name,
      arrivalAirportIataCode:
        order.outboundFlightSeatClass.flight.arrivalAirport.iataCode,
      arrivalCityName:
        order.outboundFlightSeatClass.flight.arrivalAirport.city.name,
      departureDatetime:
        order.outboundFlightSeatClass.flight.departureDatetime.toISOString(),
      arrivalDatetime:
        order.outboundFlightSeatClass.flight.arrivalDatetime.toISOString(),
      seatClassType: order.outboundFlightSeatClass.classType,
    },

    inboundFlight: order.inboundFlightSeatClass
      ? {
          flightNumber: order.inboundFlightSeatClass.flight.flightNumber,
          airlineName: order.inboundFlightSeatClass.flight.airline.name,
          airlineIataCode: order.inboundFlightSeatClass.flight.airline.iataCode,
          airlineLogoUrl: order.inboundFlightSeatClass.flight.airline.logoUrl,
          departureAirportName:
            order.inboundFlightSeatClass.flight.departureAirport.name,
          departureAirportIataCode:
            order.inboundFlightSeatClass.flight.departureAirport.iataCode,
          departureCityName:
            order.inboundFlightSeatClass.flight.departureAirport.city.name,
          arrivalAirportName:
            order.inboundFlightSeatClass.flight.arrivalAirport.name,
          arrivalAirportIataCode:
            order.inboundFlightSeatClass.flight.arrivalAirport.iataCode,
          arrivalCityName:
            order.inboundFlightSeatClass.flight.arrivalAirport.city.name,
          departureDatetime:
            order.inboundFlightSeatClass.flight.departureDatetime.toISOString(),
          arrivalDatetime:
            order.inboundFlightSeatClass.flight.arrivalDatetime.toISOString(),
          seatClassType: order.inboundFlightSeatClass.classType,
        }
      : null,

    passengerNames: order.orderPassengers.map(p => p.name),
  }));
}

/**
 * 获取用户的未出行订单（已确认且去程航班未出发）
 */
export async function getUpcomingOrders(
  userId: string
): Promise<OrderListItem[]> {
  const now = new Date();

  // 首先获取所有已确认的订单
  const result = await db.query.orders.findMany({
    where: and(
      eq(orders.userId, userId),
      isNull(orders.deletedAt),
      eq(orders.status, "CONFIRMED")
    ),
    orderBy: [desc(orders.createdAt)],
    with: {
      orderPassengers: true,
      outboundFlightSeatClass: {
        with: {
          flight: {
            with: {
              airline: true,
              departureAirport: {
                with: {
                  city: true,
                },
              },
              arrivalAirport: {
                with: {
                  city: true,
                },
              },
            },
          },
        },
      },
      inboundFlightSeatClass: {
        with: {
          flight: {
            with: {
              airline: true,
              departureAirport: {
                with: {
                  city: true,
                },
              },
              arrivalAirport: {
                with: {
                  city: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // 过滤出去程航班未出发的订单
  const upcomingOrders = result.filter(
    order => order.outboundFlightSeatClass.flight.departureDatetime >= now
  );

  return upcomingOrders.map(order => ({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
    totalAmount: order.totalAmount,
    passengerCount: order.passengerCount,

    outboundFlight: {
      flightNumber: order.outboundFlightSeatClass.flight.flightNumber,
      airlineName: order.outboundFlightSeatClass.flight.airline.name,
      airlineIataCode: order.outboundFlightSeatClass.flight.airline.iataCode,
      airlineLogoUrl: order.outboundFlightSeatClass.flight.airline.logoUrl,
      departureAirportName:
        order.outboundFlightSeatClass.flight.departureAirport.name,
      departureAirportIataCode:
        order.outboundFlightSeatClass.flight.departureAirport.iataCode,
      departureCityName:
        order.outboundFlightSeatClass.flight.departureAirport.city.name,
      arrivalAirportName:
        order.outboundFlightSeatClass.flight.arrivalAirport.name,
      arrivalAirportIataCode:
        order.outboundFlightSeatClass.flight.arrivalAirport.iataCode,
      arrivalCityName:
        order.outboundFlightSeatClass.flight.arrivalAirport.city.name,
      departureDatetime:
        order.outboundFlightSeatClass.flight.departureDatetime.toISOString(),
      arrivalDatetime:
        order.outboundFlightSeatClass.flight.arrivalDatetime.toISOString(),
      seatClassType: order.outboundFlightSeatClass.classType,
    },

    inboundFlight: order.inboundFlightSeatClass
      ? {
          flightNumber: order.inboundFlightSeatClass.flight.flightNumber,
          airlineName: order.inboundFlightSeatClass.flight.airline.name,
          airlineIataCode: order.inboundFlightSeatClass.flight.airline.iataCode,
          airlineLogoUrl: order.inboundFlightSeatClass.flight.airline.logoUrl,
          departureAirportName:
            order.inboundFlightSeatClass.flight.departureAirport.name,
          departureAirportIataCode:
            order.inboundFlightSeatClass.flight.departureAirport.iataCode,
          departureCityName:
            order.inboundFlightSeatClass.flight.departureAirport.city.name,
          arrivalAirportName:
            order.inboundFlightSeatClass.flight.arrivalAirport.name,
          arrivalAirportIataCode:
            order.inboundFlightSeatClass.flight.arrivalAirport.iataCode,
          arrivalCityName:
            order.inboundFlightSeatClass.flight.arrivalAirport.city.name,
          departureDatetime:
            order.inboundFlightSeatClass.flight.departureDatetime.toISOString(),
          arrivalDatetime:
            order.inboundFlightSeatClass.flight.arrivalDatetime.toISOString(),
          seatClassType: order.inboundFlightSeatClass.classType,
        }
      : null,

    passengerNames: order.orderPassengers.map(p => p.name),
  }));
}

/**
 * 获取用户的待支付订单
 */
export async function getPendingPaymentOrders(
  userId: string
): Promise<OrderListItem[]> {
  const result = await db.query.orders.findMany({
    where: and(
      eq(orders.userId, userId),
      isNull(orders.deletedAt),
      eq(orders.status, "PENDING_PAYMENT")
    ),
    orderBy: [desc(orders.createdAt)],
    with: {
      orderPassengers: true,
      outboundFlightSeatClass: {
        with: {
          flight: {
            with: {
              airline: true,
              departureAirport: {
                with: {
                  city: true,
                },
              },
              arrivalAirport: {
                with: {
                  city: true,
                },
              },
            },
          },
        },
      },
      inboundFlightSeatClass: {
        with: {
          flight: {
            with: {
              airline: true,
              departureAirport: {
                with: {
                  city: true,
                },
              },
              arrivalAirport: {
                with: {
                  city: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return result.map(order => ({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
    totalAmount: order.totalAmount,
    passengerCount: order.passengerCount,

    outboundFlight: {
      flightNumber: order.outboundFlightSeatClass.flight.flightNumber,
      airlineName: order.outboundFlightSeatClass.flight.airline.name,
      airlineIataCode: order.outboundFlightSeatClass.flight.airline.iataCode,
      airlineLogoUrl: order.outboundFlightSeatClass.flight.airline.logoUrl,
      departureAirportName:
        order.outboundFlightSeatClass.flight.departureAirport.name,
      departureAirportIataCode:
        order.outboundFlightSeatClass.flight.departureAirport.iataCode,
      departureCityName:
        order.outboundFlightSeatClass.flight.departureAirport.city.name,
      arrivalAirportName:
        order.outboundFlightSeatClass.flight.arrivalAirport.name,
      arrivalAirportIataCode:
        order.outboundFlightSeatClass.flight.arrivalAirport.iataCode,
      arrivalCityName:
        order.outboundFlightSeatClass.flight.arrivalAirport.city.name,
      departureDatetime:
        order.outboundFlightSeatClass.flight.departureDatetime.toISOString(),
      arrivalDatetime:
        order.outboundFlightSeatClass.flight.arrivalDatetime.toISOString(),
      seatClassType: order.outboundFlightSeatClass.classType,
    },

    inboundFlight: order.inboundFlightSeatClass
      ? {
          flightNumber: order.inboundFlightSeatClass.flight.flightNumber,
          airlineName: order.inboundFlightSeatClass.flight.airline.name,
          airlineIataCode: order.inboundFlightSeatClass.flight.airline.iataCode,
          airlineLogoUrl: order.inboundFlightSeatClass.flight.airline.logoUrl,
          departureAirportName:
            order.inboundFlightSeatClass.flight.departureAirport.name,
          departureAirportIataCode:
            order.inboundFlightSeatClass.flight.departureAirport.iataCode,
          departureCityName:
            order.inboundFlightSeatClass.flight.departureAirport.city.name,
          arrivalAirportName:
            order.inboundFlightSeatClass.flight.arrivalAirport.name,
          arrivalAirportIataCode:
            order.inboundFlightSeatClass.flight.arrivalAirport.iataCode,
          arrivalCityName:
            order.inboundFlightSeatClass.flight.arrivalAirport.city.name,
          departureDatetime:
            order.inboundFlightSeatClass.flight.departureDatetime.toISOString(),
          arrivalDatetime:
            order.inboundFlightSeatClass.flight.arrivalDatetime.toISOString(),
          seatClassType: order.inboundFlightSeatClass.classType,
        }
      : null,

    passengerNames: order.orderPassengers.map(p => p.name),
  }));
}
