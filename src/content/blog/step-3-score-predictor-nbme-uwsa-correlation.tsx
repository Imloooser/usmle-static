import Link from 'next/link';
import type { BlogPostMeta } from './types';

export const meta: BlogPostMeta = {
  slug: 'step-3-score-predictor-nbme-uwsa-correlation',
  title: 'USMLE Step 3 Score Predictor: NBME, UWSA & CCS',
  h1: 'USMLE Step 3 Score Predictor: NBME Conversion, UWSA Correlation & the CCS Factor',
  description:
    'How to convert NBME Form 6 & 7 and UWorld Step 3 self-assessment scores into a Step 3 estimate — and why CCS cases swing the result more than residents expect.',
  excerpt:
    'Form-by-form NBME 6/7 and UWSA correlations, why CCS cases swing your Step 3 score, and an honest look at the FSMB early pass/fail check.',
  category: 'Step 3 Guide',
  date: '2026-06-27',
  dateModified: '2026-06-27',
  author: 'Robert Zane, MD',
  authorRole: 'Founder & Lead Researcher',
  authorBio:
    'Robert Zane, MD reviews USMLE Step 3 content for accuracy. Our Step 3 estimates combine NBME Form 6/7 and UWSA correlations with the CCS weighting — and we are explicit about where the data ends and judgment begins.',
  readingTime: '7 min read',
  faqs: [
    {
      question: 'How accurate are Step 3 NBME practice exams?',
      answer:
        'The official Step 3 NBME forms (especially Forms 6 and 7) are strong predictors of the multiple-choice portion of the exam. Their key limitation is that they do not test Computer-based Case Simulations (CCS), which the USMLE program counts as a meaningful share of your final score — so a practice MCQ score alone is an incomplete prediction.',
    },
    {
      question: 'Is the FSMB / FCVS Step 3 early pass/fail check real?',
      answer:
        'It is an unofficial method, not a guaranteed feature. Many residents report that their pass/fail status appears in the FSMB/FCVS physician portal hours before the official score report email arrives. Exact timing varies by release cycle and the portal layout changes, so treat it as an anecdotal early signal — not an official result.',
    },
    {
      question: 'How much do CCS cases affect your Step 3 score?',
      answer:
        'CCS cases are a substantial, separately-scored component of Step 3 (about 25% of the total). Strong CCS performance can lift a borderline multiple-choice result to a comfortable pass, while weak CCS performance can pull an otherwise-passing MCQ score below the line.',
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        Unlike USMLE Step 1, which is strictly Pass/Fail, <strong>Step 3 still releases a 3-digit numerical
        score</strong>. For residents targeting competitive fellowships — Cardiology, GI, Pulm/Critical Care —
        that number remains a real differentiator on your application.
      </p>
      <p>
        Predicting it, though, is genuinely hard. The exam runs across two days — <strong>FIP</strong>
        {' '}(Foundations of Independent Practice) and <strong>ACM</strong> (Advanced Clinical Medicine) — and
        includes <strong>Computer-based Case Simulations (CCS)</strong> that no practice form grades. This guide
        breaks down how to read your NBME and UWorld practice scores, why CCS is the real wild card, and an
        honest take on the FSMB early pass/fail check.
      </p>

      <div className="blog-citations step3-summary" style={{ margin: '36px 0' }}>
        <h2 style={{ marginTop: 0, fontSize: '20px' }}>The short version</h2>
        <p style={{ marginBottom: 0 }}>
          Your <strong>Step 2 CK score is the strongest anchor</strong>{' '}— it carries the most weight in our
          model (r&nbsp;=&nbsp;0.68). NBME Forms 6/7 and UWSA refine it, but UWSA tends to{' '}
          <strong>underpredict</strong> real Step 3 by ~10 points, and neither sees your{' '}
          <strong>CCS performance</strong>, which is scored separately. Treat every number as a{' '}
          <em>range</em>, not a guarantee.
        </p>
      </div>

      <h2>Step 3 practice-test correlation: what actually predicts your score</h2>
      <p>
        In our model the single biggest anchor is your <strong>Step 2 CK score</strong>{' '}(r&nbsp;=&nbsp;0.68
        over n&nbsp;=&nbsp;27,118; PMC8368809) — it carries roughly <strong>45% of the weight</strong>. The
        practice tests below refine that anchor: UWSA&nbsp;2 (late-prep) next, then UWorld&nbsp;%, with NBME
        Forms 6/7 and the official Free&nbsp;137 as secondary confirmation signals.
      </p>

      <h3>NBME CCSSA Form 6 &amp; 7 → Step 3</h3>
      <p>
        We read NBME 6/7 as a <strong>percent-correct</strong> signal anchored to the passing standard:
        roughly <strong>55% correct ≈ 200</strong> (the passing line), and each point above that adds about
        0.8 to the estimate — <code>Step 3 ≈ 200 + 0.8 × (NBME% − 55)</code>. NBME 6/7 is a{' '}
        <em>secondary</em> input (~5% of the model weight), so read this table as how a form looks in
        isolation; the full prediction blends it with your Step 2 CK and UWSA.
      </p>

      <div className="blog-table-wrapper step3-table">
        <table>
          <thead>
            <tr>
              <th scope="col">NBME 6/7 (% correct)</th>
              <th scope="col">Estimated Step 3</th>
              <th scope="col">How to read it</th>
            </tr>
          </thead>
          <tbody>
            <tr className="highlight-row">
              <td><strong>85%</strong></td>
              <td>~224</td>
              <td>Strong margin — comfortable pass</td>
            </tr>
            <tr className="highlight-row">
              <td><strong>80%</strong></td>
              <td>~220</td>
              <td>Safe</td>
            </tr>
            <tr>
              <td><strong>72%</strong></td>
              <td>~214</td>
              <td>Solid pass</td>
            </tr>
            <tr>
              <td><strong>65%</strong></td>
              <td>~208</td>
              <td>Likely pass — keep building margin</td>
            </tr>
            <tr>
              <td><strong>60%</strong></td>
              <td>~204</td>
              <td>Borderline</td>
            </tr>
            <tr>
              <td><strong>55%</strong></td>
              <td>~200</td>
              <td>Right at the passing line</td>
            </tr>
            <tr className="danger-row">
              <td><strong>&lt; 55%</strong></td>
              <td className="step3-danger">&lt; 200</td>
              <td>Elevated risk of failing</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        These are our model&rsquo;s own NBME-to-Step-3 numbers, not a generic chart. We document how we build
        and validate the Step 3 model on our <Link href="/methodology/">methodology page</Link>, with per-form
        detail on the <Link href="/step-3-accuracy-insights/">Step 3 accuracy page</Link>.
      </p>

      <h3>UWorld Step 3 self-assessments (UWSA 1 &amp; 2)</h3>
      <p>The UWSAs are excellent content diagnostics, but they have a known calibration quirk:</p>
      <ul>
        <li>
          <strong>UWSA 1:</strong> often taken early (sometimes pre-study), so it is the noisier of the two —
          our model deweights it (~10%).
        </li>
        <li>
          <strong>UWSA 2:</strong> the more reliable, late-prep signal (~22% of the model). The key fact:{' '}
          <strong>UWSA tends to underpredict real Step 3 by about 10 points</strong>, so our model adds a
          recalibration offset rather than taking the raw number at face value.
        </li>
      </ul>

      <div className="step3-cta">
        <div className="step3-cta__title">Predict your Step 3 score instantly</div>
        <p className="step3-cta__desc">
          Enter your NBME Form 6/7, UWSA 1/2, and CCS practice percentages and let the model return a weighted
          3-digit estimate with a pass probability — free, no account.
        </p>
        <Link href="/usmle-step-3-score-predictor/" className="step3-cta__btn">
          Launch the Step 3 predictor →
        </Link>
      </div>

      <h2>The CCS factor: the real score swing</h2>
      <p>
        The most common mistake residents make is ignoring the <strong>Computer-based Case Simulations</strong>.
        Because CCS is scored as a substantial, separate component (about <strong>25% of the total</strong>), it
        behaves like a wild card on Day 2.
      </p>
      <p>
        Since NBME and UWorld practice exams do not grade your CCS work, no multiple-choice calculator can
        capture it. In our model:
      </p>
      <ul>
        <li>
          <strong>Strong CCS</strong> adds roughly <strong>+6 points</strong> — enough to turn a borderline
          MCQ result into a comfortable pass.
        </li>
        <li>
          <strong>Weak CCS</strong> (self-rated &ldquo;struggled&rdquo;) subtracts about <strong>−12 points</strong> —
          enough to pull an otherwise-passing MCQ score below the line for an unexpected fail.
        </li>
      </ul>
      <p>
        A reasonable target before test day is <strong>~70%+ on high-yield CCS practice cases</strong> to build
        a buffer rather than relying on it to rescue a shaky MCQ score.
      </p>

      <div className="step3-trick">
        <div className="step3-trick__title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          The FSMB / FCVS early pass/fail check (unofficial)
        </div>
        <p style={{ margin: '0 0 16px 0' }}>
          Waiting on a Step 3 report is stressful, and many residents report being able to see their pass/fail
          status early in the FSMB/FCVS physician portal — often the night before the official email. This is
          <strong> anecdotal and not an official feature</strong>: timing shifts between release cycles and the
          portal layout changes, so treat it as an early signal, not a result.
        </p>
        <ol>
          <li>
            Log in to the Federation of State Medical Boards (FSMB){' '}
            <strong>FCVS (Federation Credentials Verification Service)</strong> portal.
          </li>
          <li>Open your examination / exam-history section.</li>
          <li>
            If it has posted early, your USMLE Step 3 entry may show a <strong>Pass / Fail</strong> status
            before the official score report email arrives.
          </li>
        </ol>
      </div>

      <h2>Optimizing your Step 3 study timeline</h2>
      <p>
        Structure dedicated prep around the two distinct days. Day 1 (FIP) leans on biostatistics, drug
        mechanisms, and basic pathology; Day 2 (ACM) is clinical management plus CCS cases.
      </p>
      <p>
        A workable plan: take <strong>UWSA 1</strong> about three weeks out to surface Day-1 content gaps, then
        <strong> NBME Form 7</strong> roughly one week out to fix your passing margin. Spend the final 48 hours
        on high-yield CCS cases to protect your buffer.
      </p>

      <section className="references step3-refs">
        <strong>References &amp; official sources</strong>
        <ol>
          <li>
            Federation of State Medical Boards (FSMB).{' '}
            <a href="https://www.fsmb.org/" target="_blank" rel="noopener nofollow">
              Step 3 registration &amp; FCVS portal
            </a>.
          </li>
          <li>
            United States Medical Licensing Examination (USMLE).{' '}
            <a href="https://www.usmle.org/prepare-your-exam/step-3-materials" target="_blank" rel="noopener nofollow">
              Official Step 3 practice materials &amp; CCS sample cases
            </a>.
          </li>
        </ol>
        <p style={{ marginTop: '12px', fontSize: '0.8rem' }}>
          Score bands above are approximate guidance, not official conversions. Always confirm requirements and
          scoring with the USMLE program. This article is educational and not affiliated with the NBME, USMLE,
          UWorld, or FSMB.
        </p>
      </section>
    </>
  );
}
