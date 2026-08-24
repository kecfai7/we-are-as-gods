import React from 'react';
import { courseMetadata } from '../data/courseOverview';
import { ShieldCheck, BookOpen, Heart, Award, Sparkles } from 'lucide-react';

export default function CourseFooter({ lang }) {
  return (
    <footer id="faculty" className="border-t border-slate-800/80 bg-[#050811] pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* 3 Instructors Showcase */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge badge-cyan text-xs mb-2">Faculty & Research Team</span>
            <h3 className="font-['Syne'] font-extrabold text-2xl sm:text-3xl text-white">
              {lang === 'en' ? 'Course Instructors & Seminar Leaders' : 'EXPO-701 교수진 및 연구팀'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courseMetadata.instructors.map((inst) => (
              <div key={inst.id} className="glass-panel p-6 flex flex-col justify-between border-slate-800">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-slate-700 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                      {inst.avatar}
                    </div>
                    <div>
                      <h4 className="font-['Outfit'] font-bold text-base text-white">
                        {lang === 'en' ? inst.name : inst.nameKo}
                      </h4>
                      <span className="text-xs text-cyan-400 font-medium">
                        {lang === 'en' ? inst.role : inst.roleKo}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {inst.field}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] font-semibold text-slate-400">
                  ✨ {inst.tagline}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Theurgicon Creed Callout */}
        <div className="glass-panel p-8 text-center max-w-4xl mx-auto border-purple-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
          <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <h4 className="font-['Syne'] font-extrabold text-xl text-white mb-2">
            THE THEURGICON GRADUATION CREED
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed italic mb-4">
            "We are as gods and might as well get good at it. We engineer abundance not to become machines, but to elevate human consciousness and cosmic empathy."
          </p>
          <div className="text-[11px] font-mono text-purple-400 uppercase tracking-wider">
            EXPO-701 • Spring 2026 Academic Session
          </div>
        </div>

        {/* Bottom Credits & Honor Code */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 EXPO-701: We Are as Gods Academic Portal. Based on Peter Diamandis & Steven Kotler (2026).
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Academic Honor Code Verified</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
