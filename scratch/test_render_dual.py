# -*- coding: utf-8 -*-
"""
Test script for dual slide video generation with ffmpeg concat filter
"""
import asyncio
import os
import subprocess
from playwright.async_api import async_playwright
import build_gods_lecture_mp4 as b

FFMPEG_EXE = b.FFMPEG_EXE

async def test_render_dual():
    b.set_session_directories(1)
    session_data = b.get_session_data(1)
    slide1 = session_data["slides"][0]

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1920, "height": 1080})
        
        # Test build_slide_video
        out = await b.build_slide_video(slide1, page=page, session_id=1)
        print("Result:", out)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(test_render_dual())
