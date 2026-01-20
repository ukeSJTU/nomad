"use client";

import { Button } from "@ukesjtu/nomad-ui/components/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ukesjtu/nomad-ui/components/primitives/dialog";
import { Separator } from "@ukesjtu/nomad-ui/components/primitives/separator";
import { X } from "lucide-react";
import { useUiComponents } from "../../platform";

export interface SignUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgree: () => void;
  onDisagree: () => void;
}

const serviceTerms = [
  { id: 1, text: "总则" },
  { id: 2, text: "服务简介" },
  { id: 3, text: "服务条款的修改" },
  { id: 4, text: "服务变更、中断、终止" },
  { id: 5, text: "使用规则" },
  { id: 6, text: "版权声明" },
  { id: 7, text: "用户隐私制度" },
  { id: 8, text: "用户的账号、密码和安全性" },
  { id: 9, text: "拒绝提供担保" },
  { id: 10, text: "有限责任" },
  { id: 11, text: "Nomad网络会员服务信息的存储及限制" },
  { id: 12, text: "用户管理" },
  { id: 13, text: "用户的违约责任" },
  { id: 14, text: "保障" },
  { id: 15, text: "结束服务" },
  { id: 16, text: "通告" },
  { id: 17, text: "参与广告策划" },
  { id: 18, text: "邮件内容的所有权" },
  { id: 19, text: "法律" },
];

const privacyTerms = [
  { id: 1, text: "隐私政策的确认和接纳" },
  { id: 2, text: "信息收集" },
  { id: 3, text: "信息使用" },
  { id: 4, text: "信息共享、转让和披露" },
  { id: 5, text: "信息保存及跨境传输" },
  { id: 6, text: "Cookie的使用" },
  { id: 7, text: "个人敏感信息提示" },
  { id: 8, text: "信息安全与保护" },
  { id: 9, text: "信息安全事件处置" },
  { id: 10, text: "未成年人信息保护" },
  { id: 11, text: "用户个人信息管理" },
  { id: 12, text: "从中国大陆地区以外访问我们的网站" },
  { id: 13, text: "隐私政策的适用范围" },
  { id: 14, text: "隐私政策的修改" },
  { id: 15, text: "如何联系我们" },
  { id: 16, text: "法律" },
];

export function SignUpModal({
  open,
  onOpenChange,
  onAgree,
  onDisagree,
}: SignUpModalProps) {
  const { Link } = useUiComponents();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[720px] max-h-[80vh] flex flex-col px-[30px] py-5"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-lg font-bold text-left">
            Nomad用户注册协议和隐私政策
          </DialogTitle>
          <X className="text-muted-foreground" />
        </DialogHeader>

        <Separator />

        <div className="flex-1 overflow-hidden overflow-y-auto">
          <DialogDescription className="text-sm text-foreground mb-4 leading-relaxed">
            亲爱的用户，在您注册为Nomad用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，请您务必仔细阅读、充分理解协议中的条款内容后再点击同意，
            <span className="font-bold">尤其是加粗字体</span>。
          </DialogDescription>

          <div className="mb-3">
            <h3 className="font-semibold text-sm mb-2">
              <Link
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/90 underline mx-1"
              >
                服务协议
              </Link>
            </h3>
            <div className="bg-background rounded-lg p-4">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {serviceTerms.map(term => (
                  <div key={term.id} className="flex items-start">
                    <span className="text-sm text-foreground mr-2">
                      {term.id}.
                    </span>
                    <span className="text-sm text-foreground flex-1">
                      {term.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-sm mb-2">
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/90 underline mx-1"
              >
                隐私政策
              </Link>
            </h3>
            <p className="text-sm text-foreground mb-2 leading-relaxed">
              隐私政策明确了我们产品与/或服务所收集、使用及共享个人信息的类型和方式及用途；明确了用户查询、更正和删除个人信息的方式，具体提纲如下：
            </p>
            <div className="bg-background rounded-lg p-4">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {privacyTerms.map(term => (
                  <div key={term.id} className="flex items-start">
                    <span className="text-sm text-foreground mr-2">
                      {term.id}.
                    </span>
                    <span className="text-sm text-foreground flex-1">
                      {term.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-foreground leading-relaxed">
            <p>
              <span className="font-bold">【审慎阅读】</span>
              您在申请注册流程中点击同意前，请您务必审慎阅读、充分理解协议中相关条款内容，
              <span className="font-bold">
                尤其是与您约定免除或限制责任的条款，以及字体加粗标识的重要条款
              </span>
              。
            </p>
            <p>
              <span className="font-bold">【请您注意】</span>
              如果您不同意上述协议或其中任何条款约定，请您停止注册。如果您按照注册流程提示填写信息、阅读并点击同意上述协议且完成全部注册流程后，即表示您已充分阅读、理解并接受协议的全部内容。如果您对以上内容有疑问，请联系：
              <a
                href="mailto:privacy@nomad.com"
                className="text-primary hover:text-primary/90 underline"
              >
                privacy@nomad.com
              </a>
              。
            </p>
            <p>
              点击同意即代表您已阅读并同意Nomad《服务协议》和《隐私政策》
              ，并同意我们将您的订单信息共享给为完成此订单所必须的第三方合作方。
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-center gap-4 pt-4 sm:justify-center">
          <Button
            variant="outline"
            onClick={onDisagree}
            className="min-w-24 px-8"
          >
            不同意
          </Button>
          <Button
            onClick={onAgree}
            className="min-w-24 px-8 bg-secondary hover:bg-secondary/90 text-white"
          >
            同意并继续
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
