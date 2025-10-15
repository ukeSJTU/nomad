"use client";

import { Separator } from "@/components/ui/separator";

interface PassengerDetailData {
  chineseName?: string;
  englishLastName?: string;
  englishFirstName?: string;
  nationality: string;
  gender: "male" | "female" | "other";
  dateOfBirth: Date;
  placeOfBirth?: string;
  phone?: string;
  fax?: string;
  email?: string;
  documentType: "id_card" | "passport" | "other";
  documentNumber: string;
  documentExpiryDate?: Date;
}

interface PassengerDetailViewProps {
  passenger?: PassengerDetailData;
  onEdit?: () => void;
}

// Mock data for demonstration
const mockPassenger: PassengerDetailData = {
  chineseName: "测试用户",
  englishLastName: "未设置",
  englishFirstName: "",
  nationality: "中国大陆",
  gender: "male",
  dateOfBirth: new Date("2004-09-12"),
  placeOfBirth: "提瓦特",
  phone: "未设置",
  fax: "未设置",
  email: "未设置",
  documentType: "id_card",
  documentNumber: "3101**************876",
  documentExpiryDate: undefined,
};

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
  passenger = mockPassenger,
  onEdit,
}: PassengerDetailViewProps) {
  const formatDate = (date?: Date) => {
    if (!date) return "未设置";
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="space-y-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          查看常用旅客信息
        </h2>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            查看所有旅客信息
          </button>
        )}
      </div>

      {/* Passenger Information Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-orange-500 text-sm font-semibold text-white">
            1
          </div>
          <h3 className="text-base font-semibold text-gray-800">旅客信息</h3>
        </div>

        <Separator />

        <div className="space-y-3">
          {/* Chinese Name */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-gray-600">中文名</label>
            <div className="text-sm text-gray-900">
              {passenger.chineseName || "未设置"}
            </div>
          </div>

          {/* English Name */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-gray-600">英文名</label>
            <div className="text-sm text-gray-900">
              {passenger.englishLastName && passenger.englishFirstName
                ? `${passenger.englishLastName} / ${passenger.englishFirstName}`
                : passenger.englishLastName || "未设置 /"}
            </div>
          </div>

          {/* Nationality */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-gray-600">
              国籍
              <span className="ml-1 text-xs text-gray-500">(国家/地区)</span>
            </label>
            <div className="text-sm text-gray-900">{passenger.nationality}</div>
          </div>

          {/* Gender */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-gray-600">性别</label>
            <div className="text-sm text-gray-900">
              {genderLabels[passenger.gender]}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-gray-600">生日</label>
            <div className="text-sm text-gray-900">
              {formatDate(passenger.dateOfBirth)}
            </div>
          </div>

          {/* Place of Birth */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-gray-600">出生地</label>
            <div className="text-sm text-gray-900">
              {passenger.placeOfBirth || "未设置"}
            </div>
          </div>

          {/* Phone */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-gray-600">手机号码</label>
            <div className="text-sm text-gray-900">
              {passenger.phone || "未设置"}
            </div>
          </div>

          {/* Fax */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-gray-600">传真号码</label>
            <div className="text-sm text-gray-900">
              {passenger.fax || "未设置"}
            </div>
          </div>

          {/* Email */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="pt-1 text-sm text-gray-600">Email</label>
            <div className="text-sm text-gray-900">
              {passenger.email || "未设置"}
            </div>
          </div>
        </div>
      </div>

      {/* Document Information Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-orange-500 text-sm font-semibold text-white">
            2
          </div>
          <h3 className="text-base font-semibold text-gray-800">证件信息</h3>
        </div>

        <Separator />

        <div className="grid grid-cols-3 gap-x-6 gap-y-3">
          {/* Document Type */}
          <div className="space-y-1">
            <label className="text-sm text-gray-600">证件类型:</label>
            <div className="text-sm text-gray-900">
              {documentTypeLabels[passenger.documentType]}
            </div>
          </div>

          {/* Document Number */}
          <div className="space-y-1">
            <label className="text-sm text-gray-600">证件号码:</label>
            <div className="text-sm text-gray-900">
              {passenger.documentNumber}
            </div>
          </div>

          {/* Document Expiry Date */}
          <div className="space-y-1">
            <label className="text-sm text-gray-600">有效期:</label>
            <div className="text-sm text-gray-900">
              {formatDate(passenger.documentExpiryDate)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
