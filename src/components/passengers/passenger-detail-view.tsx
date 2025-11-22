import { Separator } from "@/components/ui/separator";
import { formatDateString } from "@/utils/date";

export interface PassengerDetailData {
  name: string;
  nationality: string;
  gender: "male" | "female" | "other";
  dateOfBirth: Date | string;
  placeOfBirth?: string;
  phone?: string;
  email?: string;
  documentType: "id_card" | "passport" | "other";
  documentNumber: string;
  documentExpiryDate?: Date | string | null;
}

interface PassengerDetailViewProps {
  passenger: PassengerDetailData;
}

const genderLabels = {
  male: "男",
  female: "女",
  other: "其他",
};

const documentTypeLabels = {
  id_card: "身份证",
  passport: "护照",
  other: "其他",
};

export default function PassengerDetailView({
  passenger,
}: PassengerDetailViewProps) {
  return (
    <div className="space-y-6 bg-card">
      {/* Passenger Information Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-secondary text-sm font-semibold text-white">
            1
          </div>
          <h3 className="text-base font-semibold text-foreground">旅客信息</h3>
        </div>

        <Separator />

        <div className="space-y-3">
          {/* Name */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-muted-foreground">姓名</label>
            <div className="text-sm text-foreground">{passenger.name}</div>
          </div>

          {/* Nationality */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-muted-foreground">
              国籍
              <span className="ml-1 text-xs text-muted-foreground">
                (国家/地区)
              </span>
            </label>
            <div className="text-sm text-foreground">
              {passenger.nationality}
            </div>
          </div>

          {/* Gender */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-muted-foreground">性别</label>
            <div className="text-sm text-foreground">
              {genderLabels[passenger.gender]}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-muted-foreground">生日</label>
            <div className="text-sm text-foreground">
              {formatDateString(passenger.dateOfBirth)}
            </div>
          </div>

          {/* Place of Birth */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-muted-foreground">出生地</label>
            <div className="text-sm text-foreground">
              {passenger.placeOfBirth || "未设置"}
            </div>
          </div>

          {/* Phone */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-muted-foreground">
              手机号码
            </label>
            <div className="text-sm text-foreground">
              {passenger.phone || "未设置"}
            </div>
          </div>

          {/* Email */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-muted-foreground">Email</label>
            <div className="text-sm text-foreground">
              {passenger.email || "未设置"}
            </div>
          </div>
        </div>
      </div>

      {/* Document Information Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-secondary text-sm font-semibold text-white">
            2
          </div>
          <h3 className="text-base font-semibold text-foreground">证件信息</h3>
        </div>

        <Separator />

        <div className="grid grid-cols-3 gap-x-6 gap-y-3">
          {/* Document Type */}
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">证件类型:</label>
            <div className="text-sm text-foreground">
              {documentTypeLabels[passenger.documentType]}
            </div>
          </div>

          {/* Document Number */}
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">证件号码:</label>
            <div className="text-sm text-foreground">
              {passenger.documentNumber}
            </div>
          </div>

          {/* Document Expiry Date */}
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">有效期:</label>
            <div className="text-sm text-foreground">
              {formatDateString(passenger.documentExpiryDate)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
