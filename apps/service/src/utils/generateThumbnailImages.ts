const generateThumbnailImages = async (
  urls: string[]
): Promise<File | null> => {
  const canvasWidth = 200;
  const canvasHeight = 300;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const imagePromises = urls.slice(0, 4).map(
    (url) =>
      new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();

        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.src = `${url}?timestamp=${new Date().getTime()}`;
      })
  );

  const images = await Promise.all(imagePromises);
  const count = images.length;

  let positions: { x: number; y: number; w: number; h: number }[] = [];

  if (count === 1) {
    positions = [{ x: 0, y: 0, w: canvasWidth, h: canvasHeight }];
  } else if (count === 2) {
    positions = [
      { x: 0, y: 0, w: canvasWidth, h: canvasHeight / 2 },
      { x: 0, y: canvasHeight / 2, w: canvasWidth, h: canvasHeight / 2 },
    ];
  } else if (count === 3) {
    positions = [
      { x: 0, y: 0, w: 100, h: 300 },
      { x: 100, y: 0, w: 100, h: 150 },
      { x: 100, y: 150, w: 100, h: 150 },
    ];
  } else {
    const halfW = canvasWidth / 2;
    const halfH = canvasHeight / 2;

    positions = [
      { x: 0, y: 0, w: halfW, h: halfH },
      { x: halfW, y: 0, w: halfW, h: halfH },
      { x: 0, y: halfH, w: halfW, h: halfH },
      { x: halfW, y: halfH, w: halfW, h: halfH },
    ];
  }

  images.forEach((img, i) => {
    const pos = positions[i];
    ctx.drawImage(img, pos.x, pos.y, pos.w, pos.h);
  });

  return new Promise<File | null>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "thumbnail.jpeg", {
          type: "image/jpeg",
        });
        resolve(file);
      } else {
        resolve(null);
      }
    }, "image/jpeg");
  });
};

export default generateThumbnailImages;
