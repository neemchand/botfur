function clampValue(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function calculateHappinessBoost(stat, threshold, highBoost, lowBoost) {
  return stat < threshold ? highBoost : lowBoost;
}

module.exports = {
  clampValue,
  calculateHappinessBoost
};