const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function resizeAndBitmap(
  inputPath,
  width,
  height,
  outputImage,
  outputJSON,
) {
  try {
    // 1️⃣ Redimensionar a imagem
    await sharp(inputPath)
      .resize(width, height, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 }, // fundo transparente
      })
      .toFile(outputImage);

    console.log(`✅ Imagem redimensionada: ${outputImage}`);

    // 2️⃣ Converter para bitmap 0/1
    const { data, info } = await sharp(outputImage)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const bitmap = [];

    for (let y = 0; y < info.height; y++) {
      const row = [];
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];

        // transparente = 0, qualquer cor = 1
        row.push(a === 0 ? 0 : 1);
      }
      bitmap.push(row);
    }

    // 3️⃣ Salvar bitmap em JSON
    fs.mkdirSync(path.dirname(outputJSON), { recursive: true });
    fs.writeFileSync(outputJSON, JSON.stringify(bitmap, null, 2));

    console.log(`✅ Bitmap salvo em: ${outputJSON}`);
  } catch (error) {
    console.error("❌ Erro:", error);
  }
}

resizeAndBitmap(
  "./assets/images/run.gif", // caminho da imagem original
  100, // largura
  200, // altura
  "./assets/images/salsi.png", // imagem redimensionada
  "./assets/bitmaps/salsicha.json", // bitmap em JSON
);
