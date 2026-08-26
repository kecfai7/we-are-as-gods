# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1920, "height": 1080})
        url = "http://localhost:5177/?session=1&slide=1&lang=en&view=focus_diagram"
        await page.goto(url, wait_until="networkidle")
        await page.wait_for_timeout(1000)
        await page.evaluate("""() => {
            const header = document.querySelector('header');
            if (header) header.style.display = 'none';
        }""")
        out_path = r"c:\We_are_as_Gods\scratch\test_diag_perfect.png"
        await page.screenshot(path=out_path)
        await browser.close()
        print("Captured:", out_path)

asyncio.run(capture())
