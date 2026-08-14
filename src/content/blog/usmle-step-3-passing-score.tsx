import Link from 'next/link';
import type { BlogPostMeta } from './types';

export const meta: BlogPostMeta = {
  slug: 'usmle-step-3-passing-score',
  title: 'USMLE Step 3 Passing Score (2026): It’s 200 — What That Means',
  h1: 'USMLE Step 3 Passing Score (2026): It’s 200 — and Why That Number Misleads People',
  description:
    'The USMLE Step 3 passing score is 200, effective January 2024. Percentiles, pass rates by cohort, the four-attempt limit, retake timing rules, and what happens if you fail.',
  excerpt:
    'Step 3 passing is 200 (since January 2024) — but that sits at roughly the 4th percentile, so it is a misleading target. Percentiles, pass rates, and the retake rules most students get wrong.',
  category: 'Step 3 Guide',
  date: '2026-08-05',
  dateModified: '2026-08-05',
  author: 'Robert Zane, MD',
  authorRole: 'Founder & Lead Researcher',
  authorBio:
    'Robert Zane, MD reviews USMLE Step 3 content for accuracy. Every policy statement here is quoted from the USMLE Bulletin of Information or usmle.org, with the source named in the text.',
  readingTime: '9 min read',
  faqs: [
    {
      question: 'What is the passing score for USMLE Step 3?',
      answer:
        'The minimum passing score for USMLE Step 3 is 200, for all exams administered on or after January 1, 2024. It was 198 before that. The mean for first-time takers is about 227 with a standard deviation of roughly 15, so 200 sits near the 4th percentile of that group.',
    },
    {
      question: 'How many times can you take USMLE Step 3?',
      answer:
        'Four attempts, and it is a lifetime cap on that Step — not four per year. The Bulletin of Information states that incomplete attempts count toward the limit, and that attempts at the formerly administered Step 2 CS also count. If you have attempted a Step four or more times without passing, you become ineligible to apply for any Step in the USMLE sequence.',
    },
    {
      question: 'How long do you have to wait to retake Step 3?',
      answer:
        'You may not take the same Step more than three times within a 12-month period. A fourth attempt must be at least 12 months after your first attempt at that exam and at least six months after your most recent attempt. Incomplete attempts count toward these limits.',
    },
    {
      question: 'Is there a seven-year limit to complete the USMLE sequence?',
      answer:
        'Not from the USMLE itself. The Bulletin says only that many US state medical boards require the sequence to be completed within a certain time frame, and refers you to the FSMB. Any time limit comes from the specific state board you are licensing with, and it varies — check that board rather than relying on a blanket seven-year figure.',
    },
    {
      question: 'Can you retake Step 3 to improve a passing score?',
      answer:
        'No. The Bulletin is explicit that if you pass a Step you are not allowed to retake it, except to comply with a time limit imposed by a US medical licensing authority. The score you receive is the score you keep.',
    },
  ],
};

export default function Body() {
  return (
    <>
      <div className="blog-citations" style={{ margin: '0 0 36px' }}>
        <h2 style={{ marginTop: 0, fontSize: '20px' }}>The short answer</h2>
        <p style={{ marginBottom: 0 }}>
          The minimum passing score for USMLE Step 3 is <strong>200</strong>, for all exams administered on or
          after <strong>1 January 2024</strong>. It was 198 before that. The mean for first-time takers is about
          <strong> 227</strong> with a standard deviation near 15 — so 200 sits at roughly the{' '}
          <strong>4th percentile</strong> of that group.
        </p>
      </div>

      <h2>The number, and when it changed</h2>
      <div className="blog-table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Exam</th>
              <th scope="col">Minimum passing score</th>
              <th scope="col">Effective for exams on or after</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Step 1</strong></td>
              <td>Pass / Fail</td>
              <td>26 January 2022</td>
            </tr>
            <tr>
              <td><strong>Step 2 CK</strong></td>
              <td>218</td>
              <td>1 July 2025</td>
            </tr>
            <tr className="highlight-row">
              <td><strong>Step 3</strong></td>
              <td><strong>200</strong></td>
              <td>1 January 2024</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        USMLE announced the Step 3 change in December 2023: on the three-digit score scale, the passing standard
        moved from 198 to 200. As of August 2026 there has been no further change, and none has been announced.
        Passing standards are reviewed by the USMLE Management Committee every few years, so the next Step 3
        review is plausibly due in 2027 or 2028. Changes appear on usmle.org/announcements first, usually
        several months before they take effect.
      </p>

      <h2>Why 200 is a misleading target</h2>
      <p>
        Passing Step 3 is, statistically, not the hard part. A 200 sits near the <strong>4th percentile</strong> of
        first-time takers — roughly 96% of that group scores above it. If you are aiming at 200, you are aiming
        at the bottom of the distribution. The more useful question is where your predicted score sits relative
        to the mean, which is what our{' '}
        <Link href="/usmle-step-3-score-predictor/">Step 3 score predictor</Link> estimates.
      </p>

      <h3>Approximate Step 3 percentiles</h3>
      <p>
        USMLE publishes percentiles in <strong>5-point increments only</strong>, on a distribution with a mean
        near 227 and a standard deviation near 15. That means there is no published score for the exact 50th
        percentile — the median falls between 225 and 230. Approximate bands:
      </p>
      <div className="blog-table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Step 3 score</th>
              <th scope="col">Approximate percentile</th>
              <th scope="col">How to read it</th>
            </tr>
          </thead>
          <tbody>
            <tr className="highlight-row"><td><strong>255+</strong></td><td>~97th and above</td><td>Top of the distribution</td></tr>
            <tr className="highlight-row"><td><strong>250</strong></td><td>~93rd</td><td>Strongly above average</td></tr>
            <tr><td><strong>240</strong></td><td>~80th</td><td>Comfortably above average</td></tr>
            <tr><td><strong>235</strong></td><td>~69th</td><td>Above average</td></tr>
            <tr><td><strong>230</strong></td><td>~56th</td><td>Just above the median</td></tr>
            <tr><td><strong>225</strong></td><td>~43rd</td><td>Just below the median</td></tr>
            <tr><td><strong>220</strong></td><td>~31st</td><td>Solid pass</td></tr>
            <tr><td><strong>210</strong></td><td>~12th</td><td>Passing, thin margin</td></tr>
            <tr className="danger-row"><td><strong>200</strong> (passing)</td><td>~4th</td><td>Right at the line</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Two measurement notes that matter more than most students realise. The standard error of measurement on
        Step 3 is roughly 5 points, and the standard error of estimate reported on your score report is about 7.
        A 228 and a 233 are therefore <em>not</em> meaningfully different results — they are the same performance
        with different noise. Treat any single score, real or predicted, as a range.
      </p>

      <h2>Pass rates: who actually fails</h2>
      <p>
        Roughly, first-time pass rates run around <strong>96%</strong> for US MD examinees and near{' '}
        <strong>88%</strong> for examinees from non-US/Canadian schools. The number worth internalising is the
        repeater cliff: repeat attempts drop to roughly <strong>77%</strong> and <strong>63%</strong> respectively.
      </p>
      <p>
        Whatever caused a first failure tends to persist. That is the practical argument for a diagnostic
        approach — find the specific weakness, whether it is Day 1 biostatistics, Day 2 management, or CCS — rather
        than simply re-sitting sooner. Two caveats on the published tables: DO denominators are small (most DOs take
        COMLEX-USA Level 3 instead), and from 2025 Canadian-school examinees are grouped with non-US examinees, so
        year-over-year comparisons across that boundary are not clean.
      </p>

      <h2>What happens if you fail</h2>

      <h3>The attempt limit is four — and incompletes count</h3>
      <p>From the USMLE Bulletin of Information:</p>
      <blockquote style={{ borderLeft: '3px solid rgba(99,102,241,0.4)', paddingLeft: '1rem', margin: '1rem 0', color: '#a0acc0' }}>
        &ldquo;If you have attempted a Step four or more times, including incomplete attempts, and have not
        passed, you are ineligible to apply for any Step in the USMLE sequence. Attempts at the formerly
        administered Step 2 Clinical Skills count toward the limit.&rdquo;
      </blockquote>
      <p>
        Read that carefully. Four attempts is not four attempts per year — it is a <strong>lifetime cap</strong> on
        that Step, and exhausting it without passing makes you ineligible for <em>any</em> Step in the sequence,
        not just Step 3.
      </p>

      <h3>Timing between retakes</h3>
      <p>
        You may not take the same Step more than three times within a 12-month period. A fourth attempt must be
        at least 12 months after your first attempt at that exam, and at least six months after your most recent
        attempt. Incomplete attempts count toward these limits too.
      </p>

      <h3>Failures appear on your transcript, permanently</h3>
      <p>
        Your USMLE transcript includes your complete examination history — every Step taken, including exams for
        which no result was reported. Program directors requesting your transcript see the full history, not just
        the passing attempt.
      </p>
      <p>
        One trap worth knowing: if you do not open every block of your examination, it may not be scored, and the
        attempt may be reported as <strong>incomplete</strong> on your transcript. An incomplete counts toward the
        four-attempt limit.
      </p>

      <h3>A correction on the &ldquo;seven-year rule&rdquo;</h3>
      <p>
        You will see it stated widely that you have seven years to complete the USMLE sequence.{' '}
        <strong>That is not a USMLE rule.</strong> The Bulletin says only that many US state medical boards require
        the sequence to be completed within a certain time frame, and points you to the FSMB. The limit — if any —
        comes from the state board you are licensing with, and it varies. Check your specific board rather than
        trusting a blanket number.
      </p>

      <h3>You cannot retake a passed Step to improve it</h3>
      <p>
        If you pass a Step, you are not allowed to retake it, except to comply with a time limit imposed by a US
        medical licensing authority. The score you get is the score you keep. You may request a score recheck
        within 90 days, but the recheck verifies that your responses were captured and scored correctly — it is
        not a re-grade, and it essentially never changes a score.
      </p>

      <h2>How Step 3 is structured in 2026</h2>
      <p>
        The test delivery software changed for anyone whose first day of testing falls on or after{' '}
        <strong>10 March 2026</strong>. Current structure:
      </p>
      <div className="blog-table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Component</th>
              <th scope="col">Day 1 — Foundations of Independent Practice</th>
              <th scope="col">Day 2 — Advanced Clinical Medicine</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Multiple choice</strong></td>
              <td>232 items in 12 blocks of 18–20, 30 min each</td>
              <td>180 items in 9 blocks of 20, 30 min each</td>
            </tr>
            <tr>
              <td><strong>Case simulations</strong></td>
              <td>—</td>
              <td>13–14 CCS cases, max 10 or 20 min each</td>
            </tr>
            <tr>
              <td><strong>Approx. day length</strong></td>
              <td>~7 hours</td>
              <td>~9 hours</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Note that the March 2026 change restructured the <em>multiple-choice blocks</em> only. The CCS case count
        did not change — a widely repeated claim that cases dropped to 9 confuses the new Day 2 MCQ block count
        with the case count. We cover that in detail in{' '}
        <Link href="/blog/ccs-cases-usmle-step-3/">CCS cases on Step 3: how many you actually get</Link>.
      </p>

      <section className="blog-methodology" style={{ textAlign: 'center' }}>
        <h2 style={{ marginTop: 0 }}>Where will your Step 3 score land?</h2>
        <p style={{ marginBottom: '28px' }}>
          Enter your Step 2 CK score, UWorld %, UWSA, and NBME 6/7 results for a predicted 3-digit score and a
          pass probability — free, no account.
        </p>
        <Link href="/usmle-step-3-score-predictor/" className="cta-primary-button">
          Predict my Step 3 score →
        </Link>
      </section>

      <h2>References</h2>
      <ul style={{ fontSize: '0.9rem' }}>
        <li>
          USMLE — <a href="https://www.usmle.org/bulletin-information/scoring-and-score-reporting" target="_blank" rel="noopener nofollow">Bulletin of Information: Scoring and Score Reporting</a> (passing standards, attempt limits, retake timing, transcripts).
        </li>
        <li>
          USMLE — <a href="https://www.usmle.org/step-exams/step-3/step-3-exam-content" target="_blank" rel="noopener nofollow">Step 3 Exam Content</a> (current two-day structure).
        </li>
        <li>
          USMLE — <a href="https://www.usmle.org/performance-data" target="_blank" rel="noopener nofollow">Performance Data</a> (pass rates by cohort).
        </li>
      </ul>
      <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
        Percentile bands above are approximations derived from the published mean and standard deviation, not
        official conversions. Always confirm current standards on usmle.org. USMLEPredictor is not affiliated
        with the NBME, USMLE program, or FSMB.
      </p>
    </>
  );
}
