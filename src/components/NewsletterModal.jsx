import React, { useState } from 'react';
import { X, Mail, CheckCircle2, Sparkles, Send, Eye } from 'lucide-react';

const SECTORS = ['SpaceTech', 'AI & Chips', 'BioTech', 'ClimateTech', 'DefenseTech', 'Quantum'];

export default function NewsletterModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [selectedSectors, setSelectedSectors] = useState(SECTORS);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewHtml, setPreviewHtml] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  if (!isOpen) return null;

  const toggleSector = (sec) => {
    if (selectedSectors.includes(sec)) {
      setSelectedSectors(selectedSectors.filter(s => s !== sec));
    } else {
      setSelectedSectors([...selectedSectors, sec]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, sectors: selectedSectors }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      alert('Subscription failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePreview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: 'All' }),
      });
      const data = await res.json();
      if (data.success) {
        setPreviewHtml(data.digestHtml);
        setShowPreview(true);
      }
    } catch (err) {
      alert('Preview generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-zinc-200 rounded-xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden text-gray-900">
        
        {/* Decorative Pink Gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-verge-pink via-purple-500 to-rose-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-600 hover:text-black bg-zinc-100 rounded-full transition"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center space-x-2 text-verge-pink font-mono text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Weekly Indian Deep Tech Briefings</span>
            </div>

            <h3 className="text-2xl font-black text-gray-900 verge-title mb-2">
              Subscribe to <span className="text-verge-pink">DEEPTECH // INDIA</span>
            </h3>
            
            <p className="text-xs text-zinc-600 leading-relaxed mb-5">
              Receive curated weekly digests on Indian space launches, RISC-V microcontrollers, synthetic biology breakthroughs, and climate energy tech.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1.5">Your Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="founder@deeptech.in"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-md pl-9 pr-4 py-2.5 text-xs text-gray-900 placeholder-zinc-400 focus:outline-none focus:border-verge-pink font-mono"
                  />
                </div>
              </div>

              {/* Sector Selectors */}
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-2">
                  Select Preferred Technology Sectors:
                </label>
                <div className="flex flex-wrap gap-2">
                  {SECTORS.map((sec) => {
                    const isSelected = selectedSectors.includes(sec);
                    return (
                      <button
                        type="button"
                        key={sec}
                        onClick={() => toggleSector(sec)}
                        className={`text-xs font-mono font-semibold px-3 py-1.5 rounded-full border transition ${
                          isSelected
                            ? 'bg-pink-50 text-verge-pink border-verge-pink'
                            : 'bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{sec}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-verge-pink hover:bg-pink-600 text-white font-bold text-xs py-2.5 rounded shadow transition flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Subscribing...' : 'Subscribe Now'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleGeneratePreview}
                  disabled={loading}
                  className="bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-800 font-bold text-xs px-4 py-2.5 rounded transition flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Preview Digest</span>
                </button>
              </div>
            </form>

            {/* Digest Preview Drawer Modal */}
            {showPreview && previewHtml && (
              <div className="mt-5 p-4 bg-zinc-50 border border-zinc-300 rounded-lg max-h-60 overflow-y-auto">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-700 font-bold mb-2 border-b border-zinc-200 pb-1">
                  <span>LIVE NEWSLETTER HTML PREVIEW</span>
                  <button onClick={() => setShowPreview(false)} className="text-zinc-500 hover:text-black">Hide</button>
                </div>
                <div 
                  className="bg-white rounded text-black text-xs p-3 border border-zinc-200" 
                  dangerouslySetInnerHTML={{ __html: previewHtml }} 
                />
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-300 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 verge-title">You're Subscribed!</h3>
            <p className="text-xs text-zinc-600 font-mono">
              We've registered <strong className="text-gray-900">{email}</strong> for weekly Indian Deep Tech updates.
            </p>
            <button
              onClick={onClose}
              className="bg-zinc-900 hover:bg-black text-white font-bold text-xs px-6 py-2 rounded transition"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
