import React from 'react';

export default function Footer({ stats }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="inner">

                <p className="line1">
                    <strong>USMLEPredictor.com</strong> — Free USMLE Step 2 CK Score Predictor
                </p>

                <p className="line2">
                    Predict your USMLE Step 2 CK score using NBME (Forms 9–16), UWSA (1–3),
                    UWorld, and Free 120 scores. Powered by{" "}
                    {stats?.totalDataPoints?.toLocaleString() || "5,039"}+ verified student data points.
                </p>

                <p className="line3">
                    Not affiliated with NBME, USMLE, UWorld, or any official organization.
                </p>

                <a href="mailto:info@usmlepredictor.com" className="contact">
                    Contact Us
                </a>

                <p className="line4">
                    © {currentYear} USMLEPredictor. All rights reserved.
                </p>

            </div>

            <style jsx>{`
        .footer {
          padding: 20px 20px 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
          color: #94a3b8;
        }

        .inner {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .line1 {
          font-size: 11px;
          color: #cbd5e1;
        }

        .line1 strong {
          color: #ffffff;
          font-weight: 600;
        }

        .line2 {
          font-size: 12px;
          color: #64748b;
          line-height: 1.4;
        }

        .line3 {
          font-size: 10px;
          color: #64748b;
          font-style: italic;
        }

        .contact {
          font-size: 13px;
          color: #6366f1;
          text-decoration: underline;
        }

        .contact:hover {
          color: #818cf8;
        }

        .line4 {
          font-size: 10px;
          color: #475569;
        }

      `}</style>
        </footer>
    );
}