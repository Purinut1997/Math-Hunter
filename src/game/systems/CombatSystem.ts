export class CombatSystem {
  constructor() {
    // Placeholder
  }
  
  startEncounter(monsterId: string) {
    console.log('Encounter started with:', monsterId);
    // Disable movement
    // Show combat overlay
  }

  answerQuestion(selectedAnswer: number, correctAnswer: number): boolean {
    if (selectedAnswer === correctAnswer) {
      // Glow effect, correct feedback, monster HP -1
      return true;
    } else {
      // Wrong feedback, player HP -1
      return false;
    }
  }

  endEncounter() {
    // Hide combat overlay
    // Enable movement
  }
}
