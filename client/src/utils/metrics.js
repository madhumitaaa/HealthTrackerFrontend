// client/src/utils/metrics.js

export function calculateTodayMetrics(entries) {
  if (!entries || entries.length === 0) {
    return { calories: 0, sleep: 0, workouts: 0 };
  }

  const today = new Date().toISOString().split("T")[0];

  const todayEntries = entries.filter(e => e.date === today);

  const totalCalories = todayEntries.reduce(
    (sum, e) => sum + Number(e.calories || 0),
    0
  );

  const totalSleep = todayEntries.reduce(
    (sum, e) => sum + Number(e.sleep || 0),
    0
  );

  const totalWorkouts = todayEntries.filter(
    e => e.workouts && e.workouts.trim() !== ""
  ).length;

  return {
    calories: totalCalories,
    sleep: totalSleep,
    workouts: totalWorkouts,
  };
}
