import { Button } from "@nomad/ui/components/button";
import { Separator } from "@nomad/ui/components/separator";
import type { UserInfo } from "@/types/dto";

interface UserInfoDisplayProps {
  userData: UserInfo;
  onEdit: () => void;
}

const genderLabels = {
  male: "男",
  female: "女",
  other: "其他",
};

export function UserInfoDisplay({ userData, onEdit }: UserInfoDisplayProps) {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">个人信息</h2>
        <Button onClick={onEdit}>编辑</Button>
      </div>

      <Separator />

      <div className="space-y-4">
        {/* Nickname */}
        <div className="grid grid-cols-[150px_1fr] items-start gap-4">
          <label className="pt-1 text-sm font-medium text-gray-600">昵称</label>
          <div className="text-sm text-gray-900">
            {userData.nickname || "未设置"}
          </div>
        </div>

        {/* Name */}
        <div className="grid grid-cols-[150px_1fr] items-start gap-4">
          <label className="pt-1 text-sm font-medium text-gray-600">姓名</label>
          <div className="text-sm text-gray-900">{userData.name}</div>
        </div>

        {/* Gender */}
        <div className="grid grid-cols-[150px_1fr] items-start gap-4">
          <label className="pt-1 text-sm font-medium text-gray-600">性别</label>
          <div className="text-sm text-gray-900">
            {userData.gender ? genderLabels[userData.gender] : "未设置"}
          </div>
        </div>

        {/* Birthday */}
        <div className="grid grid-cols-[150px_1fr] items-start gap-4">
          <label className="pt-1 text-sm font-medium text-gray-600">生日</label>
          <div className="text-sm text-gray-900">
            {userData.birthday || "未设置"}
          </div>
        </div>
      </div>
    </div>
  );
}
