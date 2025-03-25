import puppeteer from "puppeteer-core";
import puppeteerPkg from "puppeteer";

export async function POST(req) {
  let browser;
  try {
    const { htmlContent } = await req.json();

    if (!htmlContent) {
      return new Response(
        JSON.stringify({ error: "HTML content is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const isLocal = process.env.NODE_ENV === "development";
    browser = await (isLocal
      ? puppeteerPkg.launch()
      : puppeteer.launch({
          headless: "new",
          executablePath: "/usr/bin/chromium-browser",
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        }));

    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "5mm", right: "10mm", bottom: "10mm", left: "10mm" },
    });

    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error("Puppeteer Error:", error);
    if (browser) await browser.close();
    return new Response(JSON.stringify({ error: "Failed to generate PDF" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
