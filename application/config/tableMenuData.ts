import { SettingIcon, ResetBtn, TableIcon } from "@/app/components/ui/icons/appIcon";

export const menuData = {
    setting: {
      icon: SettingIcon,
      title: "Table Theme Setting"
    },
    listBtn: [
      {
        icon: TableIcon,
        btn: "zebaraTable",
        label: "Zebra Table",
        cssFile: "zebra",
      },
      {
        icon: TableIcon,
        btn: "colorZebaraTable",
        label: "Color-full Zebra Table",
        cssFile: "colorfullzebra",
      },
      {
        icon: TableIcon,
        btn: "offWhiteTable",
        label: "Off White Table",
        cssFile: "offwhite",
      },
      {
        icon: TableIcon,
        btn: "lightWhiteTable",
        label: "Light White Table",
        cssFile: "lightwhite",
      },
      {
        icon: TableIcon,
        btn: "boxTable",
        label: "Box Table",
        cssFile: "boxtable",
      },
      {
        icon: TableIcon,
        btn: "colorBoxTable",
        label: "Color-full Box Table",
        cssFile: "colorfullboxtable",
      },
      {
        icon: TableIcon,
        btn: "designTable",
        label: "Design Table",
        cssFile: "designing",
      },
      {
        icon: TableIcon,
        btn: "simpleTable",
        label: "Simple Table",
        cssFile: "simple",
      },
      {
        icon: ResetBtn,
        btn: "resetButton",
        label: "Table Reset",
        cssFile: "#",
      },
    ]
};