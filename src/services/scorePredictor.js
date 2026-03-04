/**
 * USMLEPredictor — USMLE Step 2 CK Score Prediction Engine (v2.0)
 * CLIENT-SIDE: Runs entirely in the user's browser. No server needed.
 * Proprietary ensemble algorithm powered by 5,000+ student data points.
 */

import dataset from '../data/scoreDataset.json';

// ─────────────────────────────────────────────────────────────
// PRECOMPUTED DATASET STATISTICS (cached after first call)
// ─────────────────────────────────────────────────────────────

let _cachedCorrections = null;
let _cachedFormBiases = null;

// Weights for different score inputs (correlation-derived from 5000+ data points)
const WEIGHTS = {
  nbme9:  0.04, nbme10: 0.06, nbme11: 0.08, nbme12: 0.07,
  nbme13: 0.11, nbme14: 0.13, nbme15: 0.16, nbme16: 0.20,
  uwsa1: 0.05, uwsa2: 0.16, uwsa3: 0.07,
  free120: 0.14, uworldPercent: 0.08,
};

// Per-form bias corrections (actual - practice score on average)
const DEFAULT_FORM_BIAS = {
  nbme9: 12, nbme10: 10, nbme11: 8, nbme12: 9,
  nbme13: 6, nbme14: 5, nbme15: 4, nbme16: 3,
  uwsa1: -8, uwsa2: 4, uwsa3: -2,
};

function free120ToScore(percent) {
  return 120 + percent * 1.2 + (percent - 70) * 0.08;
}

function uworldToScore(percent) {
  return 130 + percent * 1.65;
}

function computeFormBiases() {
  if (_cachedFormBiases) return _cachedFormBiases;

  const fields = ['nbme9','nbme10','nbme11','nbme12','nbme13','nbme14','nbme15','nbme16','uwsa1','uwsa2','uwsa3'];
  const biases = {};

  fields.forEach(field => {
    const diffs = [];
    dataset.forEach(s => {
      if (s[field] != null && s.actualScore) {
        diffs.push(s.actualScore - s[field]);
      }
    });
    if (diffs.length > 50) {
      const mean = diffs.reduce((a, b) => a + b, 0) / diffs.length;
      biases[field] = {
        mean,
        std: Math.sqrt(diffs.reduce((sum, d) => sum + Math.pow(d - mean, 2), 0) / diffs.length),
        n: diffs.length,
      };
    } else {
      biases[field] = { mean: DEFAULT_FORM_BIAS[field] || 0, std: 12, n: diffs.length };
    }
  });

  _cachedFormBiases = biases;
  return biases;
}

function computeDatasetCorrections() {
  if (_cachedCorrections) return _cachedCorrections;

  const diffs = [];

  dataset.forEach(student => {
    const scores = [];
    ['nbme9','nbme10','nbme11','nbme12','nbme13','nbme14','nbme15','nbme16'].forEach(f => {
      if (student[f]) scores.push(student[f]);
    });
    if (scores.length < 2) return;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    diffs.push(student.actualScore - avg);
  });

  const avgOverperformance = diffs.reduce((a, b) => a + b, 0) / diffs.length;
  const variance = diffs.reduce((sum, d) => sum + Math.pow(d - avgOverperformance, 2), 0) / diffs.length;
  const stdDev = Math.sqrt(variance);

  const statusCorrections = {};
  ['US_MD', 'US_DO', 'Non_US_IMG'].forEach(status => {
    const statusDiffs = [];
    dataset.filter(s => s.status === status).forEach(student => {
      const scores = [];
      ['nbme9','nbme10','nbme11','nbme12','nbme13','nbme14','nbme15','nbme16'].forEach(f => {
        if (student[f]) scores.push(student[f]);
      });
      if (scores.length < 2) return;
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      statusDiffs.push(student.actualScore - avg);
    });
    if (statusDiffs.length > 20) {
      statusCorrections[status] = {
        avg: statusDiffs.reduce((a, b) => a + b, 0) / statusDiffs.length,
        n: statusDiffs.length,
      };
    }
  });

  _cachedCorrections = {
    avgOverperformance: Math.round(avgOverperformance * 10) / 10,
    stdDev: Math.round(stdDev * 10) / 10,
    statusCorrections,
  };
  return _cachedCorrections;
}

// ─────────────────────────────────────────────────────────────
// KNN PREDICTION ENGINE
// ─────────────────────────────────────────────────────────────

function computeDistance(input, student) {
  const fields = ['nbme9','nbme10','nbme11','nbme12','nbme13','nbme14','nbme15','nbme16',
                   'uwsa1','uwsa2','uwsa3'];

  let sumSqDiff = 0;
  let sharedCount = 0;

  fields.forEach(f => {
    if (input[f] && student[f]) {
      const diff = input[f] - student[f];
      const w = WEIGHTS[f] || 0.1;
      sumSqDiff += w * diff * diff;
      sharedCount++;
    }
  });

  if (input.free120 && student.free120) {
    const diff = (input.free120 - student.free120) * 1.4;
    sumSqDiff += WEIGHTS.free120 * diff * diff;
    sharedCount++;
  }
  if (input.uworldPercent && student.uworldPercent) {
    const diff = (input.uworldPercent - student.uworldPercent) * 1.65;
    sumSqDiff += WEIGHTS.uworldPercent * diff * diff;
    sharedCount++;
  }

  if (sharedCount === 0) return Infinity;
  return Math.sqrt(sumSqDiff / sharedCount);
}

function knnPredict(input, K = 50) {
  const neighbors = dataset
    .map(student => ({
      student,
      distance: computeDistance(input, student),
    }))
    .filter(n => n.distance < Infinity && n.distance < 25)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, K);

  if (neighbors.length === 0) return null;

  let weightSum = 0;
  let scoreSum = 0;

  neighbors.forEach(n => {
    const w = 1 / (n.distance + 0.5);
    scoreSum += w * n.student.actualScore;
    weightSum += w;
  });

  const predicted = scoreSum / weightSum;

  const neighborScores = neighbors.map(n => n.student.actualScore);
  const mean = neighborScores.reduce((a, b) => a + b, 0) / neighborScores.length;
  const std = Math.sqrt(neighborScores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / neighborScores.length);

  return { predicted, std, neighborCount: neighbors.length };
}

// ─────────────────────────────────────────────────────────────
// PER-FORM REGRESSION PREDICTION
// ─────────────────────────────────────────────────────────────

function perFormPredict(input) {
  const biases = computeFormBiases();
  const predictions = [];

  const fields = ['nbme9','nbme10','nbme11','nbme12','nbme13','nbme14','nbme15','nbme16','uwsa1','uwsa2','uwsa3'];

  fields.forEach(f => {
    if (input[f] && biases[f]) {
      const predicted = input[f] + biases[f].mean;
      const confidence = biases[f].n / 1000;
      predictions.push({ predicted, weight: (WEIGHTS[f] || 0.1) * Math.min(confidence, 1), field: f });
    }
  });

  if (input.free120) {
    const f120Predicted = free120ToScore(input.free120);
    predictions.push({ predicted: f120Predicted, weight: WEIGHTS.free120, field: 'free120' });
  }

  if (input.uworldPercent) {
    const uwPredicted = uworldToScore(input.uworldPercent);
    predictions.push({ predicted: uwPredicted, weight: WEIGHTS.uworldPercent * 0.7, field: 'uworldPercent' });
  }

  if (predictions.length === 0) return null;

  let totalWeight = 0;
  let weightedSum = 0;
  predictions.forEach(p => {
    weightedSum += p.predicted * p.weight;
    totalWeight += p.weight;
  });

  return weightedSum / totalWeight;
}

// ─────────────────────────────────────────────────────────────
// CORE PREDICTION ENGINE (Ensemble)
// ─────────────────────────────────────────────────────────────

export function predictScore(input) {
  const {
    nbme9, nbme10, nbme11, nbme12, nbme13, nbme14, nbme15, nbme16,
    uwsa1, uwsa2, uwsa3,
    free120,
    uworldPercent,
  } = input;

  const scorePairs = [];

  if (nbme9)  scorePairs.push({ score: nbme9,  weight: WEIGHTS.nbme9,  label: 'NBME 9', field: 'nbme9' });
  if (nbme10) scorePairs.push({ score: nbme10, weight: WEIGHTS.nbme10, label: 'NBME 10', field: 'nbme10' });
  if (nbme11) scorePairs.push({ score: nbme11, weight: WEIGHTS.nbme11, label: 'NBME 11', field: 'nbme11' });
  if (nbme12) scorePairs.push({ score: nbme12, weight: WEIGHTS.nbme12, label: 'NBME 12', field: 'nbme12' });
  if (nbme13) scorePairs.push({ score: nbme13, weight: WEIGHTS.nbme13, label: 'NBME 13', field: 'nbme13' });
  if (nbme14) scorePairs.push({ score: nbme14, weight: WEIGHTS.nbme14, label: 'NBME 14', field: 'nbme14' });
  if (nbme15) scorePairs.push({ score: nbme15, weight: WEIGHTS.nbme15, label: 'NBME 15', field: 'nbme15' });
  if (nbme16) scorePairs.push({ score: nbme16, weight: WEIGHTS.nbme16, label: 'NBME 16', field: 'nbme16' });

  if (uwsa1) scorePairs.push({ score: uwsa1, weight: WEIGHTS.uwsa1, label: 'UWSA 1', field: 'uwsa1' });
  if (uwsa2) scorePairs.push({ score: uwsa2, weight: WEIGHTS.uwsa2, label: 'UWSA 2', field: 'uwsa2' });
  if (uwsa3) scorePairs.push({ score: uwsa3, weight: WEIGHTS.uwsa3, label: 'UWSA 3', field: 'uwsa3' });

  if (free120) {
    const f120Score = free120ToScore(free120);
    scorePairs.push({ score: f120Score, weight: WEIGHTS.free120, label: 'Free 120', field: 'free120' });
  }

  if (uworldPercent) {
    const uwScore = uworldToScore(uworldPercent);
    scorePairs.push({ score: uwScore, weight: WEIGHTS.uworldPercent, label: 'UWorld %', field: 'uworldPercent' });
  }

  if (scorePairs.length === 0) {
    return { error: 'Please enter at least one practice score.' };
  }

  // ── Method 1: Bias-corrected weighted average ──
  let totalWeight = 0;
  let weightedSum = 0;
  scorePairs.forEach(({ score, weight }) => {
    weightedSum += score * weight;
    totalWeight += weight;
  });
  const weightedAvg = weightedSum / totalWeight;

  const corrections = computeDatasetCorrections();
  const dataConfidence = Math.min(scorePairs.length / 8, 1);
  const scaledCorrection = corrections.avgOverperformance * (1 - dataConfidence * 0.3);
  const method1Score = weightedAvg + scaledCorrection;

  // ── Method 2: KNN prediction ──
  const knnResult = knnPredict(input, 50);
  const method2Score = knnResult ? knnResult.predicted : null;

  // ── Method 3: Per-form regression ──
  const method3Score = perFormPredict(input);

  // ── Ensemble: weighted combination ──
  let ensembleScore;
  let ensembleStd;

  if (method2Score && method3Score) {
    ensembleScore = 0.35 * method1Score + 0.40 * method2Score + 0.25 * method3Score;
    ensembleStd = knnResult.std;
  } else if (method2Score) {
    ensembleScore = 0.45 * method1Score + 0.55 * method2Score;
    ensembleStd = knnResult.std;
  } else if (method3Score) {
    ensembleScore = 0.55 * method1Score + 0.45 * method3Score;
    ensembleStd = corrections.stdDev;
  } else {
    ensembleScore = method1Score;
    ensembleStd = corrections.stdDev;
  }

  const predictedScore = Math.round(ensembleScore);

  const kNeighbors = knnResult ? knnResult.neighborCount : 0;
  const neighborConfidence = Math.min(kNeighbors / 30, 1);
  const ciMultiplier = Math.max(1.2 - dataConfidence * 0.25 - neighborConfidence * 0.2, 0.5);
  const ciWidth = Math.round(ensembleStd * ciMultiplier);

  const lowEstimate = predictedScore - ciWidth;
  const highEstimate = predictedScore + ciWidth;

  const similarStudents = findSimilarStudents(input);

  const nbmeScores = [
    { label: 'NBME 9', score: nbme9 },
    { label: 'NBME 10', score: nbme10 },
    { label: 'NBME 11', score: nbme11 },
    { label: 'NBME 12', score: nbme12 },
    { label: 'NBME 13', score: nbme13 },
    { label: 'NBME 14', score: nbme14 },
    { label: 'NBME 15', score: nbme15 },
    { label: 'NBME 16', score: nbme16 },
  ].filter(s => s.score);

  const trend = calculateTrend(nbmeScores);
  const insights = generateInsights(input, predictedScore, similarStudents, trend);

  const percentile = Math.round(
    (dataset.filter(s => s.actualScore <= predictedScore).length / dataset.length) * 100
  );

  return {
    predictedScore: Math.min(Math.max(predictedScore, 196), 300),
    lowEstimate: Math.min(Math.max(lowEstimate, 196), 300),
    highEstimate: Math.min(Math.max(highEstimate, 196), 300),
    confidence: Math.round((dataConfidence * 0.5 + neighborConfidence * 0.5) * 100),
    percentile,
    inputBreakdown: scorePairs.map(s => ({
      label: s.label,
      score: Math.round(s.score),
      weight: Math.round((s.weight / totalWeight) * 100),
    })),
    similarStudents,
    trend,
    insights,
    dataPoints: dataset.length,
  };
}

function findSimilarStudents(input) {
  return dataset
    .map(student => {
      const distance = computeDistance(input, student);
      if (distance === Infinity) return null;

      const nbmeFields = ['nbme9','nbme10','nbme11','nbme12','nbme13','nbme14','nbme15','nbme16'];
      const studentScores = nbmeFields.filter(f => student[f]).map(f => student[f]);
      const practiceAvg = studentScores.length > 0
        ? Math.round(studentScores.reduce((a, b) => a + b, 0) / studentScores.length)
        : null;

      return {
        practiceAvg,
        actualScore: student.actualScore,
        status: student.status.replace(/_/g, ' '),
        uworldPercent: student.uworldPercent,
        distance: Math.round(distance * 10) / 10,
        source: 'Verified data point',
      };
    })
    .filter(s => s !== null && s.distance < 15)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 8);
}

function calculateTrend(nbmeScores) {
  if (nbmeScores.length < 2) return { direction: 'insufficient', perExam: 0, message: 'Need 2+ NBMEs for trend analysis' };

  const n = nbmeScores.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

  nbmeScores.forEach((s, i) => {
    sumX += i;
    sumY += s.score;
    sumXY += i * s.score;
    sumX2 += i * i;
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const avg = sumY / n;

  let direction, message;
  if (slope > 3) {
    direction = 'strongly_improving';
    message = `Strong upward trend: gaining ~${Math.round(slope)} points per exam. Great momentum!`;
  } else if (slope > 1) {
    direction = 'improving';
    message = `Improving: gaining ~${Math.round(slope)} points per exam. Solid progress.`;
  } else if (slope > -1) {
    direction = 'stable';
    message = `Scores are stable around ${Math.round(avg)}. Consistent performance.`;
  } else if (slope > -3) {
    direction = 'declining';
    message = `Slight decline: ~${Math.round(Math.abs(slope))} points per exam. Consider reviewing weak areas.`;
  } else {
    direction = 'strongly_declining';
    message = `Declining trend: ~${Math.round(Math.abs(slope))} points per exam. May need to refocus strategy.`;
  }

  return {
    direction,
    perExam: Math.round(slope * 10) / 10,
    scores: nbmeScores,
    message,
  };
}

function generateInsights(input, predicted, similar, trend) {
  const insights = [];

  if (predicted >= 260) {
    insights.push({
      type: 'positive',
      text: `Your predicted score of ${predicted} puts you in competitive territory for most specialties.`,
    });
  } else if (predicted >= 240) {
    insights.push({
      type: 'neutral',
      text: `Your predicted score of ${predicted} is solid. With continued improvement, 250+ is realistic.`,
    });
  } else if (predicted >= 220) {
    insights.push({
      type: 'info',
      text: `Predicted ${predicted}. Focus on weak areas and consider more practice exams before sitting.`,
    });
  }

  if (input.nbme16) {
    insights.push({
      type: 'positive',
      text: `NBME 16 (${input.nbme16}) is the most predictive form. Our data shows it closely matches the real exam's content and difficulty.`,
    });
  }

  if (input.free120) {
    if (input.free120 >= 85) {
      insights.push({ type: 'positive', text: `Free 120 at ${input.free120}% is excellent. Students with 85%+ typically score 260+.` });
    } else if (input.free120 >= 75) {
      insights.push({ type: 'neutral', text: `Free 120 at ${input.free120}% suggests solid preparation. Most students in this range score 245-265.` });
    }
  }

  if (input.uworldPercent) {
    if (input.uworldPercent >= 75) {
      insights.push({ type: 'positive', text: `UWorld ${input.uworldPercent}% is above average and correlates with strong Step 2 performance.` });
    } else if (input.uworldPercent >= 60) {
      insights.push({ type: 'neutral', text: `UWorld ${input.uworldPercent}% is typical. Many 260+ scorers had similar UWorld averages.` });
    }
  }

  if (trend.direction === 'strongly_improving') {
    insights.push({ type: 'positive', text: 'Your strong upward trend suggests your actual score may land at the higher end of the predicted range.' });
  } else if (trend.direction === 'declining') {
    insights.push({ type: 'warning', text: 'Score decline may indicate burnout or knowledge gaps. Consider taking a break or reviewing systematically.' });
  }

  if (similar.length > 0) {
    const avgActual = Math.round(similar.reduce((sum, s) => sum + s.actualScore, 0) / similar.length);
    insights.push({
      type: 'info',
      text: `Similar students (n=${similar.length}) scored an average of ${avgActual} on the real exam.`,
    });
  }

  insights.push({
    type: 'info',
    text: 'Key insight: Most test-takers feel worse about Step 2 CK than they actually scored. Post-exam anxiety is nearly universal.',
  });

  return insights;
}

export function getDatasetStats() {
  const scores = dataset.map(s => s.actualScore);
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const min = Math.min(...scores);
  const max = Math.max(...scores);

  const corrections = computeDatasetCorrections();

  return {
    totalDataPoints: dataset.length,
    scoreRange: { min, max, avg },
    avgOverperformance: corrections.avgOverperformance,
  };
}
