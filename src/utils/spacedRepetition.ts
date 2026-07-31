import { SpacedRepetitionData, StudyRating } from '../types/flashcards';

export function createInitialSpacedRepetitionData(): SpacedRepetitionData {
  return {
    repetitions: 0,
    intervalDays: 0,
    easeFactor: 2.5,
    lapses: 0,
    nextReviewAt: Date.now(),
  };
}

export function calculateNextReview(
  rating: StudyRating,
  currentData: SpacedRepetitionData
): SpacedRepetitionData {
  let { repetitions, intervalDays, easeFactor, lapses } = currentData;
  const now = Date.now();

  switch (rating) {
    case 'again':
      repetitions = 0;
      intervalDays = 1; // Review tomorrow
      lapses += 1;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
      break;

    case 'hard':
      repetitions += 1;
      intervalDays = Math.max(1, Math.round(intervalDays * 1.2));
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      break;

    case 'good':
      repetitions += 1;
      if (repetitions === 1) {
        intervalDays = 1;
      } else if (repetitions === 2) {
        intervalDays = 6;
      } else {
        intervalDays = Math.round(intervalDays * easeFactor);
      }
      break;

    case 'easy':
      repetitions += 1;
      if (repetitions === 1) {
        intervalDays = 4;
      } else {
        intervalDays = Math.round(intervalDays * easeFactor * 1.3);
      }
      easeFactor += 0.15;
      break;
  }

  const nextReviewAt = now + intervalDays * 24 * 60 * 60 * 1000;

  return {
    repetitions,
    intervalDays,
    easeFactor,
    lapses,
    lastReviewedAt: now,
    nextReviewAt,
  };
}
