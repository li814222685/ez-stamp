import { SVG } from "@svgdotjs/svg.js";
export default class StampGenerator {
  constructor(containerId, mainText = "", baseText = "", codeText = "") {
    this.draw = SVG().addTo(`#${containerId}`).size(300, 300);
    this.radius = 100;
    this.centerX = 150;
    this.centerY = 150;
    this.mainText = mainText;
    this.baseText = baseText;
    this.codeText = codeText;
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
  static createUptextPath() {
    return `M ${86} ${175} A ${67} ${67} 0 1 1 ${205} ${192}`;
  }

  static createBottomtextPath() {
    return `M ${100} ${205} L ${200} ${205}`;
  }
  static createCodeTextPath() {
    return `M ${85} ${210} A ${70} ${80} 0 1 0 ${218} ${50}`;
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
    upperText.node.setAttribute("textLength", 250);
    upperText.path(upTextPath);

    const lowerText = this.draw.text((add) => {
      add
        .tspan(this.baseText)
        .fill("red")
        .font({ size: 20, family: "kai", weight: 1000 });
    });
    lowerText.node.setAttribute("textLength", 100);
    lowerText.path(StampGenerator.createBottomtextPath());
    const codeText = this.draw.text((add) => {
      add.tspan(this.codeText).fill("red").font({ size: 12 });
    });
    codeText.path(StampGenerator.createCodeTextPath());
    codeText.node.setAttribute("textLength", 150);
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
