export interface Challenge {
  id: number
  title: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  colors: string[]
  html: string
  css: string
  hints: string[]
  description: string
}

// All targets render in a 400x300 canvas with default margin/padding stripped
const base = `<style>*{margin:0;padding:0}body{width:400px;height:300px;overflow:hidden;`

export const challenges: Challenge[] = [
  // === BEGINNER (1-12) ===
  {
    id: 1,
    title: "Simply Square",
    difficulty: "beginner",
    colors: ["#5d3fd3", "#1e1e2e"],
    html: `${base}background:#1e1e2e}</style><div style="width:200px;height:200px;background:#5d3fd3"></div>`,
    css: `body{background:#1e1e2e}div{width:200px;height:200px;background:#5d3fd3}`,
    hints: ["width", "height", "background"],
    description: "Create a 200×200 purple square on a dark background."
  },
  {
    id: 2,
    title: "Centered Dot",
    difficulty: "beginner",
    colors: ["#f38ba8", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="width:100px;height:100px;border-radius:50%;background:#f38ba8"></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}div{width:100px;height:100px;border-radius:50%;background:#f38ba8}`,
    hints: ["border-radius", "display: flex", "justify-content"],
    description: "Center a pink circle (100×100) on a dark background."
  },
  {
    id: 3,
    title: "Horizon Line",
    difficulty: "beginner",
    colors: ["#89b4fa", "#1e1e2e"],
    html: `${base}background:#1e1e2e}</style><div style="width:400px;height:150px;background:#89b4fa;position:absolute;bottom:0"></div>`,
    css: `body{background:#1e1e2e}div{width:400px;height:150px;background:#89b4fa;position:absolute;bottom:0}`,
    hints: ["position: absolute", "bottom", "width: 400px"],
    description: "Blue rectangle covering the bottom half."
  },
  {
    id: 4,
    title: "Traffic Light",
    difficulty: "beginner",
    colors: ["#f38ba8", "#f9e2af", "#a6e3a1", "#313244"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="background:#313244;border-radius:40px;padding:15px;display:flex;flex-direction:column;gap:10px"><div style="width:50px;height:50px;border-radius:50%;background:#f38ba8"></div><div style="width:50px;height:50px;border-radius:50%;background:#f9e2af"></div><div style="width:50px;height:50px;border-radius:50%;background:#a6e3a1"></div></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}.a{background:#313244;border-radius:40px;padding:15px;display:flex;flex-direction:column;gap:10px}.a div{width:50px;height:50px;border-radius:50%}.b{background:#f38ba8}.c{background:#f9e2af}.d{background:#a6e3a1}`,
    hints: ["flex-direction: column", "gap", "border-radius: 50%"],
    description: "Three circles (red, yellow, green) stacked vertically in a rounded container."
  },
  {
    id: 5,
    title: "Stripe Flag",
    difficulty: "beginner",
    colors: ["#cba6f7", "#89b4fa", "#a6e3a1"],
    html: `${base}background:#cba6f7}</style><div style="width:400px;height:100px;background:#cba6f7"></div><div style="width:400px;height:100px;background:#89b4fa"></div><div style="width:400px;height:100px;background:#a6e3a1"></div>`,
    css: `body{background:#cba6f7}div:nth-child(2){width:400px;height:100px;background:#89b4fa;position:absolute;top:100px}div:nth-child(3){width:400px;height:100px;background:#a6e3a1;position:absolute;top:200px}`,
    hints: ["Three full-width divs", "height: 100px", "position or stacking"],
    description: "Three horizontal stripes filling the canvas."
  },
  {
    id: 6,
    title: "Corner Circles",
    difficulty: "beginner",
    colors: ["#fab387", "#1e1e2e"],
    html: `${base}background:#1e1e2e}</style><div style="width:100px;height:100px;border-radius:50%;background:#fab387;position:absolute;top:0;left:0"></div><div style="width:100px;height:100px;border-radius:50%;background:#fab387;position:absolute;top:0;right:0"></div><div style="width:100px;height:100px;border-radius:50%;background:#fab387;position:absolute;bottom:0;left:0"></div><div style="width:100px;height:100px;border-radius:50%;background:#fab387;position:absolute;bottom:0;right:0"></div>`,
    css: `body{background:#1e1e2e}div{width:100px;height:100px;border-radius:50%;background:#fab387;position:absolute}`,
    hints: ["position: absolute", "border-radius: 50%", "top/bottom/left/right"],
    description: "Four circles, one in each corner."
  },
  {
    id: 7,
    title: "Crosshair",
    difficulty: "beginner",
    colors: ["#f38ba8", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="position:absolute;width:4px;height:300px;background:#f38ba8;left:198px"></div><div style="position:absolute;width:400px;height:4px;background:#f38ba8;top:148px"></div>`,
    css: `body{background:#1e1e2e}div{position:absolute;background:#f38ba8}.a{width:4px;height:300px;left:198px}.b{width:400px;height:4px;top:148px}`,
    hints: ["position: absolute", "Thin rectangles", "Centered horizontally and vertically"],
    description: "A crosshair — two thin lines crossing in the center."
  },
  {
    id: 8,
    title: "Pill Button",
    difficulty: "beginner",
    colors: ["#cba6f7", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="width:200px;height:60px;background:#cba6f7;border-radius:30px"></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}div{width:200px;height:60px;background:#cba6f7;border-radius:30px}`,
    hints: ["border-radius: 30px", "display: flex", "align-items: center"],
    description: "A centered pill shape."
  },
  {
    id: 9,
    title: "Checkerboard Mini",
    difficulty: "beginner",
    colors: ["#313244", "#45475a"],
    html: `${base}background:#313244}</style><div style="width:200px;height:150px;background:#45475a;position:absolute;top:0;left:0"></div><div style="width:200px;height:150px;background:#45475a;position:absolute;bottom:0;right:0"></div>`,
    css: `body{background:#313244}div{width:200px;height:150px;background:#45475a;position:absolute}.a{top:0;left:0}.b{bottom:0;right:0}`,
    hints: ["Two rectangles", "position: absolute", "Opposite corners"],
    description: "2×2 checkerboard — two darker squares on opposite corners."
  },
  {
    id: 10,
    title: "Ring",
    difficulty: "beginner",
    colors: ["#a6e3a1", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="width:150px;height:150px;border:15px solid #a6e3a1;border-radius:50%"></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}div{width:150px;height:150px;border:15px solid #a6e3a1;border-radius:50%}`,
    hints: ["border", "border-radius: 50%", "No background on the div"],
    description: "A centered green ring (border only, no fill)."
  },
  {
    id: 11,
    title: "Diagonal Split",
    difficulty: "beginner",
    colors: ["#cba6f7", "#89b4fa"],
    html: `${base}background:#89b4fa}</style><div style="width:0;height:0;border-left:400px solid #cba6f7;border-bottom:300px solid transparent"></div>`,
    css: `body{background:#89b4fa}div{width:0;height:0;border-left:400px solid #cba6f7;border-bottom:300px solid transparent}`,
    hints: ["border trick for triangles", "border-left + border-bottom", "width:0;height:0"],
    description: "Canvas split diagonally — purple top-left, blue bottom-right."
  },
  {
    id: 12,
    title: "Stacked Bars",
    difficulty: "beginner",
    colors: ["#f38ba8", "#fab387", "#f9e2af", "#a6e3a1", "#89b4fa", "#cba6f7"],
    html: `${base}background:#1e1e2e;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:10px}</style><div style="width:300px;height:20px;background:#f38ba8"></div><div style="width:250px;height:20px;background:#fab387"></div><div style="width:200px;height:20px;background:#f9e2af"></div><div style="width:150px;height:20px;background:#a6e3a1"></div><div style="width:100px;height:20px;background:#89b4fa"></div><div style="width:50px;height:20px;background:#cba6f7"></div>`,
    css: `body{background:#1e1e2e;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:10px}`,
    hints: ["flex-direction: column", "Decreasing widths", "gap"],
    description: "Six centered horizontal bars of decreasing width, rainbow colored."
  },

  // === INTERMEDIATE (13-24) ===
  {
    id: 13,
    title: "Triangle Up",
    difficulty: "intermediate",
    colors: ["#cba6f7", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="width:0;height:0;border-left:80px solid transparent;border-right:80px solid transparent;border-bottom:140px solid #cba6f7"></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}div{width:0;height:0;border-left:80px solid transparent;border-right:80px solid transparent;border-bottom:140px solid #cba6f7}`,
    hints: ["border trick", "width:0;height:0", "border-bottom for upward triangle"],
    description: "A centered upward-pointing triangle."
  },
  {
    id: 14,
    title: "Diamond",
    difficulty: "intermediate",
    colors: ["#89b4fa", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="width:120px;height:120px;background:#89b4fa;transform:rotate(45deg)"></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}div{width:120px;height:120px;background:#89b4fa;transform:rotate(45deg)}`,
    hints: ["transform: rotate(45deg)", "A rotated square", "display: flex for centering"],
    description: "A centered diamond (rotated square)."
  },
  {
    id: 15,
    title: "Pac-Man",
    difficulty: "intermediate",
    colors: ["#f9e2af", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="width:150px;height:150px;background:#f9e2af;border-radius:50%;clip-path:polygon(100% 50%,40% 40%,40% 60%)"></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}div{width:150px;height:150px;background:#f9e2af;border-radius:50%;clip-path:polygon(100% 50%,40% 40%,40% 60%)}`,
    hints: ["clip-path: polygon()", "border-radius: 50%", "Mouth is a wedge cutout"],
    description: "A Pac-Man shape — yellow circle with a triangular mouth."
  },
  {
    id: 16,
    title: "Concentric Rings",
    difficulty: "intermediate",
    colors: ["#f38ba8", "#cba6f7", "#89b4fa", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="width:200px;height:200px;border-radius:50%;border:20px solid #f38ba8;display:flex;justify-content:center;align-items:center"><div style="width:120px;height:120px;border-radius:50%;border:20px solid #cba6f7;display:flex;justify-content:center;align-items:center"><div style="width:50px;height:50px;border-radius:50%;background:#89b4fa"></div></div></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}`,
    hints: ["Nested divs", "border on each ring", "border-radius: 50%"],
    description: "Three concentric circles — red ring, purple ring, blue filled center."
  },
  {
    id: 17,
    title: "Grid of Dots",
    difficulty: "intermediate",
    colors: ["#a6e3a1", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;flex-wrap:wrap;justify-content:center;align-content:center;gap:20px;padding:40px}</style>${Array(9).fill('<div style="width:40px;height:40px;border-radius:50%;background:#a6e3a1"></div>').join('')}`,
    css: `body{background:#1e1e2e;display:flex;flex-wrap:wrap;justify-content:center;align-content:center;gap:20px;padding:40px}div{width:40px;height:40px;border-radius:50%;background:#a6e3a1}`,
    hints: ["flex-wrap: wrap", "gap: 20px", "9 identical circles in 3×3"],
    description: "A 3×3 grid of green dots."
  },
  {
    id: 18,
    title: "Gradient Sunset",
    difficulty: "intermediate",
    colors: ["#f38ba8", "#fab387", "#f9e2af"],
    html: `${base}background:linear-gradient(to bottom,#f38ba8,#fab387,#f9e2af)}</style>`,
    css: `body{background:linear-gradient(to bottom,#f38ba8,#fab387,#f9e2af)}`,
    hints: ["linear-gradient", "to bottom", "Three color stops"],
    description: "A vertical gradient from pink to orange to yellow."
  },
  {
    id: 19,
    title: "Crescent Moon",
    difficulty: "intermediate",
    colors: ["#f9e2af", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="width:140px;height:140px;border-radius:50%;box-shadow:30px 0 0 0 #f9e2af"></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}div{width:140px;height:140px;border-radius:50%;box-shadow:30px 0 0 0 #f9e2af}`,
    hints: ["box-shadow", "border-radius: 50%", "Shadow offset creates crescent"],
    description: "A crescent moon using box-shadow."
  },
  {
    id: 20,
    title: "Plus Sign",
    difficulty: "intermediate",
    colors: ["#f38ba8", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="position:relative"><div style="width:60px;height:180px;background:#f38ba8;position:absolute;top:-90px;left:-30px"></div><div style="width:180px;height:60px;background:#f38ba8;position:absolute;top:-30px;left:-90px"></div></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}`,
    hints: ["Two overlapping rectangles", "One vertical, one horizontal", "position: absolute"],
    description: "A red plus/cross sign centered on the canvas."
  },
  {
    id: 21,
    title: "Eyes",
    difficulty: "intermediate",
    colors: ["#cdd6f4", "#313244", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center;gap:40px}</style><div style="width:100px;height:80px;background:#cdd6f4;border-radius:50%;display:flex;justify-content:center;align-items:center"><div style="width:40px;height:40px;background:#313244;border-radius:50%"></div></div><div style="width:100px;height:80px;background:#cdd6f4;border-radius:50%;display:flex;justify-content:center;align-items:center"><div style="width:40px;height:40px;background:#313244;border-radius:50%"></div></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center;gap:40px}`,
    hints: ["Nested circles", "gap between the eyes", "border-radius: 50% on oval"],
    description: "Two cartoon eyes — white ovals with dark pupils."
  },
  {
    id: 22,
    title: "Hourglass",
    difficulty: "intermediate",
    colors: ["#cba6f7", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;flex-direction:column;justify-content:center;align-items:center}</style><div style="width:0;height:0;border-left:60px solid transparent;border-right:60px solid transparent;border-top:80px solid #cba6f7"></div><div style="width:0;height:0;border-left:60px solid transparent;border-right:60px solid transparent;border-bottom:80px solid #cba6f7"></div>`,
    css: `body{background:#1e1e2e;display:flex;flex-direction:column;justify-content:center;align-items:center}`,
    hints: ["Two triangles", "border trick", "flex-direction: column"],
    description: "An hourglass made of two triangles pointing inward."
  },
  {
    id: 23,
    title: "Rounded Square Stack",
    difficulty: "intermediate",
    colors: ["#f38ba8", "#fab387", "#f9e2af", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:12px}</style><div style="width:180px;height:60px;background:#f38ba8;border-radius:12px"></div><div style="width:180px;height:60px;background:#fab387;border-radius:12px"></div><div style="width:180px;height:60px;background:#f9e2af;border-radius:12px"></div>`,
    css: `body{background:#1e1e2e;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:12px}div{width:180px;height:60px;border-radius:12px}`,
    hints: ["border-radius: 12px", "gap: 12px", "flex-direction: column"],
    description: "Three rounded colored bars stacked vertically."
  },
  {
    id: 24,
    title: "Yin Yang",
    difficulty: "intermediate",
    colors: ["#cdd6f4", "#313244", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="width:160px;height:160px;border-radius:50%;background:linear-gradient(to right,#cdd6f4 50%,#313244 50%);position:relative;overflow:hidden"><div style="width:80px;height:80px;border-radius:50%;background:#313244;position:absolute;top:0;left:40px"></div><div style="width:80px;height:80px;border-radius:50%;background:#cdd6f4;position:absolute;bottom:0;left:40px"></div><div style="width:20px;height:20px;border-radius:50%;background:#cdd6f4;position:absolute;top:30px;left:70px"></div><div style="width:20px;height:20px;border-radius:50%;background:#313244;position:absolute;bottom:30px;left:70px"></div></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}`,
    hints: ["linear-gradient for half split", "Overlapping circles", "position: relative + absolute"],
    description: "A yin-yang symbol."
  },

  // === ADVANCED (25-32) ===
  {
    id: 25,
    title: "CSS Heart",
    difficulty: "advanced",
    colors: ["#f38ba8", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="position:relative;width:100px;height:90px;margin-top:30px"><div style="position:absolute;width:52px;height:80px;background:#f38ba8;border-radius:50px 50px 0 0;transform:rotate(-45deg);left:26px;top:-30px"></div><div style="position:absolute;width:52px;height:80px;background:#f38ba8;border-radius:50px 50px 0 0;transform:rotate(45deg);left:22px;top:-30px"></div></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}`,
    hints: ["Two rotated rectangles with rounded tops", "transform: rotate(±45deg)", "border-radius on top only"],
    description: "A heart shape made from two rotated rounded rectangles."
  },
  {
    id: 26,
    title: "Hexagon",
    difficulty: "advanced",
    colors: ["#89b4fa", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="width:150px;height:150px;background:#89b4fa;clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)"></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}div{width:150px;height:150px;background:#89b4fa;clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)}`,
    hints: ["clip-path: polygon()", "6-point polygon", "Hexagon coordinates"],
    description: "A centered blue hexagon."
  },
  {
    id: 27,
    title: "Olympic Rings",
    difficulty: "advanced",
    colors: ["#89b4fa", "#f9e2af", "#313244", "#a6e3a1", "#f38ba8"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="position:relative;width:340px;height:150px"><div style="width:80px;height:80px;border:8px solid #89b4fa;border-radius:50%;position:absolute;left:0;top:0"></div><div style="width:80px;height:80px;border:8px solid #f9e2af;border-radius:50%;position:absolute;left:64px;top:0"></div><div style="width:80px;height:80px;border:8px solid #313244;border-radius:50%;position:absolute;left:128px;top:0"></div><div style="width:80px;height:80px;border:8px solid #a6e3a1;border-radius:50%;position:absolute;left:192px;top:0"></div><div style="width:80px;height:80px;border:8px solid #f38ba8;border-radius:50%;position:absolute;left:256px;top:0"></div></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}`,
    hints: ["5 rings with border only", "position: absolute for overlap", "Each ring offset by ~64px"],
    description: "Five interlocking colored rings."
  },
  {
    id: 28,
    title: "Radial Burst",
    difficulty: "advanced",
    colors: ["#fab387", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="width:200px;height:200px;background:repeating-conic-gradient(#fab387 0deg 10deg,transparent 10deg 20deg);border-radius:50%"></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}div{width:200px;height:200px;background:repeating-conic-gradient(#fab387 0deg 10deg,transparent 10deg 20deg);border-radius:50%}`,
    hints: ["repeating-conic-gradient", "border-radius: 50%", "Alternating color and transparent"],
    description: "A sunburst pattern — alternating orange and transparent wedges in a circle."
  },
  {
    id: 29,
    title: "CSS Star",
    difficulty: "advanced",
    colors: ["#f9e2af", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="width:120px;height:120px;background:#f9e2af;clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}div{width:120px;height:120px;background:#f9e2af;clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)}`,
    hints: ["clip-path: polygon()", "10-point star coordinates", "Look up CSS star clip-path"],
    description: "A 5-pointed star."
  },
  {
    id: 30,
    title: "Chessboard 4×4",
    difficulty: "advanced",
    colors: ["#cdd6f4", "#313244"],
    html: `${base}background:repeating-conic-gradient(#313244 0% 25%,#cdd6f4 0% 50%) 0 0/100px 75px}</style>`,
    css: `body{background:repeating-conic-gradient(#313244 0% 25%,#cdd6f4 0% 50%) 0 0/100px 75px}`,
    hints: ["repeating-conic-gradient", "background-size for tile dimensions", "Two colors alternating"],
    description: "A 4×4 chessboard pattern filling the canvas."
  },
  {
    id: 31,
    title: "Layered Waves",
    difficulty: "advanced",
    colors: ["#89b4fa", "#74c7ec", "#94e2d5", "#1e1e2e"],
    html: `${base}background:#1e1e2e}</style><div style="position:absolute;bottom:0;width:400px;height:120px;background:#94e2d5;border-radius:100% 100% 0 0/60px 60px 0 0"></div><div style="position:absolute;bottom:0;width:400px;height:90px;background:#74c7ec;border-radius:100% 100% 0 0/50px 50px 0 0"></div><div style="position:absolute;bottom:0;width:400px;height:60px;background:#89b4fa;border-radius:100% 100% 0 0/40px 40px 0 0"></div>`,
    css: `body{background:#1e1e2e}`,
    hints: ["border-radius with / syntax", "Stacked layers with position: absolute", "bottom: 0 alignment"],
    description: "Three layered wave shapes at the bottom of the canvas."
  },
  {
    id: 32,
    title: "Spiral Squares",
    difficulty: "advanced",
    colors: ["#f38ba8", "#fab387", "#f9e2af", "#a6e3a1", "#89b4fa", "#1e1e2e"],
    html: `${base}background:#1e1e2e;display:flex;justify-content:center;align-items:center}</style><div style="position:relative;width:200px;height:200px"><div style="width:200px;height:200px;background:#f38ba8;position:absolute"></div><div style="width:160px;height:160px;background:#fab387;position:absolute;right:0;bottom:0"></div><div style="width:120px;height:120px;background:#f9e2af;position:absolute;bottom:0"></div><div style="width:80px;height:80px;background:#a6e3a1;position:absolute;left:0;top:0"></div><div style="width:40px;height:40px;background:#89b4fa;position:absolute;top:0;right:80px"></div></div>`,
    css: `body{background:#1e1e2e;display:flex;justify-content:center;align-items:center}`,
    hints: ["Nested absolute squares", "Decreasing size by 40px", "Each offset to a different corner"],
    description: "Concentric squares spiraling inward with different colors."
  },
]
