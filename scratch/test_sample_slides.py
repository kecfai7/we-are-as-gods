# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def capture_samples():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1920, "height": 1080})
        for s in [1, 2, 3, 7, 15, 22]:
            url = f"http://localhost:5177/?session=1&slide={s}&lang=en"
            await page.goto(url, wait_until="networkidle")
            await page.wait_for_timeout(800)
            await page.evaluate("""() => {
                const header = document.querySelector('header');
                if (header) header.style.display = 'none';
            }""")
            out_path = f"c:\\We_are_as_Gods\\scratch\\sample_slide_{s:02d}.png"
            await page.screenshot(path=out_path)
            print(f"Captured Slide {s:02d}: {out_path}")
        await browser.close()

asyncio.run(capture_samples())
