const archetypeQuestions = [
    // The Pathfinder
    {
      archetype: "The Pathfinder",
      question: "Do you move on when something feels wrong, even if no one else can feel it?",
      reflection: "The Pathfinder listens to the wind before the words.",
    },
    {
      archetype: "The Pathfinder",
      question: "When the path vanishes, do you keep walking?",
      reflection: "They do not wait for signs. They make them.",
    },
    {
      archetype: "The Pathfinder",
      question: "Have you left something good behind, just because it no longer called to you?",
      reflection: "The call forward can’t always be explained.",
    },
    {
      archetype: "The Pathfinder",
      question: "Do you carry a quiet knowing that you're meant for somewhere you've never seen?",
      reflection: "A place not on any map, but etched in the bones.",
    },
  
    // The Orphan
    {
      archetype: "The Orphan",
      question: "Have you ever looked around a full room and felt entirely alone?",
      reflection: "The Orphan knows presence is not the same as belonging.",
    },
    {
      archetype: "The Orphan",
      question: "When things are going well, do you still wait for the fall?",
      reflection: "They’ve learned that joy can vanish without warning.",
    },
    {
      archetype: "The Orphan",
      question: "When someone offers help, do you question why?",
      reflection: "Trust was not a birthright. It became a scar softened over time.",
    },
    {
      archetype: "The Orphan",
      question: "Do you carry stories no one ever asked to hear?",
      reflection: "The Orphan speaks softly, because the world once told them not to.",
    },
  
    // The Sage
    {
      archetype: "The Sage",
      question: "Do you find solace in the silence between questions, not just the answers?",
      reflection: "The Sage doesn’t chase certainty. They sit beside the unknown.",
    },
    {
      archetype: "The Sage",
      question: "Have you ever felt more at home in a book than in a crowd?",
      reflection: "They dwell in pages, in pauses, in the unspoken.",
    },
    {
      archetype: "The Sage",
      question: "Do you feel a quiet need to make sense of what others ignore?",
      reflection: "The Sage sees the patterns hidden in plain sight.",
    },
    {
      archetype: "The Sage",
      question: "When the world rushes forward, do you step back to watch?",
      reflection: "Their power lies not in speed, but in stillness.",
    },
  
    // The Lover
    {
      archetype: "The Lover",
      question: "When someone truly sees you, does it undo something in you?",
      reflection: "The Lover is undone by tenderness more than pain.",
    },
    {
      archetype: "The Lover",
      question: "Would you rather have loved and lost than to have never loved before?",
      reflection: "They would rather ache in love than go numb in the cold.",
    },
    {
      archetype: "The Lover",
      question: "Have you stayed longer than you should, just to feel wanted?",
      reflection: "Sometimes the touch hurts, but the absence hurts more.",
    },
    {
      archetype: "The Lover",
      question: "Do you find yourself aching for something or someone you can’t name?",
      reflection: "The Lover doesn’t always know what they seek, only that they must seek it.",
    },
  
    // The Jester
    {
      archetype: "The Jester",
      question: "Do you laugh so others won’t cry?",
      reflection: "The Jester knows humour can carry what the heart cannot hold.",
    },
    {
      archetype: "The Jester",
      question: "Have you ever made yourself the punchline just to soften the blow?",
      reflection: "They bend the truth into a smile, even when it’s sharp.",
    },
    {
      archetype: "The Jester",
      question: "Is there a part of you that never grew up — and never plans to?",
      reflection: "The Jester keeps a slingshot in one pocket, and a secret in the other.",
    },
    {
      archetype: "The Jester",
      question: "When the room grows heavy, are you the first to lighten it?",
      reflection: "They dance across silence, shaking joy from the rafters.",
    },
  
    // The Friend
    {
      archetype: "The Friend",
      question: "Have you ever held your tongue, not because you agreed, but because you didn’t want to cause a scene?",
      reflection: "The Friend would rather carry discomfort than cause it.",
    },
    {
      archetype: "The Friend",
      question: "Do you sometimes fear you’ll be forgotten if you stop being useful?",
      reflection: "They serve not to shine, but to stay.",
    },
    {
      archetype: "The Friend",
      question: "When others break apart, are you the one still holding the pieces?",
      reflection: "The Friend knows the weight of staying when others leave.",
    },
    {
      archetype: "The Friend",
      question: "Have you ever dimmed your own light, just to make others feel more at ease?",
      reflection: "They know how to vanish in plain sight.",
    },
  
    // The Rebel
    {
      archetype: "The Rebel",
      question: "Have you ever felt rage not at a person, but at the *way things are*?",
      reflection: "The Rebel burns not for revenge, but for change.",
    },
    {
      archetype: "The Rebel",
      question: "Do you feel more alive when breaking a rule than when following one?",
      reflection: "They test boundaries not for thrill, but for truth.",
    },
    {
      archetype: "The Rebel",
      question: "Have you ever risked being cast out, just to speak what others were too afraid to say?",
      reflection: "The Rebel’s voice trembles, but it speaks anyway.",
    },
    {
      archetype: "The Rebel",
      question: "When you see injustice, does silence feel like betrayal?",
      reflection: "They know some peace is bought with chains.",
    },
  
    // The Magician
    {
      archetype: "The Magician",
      question: "Do you sometimes *just know* something, without knowing how?",
      reflection: "The Magician trusts the invisible threads others cannot see.",
    },
    {
      archetype: "The Magician",
      question: "Have you ever changed someone’s life with a word, without meaning to?",
      reflection: "They weave spells not with potions, but with presence.",
    },
    {
      archetype: "The Magician",
      question: "When you imagine the future, do you see it not as prediction, but as possibility?",
      reflection: "The Magician lives in what *could be*, not just what is.",
    },
    {
      archetype: "The Magician",
      question: "Have you learned to hold paradox without needing to resolve it?",
      reflection: "The Magician understands that truth often speaks in riddles.",
    },
  
    // The Hero
    {
      archetype: "The Hero",
      question: "Do you feel most alive when you have something worth fighting for?",
      reflection: "The Hero’s heart beats loudest in the face of challenge.",
    },
    {
      archetype: "The Hero",
      question: "When faced with fear, do you move anyway—because someone must?",
      reflection: "The Hero does not wait to be ready. They move because others can’t.",
    },
    {
      archetype: "The Hero",
      question: "Have you ever sacrificed your own comfort to protect someone else’s peace?",
      reflection: "The Hero bears weight so others can breathe.",
    },
    {
      archetype: "The Hero",
      question: "Do you feel like rest is a luxury you haven’t earned yet?",
      reflection: "The Hero struggles to soften. They are always braced for the next call.",
    },
  
    // The Healer
    {
      archetype: "The Healer",
      question: "Do you feel the weight others carry, even when they say they’re fine?",
      reflection: "The Healer listens with more than ears; they feel what others leave unspoken.",
    },
    {
      archetype: "The Healer",
      question: "Have you given more than you had, just to ease someone else’s ache?",
      reflection: "Their love is a salve, even when it costs them.",
    },
    {
      archetype: "The Healer",
      question: "Do you find yourself drawn to broken things, not to fix them, but to honour their story?",
      reflection: "The Healer does not rush the mending. They sit beside the wound.",
    },
    {
      archetype: "The Healer",
      question: "When others unravel, do you become the calm in the room?",
      reflection: "The world turns to them not for answers, but for stillness.",
    },
  
    // The Artist
    {
      archetype: "The Artist",
      question: "Do you notice beauty where others see nothing at all?",
      reflection: "The Artist lives in the margins, gathering light the world forgot.",
    },
    {
      archetype: "The Artist",
      question: "Have you ever felt something so deeply, you had to make it real?",
      reflection: "Their hands move because their soul cannot stay silent.",
    },
    {
      archetype: "The Artist",
      question: "Do colours, sounds, or words sometimes move through you like a tide?",
      reflection: "The Artist is less a creator than a vessel — the work chooses them.",
    },
    {
      archetype: "The Artist",
      question: "Have you made something no one else understood — but it still felt true?",
      reflection: "They do not create to explain. They create to remember.",
    },
  
    // The Ruler
    {
      archetype: "The Ruler",
      question: "Do you feel the need to take charge when no one else will?",
      reflection: "The Ruler steps forward not for glory, but because someone must.",
    },
    {
      archetype: "The Ruler",
      question: "Have you ever carried burdens in silence, so others wouldn’t have to?",
      reflection: "Their strength is often quiet, their sacrifices unseen.",
    },
    {
      archetype: "The Ruler",
      question: "Do you feel unease when things fall into chaos or indecision?",
      reflection: "Order is not control. It is care, woven into structure.",
    },
    {
      archetype: "The Ruler",
      question: "Have you been called bossy, when all you wanted was to protect?",
      reflection: "The Ruler is misunderstood by those who’ve never held the weight of others.",
    },
  ];
  
  export default archetypeQuestions;
  