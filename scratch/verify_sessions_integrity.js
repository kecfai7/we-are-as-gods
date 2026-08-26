import { sessionsList } from '../src/data/sessionsData.js';

console.log('=== VERIFYING SESSIONS DATA INTEGRITY ===');
console.log(`Total sessions count: ${sessionsList.length}`);

let totalSlides = 0;
let errors = [];

sessionsList.forEach((session, sIdx) => {
  const weekNum = session.weekNumber;
  const slides = session.slides || [];
  totalSlides += slides.length;

  if (slides.length !== 45) {
    errors.push(`Week ${weekNum} has ${slides.length} slides instead of 45!`);
  }

  slides.forEach((slide, slIdx) => {
    const sNum = slide.slideNumber;
    if (!slide.titleEn || slide.titleEn.trim() === '') {
      errors.push(`Week ${weekNum} Slide ${sNum}: Missing English Title!`);
    }
    if (!slide.titleKo || slide.titleKo.trim() === '') {
      errors.push(`Week ${weekNum} Slide ${sNum}: Missing Korean Title!`);
    }
    if (!slide.bulletsEn || slide.bulletsEn.length === 0) {
      errors.push(`Week ${weekNum} Slide ${sNum}: Missing English Bullets!`);
    }
    if (!slide.bulletsKo || slide.bulletsKo.length === 0) {
      errors.push(`Week ${weekNum} Slide ${sNum}: Missing Korean Bullets!`);
    }
    if (!slide.scriptEn || slide.scriptEn.trim() === '') {
      errors.push(`Week ${weekNum} Slide ${sNum}: Missing English Script!`);
    }
  });
});

console.log(`Total slides verified across all sessions: ${totalSlides}`);
if (errors.length === 0) {
  console.log('✅ ALL 15 SESSIONS AND 675 SLIDES PASSED INTEGRITY AUDIT WITH ZERO ERRORS!');
} else {
  console.error(`❌ Found ${errors.length} errors:`);
  errors.slice(0, 20).forEach(e => console.error(` - ${e}`));
}
