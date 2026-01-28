let currentChapter = 0;
let lastScrollY = 0;

// Scroll handler to hide/show love banner
window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;
    const loveBanner = document.querySelector('.love-banner');

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling DOWN - hide
        loveBanner.classList.add('hidden');
    } else {
        // Scrolling UP - show
        loveBanner.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
});

const answers = [
    "हमारा शरीर बहुत smart है! नसें WhatsApp जैसे fast message भेजती हैं। गर्म तवा छूने पर हाथ अपने आप हट जाता है - यह प्रतिवर्ती क्रिया है जो रीढ़ की हड्डी करती है। Hormones धीरे काम करते हैं। पौधे भी react करते हैं - सूरजमुखी सूरज की तरफ मुड़ता है!",

    "जनन = अपने जैसा नया जीव बनाना। दो तरीके: (1) अलैंगिक - अकेले बच्चा बनाना जैसे अमीबा टूटकर 2 हो जाता है। (2) लैंगिक - मम्मी-पापा दोनों चाहिए। Sperm + Egg = Baby! 9 महीने में गर्भाशय में Baby बड़ा होता है।",

    "अनुवांशिकता = माँ-पापा के गुण बच्चों में आना। Gene वो recipe है जो बताती है आँखें कैसी होंगी, बाल कैसे होंगे। 23 मम्मी से + 23 पापा से = 46 Chromosomes। XX = लड़की, XY = लड़का। Mendel जी Genetics के पापा हैं!"
];

function showChapter(index) {
    // Remove active class from all
    document.querySelectorAll('.chapter').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));

    // Add active class to selected
    document.getElementById('chapter' + index).classList.add('active');
    document.querySelectorAll('.tab-btn')[index].classList.add('active');

    currentChapter = index;

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Reset quiz options for new chapter
    const chapter = document.getElementById('chapter' + index);
    chapter.querySelectorAll('.quiz-option').forEach(o => {
        o.classList.remove('selected', 'correct', 'wrong');
    });
}

function toggleContent(id) {
    const el = document.getElementById(id);
    el.classList.toggle('show');

    // Add fun animation
    if (el.classList.contains('show')) {
        el.style.animation = 'slideDown 0.4s ease';
    }
}

function selectOption(el) {
    const parent = el.closest('.quiz-question');

    // Remove selected from siblings
    parent.querySelectorAll('.quiz-option').forEach(o => {
        o.classList.remove('selected');
    });

    // Add selected to clicked option
    el.classList.add('selected');

    // Add tap feedback
    el.style.transform = 'scale(0.95)';
    setTimeout(() => {
        el.style.transform = '';
    }, 100);
}

function checkQuiz(chapterIndex) {
    const chapter = document.getElementById('chapter' + chapterIndex);
    const questions = chapter.querySelectorAll('.quiz-question');
    let correct = 0;
    let total = questions.length;

    questions.forEach(q => {
        const selected = q.querySelector('.quiz-option.selected');

        // Clear previous states
        q.querySelectorAll('.quiz-option').forEach(o => {
            o.classList.remove('correct', 'wrong');

            // Show correct answer
            if (o.dataset.correct === 'true') {
                o.classList.add('correct');
            } else if (o.classList.contains('selected')) {
                o.classList.add('wrong');
            }
        });

        // Count correct answers
        if (selected && selected.dataset.correct === 'true') {
            correct++;
        }
    });

    // Show result modal
    const modal = document.getElementById('resultModal');
    const emoji = document.getElementById('resultEmoji');
    const text = document.getElementById('resultText');
    const score = document.getElementById('resultScore');

    if (correct === total) {
        emoji.textContent = '🎉🏆🌟';
        text.textContent = 'WOW! सब सही! तुम तो Champion हो!';
    } else if (correct >= total * 0.66) {
        emoji.textContent = '👍😊';
        text.textContent = 'बहुत अच्छा! Almost perfect!';
    } else if (correct >= total * 0.33) {
        emoji.textContent = '💪📚';
        text.textContent = 'अच्छा try! थोड़ा और पढ़ो!';
    } else {
        emoji.textContent = '📖🤔';
        text.textContent = 'कोई बात नहीं! फिर से पढ़ो और try करो!';
    }

    score.textContent = `Score: ${correct}/${total}`;
    modal.classList.add('show');

    // Add confetti effect for perfect score
    if (correct === total) {
        createConfetti();
    }
}

function createConfetti() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: 10px;
                height: 10px;
                background: ${['#fd79a8', '#fdcb6e', '#00cec9', '#6c5ce7', '#00b894'][Math.floor(Math.random() * 5)]};
                border-radius: 50%;
                z-index: 300;
                animation: fall ${2 + Math.random() * 2}s linear forwards;
            `;
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 100);
    }

    // Add keyframe for falling confetti
    if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function closeModal() {
    document.getElementById('resultModal').classList.remove('show');
}

function showOneMinuteAnswer() {
    const content = document.getElementById('answerContent');
    content.innerHTML = `<p>${answers[currentChapter]}</p>`;
    document.getElementById('answerModal').classList.add('show');
}

function closeAnswerModal() {
    document.getElementById('answerModal').classList.remove('show');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(m => {
        m.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    });

    // Keyword highlight on tap
    document.querySelectorAll('.keyword').forEach(k => {
        k.addEventListener('click', function () {
            // Pulse animation
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = 'keywordPulse 0.5s ease';
        });
    });

    // Add keyword animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes keywordPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); box-shadow: 0 0 15px rgba(232, 67, 147, 0.5); }
        }
    `;
    document.head.appendChild(style);

    // Add touch feedback to cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.98)';
        });
        card.addEventListener('touchend', function () {
            this.style.transform = '';
        });
    });
});

// Keyboard support for accessibility
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
        closeAnswerModal();
    }
});
