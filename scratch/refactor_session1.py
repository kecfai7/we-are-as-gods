# -*- coding: utf-8 -*-
"""
Script to rewrite session1_EN.md with lively, authentic, global-student friendly Tiki-Taka dialogues.
"""

import re
import os

session1_path = r"c:\We_are_as_Gods\session1_EN.md"

with open(session1_path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's define the new dialogues for all 45 slides:
dialogues = {}

# Slide 01
dialogues[1] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Prof. Peter Kim:** Welcome everyone to Session 1! Today, we are opening what we call the **Theurgicon**—our classroom for managing godlike technologies. Elena, Marcus, are you ready? *(Turn 1)*  
> **Dr. Elena Vance:** Ready, Professor! To put it simply for our students: in ancient times, *theurgy* meant the work of the gods. Today in 2026, it means tools like CRISPR, AI, and bionic eyes that make mythical miracles real. *(Turn 2)*  
> **TA Marcus Brody:** Hold on, Dr. Vance—when students hear "godlike powers," it sounds like marketing hype. Are we really saying humans are becoming gods? *(Turn 3)*  
> **Prof. Peter Kim:** Think about it this way, Marcus: if someone from 2,000 years ago saw you curing blindness with a microchip or creating new proteins on a laptop, what would they call you? *(Turn 4)*  
> **TA Marcus Brody:** A miracle worker, no doubt! *(Turn 5)*  
> **Dr. Elena Vance:** Exactly. But here is the catch: our tools are godlike, but our brains are still the same brains that hunted on the savannah thousands of years ago. *(Turn 6)*  
> **TA Marcus Brody:** So having godlike tools without wisdom is like handing a toddler a loaded laser blaster. *(Turn 7)*  
> **Prof. Peter Kim:** Spot on. That is why this course exists: to build the wisdom and responsibility to match our power. Let’s jump into Slide 2. *(Turn 8)*"""

# Slide 02
dialogues[2] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Dr. Elena Vance:** Look at this quote from 1968 by Stewart Brand: *"We are as gods and might as well get good at it."* People thought he was just being poetic back then. *(Turn 1)*  
> **TA Marcus Brody:** Right! In 1968, Brand was talking about buying hand tools and building your own cabin so you didn't have to rely on big corporations. *(Turn 2)*  
> **Prof. Peter Kim:** Exactly. But look at the table on Slide 2. In 1968, it was about personal freedom. Today in 2026, getting good at being gods is about survival. *(Turn 3)*  
> **TA Marcus Brody:** Because if you made a mistake with a hand tool in 1968, you hurt your thumb. Today, if an autonomous AI or a synthetic virus goes wrong, the whole planet is at risk! *(Turn 4)*  
> **Dr. Elena Vance:** That's the difference. The power is already here. Our only job now is to get good at using it. *(Turn 5)*  
> **Prof. Peter Kim:** Let’s see how humanity got to this point on Slide 3. *(Turn 6)*"""

# Slide 03
dialogues[3] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Professor Kim, in ancient Greek myths, *Theogony* was the story of how the gods were born. How does that connect to modern tech? *(Turn 1)*  
> **Prof. Peter Kim:** Look at the flowchart on Slide 3. In the past, humans prayed to the gods for rain, health, and protection. Today, we write code and build chips to do those exact things ourselves. *(Turn 2)*  
> **Dr. Elena Vance:** We started as primitive hunters, unlocked exponential tech, and now we hold godlike powers. That brings us to Stage 4: the Theurgicon. *(Turn 3)*  
> **TA Marcus Brody:** But remember, Greek gods were famous for making terrible emotional decisions when they got angry! If we have their power, we better not act like them! *(Turn 4)*  
> **Prof. Peter Kim:** That is why the Theurgicon is an ethical training ground—to make sure we build moral wisdom before we deploy these powers. *(Turn 5)*  
> **Dr. Elena Vance:** Let’s ask the tough question on Slide 4: Are we actually ready for this? *(Turn 6)*"""

# Slide 04
dialogues[4] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Prof. Peter Kim:** Here is our central question for the semester: **Are we equipped to handle godlike capability?** Elena, what does science tell us? *(Turn 1)*  
> **Dr. Elena Vance:** Honestly? Not by default. Our conscious brain can only process about 120 bits of information per second. But the digital world is throwing zettabytes of data at us every day! *(Turn 2)*  
> **TA Marcus Brody:** And look around! We have smartphones, endless food, and instant communication, but anxiety and depression are at all-time highs. Why? *(Turn 3)*  
> **Prof. Peter Kim:** Because our brains evolved for scarcity. When you remove physical struggle without giving people a higher purpose, you get what John Calhoun found in his famous *Universe 25* mouse experiment. *(Turn 4)*  
> **TA Marcus Brody:** The mice had unlimited food and water, but without challenges, their society completely collapsed! *(Turn 5)*  
> **Dr. Elena Vance:** Exactly. Abundance without purpose causes the brain to turn against itself. *(Turn 6)*  
> **Prof. Peter Kim:** So our mission is to build the mental and ethical software to thrive in an age of plenty. Let’s look at our roadmap on Slide 5. *(Turn 7)*"""

# Slide 05
dialogues[5] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Dr. Elena Vance:** Slide 5 shows our 15-week journey divided into four clear phases. *(Turn 1)*  
> **TA Marcus Brody:** In Phase 1, we learn the rules of exponential growth and mental models. In Phase 2, we look at real hardware miracles—like bionic eyes and delivery drones. *(Turn 2)*  
> **Prof. Peter Kim:** Then in Phase 3, we explore the dark side: information overload, metabolic health crises, and social media addiction. *(Turn 3)*  
> **Dr. Elena Vance:** And in Phase 4, we build solutions: upgrading our minds and designing a massive $100-Billion XPRIZE project! *(Turn 4)*  
> **TA Marcus Brody:** It’s a practical survival guide for the future! *(Turn 5)*  
> **Prof. Peter Kim:** Let’s move to Module 2 and look at the core book by Peter Diamandis and Steven Kotler. *(Turn 6)*"""

# Slide 06
dialogues[6] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Prof. Peter Kim:** Let's look at our main textbook, *We Are as Gods* by Peter Diamandis and Steven Kotler. Notice how these two authors balance each other. *(Turn 1)*  
> **Dr. Elena Vance:** It's a great partnership. Diamandis is the tech optimist—he brings the data showing how AI, biology, and energy are solving scarcity. *(Turn 2)*  
> **TA Marcus Brody:** And Kotler is the brain expert—he reminds us that if our biology can't handle the stress, all that tech won't save us! *(Turn 3)*  
> **Prof. Peter Kim:** Exactly. Diamandis steps on the accelerator, and Kotler makes sure the steering wheel and brakes work. *(Turn 4)*  
> **TA Marcus Brody:** And their main point for 2026 is simple: things that used to be called "miracles" are now regular engineering projects. *(Turn 5)*  
> **Dr. Elena Vance:** Let's look at their census of 83 historical miracles on Slide 7 to see what that means. *(Turn 6)*"""

# Slide 07
dialogues[7] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Dr. Elena Vance:** Diamandis and Kotler cataloged 83 famous miracles from ancient scriptures and myths. Look at the pie chart on Slide 7! What stands out, Marcus? *(Turn 1)*  
> **TA Marcus Brody:** It's obvious! Almost half of all ancient miracles are about just two things: **Healing the sick** and **Multiplying food**! *(Turn 2)*  
> **Prof. Peter Kim:** Because for thousands of years, those were humanity's two greatest fears: deadly disease and starvation. *(Turn 3)*  
> **TA Marcus Brody:** People back then weren't asking gods for spaceships. They prayed: *"Please cure my child's fever, and give us enough wheat to survive the winter."* *(Turn 4)*  
> **Dr. Elena Vance:** And today, modern medicine and industrial agriculture have turned those desperate prayers into everyday science. *(Turn 5)*  
> **Prof. Peter Kim:** Let's look closely at these miracle domains, starting with Creation and Food on Slide 8. *(Turn 6)*"""

# Slide 08
dialogues[8] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Look at Domain 1 and 2 on Slide 8. Creating something out of nothing, and feeding thousands of people with a few loaves of bread. *(Turn 1)*  
> **Dr. Elena Vance:** In 2026, you can type a short prompt into a generative AI tool, and within seconds, it creates a photo-realistic 3D world or designs a new protein from scratch. *(Turn 2)*  
> **Prof. Peter Kim:** That is creation from mathematics. And what about food, Marcus? *(Turn 3)*  
> **TA Marcus Brody:** Bioreactors and vertical farms! Companies can grow real meat directly from animal cells without raising or slaughtering livestock, using 95% less land and water! *(Turn 4)*  
> **Dr. Elena Vance:** When the cost of producing food and information drops toward zero, scarcity begins to disappear. *(Turn 5)*  
> **Prof. Peter Kim:** Let's check Domain 2 on Slide 9: Weather and Healing. *(Turn 6)*"""

# Slide 09
dialogues[9] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Dr. Elena Vance:** In ancient stories, calming a storm or healing the blind were the ultimate proofs of divine power. *(Turn 1)*  
> **TA Marcus Brody:** And today, look at desalination plants! Places like Israel and Dubai turn millions of gallons of salty seawater into clean drinking water every single day for pennies. *(Turn 2)*  
> **Prof. Peter Kim:** And in medicine, the PRIMA chip gives sight back to blind patients, while CRISPR gene-editing has cured genetic diseases like sickle cell anemia with a single treatment. *(Turn 3)*  
> **TA Marcus Brody:** Diseases that caused suffering for thousands of years are being crossed off the list one by one! *(Turn 4)*  
> **Dr. Elena Vance:** Next up on Slide 10: what about reversing aging and extreme defense? *(Turn 5)*  
> **Prof. Peter Kim:** Let's take a look. *(Turn 6)*"""

# Slide 10
dialogues[10] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Wait—Slide 10 lists "Resurrection." That sounds crazy, Dr. Vance! How can science talk about resurrection? *(Turn 1)*  
> **Dr. Elena Vance:** It's about cellular rejuvenation, Marcus. Scientists using Yamanaka factors can reset aged animal cells back to a youthful state, repairing DNA damage. *(Turn 2)*  
> **Prof. Peter Kim:** Aging is increasingly understood not as an unavoidable curse, but as biological damage that can be repaired. *(Turn 3)*  
> **TA Marcus Brody:** And look at Domain 6: Laser defense! Systems like Iron Beam use high-powered light beams to shoot down rockets in mid-air for two dollars a shot! *(Turn 4)*  
> **Dr. Elena Vance:** From cellular repair to laser shields, physics is delivering what once seemed like magic. *(Turn 5)*  
> **Prof. Peter Kim:** Now let's look at Slide 11: Predicting the future and universal translation. *(Turn 6)*"""

# Slide 11
dialogues[11] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Dr. Elena Vance:** In ancient Egypt, Joseph predicted seven years of harvest and seven years of famine. *(Turn 1)*  
> **TA Marcus Brody:** Today, global weather AI and digital twins track global climate patterns, predicting storms and crop yields weeks ahead with supercomputers! *(Turn 2)*  
> **Prof. Peter Kim:** And look at Domain 8: Universal speech. The ancient story of Pentecost where everyone understood every language. *(Turn 3)*  
> **TA Marcus Brody:** Put on AI earbuds today, and you can speak English while someone in Tokyo hears you in fluent Japanese in your own cloned voice! *(Turn 4)*  
> **Dr. Elena Vance:** Language barriers that divided humanity for millennia are evaporating in real time. *(Turn 5)*  
> **Prof. Peter Kim:** But power also has a dark side. Let's look at Slide 12: Autonomous weapons and modern warfare. *(Turn 6)*"""

# Slide 12
dialogues[12] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Slide 12 covers the scary side: targeted destruction and asymmetric warfare. *(Turn 1)*  
> **Dr. Elena Vance:** Look at modern battlefields. A 500-dollar commercial drone with AI vision can track and destroy an 8-million-dollar battle tank. *(Turn 2)*  
> **Prof. Peter Kim:** That is the modern story of David and Goliath—a tiny, cheap device defeating a giant weapon system. *(Turn 3)*  
> **TA Marcus Brody:** But the real danger is when drones make lethal decisions on their own in milliseconds without human judgment! *(Turn 4)*  
> **Dr. Elena Vance:** When algorithms decide who lives and dies, human ethics are removed from the loop. *(Turn 5)*  
> **Prof. Peter Kim:** That is why power without wisdom leads straight to disaster. Now let's explore Peter Diamandis's economic theory on Slide 13. *(Turn 6)*"""

# Slide 13
dialogues[13] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Prof. Peter Kim:** Marcus, explain Peter Diamandis’s core idea: why does he say scarcity is mostly an illusion? *(Turn 1)*  
> **TA Marcus Brody:** Take aluminum! In the 1800s, aluminum was rarer and more expensive than gold. King Napoleon of France used aluminum spoons to impress guests because extracting it was so hard! *(Turn 2)*  
> **Dr. Elena Vance:** But once electricity-based smelting was invented in 1886, aluminum became super cheap. The atoms were always there; we just needed the technology to unlock them. *(Turn 3)*  
> **TA Marcus Brody:** Same with solar power today! The sun sends 8,000 times more energy to Earth every day than all of humanity uses. It's not a scarcity of energy; it's a capture problem! *(Turn 4)*  
> **Prof. Peter Kim:** Exactly. Technology takes scarce things and makes them abundant. But Kotler warns us about our biology on Slide 14. *(Turn 5)*  
> **Dr. Elena Vance:** Let's see what happens to our ancient brains when surrounded by abundance. *(Turn 6)*"""

# Slide 14
dialogues[14] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Dr. Elena Vance:** Slide 14 highlights Steven Kotler's warning: our brains evolved for survival on the savannah, where danger was everywhere. *(Turn 1)*  
> **TA Marcus Brody:** Right! If an early human heard a bush shake, assuming it was a lion kept them alive. We are the grandchildren of the cautious and paranoid! *(Turn 2)*  
> **Prof. Peter Kim:** But when you put that paranoid brain in front of a 24/7 smartphone feed showing global disasters every minute, what happens? *(Turn 3)*  
> **TA Marcus Brody:** The brain goes into constant panic mode! Stress hormones surge, even though we are sitting safely in our rooms. *(Turn 4)*  
> **Dr. Elena Vance:** That is why abundance often causes anxiety instead of peace. We need **Mind 2.0**—deliberate mental training to manage this flood of information. *(Turn 5)*  
> **Prof. Peter Kim:** Let's look at the complete Miracle-to-Tech Matrix on Slide 15. *(Turn 6)*"""

# Slide 15
dialogues[15] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Prof. Peter Kim:** Slide 15 connects all 10 miracle domains to modern technology and their real risks. *(Turn 1)*  
> **TA Marcus Brody:** Look at the right column—every single superpower comes with a real danger! AI creation brings fake news; longevity biotech could let billionaires monopolize life; autonomous drones could destabilize nations. *(Turn 2)*  
> **Dr. Elena Vance:** There is no free lunch in technology. Every godlike tool demands equal responsibility. *(Turn 3)*  
> **Prof. Peter Kim:** That is why learning ethics and systems thinking is just as important as learning to write code. *(Turn 4)*  
> **TA Marcus Brody:** Let's see how these exponential models actually work in Module 3! *(Turn 5)*  
> **Dr. Elena Vance:** Slide 16 kicks off with creation in AI latent space! *(Turn 6)*"""

# Slide 16
dialogues[16] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Dr. Elena Vance:** Look at Slide 16. In ancient theology, *Creatio Ex Nihilo* meant creating order out of total nothingness. Today, diffusion AI does this mathematically. *(Turn 1)*  
> **TA Marcus Brody:** How does that work in plain English, Elena? *(Turn 2)*  
> **Dr. Elena Vance:** The AI starts with pure random static—like TV static with zero picture. Then, step by step, the algorithm removes the noise until a clear image, video, or protein design appears! *(Turn 3)*  
> **Prof. Peter Kim:** In the past, creating something meant cutting wood or shaping metal. Today, creation starts as pure math inside a computer chip. *(Turn 4)*  
> **TA Marcus Brody:** If you can describe it, the computer can generate it! But we have to be careful with deepfakes and misinformation. *(Turn 5)*  
> **Prof. Peter Kim:** Exactly. Next, let's look at Slide 17: How AI changes how we search and learn. *(Turn 6)*"""

# Slide 17
dialogues[17] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Remember when researching meant opening 30 tabs on Google and reading 50-page PDFs all night? *(Turn 1)*  
> **Dr. Elena Vance:** That old way of searching is ending. Slide 17 shows how modern AI agents read thousands of papers, connect the dots, and answer complex questions directly. *(Turn 2)*  
> **Prof. Peter Kim:** This changes what it means to be smart. In the past, being smart meant memorizing lots of facts. Today, the machine knows all the facts. *(Turn 3)*  
> **TA Marcus Brody:** So what makes a student smart today? *(Turn 4)*  
> **Prof. Peter Kim:** Asking great questions! If you ask a generic question, you get a generic answer. If you ask a deep, creative question, the AI helps you discover new insights. *(Turn 5)*  
> **Dr. Elena Vance:** Now let's see how satellite networks make us present everywhere on Slide 18. *(Turn 6)*"""

# Slide 18
dialogues[18] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Prof. Peter Kim:** Look at Slide 18: Omnipresence—being everywhere at the same time. *(Turn 1)*  
> **Dr. Elena Vance:** With tens of thousands of satellites in low orbit and high-speed networks, a surgeon in Seoul can control a robotic arm to operate on a patient in Africa in real time! *(Turn 2)*  
> **TA Marcus Brody:** That's amazing, but look at the strange feeling it creates: your digital actions are happening across the world, while your physical body is sitting on a chair at home! *(Turn 3)*  
> **Dr. Elena Vance:** Scientists call that feeling dissociation—feeling disconnected from your physical body because your mind is operating globally. *(Turn 4)*  
> **Prof. Peter Kim:** We must stay grounded in our physical health and human connections even as our tools reach around the world. *(Turn 5)*  
> **TA Marcus Brody:** Let's look at how all these technologies speed each other up on Slide 19! *(Turn 6)*"""

# Slide 19
dialogues[19] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Why do expert predictions about technology always end up being way too slow? *(Turn 1)*  
> **Dr. Elena Vance:** Because experts look at technologies one by one in silos. But on Slide 19, we see **Convergence**—technologies speed each other up! *(Turn 2)*  
> **Prof. Peter Kim:** Give us a simple example, Marcus. *(Turn 3)*  
> **TA Marcus Brody:** AI helps design better batteries. Better batteries make drones fly farther. Drones collect more environmental data. That data trains smarter AI models! It's a continuous circle! *(Turn 4)*  
> **Dr. Elena Vance:** When five exponential technologies feed each other, progress doesn't double—it explodes! *(Turn 5)*  
> **Prof. Peter Kim:** And that creates an enormous amount of data. Let's look at the numbers on Slide 20. *(Turn 6)*"""

# Slide 20
dialogues[20] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Dr. Elena Vance:** Slide 20 shows a huge mismatch: the world produces **181 Zettabytes** of digital data this year. *(Turn 1)*  
> **TA Marcus Brody:** And our conscious human brain can only take in about **120 bits per second**! *(Turn 2)*  
> **Prof. Peter Kim:** That is a ratio of over 300 trillion to one. You cannot keep up by reading more or scrolling faster. *(Turn 3)*  
> **TA Marcus Brody:** Trying to absorb all that information directly is like trying to drink a whole waterfall through a tiny straw! It just burns you out. *(Turn 4)*  
> **Dr. Elena Vance:** To survive, we need mental models and frameworks that compress complex information into clear ideas. *(Turn 5)*  
> **Prof. Peter Kim:** Let's look at our main cognitive tool on Slide 21: Structure Mapping. *(Turn 6)*"""

# Slide 21
dialogues[21] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Prof. Peter Kim:** Slide 21 introduces psychologist Dedre Gentner's **Structure-Mapping Theory**. Elena, explain how this helps our students. *(Turn 1)*  
> **Dr. Elena Vance:** Gentner showed that our brains learn best by finding patterns between something we already know and something new. *(Turn 2)*  
> **TA Marcus Brody:** So instead of memorizing 100 pages of difficult semiconductor physics about the PRIMA eye chip, we connect it to the ancient story of curing blindness! *(Turn 3)*  
> **Dr. Elena Vance:** Exactly! The surface details are different—spit and clay in the ancient story versus silicon chips today—but the core structure is identical: repairing sight to restore human life. *(Turn 4)*  
> **Prof. Peter Kim:** When you look for the underlying relationship rather than surface details, complex tech becomes easy to understand and remember. *(Turn 5)*  
> **TA Marcus Brody:** Let's see direct examples of this on Slide 22! *(Turn 6)*"""

# Slide 22
dialogues[22] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Dr. Elena Vance:** Look at the table on Slide 22 comparing surface thinking with deep structural thinking. *(Turn 1)*  
> **TA Marcus Brody:** A surface view says: *"A smartphone is a glass screen with apps."* But a structural view says: *"It's a device that condensed 7 million dollars of old equipment into your pocket, giving a student anywhere on Earth access to all human knowledge!"* *(Turn 2)*  
> **Prof. Peter Kim:** Look at Zipline: Surface view says *"a small toy drone."* Structural view says *"an aerial lifeline that cuts mother mortality by 51% in remote hospitals."* *(Turn 3)*  
> **Dr. Elena Vance:** When you think structurally, you stop focusing on superficial gadgets and start solving real human problems. *(Turn 4)*  
> **TA Marcus Brody:** And we can also use classic archetypes to guide our AI designs on Slide 23! *(Turn 5)*  
> **Prof. Peter Kim:** Let's look at Slide 23. *(Turn 6)*"""

# Slide 23
dialogues[23] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Prof. Peter Kim:** Slide 23 shows how classic archetypes can help engineers design better AI products. *(Turn 1)*  
> **Dr. Elena Vance:** If an engineer thinks of AI as just a "chatbot," they build a boring text box. But if they design it with the archetype of a **Guardian Sentinel**, their whole product vision changes! *(Turn 2)*  
> **TA Marcus Brody:** Right! A Guardian Sentinel monitors health vitals, detects falls for elderly parents, and blocks scams before they happen! *(Turn 3)*  
> **Prof. Peter Kim:** And an **Omniscient Scribe** focuses on truthful facts and clear citations instead of clickbait. *(Turn 4)*  
> **Dr. Elena Vance:** Archetypes give AI systems a clear, human-centered mission. *(Turn 5)*  
> **Prof. Peter Kim:** Now let's see how these technologies spread to everyone on Slide 24: Universal Democratization. *(Turn 6)*"""

# Slide 24
dialogues[24] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Slide 24 has a great history example! Think about King Louis XIV of France in the 1600s—the richest king in the world with a giant palace! *(Turn 1)*  
> **Dr. Elena Vance:** But if King Louis had a toothache, a barber pulled it out without anesthesia! If he wanted to hear music, he had to hire an orchestra and wait weeks! *(Turn 2)*  
> **Prof. Peter Kim:** Today, anyone with a smartphone has instant access to every song ever recorded, world-class medical knowledge, and video calls across the globe. *(Turn 3)*  
> **TA Marcus Brody:** That is **Democratization**! Once something becomes software, the cost to share it with another person is basically zero. *(Turn 4)*  
> **Dr. Elena Vance:** What used to be luxuries only kings could afford become basic tools for billions of people. *(Turn 5)*  
> **Prof. Peter Kim:** Let's look at Slide 25: First Principles thinking. *(Turn 6)*"""

# Slide 25
dialogues[25] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Prof. Peter Kim:** First Principles means breaking a problem down to basic physics instead of just copying what others did. Marcus, give an example. *(Turn 1)*  
> **TA Marcus Brody:** Old thinking said: *"Blindness from damaged eye cells cannot be cured because photoreceptor cells never grow back."* That's reasoning by analogy. *(Turn 2)*  
> **Dr. Elena Vance:** First Principles asked: *"What does vision actually do? Photons hit cells, make tiny electrical pulses, and send signals to the brain. What else makes electrical pulses from light? A tiny solar chip!"* *(Turn 3)*  
> **TA Marcus Brody:** And that simple question led directly to the PRIMA bionic vision chip! *(Turn 4)*  
> **Prof. Peter Kim:** When you solve problems from basic physics, miracles become doable engineering projects. *(Turn 5)*  
> **Dr. Elena Vance:** Now let's examine the real hardware cases in Module 4, starting with PRIMA on Slide 26! *(Turn 6)*"""

# Slide 26
dialogues[26] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Prof. Peter Kim:** We are now in Module 4: Real-world empirical cases. Case 1 is the **PRIMA Bionic Eye System** by Science Corporation. *(Turn 1)*  
> **TA Marcus Brody:** Look at the diagram on Slide 26! How does it actually work in human patients, Dr. Vance? *(Turn 2)*  
> **Dr. Elena Vance:** A small camera on special glasses captures what the patient is looking at. It processes the image and beams invisible near-infrared light through the pupil onto a tiny microchip placed under the retina. *(Turn 3)*  
> **Prof. Peter Kim:** That chip converts the light pulses into microcurrents that stimulate the surviving eye nerves, sending signals to the visual cortex. *(Turn 4)*  
> **TA Marcus Brody:** Patients who were completely blind in the center of their vision for ten years put these glasses on and can read letters on a chart again! *(Turn 5)*  
> **Dr. Elena Vance:** Imagine seeing your family's faces after a decade in the dark. It is truly life-changing. *(Turn 6)*  
> **Prof. Peter Kim:** Let's look at the inventor behind this, Max Hodak, on Slide 27. *(Turn 7)*"""

# Slide 27
dialogues[27] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Max Hodak co-founded Neuralink with Elon Musk. Why did he leave brain surgery to focus on the eye at Science Corporation? *(Turn 1)*  
> **Dr. Elena Vance:** Because drilling into the skull has high risks of infection and brain tissue damage. But the retina at the back of the eye is actually extended brain tissue that has a natural, clear window—the pupil! *(Turn 2)*  
> **Prof. Peter Kim:** Evolution spent millions of years making the pupil a clear path for light. Hodak used that natural path to beam power and data wirelessly into neural tissue. *(Turn 3)*  
> **TA Marcus Brody:** And the surgery takes less than 30 minutes as an outpatient procedure! No wires through the skull, no hospital stay! *(Turn 4)*  
> **Dr. Elena Vance:** That makes it scalable to millions of elderly patients around the world. *(Turn 5)*  
> **Prof. Peter Kim:** Let's look at the exact chip specifications on Slide 28. *(Turn 6)*"""

# Slide 28
dialogues[28] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Look at the size on Slide 28: 2 millimeters by 2 millimeters, and only 30 microns thick! That is thinner than a strand of human hair! *(Turn 1)*  
> **Dr. Elena Vance:** And it packs 378 solar-powered pixels! The best part: it is **100% batteryless**. *(Turn 2)*  
> **TA Marcus Brody:** Wait, how does it work with no battery inside the eye? *(Turn 3)*  
> **Dr. Elena Vance:** The glasses beam pulses of near-infrared light. That light gives the chip both the electricity to run and the visual data at the exact same time! *(Turn 4)*  
> **Prof. Peter Kim:** No battery to replace, no wires, and made of biocompatible materials that can stay in the eye for decades. *(Turn 5)*  
> **TA Marcus Brody:** Let's see the step-by-step signal pipeline on Slide 29! *(Turn 6)*"""

# Slide 29
dialogues[29] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Dr. Elena Vance:** Slide 29 shows the five stages of how light turns into vision. Notice Stage 2: **Contrast Enhancement**. *(Turn 1)*  
> **TA Marcus Brody:** The glasses don't just send raw video. The mini-computer sharpens edges and boosts contrast so the damaged eye can easily read text and find doors! *(Turn 2)*  
> **Prof. Peter Kim:** And why use 880-nanometer near-infrared light, Elena? *(Turn 3)*  
> **Dr. Elena Vance:** Because near-infrared is invisible to human eyes! It doesn't blind whatever natural peripheral vision the patient still has, but the silicon chip absorbs it perfectly. *(Turn 4)*  
> **TA Marcus Brody:** So the patient uses their natural side vision while the chip provides sharp central vision! That's brilliant design! *(Turn 5)*  
> **Prof. Peter Kim:** Let's see the clinical results on Slide 30. *(Turn 6)*"""

# Slide 30
dialogues[30] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Look at the impact numbers on Slide 30: **170 to 200 million people** suffer from dry age-related macular degeneration globally! *(Turn 1)*  
> **Dr. Elena Vance:** Until now, there was zero treatment. Doctors had to tell patients: *"You will slowly lose your central vision, and there's nothing we can do."* *(Turn 2)*  
> **Prof. Peter Kim:** Losing central vision means you can't read, drive, recognize faces, or live independently. *(Turn 3)*  
> **TA Marcus Brody:** In clinical trials, patients with the PRIMA chip were able to read lines of text and recognize objects around the house again, with zero long-term inflammation! *(Turn 4)*  
> **Dr. Elena Vance:** That's restoring independence to millions of people. *(Turn 5)*  
> **Prof. Peter Kim:** Now let's look at our second hardware case: Zipline drones on Slide 31. *(Turn 6)*"""

# Slide 31
dialogues[31] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Case 2 is **Zipline**! In 2014, when the founders visited Rwanda, they saw mothers dying after childbirth because emergency blood supplies were stuck five hours away on mountain roads. *(Turn 1)*  
> **Dr. Elena Vance:** In severe bleeding, a patient needs blood within 30 to 45 minutes. If roads are blocked or flooded, it's too late. *(Turn 2)*  
> **Prof. Peter Kim:** Instead of waiting 30 years to build billions of dollars in mountain highways, Zipline built an electric autonomous drone network. *(Turn 3)*  
> **TA Marcus Brody:** Look at how it works: a doctor sends a text message. A drone launches from a catapult, flies 100 km/h, drops the blood by parachute in the clinic yard in 15 minutes, and flies back! *(Turn 4)*  
> **Dr. Elena Vance:** It doesn't even land—it drops the package accurately and returns home to be caught by a wire! *(Turn 5)*  
> **Prof. Peter Kim:** Let's look at the verified life-saving data on Slide 32. *(Turn 6)*"""

# Slide 32
dialogues[32] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Dr. Elena Vance:** Look at the data from *The Lancet* medical journal on Slide 32: a **51% reduction in hospital maternal deaths from postpartum bleeding** in Rwanda! *(Turn 1)*  
> **TA Marcus Brody:** Over one million commercial drone flights and 70 million miles flown! This is running 24/7 as the national medical delivery system in Rwanda and Ghana. *(Turn 2)*  
> **Prof. Peter Kim:** And vaccine spoilage dropped by 60% because vaccines are kept in central freezers and flown out instantly when needed. *(Turn 3)*  
> **TA Marcus Brody:** This is called **Leapfrogging**—just like skipping landline phones and going straight to smartphones, Africa skipped slow road transport and went straight to autonomous aerial networks! *(Turn 4)*  
> **Dr. Elena Vance:** A clinic in rural Africa can get emergency blood faster than an ambulance in traffic in New York or London. *(Turn 5)*  
> **Prof. Peter Kim:** Now let's check Case 3: De-extinction on Slide 33. *(Turn 6)*"""

# Slide 33
dialogues[33] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Case 3 is Colossal Biosciences bringing back the Woolly Mammoth! Dr. Vance, why are scientists spending millions to bring back an ice-age animal? *(Turn 1)*  
> **Dr. Elena Vance:** It's not for a theme park, Marcus—it's for climate defense. In the Arctic tundra, permafrost holds massive amounts of trapped methane and carbon. *(Turn 2)*  
> **TA Marcus Brody:** And how do mammoths help keep it frozen? *(Turn 3)*  
> **Dr. Elena Vance:** In winter, heavy snow acts like a blanket, trapping ground heat and letting permafrost melt. When herds of heavy mammoths stomp the snow, the ground stays exposed to -40°C Arctic air, keeping the methane frozen solid! *(Turn 4)*  
> **Prof. Peter Kim:** Using CRISPR gene-editing on elephant DNA to build cold-tolerant species that protect planetary ecology is engineering biology at a massive scale. *(Turn 5)*  
> **TA Marcus Brody:** Let's look at the economics of dematerialization on Slide 34! *(Turn 6)*"""

# Slide 34
dialogues[34] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Slide 34 shows Peter Diamandis's favorite comparison: In 1985, if you wanted a video camera, GPS, encyclopedia, sound recorder, and supercomputer, it cost **7.1 million dollars**! *(Turn 1)*  
> **Dr. Elena Vance:** And all of that hardware weighed thousands of pounds and filled an entire room! *(Turn 2)*  
> **Prof. Peter Kim:** Today, every single one of those devices is inside a 200-gram smartphone that costs a few hundred dollars. *(Turn 3)*  
> **TA Marcus Brody:** That is **Dematerialization**—turning heavy physical machines into weightless software algorithms. *(Turn 4)*  
> **Dr. Elena Vance:** And once it is software, updates can be sent to billions of people for free. *(Turn 5)*  
> **Prof. Peter Kim:** Now let's look at Case 5: AlphaFold 3 on Slide 35. *(Turn 6)*"""

# Slide 35
dialogues[35] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Dr. Elena Vance:** For 50 years, predicting how a protein folds into its 3D shape was biology's toughest puzzle. Solving one protein took five years of difficult lab experiments. *(Turn 1)*  
> **TA Marcus Brody:** And in 50 years, all scientists combined had solved about 180,000 proteins. Then DeepMind released AlphaFold! *(Turn 2)*  
> **Prof. Peter Kim:** In just a few months, AlphaFold predicted over **200 million protein structures**—basically every protein known to science! *(Turn 3)*  
> **TA Marcus Brody:** DeepMind compressed a million years of lab work into a single year of computing! *(Turn 4)*  
> **Dr. Elena Vance:** And they gave the database away for free to two million researchers worldwide to help discover new medicines and plastic-eating enzymes. *(Turn 5)*  
> **Prof. Peter Kim:** But with all these powers, why are people still unhappy? Let's enter Module 5 on Slide 36. *(Turn 6)*"""

# Slide 36
dialogues[36] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Prof. Peter Kim:** We now enter Module 5: The "So What?" question. If humanity has all these miracles, why are so many people stressed and unhappy today? *(Turn 1)*  
> **Dr. Elena Vance:** Because of how human dopamine works. When a new technology arrives, our brain finds it amazing for about 72 hours, and then treats it as the boring default baseline! *(Turn 2)*  
> **TA Marcus Brody:** And if the Wi-Fi slows down for three seconds, we get angry, forgetting that we are accessing the entire world's knowledge wirelessly! *(Turn 3)*  
> **Prof. Peter Kim:** Plus, social media exposes our brains to the top 0.001% richest and most attractive people on Earth all day long. *(Turn 4)*  
> **TA Marcus Brody:** Our ancient brain thinks: *"I am at the bottom of the tribe,"* creating constant anxiety and insecurity. *(Turn 5)*  
> **Dr. Elena Vance:** That is the Habituation Paradox. Let's see the Hedonic Treadmill on Slide 37. *(Turn 6)*"""

# Slide 37
dialogues[37] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Slide 37 brings up comedian Louis C.K.’s famous line: *"Everything is amazing right now, and nobody is happy."* *(Turn 1)*  
> **Dr. Elena Vance:** He told a story about someone on an airplane flying at 500 mph who got furious because the high-speed satellite Wi-Fi cut out for two minutes. *(Turn 2)*  
> **Prof. Peter Kim:** That is the **Hedonic Treadmill**. Improving physical comfort alone does not automatically create happiness or fulfillment. *(Turn 3)*  
> **TA Marcus Brody:** If you give someone a faster car or a smarter phone without training their gratitude and mindset, their happiness drops right back to where it started. *(Turn 4)*  
> **Dr. Elena Vance:** Better tools without a better mindset just builds a nicer cage for our stress. *(Turn 5)*  
> **Prof. Peter Kim:** Let's look at the gap between technology and morality on Slide 38: Cultural Lag. *(Turn 6)*"""

# Slide 38
dialogues[38] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Prof. Peter Kim:** In 1922, sociologist William Ogburn described **Cultural Lag**. Look at the diagram on Slide 38. *(Turn 1)*  
> **Dr. Elena Vance:** Technology accelerates at **100x speed**, but human laws, ethics, and politics move at **1x linear speed**. *(Turn 2)*  
> **TA Marcus Brody:** We are using godlike 21st-century tech with 18th-century political systems and prehistoric emotional brains! *(Turn 3)*  
> **Prof. Peter Kim:** When tech leaders build algorithms that divide people for profit and say *"We're just an engineering platform,"* that is avoiding responsibility. *(Turn 4)*  
> **Dr. Elena Vance:** If you build godlike tools, you must accept the sacred responsibility of using them wisely. *(Turn 5)*  
> **TA Marcus Brody:** Let's see E.O. Wilson's famous quote on Slide 39! *(Turn 6)*"""

# Slide 39
dialogues[39] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Dr. Elena Vance:** Biologist E.O. Wilson said: *"Humanity has Paleolithic emotions, medieval institutions, and godlike technology."* Look at the three danger zones on Slide 39. *(Turn 1)*  
> **TA Marcus Brody:** Danger 1: Ancient tribal hatred amplified by social media algorithms that profit off outrage! *(Turn 2)*  
> **Prof. Peter Kim:** Danger 2: Ancient instincts to crave sugar and fat meeting modern industrial food, causing global obesity and diabetes. *(Turn 3)*  
> **Dr. Elena Vance:** Danger 3: Ancient us-versus-them tribal thinking armed with autonomous drone swarms. *(Turn 4)*  
> **TA Marcus Brody:** In every case, an ancient survival instinct becomes dangerous when multiplied by modern technology! *(Turn 5)*  
> **Prof. Peter Kim:** We must be conscious of our biology. Now let's look at Slide 40: Avoiding monopoly control of AI. *(Turn 6)*"""

# Slide 40
dialogues[40] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Training a massive AI model today costs tens of billions of dollars. Doesn't that mean only a few giant corporations will control all AI? *(Turn 1)*  
> **Dr. Elena Vance:** That is the threat of **Algorithmic Feudalism**. If five tech companies control the models that everyone uses, they control what information billions of people see and believe. *(Turn 2)*  
> **Prof. Peter Kim:** Just as the printing press broke the monopoly on books in Europe, open-source AI and decentralized systems ensure technology belongs to everyone. *(Turn 3)*  
> **TA Marcus Brody:** Divine tools shouldn't be locked inside a private corporate clubhouse! *(Turn 4)*  
> **Dr. Elena Vance:** That's why we advocate for open, accessible, and ethical AI development. *(Turn 5)*  
> **Prof. Peter Kim:** Now let's see how we build the character to guide this tech on Slide 41: Moral Muscle. *(Turn 6)*"""

# Slide 41
dialogues[41] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Prof. Peter Kim:** Why did we build this course? Not just to teach coding, but to build **Moral Muscle**. *(Turn 1)*  
> **Dr. Elena Vance:** Just like physical muscles grow by lifting heavy weights, moral muscle grows by tackling hard ethical questions. *(Turn 2)*  
> **TA Marcus Brody:** In this seminar, we will debate real dilemmas: bio-enhancement equality, drone warfare rules, and AI privacy! No simple textbook answers! *(Turn 3)*  
> **Prof. Peter Kim:** A regular technician asks: *"Can I build this?"* A wise theurgist asks: *"Should this exist, and how will it affect human lives over the next 50 years?"* *(Turn 4)*  
> **TA Marcus Brody:** That's the mindset we want every student to develop! *(Turn 5)*  
> **Dr. Elena Vance:** Let's look at the big choice facing humanity on Slide 42. *(Turn 6)*"""

# Slide 42
dialogues[42] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Prof. Peter Kim:** Slide 42 shows the fork in the road for human civilization. *(Turn 1)*  
> **Dr. Elena Vance:** Path A: Godlike tools paired with primitive, fearful thinking leads to addiction, social division, and collapse. *(Turn 2)*  
> **TA Marcus Brody:** Path B: Godlike tools paired with **Mind 2.0**—wisdom, focus, and ethics—leads to curing diseases, ending poverty, and restoring our planet! *(Turn 3)*  
> **Prof. Peter Kim:** The technology is the same on both paths. The only difference is the wisdom of the humans using it. *(Turn 4)*  
> **TA Marcus Brody:** *"We are as gods and might as well get good at it."* Getting good at it means upgrading ourselves to match our tools! *(Turn 5)*  
> **Dr. Elena Vance:** Now let's see our seminar debates and capstone project in Module 6 on Slide 43! *(Turn 6)*"""

# Slide 43
dialogues[43] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Prof. Peter Kim:** Slide 43 presents your three seminar debate topics for this week. *(Turn 1)*  
> **Dr. Elena Vance:** Topic 1: If eye chips like PRIMA evolve to give superhuman night vision, should anyone be allowed to get enhanced, or will that divide rich and poor? *(Turn 2)*  
> **TA Marcus Brody:** Topic 2: With information overload hurting mental health, should platforms slow down feed speeds, or is that censorship? *(Turn 3)*  
> **Prof. Peter Kim:** Topic 3: When software makes goods and services near-zero cost, how should global economics and jobs adapt? *(Turn 4)*  
> **TA Marcus Brody:** Pick your topic, bring real data, and be ready to debate with your group! *(Turn 5)*  
> **Dr. Elena Vance:** Now let's look at the $100-Billion XPRIZE challenge on Slide 44. *(Turn 6)*"""

# Slide 44
dialogues[44] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **TA Marcus Brody:** Here is your main project for the semester: Designing a **$100-Billion Giga-XPRIZE** to solve a grand global challenge! *(Turn 1)*  
> **Prof. Peter Kim:** Look at the four pillars on Slide 44: First-principles problem definition, an exponential timeline, clear milestone goals, and safeguards against unexpected side effects. *(Turn 2)*  
> **Dr. Elena Vance:** Whether your prize tackles clean water, plastic-eating enzymes, or reversing biological aging, it must be realistic within 10 years. *(Turn 3)*  
> **TA Marcus Brody:** The top designs will be presented to global investment leaders at the end of the semester! *(Turn 4)*  
> **Prof. Peter Kim:** Build something that genuinely helps human flourishing. Now let's look ahead to Session 2 on Slide 45! *(Turn 5)*"""

# Slide 45
dialogues[45] = """> **🎙️ 3-Presenter Authentic Tiki-Taka Script**
> 
> **Dr. Elena Vance:** Next week in Session 2, we explore **Cognitive Vertigo**—why our brains feel overwhelmed by exponential change, and how to master Structure Mapping. *(Turn 1)*  
> **TA Marcus Brody:** Make sure to read Chapter 1 of *We Are as Gods* before next class! *(Turn 2)*  
> **Prof. Peter Kim:** Congratulations on completing Session 1. You have stepped into the Theurgicon. *(Turn 3)*  
> **TA Marcus Brody:** We covered everything from ancient miracles to bionic eyes, delivery drones, and dematerialized tech! *(Turn 4)*  
> **Dr. Elena Vance:** Have a great week of study and research, everyone! *(Turn 5)*  
> **Prof. Peter Kim:** See you all next week. Session 1 is adjourned! *(Turn 6)*"""


# Function to replace dialogues in content
# Each slide starts with ### Slide XX: ... and contains > **🎙️ 3-Presenter Authentic Tiki-Taka Script** ... up to the next --- or ### Slide

slide_pattern = re.compile(r'(### Slide (\d+):[^\n]*\n)(.*?)(?=(\n---\n|\n### Slide |\Z))', re.DOTALL)

def replace_slide_dialogue(match):
    slide_header = match.group(1)
    slide_num = int(match.group(2))
    slide_body = match.group(3)
    
    # Remove existing dialogue script
    dialogue_pattern = re.compile(r'> \*\*🎙️ 3-Presenter Authentic Tiki-Taka Script\*\*.*', re.DOTALL)
    cleaned_body = dialogue_pattern.sub('', slide_body).rstrip()
    
    new_dialogue = dialogues.get(slide_num, "")
    if new_dialogue:
        return f"{slide_header}{cleaned_body}\n\n{new_dialogue}\n"
    else:
        return match.group(0)

new_content = slide_pattern.sub(replace_slide_dialogue, content)

with open(session1_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"Successfully updated all 45 slides in {session1_path}!")
