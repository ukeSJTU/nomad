"use client";

import { Plus, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Mock saved passengers
const MOCK_SAVED_PASSENGERS = [
  {
    id: "1",
    name: "张三",
    documentType: "身份证",
    documentNumber: "110101199001011234",
  },
  {
    id: "2",
    name: "李四",
    documentType: "护照",
    documentNumber: "E12345678",
  },
];

interface PassengerFormData {
  chineseName: string;
  englishFirstName: string;
  englishLastName: string;
  documentType: string;
  documentNumber: string;
  phone: string;
}

interface BookingPassengersPageClientProps {
  seatClassId?: string;
  outboundSeatClassId?: string;
  inboundSeatClassId?: string;
}

export function BookingPassengersPageClient({
  seatClassId,
  outboundSeatClassId,
  inboundSeatClassId,
}: BookingPassengersPageClientProps) {
  const router = useRouter();
  const [selectedPassengers, setSelectedPassengers] = useState<string[]>([]);
  const [passengers, setPassengers] = useState<PassengerFormData[]>([
    {
      chineseName: "",
      englishFirstName: "",
      englishLastName: "",
      documentType: "id_card",
      documentNumber: "",
      phone: "",
    },
  ]);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const handleAddPassenger = () => {
    setPassengers([
      ...passengers,
      {
        chineseName: "",
        englishFirstName: "",
        englishLastName: "",
        documentType: "id_card",
        documentNumber: "",
        phone: "",
      },
    ]);
  };

  const handleRemovePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const handlePassengerChange = (
    index: number,
    field: keyof PassengerFormData,
    value: string
  ) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleSelectSavedPassenger = (passengerId: string) => {
    if (selectedPassengers.includes(passengerId)) {
      setSelectedPassengers(
        selectedPassengers.filter(id => id !== passengerId)
      );
    } else {
      setSelectedPassengers([...selectedPassengers, passengerId]);
    }
  };

  const handleNext = () => {
    // TODO: Validate form data

    // Build URL with flight seat class IDs
    const params = new URLSearchParams();
    if (seatClassId) {
      params.set("seatClassId", seatClassId);
    } else if (outboundSeatClassId) {
      params.set("outboundSeatClassId", outboundSeatClassId);
      if (inboundSeatClassId) {
        params.set("inboundSeatClassId", inboundSeatClassId);
      }
    }

    router.push(`/flights/booking/ancillary?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Saved Passengers Section */}
      {MOCK_SAVED_PASSENGERS.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              选择常用旅客
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_SAVED_PASSENGERS.map(passenger => (
              <div
                key={passenger.id}
                className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
              >
                <Checkbox
                  checked={selectedPassengers.includes(passenger.id)}
                  onCheckedChange={() =>
                    handleSelectSavedPassenger(passenger.id)
                  }
                />
                <div className="flex-1">
                  <div className="font-medium">{passenger.name}</div>
                  <div className="text-sm text-gray-500">
                    {passenger.documentType} {passenger.documentNumber}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Passenger Information Forms */}
      {passengers.map((passenger, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">乘机人 {index + 1}</CardTitle>
              {passengers.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemovePassenger(index)}
                >
                  删除
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  中文名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={passenger.chineseName}
                  onChange={e =>
                    handlePassengerChange(index, "chineseName", e.target.value)
                  }
                  placeholder="请输入中文名"
                />
              </div>
              <div className="space-y-2">
                <Label>英文姓</Label>
                <Input
                  value={passenger.englishLastName}
                  onChange={e =>
                    handlePassengerChange(
                      index,
                      "englishLastName",
                      e.target.value
                    )
                  }
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>英文名</Label>
                <Input
                  value={passenger.englishFirstName}
                  onChange={e =>
                    handlePassengerChange(
                      index,
                      "englishFirstName",
                      e.target.value
                    )
                  }
                  placeholder="First Name"
                />
              </div>
              <div className="space-y-2">
                <Label>手机号</Label>
                <Input
                  value={passenger.phone}
                  onChange={e =>
                    handlePassengerChange(index, "phone", e.target.value)
                  }
                  placeholder="请输入手机号"
                />
              </div>
            </div>

            {/* Document Information */}
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  证件类型 <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={passenger.documentType}
                  onValueChange={value =>
                    handlePassengerChange(index, "documentType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id_card">身份证</SelectItem>
                    <SelectItem value="passport">护照</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>
                  证件号码 <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={passenger.documentNumber}
                  onChange={e =>
                    handlePassengerChange(
                      index,
                      "documentNumber",
                      e.target.value
                    )
                  }
                  placeholder="请输入证件号码"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Add Passenger Button */}
      <Button variant="outline" className="w-full" onClick={handleAddPassenger}>
        <Plus className="h-4 w-4 mr-2" />
        添加乘机人
      </Button>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">联系人信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>
              联系人姓名 <span className="text-red-500">*</span>
            </Label>
            <Input
              value={contactName}
              onChange={e => setContactName(e.target.value)}
              placeholder="请输入联系人姓名"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                联系电话 <span className="text-red-500">*</span>
              </Label>
              <Input
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
                placeholder="请输入联系电话"
              />
            </div>
            <div className="space-y-2">
              <Label>联系邮箱</Label>
              <Input
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                placeholder="请输入联系邮箱"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          返回
        </Button>
        <Button onClick={handleNext} size="lg">
          下一步：选择增值服务
        </Button>
      </div>
    </div>
  );
}
