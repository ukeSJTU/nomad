import { Separator } from "@nomad/ui/components/separator";
import { getAncillaryServiceByCode } from "@/db/schema/ancillary";
import { IdentityType } from "@/types/dto";

// Identity type mapping
const IDENTITY_TYPE_MAP = {
  passport: "护照",
  id_card: "身份证",
  other: "其他",
} as const;

interface ConfirmationBookingInfoProps {
  passengers: Array<{
    id: string;
    name: string;
    identityType: IdentityType;
    identityNumber: string;
  }>;
  contactPhone: string | null;
  contactEmail: string | null;
  ancillaryDetails: string[] | null;
}

export function ConfirmationBookingInfo({
  passengers,
  contactPhone,
  contactEmail,
  ancillaryDetails,
}: ConfirmationBookingInfoProps) {
  // Parse ancillary services
  const ancillaryServices = (ancillaryDetails || [])
    .map(code => getAncillaryServiceByCode(code))
    .filter(Boolean);

  // Format contact name (use first passenger's name if no contact phone)
  const contactName = passengers[0]?.name || "未提供";

  return (
    <div className="space-y-4">
      {/* Passengers */}
      <div>
        <div className="text-sm text-gray-500 mb-2">乘机人信息</div>
        <div className="space-y-2">
          {passengers.map(passenger => (
            <div
              key={passenger.id}
              className="flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{passenger.name}</div>
                <div className="text-sm text-gray-600">
                  {IDENTITY_TYPE_MAP[passenger.identityType]}{" "}
                  {passenger.identityNumber}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Contact Information */}
      <div>
        <div className="text-sm text-gray-500 mb-2">联系人信息</div>
        <div className="space-y-1 text-sm">
          <div>
            <span className="text-gray-600">姓名：</span>
            {contactName}
          </div>
          {contactPhone && (
            <div>
              <span className="text-gray-600">电话：</span>
              {contactPhone}
            </div>
          )}
          {contactEmail && (
            <div>
              <span className="text-gray-600">邮箱：</span>
              {contactEmail}
            </div>
          )}
        </div>
      </div>

      {/* Ancillary Services */}
      {ancillaryServices.length > 0 && (
        <>
          <Separator />
          <div>
            <div className="text-sm text-gray-500 mb-2">增值服务</div>
            <div className="space-y-1">
              {ancillaryServices.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{service?.name}</span>
                  <span className="font-medium">¥{service?.price}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
