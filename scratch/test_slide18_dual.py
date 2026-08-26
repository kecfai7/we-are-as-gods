# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def capture_slide_18():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1920, "height": 1080})
        url = "http://localhost:5177/?session=1&slide=18&lang=en"
        await page.goto(url, wait_until="networkidle")
        await page.wait_for_timeout(800)
        
        # Hide header
        await page.evaluate("""() => {
            const header = document.querySelector('header');
            if (header) header.style.display = 'none';
        }""")
        
        # 1. Capture Top View (Title + Bullets)
        await page.evaluate("""() => {
            const container = document.querySelector('main > div:first-child > div:first-child');
            if (container) container.scrollTop = 0;
        }""")
        await page.wait_for_timeout(300)
        p1_path = r"c:\We_are_as_Gods\scratch\slide18_top_view.png"
        await page.screenshot(path=p1_path)
        print("Captured Slide 18 Top View:", p1_path)
        
        # 2. Capture Bottom View (Scrolled to Flowchart)
        await page.evaluate("""() => {
            const container = document.querySelector('main > div:first-child > div:first-child');
            if (container) {
                const target = container.querySelector('.focus-diagram-container') || container.querySelector('svg');
                if (target) {
                    target.scrollIntoView({ behavior: 'instant', block: 'center' });
                } else {
                    container.scrollTop = container.scrollHeight;
                }
            }
        }""")
        await page.wait_for_timeout(400)
        p2_path = r"c:\We_are_as_Gods\scratch\slide18_bottom_view.png"
        await page.screenshot(path=p2_path)
        print("Captured Slide 18 Bottom View:", p2_path)
        
        await browser.close()

asyncio.run(capture_slide_18())
