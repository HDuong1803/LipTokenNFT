import React from "react";
// cards
import { parts } from "../parts/parts";

const _r1 = window.origin + "/images/rarity/_rarity_1.png"
const _r2 = window.origin + "/images/rarity/_rarity_2.png"
const _r3 = window.origin + "/images/rarity/_rarity_3.png"

const LipRenderer = ({ lip = null, size = 200, style }) => {
  if (!lip) {
    return null;
  }

  let lipRarity = _r1

  if (lip.rarity >= 80) {
    lipRarity = _r2;
  }

  if (lip.rarity >= 95) {
    lipRarity = _r3
  }

  let dnaStr = String(lip.dna);

  while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

  let lipDeatils = {
    bg: dnaStr.substring(0, 2) % 5,
    mask: dnaStr.substring(2, 4) % 5,
    line: dnaStr.substring(4, 6) % 5,
    addon: dnaStr.substring(6, 8) % 5,
    addonMouth1: dnaStr.substring(8, 10) % 5,
    addonMouth2: dnaStr.substring(10, 12) % 5,
    addonMouth3: dnaStr.substring(12, 14) % 5,
    name: lip.name,
  };

  const lipStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0
  };

  return (
    <div
      style={{
        minWidth: size,
        minHeight: size,
        position: "relative",
        ...style,
      }}
    >
      <img alt={"bg"} src={window.origin + parts.bg[lipDeatils.bg]} style={lipStyle} />
      <img alt={"mask"} src={window.origin + parts.mask[lipDeatils.mask]} style={lipStyle} />
      <img alt={"line"} src={window.origin + parts.line[lipDeatils.line]} style={lipStyle} />
      <img alt={"addon"} src={window.origin + parts.addon[lipDeatils.addon]} style={lipStyle} />
      <img
        alt={"addon_mouth"}
        src={window.origin + parts.addonMouth1[lipDeatils.addonMouth1]}
        style={lipStyle}
      />
      <img
        alt={"addon_mouth"}
        src={window.origin + parts.addonMouth2[lipDeatils.addonMouth2]}
        style={lipStyle}
      />
      <img
        alt={"addon_mouth"}
        src={window.origin + parts.addonMouth3[lipDeatils.addonMouth3]}
        style={lipStyle}
      />
      <img
        alt={"rarity"}
        src={lipRarity}
        style={lipStyle}
      />
    </div>
  );
};

export default LipRenderer;