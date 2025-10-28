"use client";

import { ArrowLeftRight } from "lucide-react";
import { use, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CityData } from "@/lib/queries/cities";

interface CitySelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (city: CityData) => void;
  title?: string;
  selectedCity?: CityData | null;
  // 传入 Promise，使用 use hook 读取
  citiesPromise: Promise<CityData[]>;
}

// 字母分组配置
const LETTER_GROUPS = [
  { label: "热门", value: "popular" },
  { label: "ABCDEF", value: "ABCDEF", letters: ["A", "B", "C", "D", "E", "F"] },
  { label: "GHIJ", value: "GHIJ", letters: ["G", "H", "I", "J"] },
  { label: "KLMN", value: "KLMN", letters: ["K", "L", "M", "N"] },
  {
    label: "PQRSTUV",
    value: "PQRSTUV",
    letters: ["P", "Q", "R", "S", "T", "U", "V"],
  },
  { label: "WXYZ", value: "WXYZ", letters: ["W", "X", "Y", "Z"] },
];

// 大洲配置
const CONTINENTS = [
  { label: "热门", value: "popular" },
  { label: "亚洲", value: "Asia" },
  { label: "欧洲", value: "Europe" },
  { label: "美洲", value: "America" },
  { label: "非洲", value: "Africa" },
  { label: "大洋洲", value: "Oceania" },
];

export function CitySelector({
  open,
  onOpenChange,
  onSelect,
  title = "选择城市",
  selectedCity,
  citiesPromise,
}: CitySelectorProps) {
  // 使用 use hook 读取 Promise
  const allCities = use(citiesPromise);

  const [domesticOrInternational, setDomesticOrInternational] = useState<
    "domestic" | "international"
  >("domestic");
  const [domesticTab, setDomesticTab] = useState("popular");
  const [internationalTab, setInternationalTab] = useState("popular");

  // 根据当前选中的标签过滤城市数据（客户端过滤，无需请求）
  const filteredCities = useMemo(() => {
    if (domesticOrInternational === "domestic") {
      // 国内城市
      const domesticCities = allCities.filter(
        city => city.pinyinFirstLetter !== null
      );

      if (domesticTab === "popular") {
        return domesticCities.filter(city => city.isPopular);
      } else {
        // 根据字母组过滤
        const group = LETTER_GROUPS.find(g => g.value === domesticTab);
        if (group?.letters) {
          return domesticCities.filter(city =>
            group.letters.includes(city.pinyinFirstLetter!)
          );
        }
      }
    } else {
      // 国际城市
      const internationalCities = allCities.filter(
        city => city.continent !== null
      );

      if (internationalTab === "popular") {
        return internationalCities.filter(city => city.isPopular);
      } else {
        // 根据大洲过滤
        return internationalCities.filter(
          city => city.continent === internationalTab
        );
      }
    }

    return [];
  }, [allCities, domesticOrInternational, domesticTab, internationalTab]);

  const handleCitySelect = (city: CityData) => {
    onSelect(city);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* 国内/国际切换 */}
          <Tabs
            value={domesticOrInternational}
            onValueChange={value =>
              setDomesticOrInternational(value as "domestic" | "international")
            }
            className="flex-1 flex flex-col"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="domestic">国内</TabsTrigger>
              <TabsTrigger value="international">
                国际及中国港澳台热门
              </TabsTrigger>
            </TabsList>

            {/* 国内城市 */}
            <TabsContent
              value="domestic"
              className="flex-1 overflow-hidden flex flex-col mt-0"
            >
              <Tabs
                value={domesticTab}
                onValueChange={setDomesticTab}
                className="flex-1 flex flex-col"
              >
                <TabsList className="mb-4 flex-wrap h-auto">
                  {LETTER_GROUPS.map(group => (
                    <TabsTrigger key={group.value} value={group.value}>
                      {group.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {LETTER_GROUPS.map(group => (
                  <TabsContent
                    key={group.value}
                    value={group.value}
                    className="flex-1 overflow-y-auto mt-0"
                  >
                    <div className="grid grid-cols-4 gap-4">
                      {filteredCities.length === 0 ? (
                        <div className="col-span-4 text-center text-muted-foreground py-8">
                          暂无城市数据
                        </div>
                      ) : (
                        filteredCities.map(city => (
                          <Button
                            key={city.iataCode}
                            variant={
                              selectedCity?.iataCode === city.iataCode
                                ? "default"
                                : "outline"
                            }
                            onClick={() => handleCitySelect(city)}
                            className="justify-start"
                          >
                            {city.name}
                          </Button>
                        ))
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>

            {/* 国际城市 */}
            <TabsContent
              value="international"
              className="flex-1 overflow-hidden flex flex-col mt-0"
            >
              <Tabs
                value={internationalTab}
                onValueChange={setInternationalTab}
                className="flex-1 flex flex-col"
              >
                <TabsList className="mb-4 flex-wrap h-auto">
                  {CONTINENTS.map(continent => (
                    <TabsTrigger key={continent.value} value={continent.value}>
                      {continent.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {CONTINENTS.map(continent => (
                  <TabsContent
                    key={continent.value}
                    value={continent.value}
                    className="flex-1 overflow-y-auto mt-0"
                  >
                    <div className="grid grid-cols-4 gap-4">
                      {filteredCities.length === 0 ? (
                        <div className="col-span-4 text-center text-muted-foreground py-8">
                          暂无城市数据
                        </div>
                      ) : (
                        filteredCities.map(city => (
                          <Button
                            key={city.iataCode}
                            variant={
                              selectedCity?.iataCode === city.iataCode
                                ? "default"
                                : "outline"
                            }
                            onClick={() => handleCitySelect(city)}
                            className="justify-start"
                          >
                            {city.name}
                          </Button>
                        ))
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * 城市选择器输入框组件
 * 显示出发地和目的地，点击打开城市选择器
 */
interface CityInputProps {
  departureCity: CityData | null;
  arrivalCity: CityData | null;
  onDepartureCityChange: (city: CityData) => void;
  onArrivalCityChange: (city: CityData) => void;
  onSwap?: () => void;
  citiesPromise: Promise<CityData[]>;
}

export function CityInput({
  departureCity,
  arrivalCity,
  onDepartureCityChange,
  onArrivalCityChange,
  onSwap,
  citiesPromise,
}: CityInputProps) {
  const [departureSelectorOpen, setDepartureSelectorOpen] = useState(false);
  const [arrivalSelectorOpen, setArrivalSelectorOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {/* 出发地 */}
      <div className="flex-1">
        <Button
          variant="outline"
          onClick={() => setDepartureSelectorOpen(true)}
          className="w-full h-16 flex flex-col items-start justify-center"
        >
          <span className="text-xs text-muted-foreground">出发地</span>
          <span className="text-lg font-medium">
            {departureCity
              ? `${departureCity.name}(${departureCity.iataCode})`
              : "请选择"}
          </span>
        </Button>
        <CitySelector
          open={departureSelectorOpen}
          onOpenChange={setDepartureSelectorOpen}
          onSelect={onDepartureCityChange}
          title="选择出发城市"
          selectedCity={departureCity}
          citiesPromise={citiesPromise}
        />
      </div>

      {/* 交换按钮 */}
      {onSwap && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onSwap}
          className="shrink-0"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
      )}

      {/* 目的地 */}
      <div className="flex-1">
        <Button
          variant="outline"
          onClick={() => setArrivalSelectorOpen(true)}
          className="w-full h-16 flex flex-col items-start justify-center"
        >
          <span className="text-xs text-muted-foreground">目的地</span>
          <span className="text-lg font-medium">
            {arrivalCity
              ? `${arrivalCity.name}(${arrivalCity.iataCode})`
              : "请选择"}
          </span>
        </Button>
        <CitySelector
          open={arrivalSelectorOpen}
          onOpenChange={setArrivalSelectorOpen}
          onSelect={onArrivalCityChange}
          title="选择到达城市"
          selectedCity={arrivalCity}
          citiesPromise={citiesPromise}
        />
      </div>
    </div>
  );
}
