import { Card, CardContent } from "@/components/ui/card";

export function WeatherCard() {
  return (
    <Card className="bg-accent/50 border border-accent shadow-none">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4 border-b border-accent pb-2">
          <span className="font-bold text-primary">今日天气</span>
          <span className="text-primary text-xs cursor-not-allowed opacity-70">
            查看更多 &gt;
          </span>
        </div>

        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xl font-bold text-foreground">北京</div>
            <div className="text-xs text-muted-foreground mt-1">
              2025-12-02 周一
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-light text-primary">-3℃~5℃</div>
            <div className="text-sm text-muted-foreground">多云</div>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-accent">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">明天 (12-03)</span>
            <span className="text-muted-foreground">多云</span>
            <span className="text-foreground font-medium">-7℃~0℃</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">后天 (12-04)</span>
            <span className="text-muted-foreground">晴</span>
            <span className="text-foreground font-medium">-8℃~-2℃</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
