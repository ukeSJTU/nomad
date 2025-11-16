import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 print:hidden">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
                N
              </div>
              <span className="font-semibold text-lg">Nomad</span>
            </div>
            <p className="text-sm text-muted-foreground">
              您的在线旅行服务平台
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  首页
                </Link>
              </li>
              <li>
                <Link
                  href="/home/passengers"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  常旅客管理
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">法律信息</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  服务协议
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  个人信息保护政策
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  免责声明
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Nomad. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
}
