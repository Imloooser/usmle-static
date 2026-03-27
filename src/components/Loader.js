import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Shield, BarChart3 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="sophisticated-ring">
          <motion.div
            className="ring-outer"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="ring-inner"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <div className="center-icon">
             <motion.div
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ duration: 1.5, repeat: Infinity }}
             >
               <Target size={40} className="prime-icon" />
             </motion.div>
          </div>
        </div>

        <div className="loading-steps">
          <motion.div 
            className="step"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <BarChart3 size={16} />
            <span>Analyzing Practice Trends</span>
          </motion.div>
          <motion.div 
            className="step"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Zap size={16} />
            <span>Running Ensemble Models</span>
          </motion.div>
          <motion.div 
            className="step"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <Shield size={16} />
            <span>Calculating Confidence Intervals</span>
          </motion.div>
        </div>

        <p className="loading-status">Predicting your Step 2 CK score...</p>
      </div>

      <style jsx>{`
        .loader-overlay {
          position: fixed;
          inset: 0;
          background: rgba(11, 15, 26, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .loader-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          max-width: 320px;
        }

        .sophisticated-ring {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ring-outer {
          position: absolute;
          inset: 0;
          border: 2px solid transparent;
          border-top-color: #6366f1;
          border-bottom-color: #6366f1;
          border-radius: 50%;
        }

        .ring-inner {
          position: absolute;
          inset: 15px;
          border: 2px solid transparent;
          border-left-color: #10b981;
          border-right-color: #10b981;
          border-radius: 50%;
          opacity: 0.7;
        }

        .center-icon {
          z-index: 2;
          color: #fff;
          filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.5));
        }

        .loading-steps {
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
          width: 100%;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #94a3b8;
          font-size: 14px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .step svg {
          color: #6366f1;
        }

        .loading-status {
          font-size: 16px;
          font-weight: 600;
          color: #f1f5f9;
          letter-spacing: -0.01em;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
