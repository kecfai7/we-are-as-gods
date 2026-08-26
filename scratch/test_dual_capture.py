# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright
import os

async def test_dual_slide_capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1920, "height": 1080})
        url = "http://localhost:5177/?session=1&slide=1&lang=en"
        await page.goto(url, wait_until="networkidle")
        await page.wait_for_timeout(1000)

        # Check scroll metrics
        metrics = await page.evaluate("""() => {
            const header = document.querySelector('header');
            if (header) header.style.display = 'none';
            
            // Find scroll container
            const container = document.querySelector('main > div:first-child > div:first-child');
            if (!container) return { hasScroll: false, scrollHeight: 0, clientHeight: 0 };
            
            const isScrollable = container.scrollHeight > container.clientHeight + 40;
            return {
                hasScroll: isScrollable,
                scrollHeight: container.scrollHeight,
                clientHeight: container.clientHeight,
                maxScrollTop: container.scrollHeight - container.clientHeight
            };
        }""")
        print("Slide 1 Metrics:", metrics)

        # Capture Top (Part 1)
        await page.evaluate("""() => {
            const container = document.querySelector('main > div:first-child > div:first-child');
            if (container) container.scrollTop = 0;
        }""")
        await page.wait_for_timeout(300)
        p1_path = r"c:\We_are_as_Gods\scratch\test_s1_p1.png"
        await page.screenshot(path=p1_path)
        print("Captured Part 1:", p1_path)

        # Scroll to Diagram / Bottom (Part 2)
        if metrics["hasScroll"]:
            await page.evaluate("""() => {
                const container = document.querySelector('main > div:first-child > div:first-child');
                if (container) {
                    const mermaidEl = container.querySelector('div[style*="box-shadow"]') || container.querySelector('svg');
                    if (mermaidEl) {
                        mermaidEl.scrollIntoView({ behavior: 'instant', block: 'center' });
                    } else {
                        container.scrollTop = container.scrollHeight;
                    }
                }
            }""")
            await page.wait_for_timeout(400)
            p2_path = r"c:\We_are_as_Gods\scratch\test_s1_p2.png"
            await page.screenshot(path=p2_path)
            print("Captured Part 2:", p2_path)

        await browser.close()

asyncio.run(test_dual_slide_capture())
