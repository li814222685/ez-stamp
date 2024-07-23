import { SVG } from "@svgdotjs/svg.js";
export default class StampGenerator {
  constructor(containerId, mainText, baseText) {
    this.draw = SVG().addTo(`#${containerId}`).size(300, 300);
    this.radius = 100;
    this.centerX = 150;
    this.centerY = 150;
    this.mainText = mainText;
    this.baseText = baseText;
    this.generate();
  }
  //五角星path
  static createStarPath(centerX, centerY, spikes, outerRadius, innerRadius) {
    let path = "";
    let angle = Math.PI / spikes;
    let startAngle = -Math.PI / 1.43;

    for (let i = 0; i < 2 * spikes; i++) {
      let radius = i % 2 === 0 ? outerRadius : innerRadius;
      let x = centerX + Math.cos(startAngle + i * angle) * radius;
      let y = centerY - Math.sin(startAngle + i * angle) * radius;
      path += (i === 0 ? "M" : "L") + x + "," + y;
    }
    return path + "Z";
  }
  //外圆path
  static createOuterCirclePath(centerX, centerY, radius) {
    return `M ${centerX} ${
      centerY - radius
    } A ${radius} ${radius} 0 1 1 ${centerX} ${
      centerY + radius
    } A ${radius} ${radius} 0 1 1 ${centerX} ${centerY - radius}`;
  }
  //上弦文path
  static createUptextPath() {
    return `M ${100} ${200} A ${70} ${70} 0 1 1 ${200} ${200}`;
  }
  //下弦文path
  static createBottomtextPath() {
    return `M ${100} ${225} L ${200} ${225}`;
  }

  generate() {
    const starPath = StampGenerator.createStarPath(
      this.centerX,
      this.centerY,
      5,
      35,
      14
    );
    const star = this.draw.path(starPath).fill("red");
    star.transform("l50");

    const outerCirclePath = StampGenerator.createOuterCirclePath(
      this.centerX,
      this.centerY,
      this.radius
    );
    const upTextPath = StampGenerator.createUptextPath();

    this.draw
      .path(outerCirclePath)
      .fill("none")
      .stroke({ color: "red", width: 3 });

    const upperText = this.draw.text((add) => {
      add.tspan(this.mainText).fill("red").font({ size: 26, family: "kai" });
    });
    upperText.node.setAttribute("textLength", 330);
    upperText.path(upTextPath);

    const lowerText = this.draw.text((add) => {
      add
        .tspan(this.baseText)
        .fill("red")
        .font({ size: 20, family: "kai", weight: 1000 });
    });
    lowerText.node.setAttribute("textLength", 100);
    lowerText.path(StampGenerator.createBottomtextPath());
  }

  download() {
    const svgElement = this.draw.node;
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const a = document.createElement("a");
      a.download = "stamp.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = url;
  }
}
