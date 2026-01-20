"use client";

import { Button } from "@ukesjtu/nomad-ui/components/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@ukesjtu/nomad-ui/components/primitives/dropdown-menu";
import { Separator } from "@ukesjtu/nomad-ui/components/primitives/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ukesjtu/nomad-ui/components/primitives/tabs";
import { useMemo, useState } from "react";
import type { CityData } from "./types";

export interface CitySelectorProps {
  onSelect: (city: CityData) => void;
  title?: string;
  selectedCity?: CityData | null;
  cities: CityData[];
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

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

const CONTINENTS = [
  { label: "热门", value: "popular" },
  { label: "亚洲", value: "Asia" },
  { label: "欧洲", value: "Europe" },
  { label: "美洲", value: "America" },
  { label: "非洲", value: "Africa" },
  { label: "大洋洲", value: "Oceania" },
];

export function CitySelector({
  onSelect,
  title = "选择城市",
  selectedCity,
  cities,
  children,
  open,
  onOpenChange,
}: CitySelectorProps) {
  const allCities = cities;

  const [domesticOrInternational, setDomesticOrInternational] = useState<
    "domestic" | "international"
  >("domestic");
  const [currentTab, setCurrentTab] = useState("popular");

  const filteredCities = useMemo(() => {
    if (domesticOrInternational === "domestic") {
      const domesticCities = allCities.filter(
        city => city.pinyinFirstLetter !== null
      );

      if (currentTab === "popular") {
        return domesticCities.filter(city => city.isPopular);
      }
      const group = LETTER_GROUPS.find(g => g.value === currentTab);
      if (group?.letters) {
        return domesticCities.filter(city =>
          group.letters.includes(city.pinyinFirstLetter ?? "")
        );
      }
    } else {
      const internationalCities = allCities.filter(
        city => city.continent !== null
      );

      if (currentTab === "popular") {
        return internationalCities.filter(city => city.isPopular);
      }
      return internationalCities.filter(city => city.continent === currentTab);
    }

    return [];
  }, [allCities, domesticOrInternational, currentTab]);

  const handleCitySelect = (city: CityData) => {
    onSelect(city);
    // Auto-close dropdown after city selection
    onOpenChange?.(false);
  };

  const handleRegionChange = (region: "domestic" | "international") => {
    setDomesticOrInternational(region);
    setCurrentTab("popular");
  };

  const currentTabs =
    domesticOrInternational === "domestic" ? LETTER_GROUPS : CONTINENTS;

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-[600px] p-0" align="start">
        <div className="flex">
          <div className="w-40 border-r bg-muted/30 p-2 flex flex-col gap-1">
            <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground">
              {title}
            </DropdownMenuLabel>
            <Button
              variant={
                domesticOrInternational === "domestic" ? "secondary" : "ghost"
              }
              className="justify-start w-full"
              onClick={() => handleRegionChange("domestic")}
            >
              国内
            </Button>
            <Button
              variant={
                domesticOrInternational === "international"
                  ? "secondary"
                  : "ghost"
              }
              className="justify-start w-full"
              onClick={() => handleRegionChange("international")}
            >
              国际及港澳台
            </Button>
          </div>

          <div className="flex-1 flex flex-col">
            <Tabs
              value={currentTab}
              onValueChange={setCurrentTab}
              className="flex-1 flex flex-col"
            >
              <TabsList className="rounded-none bg-transparent p-0 h-9 justify-start shrink-0 overflow-x-auto">
                {currentTabs.map(tab => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-none border-0 bg-transparent px-3 py-1.5 text-sm text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-foreground transition-colors"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <Separator />

              {currentTabs.map(tab => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="flex-1 overflow-y-auto p-4 mt-0"
                >
                  <div className="grid grid-cols-5 gap-x-2 gap-y-2">
                    {filteredCities.length === 0 ? (
                      <div className="col-span-5 text-center text-muted-foreground py-8">
                        暂无城市数据
                      </div>
                    ) : (
                      filteredCities.map(city => (
                        <Button
                          key={city.iataCode}
                          variant={
                            selectedCity?.iataCode === city.iataCode
                              ? "default"
                              : "ghost"
                          }
                          onClick={() => handleCitySelect(city)}
                          className="justify-center h-auto py-1.5 px-2 text-sm"
                        >
                          <span className="font-medium">{city.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {city.iataCode}
                          </span>
                        </Button>
                      ))
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
