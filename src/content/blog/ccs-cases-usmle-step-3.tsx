import Link from 'next/link';
import type { BlogPostMeta } from './types';

export const meta: BlogPostMeta = {
  slug: 'ccs-cases-usmle-step-3',
  title: 'CCS Cases on USMLE Step 3 (2026): How Many You Actually Get',
  h1: 'CCS Cases on USMLE Step 3 (2026): How Many You Actually Get',
  description:
    'Step 3 still has 13–14 CCS cases in 2026, not 9 — here is where that myth came from, plus the official scoring rules and what the research says about CCS performance.',
  excerpt:
    'Step 3 Day 2 still includes 13–14 case simulations — the “reduced to 9” claim is a misreading of USMLE’s own change table. The real format, the scoring rules quoted verbatim, and why CCS tests something your QBank score cannot predict.',
  category: 'Step 3 Guide',
  date: '2026-08-14',
  dateModified: '2026-08-14',
  author: 'Robert Zane, MD',
  authorRole: 'Founder & Lead Researcher',
  authorBio:
    'Robert Zane, MD reviews USMLE Step 3 content for accuracy. Every format and scoring statement here is quoted from usmle.org, with the source named in the text.',
  readingTime: '9 min read',
  faqs: [
    {
      question: 'How many CCS cases are on USMLE Step 3 in 2026?',
      answer:
        'Step 3 Day 2 includes 13 to 14 computer-based case simulations, each allotted a maximum of 10 or 20 minutes of real time. This did not change on March 10, 2026 — USMLE’s own change table lists case simulations as “no change.” The claim that cases were reduced to 9 confuses the new Day 2 multiple-choice block count (which did go from 6 to 9) with the case count.',
    },
    {
      question: 'How much is CCS worth on Step 3?',
      answer:
        'USMLE does not publish an exact percentage. The Bulletin states only that the proportional contribution of the CCS score is no greater than the proportional contribution of time allotted for CCS. The widely quoted “about 25%” figure is a reasonable inference from the time allotment, but it is not an official number. Step 3 is reported as a single 3-digit score; CCS is not separately scaled or reported.',
    },
    {
      question: 'What is scored on a CCS case?',
      answer:
        'USMLE lists the scored domains explicitly: diagnosis (including physical examination and appropriate diagnostic tests), therapy, monitoring, timing, sequencing, and location. Timing, sequencing, and location are scored just as the clinical decisions are — a correct action taken in the wrong order or too late may receive no credit.',
    },
    {
      question: 'Are you penalised for ordering expensive tests on CCS?',
      answer:
        'Not directly. USMLE states that cost is accounted for indirectly based on the relative inappropriateness of patient management actions. You are not marked down for an expensive test that is indicated; you are marked down for ordering one that is not indicated, and expense correlates with that only loosely.',
    },
  ],
};

export default function Body() {
  return (
    <>
      <div className="blog-citations" style={{ margin: '0 0 36px' }}>
        <h2 style={{ marginTop: 0, fontSize: '20px' }}>The short answer</h2>
        <p style={{ marginBottom: 0 }}>
          Step 3 Day 2 still includes <strong>13 to 14 computer-based case simulations</strong>, each allotted a
          maximum of 10 or 20 minutes of real time. That did <strong>not</strong> change in March 2026. USMLE
          does not publish an exact CCS weighting — only an upper bound: CCS contributes no more than its share of
          the exam&rsquo;s allotted time.
        </p>
      </div>

      <h2>First, a correction: it is not 9 cases</h2>
      <p>
        You may have read that &ldquo;on 10 March 2026 the USMLE reduced CCS cases from 13 to 9.&rdquo; That is
        false, and it is now repeated across a surprising number of prep sites — ours included, until we checked
        the primary sources and corrected it. Two USMLE documents settle it.
      </p>
      <p>
        The live <strong>Step 3 exam content page</strong> states verbatim: <em>&ldquo;13 to 14 case simulations,
        each of which is allotted a maximum of 10 or 20 minutes of real time.&rdquo;</em> That page is
        unambiguously current — it already describes Day 1 in the post-March-2026 format (232 multiple-choice
        items divided into 12 blocks of 18–20 items, 30 minutes per block).
      </p>
      <p>
        And USMLE&rsquo;s own announcement of the change includes a before/after table that lists case simulations
        explicitly:
      </p>
      <div className="blog-table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Component</th>
              <th scope="col">Before 10 March 2026</th>
              <th scope="col">On / after 10 March 2026</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Day 1 MCQ blocks</strong></td>
              <td>6 blocks, 38–39 items</td>
              <td>12 blocks, 18–20 items</td>
            </tr>
            <tr className="highlight-row">
              <td><strong>Day 2 MCQ blocks</strong></td>
              <td>6 blocks, 30 items</td>
              <td><strong>9 blocks</strong>, 20 items</td>
            </tr>
            <tr className="highlight-row">
              <td><strong>Day 2 case simulations</strong></td>
              <td>13–14 cases</td>
              <td><strong>No change</strong></td>
            </tr>
            <tr>
              <td><strong>Max minutes per case</strong></td>
              <td>10 or 20 minutes</td>
              <td>No change</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Where the myth came from is visible in that same table: on 10 March 2026, Day 2&rsquo;s{' '}
        <strong>multiple-choice block count</strong> changed from 6 to <strong>9</strong>. Somebody attached that
        9 to the case simulations, and it propagated. If you see &ldquo;9 CCS cases&rdquo; anywhere, that is the
        error you are looking at.
      </p>

      <h2>Where CCS sits in the exam</h2>
      <p>Step 3 runs over two days. CCS appears only on Day 2, Advanced Clinical Medicine:</p>
      <div className="blog-table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Day 2 component</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>Multiple choice</strong></td><td>180 items in 9 blocks of 20, 30 minutes each</td></tr>
            <tr><td><strong>CCS tutorial</strong></td><td>6 minutes, optional — no practice cases at the centre</td></tr>
            <tr><td><strong>Case simulations</strong></td><td>13–14 cases, max 10 or 20 minutes real time each</td></tr>
            <tr><td><strong>Break</strong></td><td>Minimum 45 minutes</td></tr>
            <tr><td><strong>Total</strong></td><td>Approximately 9 hours</td></tr>
          </tbody>
        </table>
      </div>

      <h2>How CCS is actually scored</h2>

      <h3>The weighting is an upper bound, not a percentage</h3>
      <p>From the Bulletin of Information, Scoring and Score Reporting:</p>
      <blockquote style={{ borderLeft: '3px solid rgba(99,102,241,0.4)', paddingLeft: '1rem', margin: '1rem 0', color: '#a0acc0' }}>
        &ldquo;For Step 3, your performance on the case simulations will affect your Step 3 score and could
        affect whether you pass or fail. The proportional contribution of the score on the case simulations is no
        greater than the proportional contribution of time allotted for CCS.&rdquo;
      </blockquote>
      <p>
        That is the only weighting statement USMLE publishes. The widely quoted figure that CCS is
        &ldquo;about 25% of your Step 3 score&rdquo; appears in no official document — it is a reasonable
        inference from the time allotment, but treat it as an estimate rather than a fact. CCS is not separately
        scaled or separately reported; Step 3 comes back as one 3-digit score.
      </p>

      <h3>What earns and loses credit</h3>
      <p>
        USMLE lists the scored domains explicitly: <strong>diagnosis</strong> (including physical examination and
        appropriate diagnostic tests), <strong>therapy</strong>, <strong>monitoring</strong>,{' '}
        <strong>timing</strong>, <strong>sequencing</strong>, and <strong>location</strong>. Note that the last
        three are scored just as the first three are.
      </p>
      <div className="blog-table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Official wording</th>
              <th scope="col">What it means in practice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&ldquo;Indicated patient management actions are awarded credit&rdquo;</td>
              <td>Credit is positive and specific — do the right things.</td>
            </tr>
            <tr>
              <td>&ldquo;Actions that are not indicated and pose greater potential risk… decrease your score&rdquo;</td>
              <td>Unnecessary orders are penalised, keyed to <em>risk</em> rather than quantity. An extra CBC is not equivalent to an unindicated invasive procedure.</td>
            </tr>
            <tr>
              <td>&ldquo;Seemingly correct management decisions made in an incorrect sequence or after a delay… may receive no credit&rdquo;</td>
              <td>Right action, wrong order or too late, equals zero. Sequencing is scored.</td>
            </tr>
            <tr>
              <td>&ldquo;You will be scored lower if you take an aggressive approach when restraint and observation are the standard of care&rdquo;</td>
              <td>Over-treating is a scored error, not a safe default.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>The cost myth, corrected.</strong> USMLE states that cost is accounted for{' '}
        <em>indirectly</em>, based on the relative inappropriateness of patient-management actions. There is no
        direct cost penalty. You are not marked down for an expensive test that is indicated — you are marked down
        for ordering an inappropriate one, and expense correlates with that only loosely.
      </p>

      <h2>What the research says about CCS</h2>

      <h3>CCS measures something the multiple-choice sections do not</h3>
      <p>
        Feinberg RA et al., <em>Journal of General Internal Medicine</em> 2012;27(1):65–70 (PMID 21879372),
        analysing 40,588 first-time Step 3 takers, found:
      </p>
      <blockquote style={{ borderLeft: '3px solid rgba(99,102,241,0.4)', paddingLeft: '1rem', margin: '1rem 0', color: '#a0acc0' }}>
        &ldquo;Predictors of Step 1 and Step 2 CK explained 55% of overall Step 3 variability and only 9% of CCS
        score variability.&rdquo;
      </blockquote>
      <p>
        Read that again. Your Step 1 and Step 2 CK performance predicts more than half of your overall Step 3
        score — and almost none of your CCS performance. CCS tests a genuinely different skill, which is exactly
        why students who coast on question-bank ability get surprised by it. It is also why our{' '}
        <Link href="/usmle-step-3-score-predictor/">Step 3 predictor</Link> treats CCS as a separate adjustment on
        top of the multiple-choice estimate rather than folding it into the same signal.
      </p>

      <h3>One in five candidates orders something dangerous</h3>
      <p>
        Harik P et al., <em>Academic Medicine</em> 2009;84(10 Suppl):S79–82 (PMID 19907393), analysing 25,283
        first-time examinees, found that <strong>over 20% ordered at least one action with potential for
        significant patient harm</strong>, and that the propensity varied by case.
      </p>
      <p>
        That is the practical argument for practising CCS rather than winging it. The failure mode is usually not
        missing the diagnosis — it is reaching for an intervention that is aggressive, mistimed, or simply not
        indicated.
      </p>

      <h2>What this means for your prep</h2>
      <ul>
        <li><strong>Do not skip CCS practice because your QBank average is high.</strong> The research says your MCQ ability predicts almost none of your CCS performance.</li>
        <li><strong>Practise sequencing and timing, not just diagnosis.</strong> Both are explicitly scored, and both are where most credit is lost.</li>
        <li><strong>Resist the urge to over-order.</strong> Restraint is the standard of care in some cases, and aggression is scored down.</li>
        <li><strong>Use the 6-minute tutorial time wisely</strong> — there are no practice cases at the test centre, so interface fluency has to come from prep.</li>
      </ul>

      <section className="blog-methodology" style={{ textAlign: 'center' }}>
        <h2 style={{ marginTop: 0 }}>Factor CCS into your Step 3 estimate</h2>
        <p style={{ marginBottom: '28px' }}>
          Our predictor blends your Step 2 CK, UWorld %, UWSA, and NBME 6/7 results, then applies a CCS
          adjustment — because no multiple-choice form grades case simulations.
        </p>
        <Link href="/usmle-step-3-score-predictor/" className="cta-primary-button">
          Predict my Step 3 score →
        </Link>
      </section>

      <h2>References</h2>
      <ul style={{ fontSize: '0.9rem' }}>
        <li>
          USMLE — <a href="https://www.usmle.org/step-exams/step-3/step-3-exam-content" target="_blank" rel="noopener nofollow">Step 3 Exam Content</a> (case count, block structure).
        </li>
        <li>
          USMLE — <a href="https://www.usmle.org/usmle-test-delivery-software-updates-coming-2026" target="_blank" rel="noopener nofollow">Test Delivery Software Updates Coming in 2026</a> (the before/after change table).
        </li>
        <li>
          USMLE — <a href="https://www.usmle.org/bulletin-information/scoring-and-score-reporting" target="_blank" rel="noopener nofollow">Bulletin of Information: Scoring and Score Reporting</a> (CCS weighting statement).
        </li>
        <li>Feinberg RA et al. <em>J Gen Intern Med</em> 2012;27(1):65–70. PMID 21879372.</li>
        <li>Harik P et al. <em>Acad Med</em> 2009;84(10 Suppl):S79–82. PMID 19907393.</li>
      </ul>
      <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
        Educational content. USMLEPredictor is not affiliated with the NBME, USMLE program, or FSMB. Always
        confirm current exam format and policy on usmle.org.
      </p>
    </>
  );
}
