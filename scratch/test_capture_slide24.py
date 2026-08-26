# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright
import os

async def capture_slide_24():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1920, "height": 1080})
        url = "http://localhost:5177/?session=1&slide=24&lang=en"
        await page.goto(url, wait_until="networkidle")
        await page.wait_for_timeout(2000)
        out_path = r"c:\We_are_as_Gods\scratch\test_katex_slide24.png"
        await page.screenshot(path=out_path)
        await browser.close()
        print(f"Captured: {out_path}")

asyncio.run(capture_slide_24())
