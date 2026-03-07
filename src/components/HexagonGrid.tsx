"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/*
  Honeycomb grid matching cube.irish layout exactly:
  - Pointy-top hexagons with white borders
  - Staggered rows (odd rows offset right by half a hex)
  - Mix of photo hexagons, empty (dark) hexagons, and gold accent hexagons
  - Dark background
*/

type HexCell =
  | { type: "image"; src: string; alt: string }
  | { type: "logo"; src: string; alt: string }
  | { type: "empty" }
  | { type: "gold" };

// 4 columns x 5 rows honeycomb layout
// Odd rows (0, 2, 4) have 4 cells; even rows (1, 3) have 3 cells offset
const honeycombRows: HexCell[][] = [
  // Row 0: 4 cells
  [
    { type: "image", src: "/images/hex-h1.png", alt: "Printing press equipment" },
    { type: "image", src: "/images/hex-h2.png", alt: "Print finishing line" },
    { type: "empty" },
    { type: "gold" },
  ],
  // Row 1: 3 cells (offset right)
  [
    { type: "image", src: "/images/facility-f7.jpg", alt: "Quality control process" },
    { type: "logo", src: "/images/cube-icon.png", alt: "Cube logo" },
    { type: "image", src: "/images/hex-h7.jpg", alt: "Production inspection" },
  ],
  // Row 2: 4 cells
  [
    { type: "empty" },
    { type: "image", src: "/images/facility-f8.jpg", alt: "Print machinery" },
    { type: "image", src: "/images/hex-h4.png", alt: "Packaging line" },
    { type: "image", src: "/images/facility-f5.jpg", alt: "Print operator" },
  ],
  // Row 3: 3 cells (offset right)
  [
    { type: "image", src: "/images/hex-h8.jpg", alt: "Cutting equipment" },
    { type: "image", src: "/images/hex-h9.jpg", alt: "Cube delivery van" },
    { type: "gold" },
  ],
  // Row 4: 4 cells
  [
    { type: "gold" },
    { type: "image", src: "/images/facility-f10.jpg", alt: "Warehouse logistics" },
    { type: "empty" },
    { type: "image", src: "/images/facility-f13.jpg", alt: "Print production floor" },
  ],
];

const hexClip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

// Hex dimensions (percentage of container width)
const HEX_SIZE = 22; // % of container width
const H_GAP = 0.8; // horizontal gap %
const V_OVERLAP = 5; // vertical overlap % (honeycomb interlock — tighter pack)

function getHexPosition(
  row: number,
  col: number,
  isOffsetRow: boolean
): { left: string; top: string } {
  const colWidth = HEX_SIZE + H_GAP;
  const rowHeight = HEX_SIZE * 0.86 - V_OVERLAP; // hex height ≈ 86% of width for pointy-top
  const offsetX = isOffsetRow ? colWidth / 2 : 0;

  return {
    left: `${col * colWidth + offsetX}%`,
    top: `${row * rowHeight}%`,
  };
}

function HexCell({
  cell,
  index,
}: {
  cell: HexCell;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        delay: index * 0.06,
        duration: 0.5,
        type: "spring",
        stiffness: 150,
        damping: 20,
      }}
      className="absolute inset-0 group"
    >
      {/* White border hex */}
      <div
        className="absolute inset-0"
        style={{ clipPath: hexClip }}
      >
        <div className="absolute inset-0 bg-white" />

        {/* Inner hex (inset for border effect) */}
        <div
          className="absolute inset-[5px] overflow-hidden"
          style={{ clipPath: hexClip }}
        >
          {cell.type === "image" && (
            <>
              <Image
                src={cell.src}
                alt={cell.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 25vw, 180px"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
            </>
          )}

          {cell.type === "logo" && (
            <div className="w-full h-full bg-[#D4A014] flex items-center justify-center">
              <Image
                src={cell.src}
                alt={cell.alt}
                width={70}
                height={70}
                className="object-contain drop-shadow-lg"
              />
            </div>
          )}

          {cell.type === "empty" && (
            <div className="w-full h-full bg-[#2a2a2a]" />
          )}

          {cell.type === "gold" && (
            <div className="w-full h-full bg-[#D4A014]/80" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function HexagonGrid() {
  let globalIndex = 0;

  return (
    <div className="relative w-full" style={{ paddingBottom: "72%" }}>
      {honeycombRows.map((row, rowIndex) => {
        const isOffsetRow = rowIndex % 2 === 1;
        return row.map((cell, colIndex) => {
          const pos = getHexPosition(rowIndex, colIndex, isOffsetRow);
          const idx = globalIndex++;
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="absolute"
              style={{
                left: pos.left,
                top: pos.top,
                width: `${HEX_SIZE}%`,
                paddingBottom: `${HEX_SIZE}%`,
              }}
            >
              <HexCell cell={cell} index={idx} />
            </div>
          );
        });
      })}
    </div>
  );
}
