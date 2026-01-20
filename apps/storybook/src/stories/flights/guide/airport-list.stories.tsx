import type { Meta, StoryObj } from "@storybook/react";
import { AirportList } from "@ukesjtu/nomad-ui/components/flights/guide";

const meta = {
  title: "Flights/Guide/AirportList",
  component: AirportList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AirportList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "热门机场",
    airports: [
      {
        key: "1",
        cityName: "北京",
        airportName: "北京首都国际机场",
        airportCode: "PEK",
      },
      {
        key: "2",
        cityName: "上海",
        airportName: "上海浦东国际机场",
        airportCode: "PVG",
      },
      {
        key: "3",
        cityName: "广州",
        airportName: "广州白云国际机场",
        airportCode: "CAN",
      },
      {
        key: "4",
        cityName: "深圳",
        airportName: "深圳宝安国际机场",
        airportCode: "SZX",
      },
    ],
    emptyMessage: "暂无机场信息。",
  },
};

export const EmptyList: Story = {
  args: {
    title: "热门机场",
    airports: [],
    emptyMessage: "暂无机场信息。",
  },
};

export const SingleAirport: Story = {
  args: {
    title: "热门机场",
    airports: [
      {
        key: "1",
        cityName: "北京",
        airportName: "北京首都国际机场",
        airportCode: "PEK",
      },
    ],
    emptyMessage: "暂无机场信息。",
  },
};

export const ManyAirports: Story = {
  args: {
    title: "热门机场",
    airports: [
      {
        key: "1",
        cityName: "北京",
        airportName: "北京首都国际机场",
        airportCode: "PEK",
      },
      {
        key: "2",
        cityName: "上海",
        airportName: "上海浦东国际机场",
        airportCode: "PVG",
      },
      {
        key: "3",
        cityName: "广州",
        airportName: "广州白云国际机场",
        airportCode: "CAN",
      },
      {
        key: "4",
        cityName: "深圳",
        airportName: "深圳宝安国际机场",
        airportCode: "SZX",
      },
      {
        key: "5",
        cityName: "成都",
        airportName: "成都双流国际机场",
        airportCode: "CTU",
      },
      {
        key: "6",
        cityName: "杭州",
        airportName: "杭州萧山国际机场",
        airportCode: "HGH",
      },
      {
        key: "7",
        cityName: "西安",
        airportName: "西安咸阳国际机场",
        airportCode: "XIY",
      },
      {
        key: "8",
        cityName: "重庆",
        airportName: "重庆江北国际机场",
        airportCode: "CKG",
      },
      {
        key: "9",
        cityName: "武汉",
        airportName: "武汉天河国际机场",
        airportCode: "WUH",
      },
      {
        key: "10",
        cityName: "南京",
        airportName: "南京禄口国际机场",
        airportCode: "NKG",
      },
      {
        key: "11",
        cityName: "青岛",
        airportName: "青岛流亭国际机场",
        airportCode: "TAO",
      },
      {
        key: "12",
        cityName: "厦门",
        airportName: "厦门高崎国际机场",
        airportCode: "XMN",
      },
    ],
    emptyMessage: "暂无机场信息。",
  },
};

export const LongNames: Story = {
  args: {
    title: "热门机场",
    airports: [
      {
        key: "1",
        cityName: "Very Long City Name That Might Cause Truncation Issues",
        airportName:
          "Extremely Long Airport Name That Could Potentially Overflow the Container and Cause Layout Problems",
        airportCode: "VLC",
      },
      {
        key: "2",
        cityName: "Another Very Long City Name for Testing Purposes",
        airportName:
          "Another Extremely Long Airport Name to Test Truncation Behavior in the Component",
        airportCode: "AVL",
      },
    ],
    emptyMessage: "暂无机场信息。",
  },
};

export const CustomTitleAndMessage: Story = {
  args: {
    title: "Popular Airports",
    airports: [],
    emptyMessage: "No airports available at the moment.",
  },
};

export const MixedAirports: Story = {
  args: {
    title: "热门机场",
    airports: [
      {
        key: "1",
        cityName: "北京",
        airportName: "北京首都国际机场",
        airportCode: "PEK",
      },
      {
        key: "2",
        cityName: "New York",
        airportName: "John F. Kennedy International Airport",
        airportCode: "JFK",
      },
      {
        key: "3",
        cityName: "东京",
        airportName: "东京成田国际机场",
        airportCode: "NRT",
      },
      {
        key: "4",
        cityName: "London",
        airportName: "London Heathrow Airport",
        airportCode: "LHR",
      },
      {
        key: "5",
        cityName: "巴黎",
        airportName: "巴黎戴高乐机场",
        airportCode: "CDG",
      },
      {
        key: "6",
        cityName: "Sydney",
        airportName: "Sydney Kingsford Smith Airport",
        airportCode: "SYD",
      },
    ],
    emptyMessage: "暂无机场信息。",
  },
};
