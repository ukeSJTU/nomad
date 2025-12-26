import { ArrowRight, Hotel, Plane, Train } from "lucide-react";
import Link from "next/link";

import { Footer, Header } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Toaster />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-linear-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                探索世界，从这里开始
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                Nomad -
                您的智能旅行助手，为年轻旅行者提供最优惠的机票、酒店和火车票预订服务
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/flights">
                    立即预订机票
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8"
                >
                  <Link href="/auth/sign-up">免费注册</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                我们提供的服务
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                一站式旅行预订平台，满足您的所有出行需求
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Flight Card */}
              <Link
                href="/flights"
                className="group relative overflow-hidden rounded-lg border bg-card p-8 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/20 group-hover:scale-110 transition-transform">
                    <Plane className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-semibold">机票预订</h3>
                  <p className="text-muted-foreground">
                    国内、国际及港澳台航线，实时比价，特价机票天天有
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    立即预订
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Hotel Card */}
              <div className="group relative overflow-hidden rounded-lg border bg-card p-8 opacity-60">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/20">
                    <Hotel className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-semibold">酒店预订</h3>
                  <p className="text-muted-foreground">
                    全球酒店资源，从经济型到豪华酒店，总有适合您的选择
                  </p>
                  <div className="text-sm text-muted-foreground">即将推出</div>
                </div>
              </div>

              {/* Train Card */}
              <div className="group relative overflow-hidden rounded-lg border bg-card p-8 opacity-60">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-purple-100 dark:bg-purple-900/20">
                    <Train className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-semibold">火车票预订</h3>
                  <p className="text-muted-foreground">
                    高铁、动车、普快，全国铁路线路覆盖，出行更便捷
                  </p>
                  <div className="text-sm text-muted-foreground">即将推出</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 dark:bg-blue-900 text-white py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              准备好开始您的旅程了吗？
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              立即注册，享受更多专属优惠和个性化服务
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg px-8"
            >
              <Link href="/auth/sign-up">免费注册</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
