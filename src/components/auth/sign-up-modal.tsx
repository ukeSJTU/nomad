"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface SignUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgree: () => void;
  onDisagree: () => void;
}

const agreementTerms = [
  { id: 1, text: "总则" },
  { id: 2, text: "服务商介绍" },
  { id: 3, text: "服务条款的修改" },
  { id: 4, text: "服务变更、中断、终止" },
  { id: 5, text: "使用规则" },
  { id: 6, text: "版权声明" },
  { id: 7, text: "用户隐私保护" },
  { id: 8, text: "用户的账号、密码和安全性" },
  { id: 9, text: "拒绝提供担保" },
  { id: 10, text: "有限责任" },
  { id: 11, text: "特殊网络会员服务条款的存储限制" },
  { id: 12, text: "用户管理" },
  { id: 13, text: "用户的违约责任" },
  { id: 14, text: "保障" },
  { id: 15, text: "结束服务" },
  { id: 16, text: "通告" },
  { id: 17, text: "参与广告策划" },
  { id: 18, text: "网络内容的所有权" },
  { id: 19, text: "法律" },
];

export default function SignUpModal({
  open,
  onOpenChange,
  onAgree,
  onDisagree,
}: SignUpModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[80vh] flex flex-col"
        showCloseButton={true}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-medium text-left">
            Nomad用户注册协议和隐私政策
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <DialogDescription className="text-sm text-gray-700 mb-4 leading-relaxed">
            亲爱的用户，在您注册Nomad用户的过程中，您需要完成我们的注册流程并通过点击同意的形式
            在线签署以下协议，请您务必仔细阅读、充分理解协议中的条款内容并选择接受或不接受。
            请您务必仔细阅读、充分理解协议中的条款内容并选择接受或不接受。
          </DialogDescription>

          <div className="mb-4">
            <button className="text-blue-600 hover:text-blue-800 text-sm underline">
              服务协议
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {agreementTerms.map(term => (
                <div key={term.id} className="flex items-start">
                  <span className="text-sm text-gray-700 mr-2">{term.id}.</span>
                  <span className="text-sm text-gray-700 flex-1">
                    {term.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-row justify-center gap-4 pt-4">
          <Button
            variant="outline"
            onClick={onDisagree}
            className="min-w-24 px-8"
          >
            不同意
          </Button>
          <Button
            onClick={onAgree}
            className="min-w-24 px-8 bg-orange-500 hover:bg-orange-600 text-white"
          >
            同意并继续
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
