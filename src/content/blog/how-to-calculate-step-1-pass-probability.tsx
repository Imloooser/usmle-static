import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import type { BlogPostMeta } from './types';

export const meta: BlogPostMeta = {
  slug: 'how-to-calculate-step-1-pass-probability',
  title: 'How to Calculate Your Step 1 Pass Probability (NBME Form-by-Form)',
  h1: 'How to Calculate Your USMLE Step 1 Pass Probability: An NBME Form-by-Form Guide',
  description:
    'A Pass/Fail-accurate guide to reading your USMLE Step 1 pass probability from NBME Forms 29–33, the Free 120, and UWorld — plus a recovery protocol for a failed practice form.',
  excerpt:
    'Step 1 is Pass/Fail — so the goal is a safe margin above the passing standard, not a 3-digit score. Here is how to read your NBME self-assessments (Forms 29–33) into a real pass probability, form by form.',
  category: 'Step 1 Guide',
  date: '2026-06-27',
  dateModified: '2026-06-27',
  author: 'Robert Zane, MD',
  authorRole: 'Founder & Lead Researcher',
  authorBio:
    'Robert Zane, MD reviews USMLE Step 1 content for accuracy. These pass-probability estimates are grounded in published NBME pass-probability data — Step 1 is Pass/Fail, so there is no 3-digit score to predict.',
  readingTime: '9 min read',
  faqs: [
    {
      question: 'Which NBME form is most predictive for USMLE Step 1?',
      answer:
        'The most recent NBME self-assessments — Forms 32 and 33 — are the most predictive, because their question style and difficulty are calibrated to the current Step 1 pool. Forms 29–31 are still strong, recent benchmarks. Older forms (25–28) are useful early baselines but run on harsher, less representative curves.',
    },
    {
      question: 'Can I pass Step 1 if I failed an NBME practice form?',
      answer:
        'Yes — and it is common. A low early baseline (e.g. Form 25 or 26) does not determine your outcome. What matters is your trajectory and where you land on recent forms: two consecutive recent self-assessments showing a comfortable passing margin is a far stronger signal than one early failure.',
    },
    {
      question: 'Does USMLE Step 1 still give a 3-digit score?',
      answer:
        'No. Step 1 has been Pass/Fail since January 26, 2022. There is no 3-digit score and no percentile on the real exam anymore. Practice forms still report a scaled score and a probability of passing, but your only on-exam outcome is Pass or Fail — so the goal is a safe margin above the passing standard.',
    },
    {
      question: 'What NBME result means I am safe to sit Step 1?',
      answer:
        'When your recent NBME self-assessments report a high probability of passing — roughly 95% or above — and your trend across forms is flat or rising, you are in a statistically safe position. Borderline probabilities (below ~85%) with a falling trend are a signal to review weak areas before testing.',
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        Since <strong>January 26, 2022</strong>, USMLE Step 1 has been scored <strong>Pass/Fail</strong>. There
        is no 3-digit score and no percentile anymore — your only outcome on test day is Pass or Fail. That
        single change rewires how you should read your practice exams: the goal is no longer to chase a number,
        it is to build a <strong>safe margin above the passing standard</strong> and minimize the probability of
        a fail going on your permanent record.
      </p>
      <p>
        Because the NBME does not publish a public conversion calculator, students struggle to translate practice
        performance into a real readiness signal. This guide breaks down the active NBME self-assessment forms
        (Forms 25–33), shows how to read them into a genuine <em>pass probability</em>, and gives you a recovery
        protocol if you score below the line on a practice form.
      </p>

      <div className="blog-citations" style={{ margin: '36px 0' }}>
        <h2 style={{ marginTop: 0, fontSize: '20px' }}>The short answer</h2>
        <p style={{ marginBottom: 0 }}>
          Read your <strong>most recent</strong> NBME self-assessments (Forms 29–33), not your early baselines.
          Each NBME form reports a <strong>probability of passing</strong> directly — that number, plus a flat or
          rising trend across two or more recent forms, is the real readiness signal. A 3-digit &ldquo;score&rdquo;
          is not part of Step 1 anymore, so ignore anyone selling you one.
        </p>
      </div>

      <h2>Form-by-form: which NBMEs actually predict Step 1?</h2>
      <p>
        Not all NBME forms are built on the same curve. Older forms lean on raw recall and harsher grading;
        newer forms use longer, multi-step clinical vignettes that mirror the current exam. Weight the newer
        ones.
      </p>

      <h3>Forms 25 &amp; 26 — early baselines</h3>
      <p>
        Heavy on raw recall and biochemistry, with the harshest grading scales of the active set. Use them once,
        early, to find your starting point — then stop reading too much into them. A &ldquo;low&rdquo; here is
        expected and not predictive of your final outcome.
      </p>

      <h3>Forms 27 &amp; 28 — content diagnostics</h3>
      <p>
        A more balanced spread of organ systems, but notably anatomy- and physiology-heavy. They are excellent
        for exposing content gaps mid-study, though slightly less representative of the modern exam&rsquo;s
        question style than the newest forms.
      </p>

      <h3>Forms 29–31 — recent benchmarks</h3>
      <p>
        These transition toward the long clinical stems the real exam uses, on fair and stable curves. Consistent
        passing-margin performance here means your foundation is secure. They are the workhorses of the back half
        of dedicated.
      </p>

      <h3>Forms 32 &amp; 33 — the closest mirror</h3>
      <p>
        The most recently released self-assessments are the best single predictors of current Step 1: their
        formatting and difficulty track the live pool most closely. <strong>Treat your most recent Form 32/33
        result as your single most important data point</strong> — which is exactly why our predictor weights
        newer forms more heavily than older ones.
      </p>

      <section className="blog-methodology" style={{ textAlign: 'center' }}>
        <h2 style={{ marginTop: 0 }}>Get your weighted pass probability</h2>
        <p style={{ marginBottom: '28px' }}>
          Do not rely on a single form. Our{' '}
          <Link href="/usmle-step-1-score-predictor/" className="text-indigo-400 hover:underline">
            Step 1 Pass/Fail predictor
          </Link>{' '}
          combines your NBME forms, Free 120, and UWorld %, weights your most recent scores, and outputs your
          probability of passing — anchored on the NBME&rsquo;s official pass-probability data.
        </p>
        <Link
          href="/usmle-step-1-score-predictor/"
          className="cta-primary-button"
        >
          Open the Step 1 Pass Predictor →
        </Link>
      </section>

      <h2>Reading a pass probability (not a 3-digit score)</h2>
      <p>
        Here is the part most outdated guides get wrong. The old Step 1 passing standard was a 3-digit{' '}
        <strong>194</strong> — but that scale was retired in 2022. Today, the useful output is the{' '}
        <strong>probability of passing</strong> that each NBME self-assessment reports for you directly. Translate
        that probability into action like this:
      </p>

      <div className="blog-table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">NBME pass probability</th>
              <th scope="col">What it means</th>
              <th scope="col">Recommended action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>95%+</strong></td>
              <td>Comfortable margin above the line</td>
              <td style={{ color: 'var(--accent-green, #00f5a0)', fontWeight: 700 }}>Proceed to exam</td>
            </tr>
            <tr>
              <td><strong>85–94%</strong></td>
              <td>Likely pass; build a little more cushion</td>
              <td style={{ color: '#7dd3fc', fontWeight: 700 }}>On track — keep going</td>
            </tr>
            <tr>
              <td><strong>75–84%</strong></td>
              <td>Borderline; thin safety margin</td>
              <td style={{ color: '#b19ffb', fontWeight: 700 }}>Review weak areas first</td>
            </tr>
            <tr>
              <td><strong>Below 75%</strong></td>
              <td>Elevated fail risk</td>
              <td style={{ color: '#ff7a7d', fontWeight: 700 }}>Consider delaying</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Two caveats keep this honest. First, there is real <strong>measurement error</strong> — any single form
        carries noise, which is why two consistent recent forms beat one. Second, a probability is a population
        statistic, not a guarantee about you specifically; treat it as a margin of safety, not a promise.
      </p>

      <div
        style={{
          background: 'rgba(255, 159, 67, 0.05)',
          borderLeft: '4px solid #ff9f43',
          padding: '24px',
          borderRadius: '0 8px 8px 0',
          margin: '36px 0',
        }}
      >
        <div className="flex items-center gap-2 mb-3" style={{ color: '#ff9f43', fontWeight: 700, fontSize: '1.1rem' }}>
          <AlertTriangle size={18} /> The &ldquo;failed NBME&rdquo; recovery protocol
        </div>
        <p style={{ margin: '0 0 14px', fontSize: '0.97rem' }}>
          Scored below a passing margin on a mid-dedicated form? Do not panic — a low practice form is a
          diagnostic milestone, not a verdict. Run this 3-step protocol:
        </p>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          <li style={{ marginBottom: '8px' }}>
            <strong>Blind review first.</strong> Before reading explanations, re-examine every miss and label it:
            content gap (you did not know it) vs process error (misread the stem, changed a right answer). The mix
            tells you whether to study more content or fix test mechanics.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Target your weakest systems.</strong> Identify your lowest-performing organ systems and spend
            the next 48 hours on active recall (Anki) plus focused UWorld blocks (40-question tutor mode) in those
            areas only.
          </li>
          <li style={{ marginBottom: 0 }}>
            <strong>Re-test with a recent form.</strong> Do not re-test immediately — clear at least ~240 targeted
            questions first, then sit a <em>newer</em> form (32 or 33) to confirm your trajectory is rising.
          </li>
        </ol>
      </div>

      <h2>How to use the Step 1 Pass Predictor</h2>
      <p>
        For the most reliable reading from our{' '}
        <Link href="/usmle-step-1-score-predictor/" className="text-indigo-400 hover:underline">
          Step 1 Pass/Fail predictor
        </Link>
        , enter at least <strong>two or three</strong> recent practice results rather than a single form. The
        model weights your most recent scores more heavily, so an early baseline does not unfairly drag down your
        current probability. For example, a 54% equivalent on Form 25 four weeks ago paired with a strong recent
        Form 32 reads as an <em>upward trajectory</em> — and the predictor reflects that, not the old low.
      </p>
      <p>
        Want the data behind the numbers? See our{' '}
        <Link href="/step-1-accuracy-insights/" className="text-indigo-400 hover:underline">
          Step 1 accuracy insights
        </Link>{' '}
        and the full{' '}
        <Link href="/methodology/" className="text-indigo-400 hover:underline">
          prediction methodology
        </Link>
        .
      </p>

      <h2>References &amp; official sources</h2>
      <ul style={{ fontSize: '0.9rem' }}>
        <li>
          USMLE — <a href="https://www.usmle.org/" target="_blank" rel="noopener" className="text-indigo-400 hover:underline">Step 1 Pass/Fail policy &amp; passing standards</a> (Pass/Fail since Jan 26, 2022).
        </li>
        <li>
          NBME — <a href="https://www.nbme.org/examinees/self-assessments" target="_blank" rel="noopener" className="text-indigo-400 hover:underline">Comprehensive Basic Science Self-Assessment (CBSSA): score interpretation &amp; probability of passing</a>.
        </li>
      </ul>
    </>
  );
}
