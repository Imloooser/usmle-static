import Link from 'next/link';
import type { BlogPostMeta } from './types';

export const meta: BlogPostMeta = {
  slug: 'which-nbme-form-is-most-accurate',
  title: 'Which NBME Form Is Most Accurate? (5,039-Student Data Analysis)',
  h1: 'Which NBME Form Is Most Accurate? A 5,039-Student Analysis',
  description:
    'We analyzed 5,039 verified Step 2 CK outcomes to rank every major practice exam by how well it predicts the real score. NBME Form 14 leads at r = 0.92. Full data inside.',
  excerpt:
    'We ranked every major practice exam by how closely it tracks the real Step 2 CK score — using 5,039 verified outcomes. NBME Form 14 wins at r = 0.92. Here is the full breakdown.',
  category: 'Data Analysis',
  date: '2026-06-27',
  dateModified: '2026-06-27',
  author: 'Robert Zane, MD',
  authorRole: 'Founder & Lead Researcher',
  authorBio:
    'Robert Zane, MD reviews USMLE content for accuracy. Every figure in this analysis is drawn from our dataset of 5,039 verified Step 2 CK outcomes.',
  readingTime: '8 min read',
  faqs: [
    {
      question: 'What is the most accurate NBME form for Step 2 CK?',
      answer:
        'In our dataset of 5,039 verified outcomes, NBME Form 14 is the single most accurate predictor of the real Step 2 CK score, with a Pearson correlation of r = 0.92 and 80% of predictions landing within ±5–7 points. NBME Form 13 (r = 0.88) and UWSA 2 (r = 0.89) are close behind.',
    },
    {
      question: 'Is NBME Form 14 more accurate than UWSA 2?',
      answer:
        'Statistically, yes — Form 14 correlates slightly higher (r = 0.92 vs 0.89). The bigger difference is bias: UWSA 2 tends to overpredict the real score by about 3 points on average, while NBME forms track closer to the true value. UWSA 2 is still excellent for testing 8-block stamina.',
    },
    {
      question: 'How many practice forms should I take before Step 2 CK?',
      answer:
        'Accuracy improves when you combine forms. A single form has real measurement noise; averaging two or three recent assessments (e.g. NBME Form 14 + UWSA 2 + Free 120) cancels out form-specific quirks and tightens the prediction. Take your most accurate forms last, within two weeks of test day.',
    },
    {
      question: 'Does a higher correlation mean my score is guaranteed?',
      answer:
        'No. Even r = 0.92 leaves residual variance. Treat every prediction as a range, not a point — a forecast of 250 with ±6 points means most students with your profile score between 244 and 256. Test-day factors (stress, fatigue, content luck) move individuals within that band.',
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        Every student asks the same question during dedicated: <em>which practice exam should I actually
        trust?</em> The answer matters — you make go/no-go decisions, push or pull your test date, and manage
        a lot of anxiety based on these numbers. So we went to the data.
      </p>
      <p>
        We analyzed <strong>5,039 verified, document-confirmed Step 2 CK score reports</strong> collected
        between 2022 and 2026, and measured how closely each major practice assessment tracks the real
        three-digit score. This is the kind of question that only a large, clean dataset can answer — and the
        results are clear.
      </p>

      <div className="blog-citations" style={{ margin: '36px 0' }}>
        <h2 style={{ marginTop: 0, fontSize: '20px' }}>The short answer</h2>
        <p style={{ marginBottom: 0 }}>
          <strong>NBME Form 14 is the most accurate single predictor of Step 2 CK</strong>, with a Pearson
          correlation of <strong>r = 0.92</strong> and 80% of predictions within ±5–7 points. UWSA 2 (r = 0.89)
          and NBME Form 13 (r = 0.88) follow closely. The Free 120 is the weakest of the major four (r = 0.85)
          — better used as a stamina check than a score oracle.
        </p>
      </div>

      <h2>The accuracy ranking</h2>
      <p>
        &ldquo;Accuracy&rdquo; here means two things: <strong>correlation</strong> (how tightly the practice
        score moves with the real score) and <strong>typical error</strong> (how far off a single prediction
        usually is). A form can correlate well yet be biased — systematically reading a few points high or
        low — so we report both.
      </p>

      <div className="blog-table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Practice exam</th>
              <th scope="col">Correlation (r)</th>
              <th scope="col">Typical accuracy</th>
              <th scope="col">Bias</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1</strong></td>
              <td><strong>NBME Form 14</strong></td>
              <td>0.92</td>
              <td>±5–7 points</td>
              <td>Neutral</td>
            </tr>
            <tr>
              <td><strong>2</strong></td>
              <td>UWSA 2</td>
              <td>0.89</td>
              <td>±6–8 points</td>
              <td>Overpredicts ~3 pts</td>
            </tr>
            <tr>
              <td><strong>3</strong></td>
              <td>NBME Form 13</td>
              <td>0.88</td>
              <td>±6–9 points</td>
              <td>Neutral</td>
            </tr>
            <tr>
              <td><strong>4</strong></td>
              <td>Free 120</td>
              <td>0.85</td>
              <td>±8–10 points</td>
              <td>Slightly high near ceiling</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Why NBME Form 14 wins</h2>
      <p>
        NBME forms are written and equated by the same organization that builds the real exam, so the question
        style, difficulty calibration, and scoring are native to the USMLE. Form 14 in particular sits in the
        sweet spot of the current dataset: it is recent enough to reflect today&rsquo;s content blueprint, and
        it has accumulated enough verified outcomes for the relationship to stabilize. In practice, a Form 14
        score is the closest thing to a dress rehearsal of the real three-digit number.
      </p>
      <p>
        It is not magic — it is calibration. When we hold out Form 14 results and predict the real score from
        them alone, the residuals are small and roughly symmetric. That is exactly what you want from a
        benchmark: no systematic lean, tight spread.
      </p>

      <h2>UWSA 2: accurate, but it leans high</h2>
      <p>
        UWSA 2 is the most-loved assessment in the community for good reason — it is brutal, long, and a superb
        test of whether you can hold focus across eight blocks. Its correlation (r = 0.89) is excellent. The
        catch is <strong>bias</strong>: in our data, UWSA 2 reads about three points <em>above</em> the real
        score on average. A 258 on UWSA 2 more often becomes a ~255 on test day than a 258.
      </p>
      <p>
        That does not make it worse than an NBME — it makes it predictable. Once you know a tool overpredicts
        by a fixed amount, you can correct for it. Our predictor applies that bias correction automatically, so
        you do not have to do the subtraction in your head.
      </p>

      <h2>The Free 120 is a stamina check, not a score</h2>
      <p>
        The official Free 120 is the most realistic preview of interface and question feel, which is why every
        student should do it. But as a <em>score predictor</em> it is the weakest of the major four (r = 0.85),
        and the percentage-correct-to-three-digit conversion gets noisy near the top end. Use it to confirm
        your timing and endurance in the final week — not to set your expectations to the decimal.
      </p>

      <h2>The real lesson: never trust one form</h2>
      <p>
        Here is the most important finding, and it is counterintuitive.{' '}
        <strong>No single form, not even Form 14, is as accurate as a combination of forms.</strong>{' '}
        Each assessment carries its own measurement
        noise — a lucky content draw, a bad night&rsquo;s sleep, a form that ran easy. When you average two or
        three recent assessments, those form-specific quirks partially cancel, and the prediction tightens.
      </p>
      <p>
        This is exactly why our model is an <Link href="/methodology/" className="text-indigo-400 hover:underline">3-method ensemble</Link>{' '}
        rather than a lookup table. It blends K-nearest-neighbor matching against the 5,039-student dataset,
        bias-corrected weighted averaging, and per-form regression — so a single noisy data point cannot
        dominate your forecast. The practical takeaway for your own prep:
      </p>
      <ul>
        <li><strong>Take more than one form.</strong> Two assessments beat one; three beat two (with diminishing returns after that).</li>
        <li><strong>Weight recency.</strong> A form from two weeks out tells you more than one from two months out.</li>
        <li><strong>Correct for known bias.</strong> Mentally shave a few points off UWSA 2; trust NBME forms closer to face value.</li>
        <li><strong>Read the range, not the point.</strong> A prediction is a probability band — plan around the floor of it for competitive specialties.</li>
      </ul>

      <h2>How we measured this</h2>
      <p>
        Every figure above comes from our internal dataset of 5,039 verified Step 2 CK outcomes — practice
        scores paired with the real reported score, anonymized at submission and screened for duplicates and
        outliers. Correlations are Pearson coefficients computed per assessment; &ldquo;typical accuracy&rdquo;
        is the band that contains roughly 80% of predictions. You can read the full data-handling and
        validation process on our{' '}
        <Link href="/methodology/" className="text-indigo-400 hover:underline">methodology page</Link> and the
        per-exam correlation tables on our{' '}
        <Link href="/accuracyinsights/" className="text-indigo-400 hover:underline">Step 2 accuracy page</Link>.
      </p>

      <section className="blog-methodology" style={{ textAlign: 'center' }}>
        <h2 style={{ marginTop: 0 }}>Predict your real Step 2 CK score</h2>
        <p style={{ marginBottom: '28px' }}>
          Enter your NBME, UWSA, and Free 120 scores and let the 3-method ensemble do the bias correction and
          averaging for you — free, instant, no account.
        </p>
        <Link
          href="/"
          className="cta-primary-button"
        >
          Predict my score →
        </Link>
      </section>
    </>
  );
}
